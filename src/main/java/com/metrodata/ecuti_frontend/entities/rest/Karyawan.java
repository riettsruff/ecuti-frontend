/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.entities.rest;

import java.util.List;
import lombok.Data;

/**
 *
 * @author Riett
 */
@Data
public class Karyawan {
  private int id;
  private String nama, jabatan, status;
  private User user;
  private List<Cuti> cutiList;
  private Departemen departemen;
}
