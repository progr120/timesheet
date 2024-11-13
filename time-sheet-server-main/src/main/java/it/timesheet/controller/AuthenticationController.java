package it.timesheet.controller;

import it.timesheet.domain.data.DataTokenJWT;
import it.timesheet.domain.data.utente.AuthenticationData;
import it.timesheet.domain.data.utente.RegistrationData;
import it.timesheet.domain.entity.User;
import it.timesheet.domain.service.TokenService;
import it.timesheet.domain.service.UserService;
import it.timesheet.infra.exceptions.TimeSheetException;
import jakarta.validation.Valid;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeoutException;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<DataTokenJWT> login(@RequestBody @Valid AuthenticationData data) {
        try {
            var authenticationToken = new UsernamePasswordAuthenticationToken(data.login(), data.password());
            var authentication = manager.authenticate(authenticationToken);

            var tokenJWT = tokenService.gearToken((User) authentication.getPrincipal());

            return ResponseEntity.ok(new DataTokenJWT(tokenJWT));
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationData registrationData) {
        try {
            userService.registerUser(registrationData);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

}