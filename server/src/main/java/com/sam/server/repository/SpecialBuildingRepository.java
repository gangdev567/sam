package com.sam.server.repository;

import com.sam.server.model.SpecialBuilding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialBuildingRepository extends JpaRepository<SpecialBuilding, Long> {}