package com.finastra.documentReference.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
public class Address {
    private String country;
    private String city;
}
