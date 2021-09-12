package com.finastra.documentReference.repo;

import com.finastra.documentReference.data.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin
public interface UserRepository extends MongoRepository<User, String> {
    int countByUserType(@Param("department")String department);
    int countUsersByReportsToIsContaining(@Param("leaderId")String leaderId);
    Page<User> findById(@Param("id")String id, Pageable pageable);
    Page<User> findByReportsTo(@Param("reports")String reports, Pageable pageable);
    Page<User> findByUserType(@Param("type")String type, Pageable pageable);
    Page<User> findAllByUserTypeIsNotNull(@Param("type")String type, Pageable pageable);
    //List<User> findByUserType(String userType);
}
