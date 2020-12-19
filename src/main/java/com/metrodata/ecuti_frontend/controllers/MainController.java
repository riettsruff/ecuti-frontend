/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.controllers;

import com.metrodata.ecuti_frontend.entities.User;
import com.metrodata.ecuti_frontend.entities.rest.Cuti;
import com.metrodata.ecuti_frontend.entities.rest.Karyawan;
import com.metrodata.ecuti_frontend.services.rest.DepartemenRestService;
import com.metrodata.ecuti_frontend.services.rest.JenisCutiRestService;
import com.metrodata.ecuti_frontend.services.rest.KaryawanRestService;
import com.metrodata.ecuti_frontend.services.rest.CutiRestService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;  
import java.util.Date;  
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
    @Autowired
    JenisCutiRestService jenisCutiRestService;
    @Autowired
    DepartemenRestService departemenRestService;
    @Autowired
    CutiRestService cutiRestService;
    
    @GetMapping("/")
    public String index(Authentication authentication, Model model) throws ParseException {
      User principal = (User) authentication.getPrincipal();
      Karyawan currentKaryawan = karyawanRestService.getKaryawanById(principal.getId());
      
      model.addAttribute("jenisCutiTersedia", jenisCutiRestService.getAllJenisCuti());
      model.addAttribute("currentKaryawan", currentKaryawan);
      model.addAttribute("bearerToken", principal.getToken());
      
      List<Cuti> riwayatCutiKaryawan = new ArrayList<Cuti>();
      List<Cuti> riwayatCutiPribadi = new ArrayList<Cuti>();
      List<Cuti> persetujuanCutiKaryawan = new ArrayList<Cuti>();
      List<Cuti> pengajuanCutiPribadi = new ArrayList<Cuti>();
      List<Cuti> listCutiPribadi = currentKaryawan.getCutiList();
      List<Cuti> listCutiKaryawan = cutiRestService.getCutiByDepartemenId(currentKaryawan.getDepartemen().getId());
      
      if(listCutiPribadi != null) {
        for(Cuti cuti : currentKaryawan.getCutiList()) {
          SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
          String tanggalSelesai = cuti.getTanggalSelesai();
          String tanggalHariIni = dateFormat.format(new Date());

          if(dateFormat.parse(tanggalSelesai).before(dateFormat.parse(tanggalHariIni))) {
            riwayatCutiPribadi.add(cuti);
          }
          
          if(dateFormat.parse(tanggalSelesai).after(dateFormat.parse(tanggalHariIni))) {
            pengajuanCutiPribadi.add(cuti);
          }
        }
      }
      
      if(listCutiKaryawan != null) {
        for(Cuti cuti : listCutiKaryawan) {
          SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
          String tanggalSelesai = cuti.getTanggalSelesai();
          String tanggalHariIni = dateFormat.format(new Date());
          
          if(dateFormat.parse(tanggalSelesai).after(dateFormat.parse(tanggalHariIni))) {
            if(cuti.getStatus().equals("tertunda")) {
               persetujuanCutiKaryawan.add(cuti);
            }
          }
        }
      }
      
      int totalKaryawanAktif = 0;
      int totalKaryawanCuti = 0;
      
      if(principal.getRole().equals("MANAJER")) {
        List<Karyawan> listAllKaryawan = karyawanRestService.getByDepartemenId(currentKaryawan.getDepartemen().getId());  
        
        for(Karyawan karyawan : listAllKaryawan) {
            if(karyawan.getStatus().equals("aktif")) totalKaryawanAktif++;
            else if(karyawan.getStatus().equals("cuti")) totalKaryawanCuti++;
        }
        
        model.addAttribute("totalKaryawanAktif", totalKaryawanAktif);
        model.addAttribute("totalKaryawanCuti", totalKaryawanCuti);  
        model.addAttribute("persetujuanCutiKaryawan", persetujuanCutiKaryawan);
      } else if(principal.getRole().equals("SDM")) {
        List<Karyawan> listAllKaryawan = karyawanRestService.getAllKaryawan();
        
        for(Karyawan karyawan : listAllKaryawan) {
            if(karyawan.getStatus().equals("aktif")) totalKaryawanAktif++;
            else if(karyawan.getStatus().equals("cuti")) totalKaryawanCuti++;
        }
        
        model.addAttribute("totalKaryawanAktif", totalKaryawanAktif);
        model.addAttribute("totalKaryawanCuti", totalKaryawanCuti);
      }
      
      model.addAttribute("riwayatCutiPribadi", riwayatCutiPribadi);
      model.addAttribute("riwayatCutiKaryawan", riwayatCutiKaryawan);
      model.addAttribute("pengajuanCutiPribadi", pengajuanCutiPribadi);
      
      return "index";
    }
    
    @GetMapping("/login")
    public String login() {
      return "login";
    }

    @GetMapping("/pribadi/**")
    public String indexPribadi(Authentication authentication, Model model) throws ParseException {
      User principal = (User) authentication.getPrincipal();
      Karyawan currentKaryawan = karyawanRestService.getKaryawanById(principal.getId());
      
      model.addAttribute("currentKaryawan", currentKaryawan);
      model.addAttribute("jenisCutiTersedia", jenisCutiRestService.getAllJenisCuti());
      model.addAttribute("bearerToken", principal.getToken());
      
      List<Cuti> riwayatCutiPribadi = new ArrayList<Cuti>();
      List<Cuti> riwayatCutiKaryawan = new ArrayList<Cuti>();
      List<Cuti> persetujuanCutiKaryawan = new ArrayList<Cuti>();
      List<Cuti> listCutiPribadi = currentKaryawan.getCutiList();
      List<Cuti> listCutiKaryawan = principal.getRole().equals("SDM") 
        ? cutiRestService.getAllCuti() 
        : principal.getRole().equals("MANAJER")
            ? cutiRestService.getCutiByDepartemenId(currentKaryawan.getDepartemen().getId())
            : new ArrayList<Cuti>();
      
      if(listCutiPribadi != null) {
        for(Cuti cuti : currentKaryawan.getCutiList()) {
          SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
          String tanggalSelesai = cuti.getTanggalSelesai();
          String tanggalHariIni = dateFormat.format(new Date());

          if(dateFormat.parse(tanggalSelesai).before(dateFormat.parse(tanggalHariIni))) {
            riwayatCutiPribadi.add(cuti);
          }
        }
      }
      
      if(listCutiKaryawan != null) {
        for(Cuti cuti : listCutiKaryawan) {
          SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
          String tanggalSelesai = cuti.getTanggalSelesai();
          String tanggalHariIni = dateFormat.format(new Date());
          
          if(dateFormat.parse(tanggalSelesai).before(dateFormat.parse(tanggalHariIni))) {
            riwayatCutiKaryawan.add(cuti);
          }
          
          if(dateFormat.parse(tanggalSelesai).after(dateFormat.parse(tanggalHariIni))) {
            if(cuti.getStatus().equals("tertunda")) {
               persetujuanCutiKaryawan.add(cuti);
            }
          }
        }
      }
      
      if(principal.getRole().equals("MANAJER")) {
         model.addAttribute("persetujuanCutiKaryawan", persetujuanCutiKaryawan);
      }
      
      model.addAttribute("riwayatCutiPribadi", riwayatCutiPribadi);
      
      return "index";
    }

    @GetMapping("/karyawan/**")
    public String indexKaryawan(Authentication authentication, Model model) throws ParseException {
      User principal = (User) authentication.getPrincipal();
      Karyawan currentKaryawan = karyawanRestService.getKaryawanById(principal.getId());
      
      model.addAttribute("jenisCutiTersedia", jenisCutiRestService.getAllJenisCuti());
      
      if(principal.getRole().equals("SDM")) {
        model.addAttribute("jenisCuti", jenisCutiRestService.getAllJenisCuti());
        model.addAttribute("departemen", departemenRestService.getAllDepartemen());
        
        List<Karyawan> listAllKaryawan = karyawanRestService.getAllKaryawan();
        
        int totalKaryawanAktif = 0;
        int totalKaryawanCuti = 0;
        
        for(Karyawan karyawan : listAllKaryawan) {
            if(karyawan.getStatus().equals("aktif")) totalKaryawanAktif++;
            else if(karyawan.getStatus().equals("cuti")) totalKaryawanCuti++;
        }
        
        model.addAttribute("karyawan", listAllKaryawan);
        model.addAttribute("totalKaryawanAktif", totalKaryawanAktif);
        model.addAttribute("totalKaryawanCuti", totalKaryawanCuti);
      } else if(principal.getRole().equals("MANAJER")) {
        List<Karyawan> listAllKaryawan = karyawanRestService.getByDepartemenId(currentKaryawan.getDepartemen().getId());
        
        int totalKaryawanAktif = 0;
        int totalKaryawanCuti = 0;
        
        for(Karyawan karyawan : listAllKaryawan) {
            if(karyawan.getStatus().equals("aktif")) totalKaryawanAktif++;
            else if(karyawan.getStatus().equals("cuti")) totalKaryawanCuti++;
        }
        
        model.addAttribute("karyawan", listAllKaryawan);
        model.addAttribute("totalKaryawanAktif", totalKaryawanAktif);
        model.addAttribute("totalKaryawanCuti", totalKaryawanCuti);
      }
      
      List<Cuti> cutiList = principal.getRole().equals("SDM") 
        ? cutiRestService.getAllCuti() 
        : principal.getRole().equals("MANAJER")
            ? cutiRestService.getCutiByDepartemenId(currentKaryawan.getDepartemen().getId())
            : new ArrayList<Cuti>();
      
      List<Cuti> riwayatCutiKaryawan = new ArrayList<Cuti>();
      List<Cuti> persetujuanCutiKaryawan = new ArrayList<Cuti>();
      
      if(cutiList != null) {
        for(Cuti cuti : cutiList) {
          SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
          String tanggalSelesai = cuti.getTanggalSelesai();
          String tanggalHariIni = dateFormat.format(new Date());

          if(dateFormat.parse(tanggalSelesai).before(dateFormat.parse(tanggalHariIni))) {
            riwayatCutiKaryawan.add(cuti);
          }
          
          if(dateFormat.parse(tanggalSelesai).after(dateFormat.parse(tanggalHariIni))) {
            if(cuti.getStatus().equals("tertunda")) {
               persetujuanCutiKaryawan.add(cuti);
            }
          }
        }
      }
      
      if(principal.getRole().equals("MANAJER")) {
         model.addAttribute("persetujuanCutiKaryawan", persetujuanCutiKaryawan);
      }
      
      model.addAttribute("riwayatCutiKaryawan", riwayatCutiKaryawan);
      model.addAttribute("currentKaryawan", currentKaryawan);
      model.addAttribute("bearerToken", principal.getToken());
      
      return "index";
    }
    
}
