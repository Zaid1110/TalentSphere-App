package com.talentsphere.controller;

import com.talentsphere.dto.LoginRequest;
import com.talentsphere.dto.RegisterRequest;
import com.talentsphere.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        boolean success = userService.login(
                request.getEmail(),
                request.getPassword());

        if (!success) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Invalid Credentials"));
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Login Successful"));
    }
}
