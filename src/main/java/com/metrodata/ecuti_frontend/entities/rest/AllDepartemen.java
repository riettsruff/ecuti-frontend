/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.entities.rest;

import lombok.Data;


/**
 *
 * @author Riett
 */
@Data
public class AllDepartemen {
    private int id, managerId;
    private String nama, manager;
}
