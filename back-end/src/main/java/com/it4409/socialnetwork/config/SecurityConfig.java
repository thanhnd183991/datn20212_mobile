package com.it4409.socialnetwork.config;

import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.security.JWTFilter;
import com.it4409.socialnetwork.service.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserRepository userRepository;
    private final JWTService jwtService;

    @Bean
    public FilterRegistrationBean<JWTFilter> jwtFilter(){
        FilterRegistrationBean<JWTFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JWTFilter(userRepository, jwtService));
        registrationBean.addUrlPatterns("/api/private/*");
        return registrationBean;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        //stateless
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.csrf().disable();
        http.cors();
    }
}
