package com.sam.server.dto;

import com.sam.server.model.Weakness;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeaknessDTO {

    private Long id;
    private String element;
    private String description;

    public static WeaknessDTO fromEntity(Weakness weakness) {
        return WeaknessDTO.builder()
            .id(weakness.getId())
            .element(weakness.getElement().toString())
            .description(weakness.getDescription())
            .build();
    }
}