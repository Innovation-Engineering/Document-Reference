package com.finastra.documentReference.web;

import com.finastra.documentReference.data.User;
import com.finastra.documentReference.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "/users/{userId}/user")
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    protected UserController() { }

    private void verifyUser(String userId) throws NoSuchElementException {
        if (!userRepository.existsById(userId)) {
            throw new NoSuchElementException("User does not exist " + userId);
        }
    }
    private User verifyAndGetUser(String userId) throws NoSuchElementException {
        return userRepository.findById(userId).orElseThrow(() ->
                new NoSuchElementException("User does not exist"));
    }
    @PostMapping(path = "/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void assignNewUser(@PathVariable(value = "userId") String userId,
                              @RequestBody User newUser) {
        if(userId.equals("new")){
            userRepository.save(new User(newUser.getUserType(),
                    "none assigned", newUser.getEmail(), newUser.getDetails()));
        }else{
            verifyUser(userId);
            userRepository.save(new User(newUser.getUserType(),
                    userId, newUser.getEmail(), newUser.getDetails()));
        }
    }

    /**
     * Lookup a page of users
     */
    @GetMapping
    public Page<User> getUser(@PathVariable(value = "userId") String userId,
                                 Pageable pageable){
        return userRepository.findById(userId, pageable);
    }

    /**
     * Calculate the average Score of a Tour.
     */
//    @GetMapping(path = "/average")
//    public Map<String, Double> getAverage(@PathVariable(value = "tourId") String tourId) {
//        verifyUser(tourId);
//        return Map.of("average",tourRatingRepository.findByTourId(tourId).stream()
//                .mapToInt(TourRating::getScore).average()
//                .orElseThrow(() ->
//                        new NoSuchElementException("Tour has no Ratings")));
//    }
//
    /**
     * Update user details
     */
    @PutMapping
    public User updateDetails(@PathVariable(value = "userId") String tourId,
                                    @RequestBody User newData) {
        User user = verifyAndGetUser(tourId);
        user.setUserType(newData.getUserType());
        user.setReportsTo(newData.getReportsTo());
        user.setEmail(newData.getEmail());
        user.setDetails(newData.getDetails());
        return userRepository.save(user);
    }
    /**
     * Update reporting assignment
     */
    @PatchMapping
    public User updateAssignment(@PathVariable(value = "userId") String userId,
                                      @RequestBody User newData) {
        User user = verifyAndGetUser(userId);
        if (newData.getReportsTo() != null) {
            user.setReportsTo(newData.getReportsTo());
        }
        if (newData.getEmail() != null) {
            user.setEmail(newData.getEmail());
        }
        return userRepository.save(user);
    }

    /**
     * Delete a user
     */
    @DeleteMapping
    public void delete(@PathVariable(value = "userId") String userId) {
        User user = verifyAndGetUser(userId);
        userRepository.delete(user);
    }

    /**
     * Exception handler if NoSuchElementException is thrown in this Controller
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    public String return400(NoSuchElementException ex) {
        return ex.getMessage();

    }

}
