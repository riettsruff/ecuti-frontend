/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.services;

import com.metrodata.ecuti_frontend.entities.User;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import com.metrodata.ecuti_frontend.entities.rest.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
/**
 *
 * @author DB1407
 */
@Service
public class AuthService {
    @Autowired
    RestTemplate restTemplate;
    public User login(Login login) throws AuthenticationException{
        HttpEntity<Login> request = new HttpEntity<>(login, null);
        ResponseEntity<User> response = restTemplate.exchange("http://206.189.94.183:8085/auth/login",
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<User>() {
        });
        if(response.getStatusCode() == HttpStatus.UNAUTHORIZED){
            return null;
        }
        return response.getBody();
    }
}
