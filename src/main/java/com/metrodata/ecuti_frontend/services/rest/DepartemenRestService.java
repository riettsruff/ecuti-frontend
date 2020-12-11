/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.services.rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.metrodata.ecuti_frontend.entities.rest.Departemen;

/**
 *
 * @author Riett
 */
@Service
public class DepartemenRestService {
  
  @Autowired
  RestTemplate restTemplate;
  
  @Value("${api.uri}")
  private String uri;
  
  public List<Departemen> getAllDepartemen() {
    ResponseEntity<List<Departemen>> response = restTemplate.exchange(
      uri + "/departemen",
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<List<Departemen>>() {}
    );

    return response.getBody();
  }
  
  public Departemen getDepartemenById(int id) {
    ResponseEntity<Departemen> response = restTemplate.exchange(
      uri + "/departemen/" + id,
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<Departemen>() {}
    );

    return response.getBody();
  }
  
}
