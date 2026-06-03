package com.talentsphere.repository;

import com.talentsphere.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository
        extends JpaRepository<Skill, Long> {
}
