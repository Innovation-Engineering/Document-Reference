package com.finastra.documentReference.data;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@Document
public class User {
    @Id
    private String id;

    private String userType;
    //ID
    private String reportsTo;
    @Indexed
    private String email;
    private Map<String, String> details;

    public User(String userType, String reportsTo, String email, Map<String, String> details) {
        this.userType = userType;
        this.reportsTo = reportsTo;
        this.email = email;
        this.details = details;
    }

    public String getUserType() {
        return userType;
    }

    public String getReportsTo() {
        return reportsTo;
    }

    public String getEmail() {
        return email;
    }

    public Map<String, String> getDetails() {
        return details;
    }
}
