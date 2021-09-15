package com.finastra.documentReference.web;

import com.finastra.documentReference.data.User;
import com.finastra.documentReference.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/users/{userId}/user")
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
     * Get users page
     */
    @GetMapping
    public Page<User> getUser(@PathVariable(value = "userId") String userId,
                                 Pageable pageable){
        return userRepository.findById(userId, pageable);
    }
    @GetMapping(path="/search")
    public Page<User> getUserByDepartment(@PathVariable(value = "userId") String userId,
                              Pageable pageable){
        return userRepository.findById(userId, pageable);
    }
    /**
     * Update user details
     */
    @PutMapping
    public User updateDetails(@PathVariable(value = "userId") String tourId,
                                    @RequestBody User newData) {
        User user = verifyAndGetUser(tourId);
        user.setUserType(newData.getUserType());
        user.setReportsTo((newData.getReportsTo()==null) ? "none assigned" : newData.getReportsTo());
        user.setEmail(newData.getEmail());
        user.setDetails(newData.getDetails());
        return userRepository.save(user);
    }
    /**
     * Update reporting assignment
     */
    @PatchMapping(path = "/patch")
    public User updateAssignment(@PathVariable(value = "userId") String userId,
                                      @RequestParam String leaderId) {
        User user = verifyAndGetUser(userId);
        if (leaderId != null) {
            user.setReportsTo(leaderId);
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
    @CrossOrigin
    @GetMapping(path = "/total")
    public int getAllUsers(@PathVariable(value = "userId") String tourId){
        var list = List.of("Business Development", "Marketing", "Sales", "none assigned");
        int num = 0;
        for (var item: list ) {
            num += userRepository.countByUserType(item);
        }
        return num;
    }

}
