/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.services;

import com.metrodata.ecuti_frontend.entities.User;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 *
 * @author Riett
 */
public class HeaderService {
    private HttpHeaders headers = new HttpHeaders();
    
    public HttpEntity<String> getBearerTokenHeader() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        headers.set("Authorization", "Bearer " + principal.getToken());
        
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        return entity;
    }
}
