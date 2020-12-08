/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metrodata.ecuti_frontend.providers;

import com.metrodata.ecuti_frontend.entities.User;
import java.util.ArrayList;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import com.metrodata.ecuti_frontend.entities.rest.Login;
import com.metrodata.ecuti_frontend.services.AuthService;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
/**
 *
 * @author DB1407
 */
@Component
public class CustomAuthenticationProviders implements AuthenticationProvider {
    @Autowired
    AuthService authService;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        System.out.println(username);
        String password = authentication.getCredentials().toString();
        System.out.println(password);
        
        Login login = new Login();
        login.setUsername(username);
        login.setPassword(password);
        User user = authService.login(login);
        System.out.println(user);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        authorities.add(authority);
        if (user != null) {
            return new UsernamePasswordAuthenticationToken(user, username, authorities);
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

    
