package com.talentsphere.controller;

import com.talentsphere.dto.ProfileRequest;
import com.talentsphere.entity.User;
import com.talentsphere.repository.UserRepository;
import com.talentsphere.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("/{id}")
    public User getProfile(
            @PathVariable Long id) {

        return userRepository
                .findById(id)
                .orElseThrow();
    }

    @PutMapping("/{id}")
    public User updateProfile(
            @PathVariable Long id,
            @RequestBody ProfileRequest request) {

        return userService
                .updateProfile(id, request);
    }
}
