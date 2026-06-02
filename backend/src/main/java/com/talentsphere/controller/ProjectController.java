package com.talentsphere.controller;

import com.talentsphere.entity.Project;
import com.talentsphere.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;

    @PostMapping
    public Project createProject(
            @RequestBody Project project) {

        return projectRepository.save(project);
    }

    @GetMapping
    public List<Project> getProjects() {

        return projectRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteProject(
            @PathVariable Long id) {

        projectRepository.deleteById(id);
    }
}
