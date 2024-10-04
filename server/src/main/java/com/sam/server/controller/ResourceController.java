package com.sam.server.controller;

import com.sam.server.model.Resource;
import com.sam.server.service.ResourceService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resources")
public class ResourceController {
    private final ResourceService resourceService;

    @GetMapping
    public ResponseEntity<List<Resource>> getALlResources() {
        List<Resource> resources = resourceService.getAllResources();
        return ResponseEntity.ok(resources);
    }
}
