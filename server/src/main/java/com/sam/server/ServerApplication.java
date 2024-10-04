package com.sam.server;

import com.sam.server.service.DummyDataService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(DummyDataService dummyDataService) {
        return args -> {
            dummyDataService.clearAndGenerateDummyData(50); // 50 세트의 더미 데이터 생성
        };
    }
}
