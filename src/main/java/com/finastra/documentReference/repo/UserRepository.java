package com.finastra.documentReference.repo;

import com.finastra.documentReference.data.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface UserRepository extends MongoRepository<User, String> {
    int countByUserType(@Param("department")String department);
    int countUsersByReportsToIsContaining(@Param("leaderId")String leaderId);
    Optional<User> findById(@Param("id")String id);

    List<User> findByUserType(@Param("type")String type);
    List<User> findByReportsTo(@Param("reports")String reports);

    Page<User> findAllByUserTypeIsNotNull(@Param("type")String type, Pageable pageable);
    Page<User> findById(@Param("id")String id, Pageable pageable);
    //Page<User> findByReportsTo(@Param("reports")String reports, Pageable pageable);
    //Page<User> findByUserType(@Param("type")String type, Pageable pageable);

}
