package com.finastra.documentReference.repo;

import com.finastra.documentReference.data.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    Page<User> findById(@Param("id")String id, Pageable pageable);
    Page<User> findByReportsTo(@Param("reports")String reports, Pageable pageable);
    Page<User> findByUserType(@Param("type")String type, Pageable pageable);
    Page<User> findAllByUserTypeIsNotNull(@Param("type")String type, Pageable pageable);
    //List<User> findByUserType(String userType);
}
