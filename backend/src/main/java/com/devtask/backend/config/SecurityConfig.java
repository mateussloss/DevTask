// src/main/java/com/devtask/backend/config/SecurityConfig.java
package com.devtask.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(org.springframework.security.config.annotation.web.builders.HttpSecurity http) throws Exception {
        http
          .csrf(csrf -> csrf.disable())                          // desliga CSRF
          .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())  
          .sessionManagement(sess -> sess.sessionCreationPolicy(STATELESS))
          .httpBasic(Customizer.withDefaults());                 // mantém Basic Auth, mas libera tudo

        return http.build();
    }
}
