package com.sam.server.dto;

import lombok.Data;

@Data
public class EquipmentSlotDTO {
    private Long id;
    private String name;
    private ItemDTO item;
    private Boolean isEquipped;
    private Integer slotPosition;
}
