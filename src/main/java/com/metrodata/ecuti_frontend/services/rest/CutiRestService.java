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
import com.metrodata.ecuti_frontend.entities.rest.Cuti;
import com.metrodata.ecuti_frontend.services.HeaderService;

/**
 *
 * @author Riett
 */
@Service
public class CutiRestService {
  
  @Autowired
  RestTemplate restTemplate;
  
  @Value("${api.uri}")
  private String uri;
  
  HeaderService headerService = new HeaderService();
  
  public List<Cuti> getAllCuti() {
    ResponseEntity<List<Cuti>> response = restTemplate.exchange(
      uri + "/cuti",
      HttpMethod.GET,
      headerService.getBearerTokenHeader(),
      new ParameterizedTypeReference<List<Cuti>>() {}
    );

    return response.getBody();
  }
  
  public Cuti getCutiById(int id) {
    ResponseEntity<Cuti> response = restTemplate.exchange(
      uri + "/cuti/" + id,
      HttpMethod.GET,
      headerService.getBearerTokenHeader(),
      new ParameterizedTypeReference<Cuti>() {}
    );

    return response.getBody();
  }
  
  public List<Cuti> getCutiByDepartemenId(int id) {
    ResponseEntity<List<Cuti>> response = restTemplate.exchange(
      uri + "/cuti/" + id + "/departemen",
      HttpMethod.GET,
      headerService.getBearerTokenHeader(),
      new ParameterizedTypeReference<List<Cuti>>() {}
    );

    return response.getBody();
  }
  
  public List<Cuti> getCutiByKaryawanId(int id) {
    ResponseEntity<List<Cuti>> response = restTemplate.exchange(
      uri + "/cuti/" + id + "/karyawan",
      HttpMethod.GET,
      headerService.getBearerTokenHeader(),
      new ParameterizedTypeReference<List<Cuti>>() {}
    );

    return response.getBody();
  }
  
}
