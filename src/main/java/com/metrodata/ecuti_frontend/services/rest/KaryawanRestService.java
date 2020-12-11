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
import com.metrodata.ecuti_frontend.entities.rest.Karyawan;

/**
 *
 * @author Riett
 */
@Service
public class KaryawanRestService {
  
  @Autowired
  RestTemplate restTemplate;
  
  @Value("${api.uri}")
  private String uri;
  
  public List<Karyawan> getAllKaryawan() {
    ResponseEntity<List<Karyawan>> response = restTemplate.exchange(
      uri + "/karyawan",
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<List<Karyawan>>() {}
    );

    return response.getBody();
  }
  
  public Karyawan getKaryawanById(int id) {
    ResponseEntity<Karyawan> response = restTemplate.exchange(
      uri + "/karyawan/" + id,
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<Karyawan>() {}
    );

    return response.getBody();
  }
  
}
