package com.sam.server.service;

import com.sam.server.model.Statistics;
import com.sam.server.repository.StatisticsRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StatisticsService {
    private final StatisticsRepository statisticsRepository;

    public List<Statistics> getAllStatistics() {
        return statisticsRepository.findAll();
    }

    public Statistics updateStatistic(String key, double value) {
        Statistics stat = statisticsRepository.findByStatKey(key).orElseThrow();
        stat.setValue(value);
        return statisticsRepository.save(stat);
    }
}
