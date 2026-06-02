package com.talentsphere.controller;

import com.talentsphere.entity.Skill;
import com.talentsphere.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillRepository skillRepository;

    @PostMapping
    public Skill createSkill(
            @RequestBody Skill skill) {

        return skillRepository.save(skill);
    }

    @GetMapping
    public List<Skill> getSkills() {

        return skillRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(
            @PathVariable Long id) {

        skillRepository.deleteById(id);
    }
}
