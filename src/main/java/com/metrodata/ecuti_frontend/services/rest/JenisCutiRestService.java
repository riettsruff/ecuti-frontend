/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.services.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.metrodata.ecuti_frontend.entities.rest.JenisCuti;
import com.metrodata.ecuti_frontend.services.HeaderService;
import java.util.List;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Riett
 */
@Service
public class JenisCutiRestService {
  
  @Autowired
  RestTemplate restTemplate;
  
  @Value("${api.uri}")
  private String uri;
  
  HeaderService headerService = new HeaderService();
  
  public List<JenisCuti> getAllJenisCuti() {
    ResponseEntity<List<JenisCuti>> response = restTemplate.exchange(
      uri + "/jenisCuti",
      HttpMethod.GET,
      headerService.getBearerTokenHeader(),
      new ParameterizedTypeReference<List<JenisCuti>>() {}
    );

    return response.getBody();
  }
  
  public JenisCuti getJenisCutiById(int id) {
    ResponseEntity<JenisCuti> response = restTemplate.exchange(
      uri + "/jenisCuti/" + id,
      HttpMethod.GET,
      headerService.getBearerTokenHeader(),
      new ParameterizedTypeReference<JenisCuti>() {}
    );

    return response.getBody();
  }
  
}
