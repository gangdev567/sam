package com.sam.server.util;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import org.springframework.stereotype.Component;

@Component
public class DummyDataGenerator {
    private final Random random = new Random();

    public String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            char c = (char) ('a' + random.nextInt(26));
            sb.append(c);
        }
        return sb.toString();
    }

    public int getRandomInt(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    public LocalDate getRandomDate(LocalDate startDate, LocalDate endDate) {
        long daysBetweenDates = ChronoUnit.DAYS.between(startDate, endDate);
        return startDate.plusDays(random.nextInt((int) daysBetweenDates));
    }

    public double getRandomDouble(double min, double max) {
        return random.nextDouble() * (max - min) + min;
    }

    public boolean getRandomBoolean() {
        return random.nextBoolean();
    }
}
