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
public class Departemen {
  private int id;
  private List<Karyawan> karyawanList;
  private Karyawan manager;
  private String nama;
}
