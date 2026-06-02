package com.talentsphere.controller;

import com.talentsphere.dto.LoginRequest;
import com.talentsphere.dto.RegisterRequest;
import com.talentsphere.security.JwtUtil;
import com.talentsphere.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(
            UserService userService,
            JwtUtil jwtUtil) {

        this.userService = userService;
        this.jwtUtil = jwtUtil;
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

        String token =
                jwtUtil.generateToken(
                        request.getEmail());

        return ResponseEntity.ok(
                Map.of(
                        "token",
                        token));
    }
}
