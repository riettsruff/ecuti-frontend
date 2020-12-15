/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author DB1407
 */
public class User implements UserDetails{
    private int id;
    private String username;
    private String email;
    private String role;
    private String password;
    private String token;
    private boolean accountNonExpired, accountNonLocked, credentialsNonExpired, enabled;
    private Collection<? extends GrantedAuthority> authorities;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities ;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", accountNonExpired=" + accountNonExpired + ", accountNonLocked=" + accountNonLocked + ", credentialsNonExpired=" + credentialsNonExpired + ", enabled=" + enabled + ", authorities=" + authorities + '}';
    }
    
    
}
