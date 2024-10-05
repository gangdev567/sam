package com.sam.server.dto;

import java.util.List;
import lombok.Data;

@Data
public class PlayerDTO {
    private Long id;
    private String username;
    private Integer level;
    private Long experience;
    private Long gold;
    private Long food;
    private Long mana;
    private Boolean isOnline;
    private List<HeroDTO> heroes;
}
