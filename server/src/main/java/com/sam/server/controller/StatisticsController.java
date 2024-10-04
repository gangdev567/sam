package com.sam.server.controller;

import com.sam.server.model.Statistics;
import com.sam.server.service.StatisticsService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<List<Statistics>> getAllStatistics() {
        List<Statistics> stats = statisticsService.getAllStatistics();
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/{key}/update")
    public ResponseEntity<Statistics> updateStatistic(@PathVariable String statKey, @RequestParam double value) {
        Statistics stat = statisticsService.updateStatistic(statKey, value);
        return ResponseEntity.ok(stat);
    }
}
