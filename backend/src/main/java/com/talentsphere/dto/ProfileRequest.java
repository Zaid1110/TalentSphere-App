package com.talentsphere.dto;

import lombok.Data;

@Data
public class ProfileRequest {

    private String title;
    private String bio;
    private String location;
    private String linkedinUrl;
    private String githubUrl;
}
