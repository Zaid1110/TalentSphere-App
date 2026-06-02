package com.talentsphere.service;

import com.talentsphere.dto.ProfileRequest;
import com.talentsphere.dto.RegisterRequest;
import com.talentsphere.entity.User;
import com.talentsphere.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
		       PasswordEncoder passwordEncoder) {


        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    public User updateProfile(
             Long userId,
             ProfileRequest request) {

         User user =
                userRepository.findById(userId)
                        .orElseThrow();

         user.setTitle(request.getTitle());
         user.setBio(request.getBio());
         user.setLocation(request.getLocation());
         user.setLinkedinUrl(
                request.getLinkedinUrl());

         user.setGithubUrl(
                request.getGithubUrl());

        return userRepository.save(user);
}

}
