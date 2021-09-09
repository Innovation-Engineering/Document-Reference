package com.finastra.documentReference.service;

import com.finastra.documentReference.data.User;
import com.finastra.documentReference.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    private UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User createUser(String userType, String reportsTo, String email, Map<String, String> details) {
        return userRepository.save(new User(userType, reportsTo, email, details));
    }
    public void clearUser() {
        userRepository.deleteAll();
    }
    public long total() {
        return userRepository.count();
    }
    //        TourPackage tourPackage = tourPackageRepository.findByName(tourPackageName).orElseThrow(()->
    //                new RuntimeException("Tour package does not exist: " + tourPackageName));
}
