package com.finastra.documentReference.controller;

import com.finastra.documentReference.data.User;
import com.finastra.documentReference.repo.UserRepository;
import com.finastra.documentReference.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

/**
 * Created by Mary Ellen Bowman
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class UserServiceTest {
    private static final String TYPE = "Sales";
    private static final String USER_ID = "1";
    private static final String TOUR_RATINGS_URL = "/api/users/" + USER_ID + "/user";
    @Mock
    private UserRepository userRepositoryMock;
    @InjectMocks //Autowire TourRatingService(tourRatingRepositoryMock, tourRepositoryMock)
    private UserService serviceMock;
    @Mock
    private User userMock;
    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Mock responses to commonly invoked methods.
     */
    @Before
    public void setupReturnValuesOfMockMethods() {
        when(userRepositoryMock.findById("1")).thenReturn(Optional.of(userMock));
        when(userMock.getId()).thenReturn(USER_ID);
    }
    @Test
    public void lookupRatingById() {
        when(userRepositoryMock.findById(USER_ID)).thenReturn(Optional.of(userMock));

        //invoke and verify lookupRatingById
//        assertThat(service.lookupRatingById(TOUR_RATING_ID).get(), is(tourRatingMock));
    }

    /**
     *  HTTP POST /tours/{tourId}/ratings
     */
    @Test
    public void createTourRating() throws Exception {
        var str = new HashMap<String, String>();
        restTemplate.postForEntity(TOUR_RATINGS_URL, new User("Sales",".","", str) , Void.class);
        str.put("","");
        verify(this.serviceMock).createUser("Sales",".","", str);
    }

    /**
     *  HTTP DELETE /tours/{tourId}/ratings
     */
//    @Test
//    public void delete() throws Exception {
//        restTemplate.delete(TOUR_RATINGS_URL + "/" + CUSTOMER_ID);
//
//        verify(serviceMock).delete(TOUR_ID, CUSTOMER_ID);
//    }

}