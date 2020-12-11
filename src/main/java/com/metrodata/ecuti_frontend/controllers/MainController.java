/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.controllers;

import com.metrodata.ecuti_frontend.entities.User;
import com.metrodata.ecuti_frontend.entities.rest.Karyawan;
import com.metrodata.ecuti_frontend.services.rest.KaryawanRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Riett
 */
@Controller
public class MainController {
  
    @Autowired
    KaryawanRestService karyawanRestService;
    
    @GetMapping("/")
    public String index(Authentication authentication, Model model) {
      System.out.println("roles");
      System.out.println(authentication.getAuthorities().toString());
      
      User principal = (User) authentication.getPrincipal();
      Karyawan currentKaryawan = karyawanRestService.getKaryawanById(principal.getId());
      
      model.addAttribute("currentKaryawan", currentKaryawan);
      
      return "index";
    }
    
    @GetMapping("/login")
    public String login() {
      return "login";
    }

    @GetMapping("/pribadi/**")
    public String indexPribadi() {
      return "index";
    }

    @GetMapping("/karyawan/**")
    public String indexKaryawan() {
      return "index";
    }
    
}
