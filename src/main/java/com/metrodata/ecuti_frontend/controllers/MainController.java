/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Riett
 */
@Controller
public class MainController {
    
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/pribadi/**")
    public String indexPribadi() {
        return "index";
    }

    @GetMapping("/karyawan/**")
    public String indexKaryawan() {
        return "index";
    }
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
}
