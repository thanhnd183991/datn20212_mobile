package com.it4409.socialnetwork.security;


import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.service.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Order(1)
@AllArgsConstructor
public class JWTFilter implements Filter {
    private UserRepository userRepository;
    private JWTService jwtService;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String token = request.getHeader("Authorization");
        if(token != null){
            String username = jwtService.decode(token);
            boolean userExists = userRepository.existsByUsername(username);
            if(userExists){
                filterChain.doFilter(servletRequest, servletResponse);
            }
        }
    }
}
