package com.sam.server.repository;

import com.sam.server.model.Building;
import com.sam.server.model.UpgradeInfo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UpgradeInfoRepository extends JpaRepository<UpgradeInfo, Long> {

}
