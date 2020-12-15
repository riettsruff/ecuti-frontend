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
public class Cuti {
  private int id;
  private String catatan, keterangan, status, tanggalMulai, tanggalPengajuan, tanggalSelesai;
  private JenisCuti jenisCuti;
  private Karyawan karyawan;
  private boolean perluPengganti;
}
