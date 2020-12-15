/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.controllers;

import com.metrodata.ecuti_frontend.entities.User;
import com.metrodata.ecuti_frontend.entities.rest.Cuti;
import com.metrodata.ecuti_frontend.entities.rest.Karyawan;
import com.metrodata.ecuti_frontend.services.rest.JenisCutiRestService;
import com.metrodata.ecuti_frontend.services.rest.KaryawanRestService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
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
    JenisCutiRestService jenisCutiRestService;
    
    @GetMapping("/")
    public String index(Authentication authentication, Model model) throws ParseException {
      User principal = (User) authentication.getPrincipal();
      Karyawan currentKaryawan = karyawanRestService.getKaryawanById(principal.getId());
      
      model.addAttribute("currentKaryawan", currentKaryawan);
      model.addAttribute("bearerToken", principal.getToken());
//      model.addAttribute("jenisCutiTersedia", jenisCutiRestService.getAllJenisCuti());
      
//      System.out.println(jenisCutiRestService.getAllJenisCuti());
      
      
//      List<Cuti> cutiListKaryawan = currentKaryawan.getCutiList();
////      List<Cuti> statusCutiKaryawan = new ArrayList<Cuti>();
//      
//        for (Cuti c : cutiListKaryawan) {
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//            Date strDate = sdf.parse(c.getTanggalSelesai());
//            if(strDate.getTime() < System.currentTimeMillis()) {
//                statusCutiKaryawan.add(c);
//            }
//        }
//      
//      model.addAttribute("statusCutiKaryawan", statusCutiKaryawan);
      
      return "index";
    }
    
    @GetMapping("/login")
    public String login() {
      return "login";
    }

    @GetMapping("/pribadi/**")
    public String indexPribadi(Authentication authentication, Model model) {
      User principal = (User) authentication.getPrincipal();
      Karyawan currentKaryawan = karyawanRestService.getKaryawanById(principal.getId());
      
      model.addAttribute("currentKaryawan", currentKaryawan);
      
      return "index";
    }

    @GetMapping("/karyawan/**")
    public String indexKaryawan(Authentication authentication, Model model) {
      User principal = (User) authentication.getPrincipal();
      Karyawan currentKaryawan = karyawanRestService.getKaryawanById(principal.getId());
      
      model.addAttribute("currentKaryawan", currentKaryawan);
      
      return "index";
    }
    
}
