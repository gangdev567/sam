package com.sam.server.service;

import com.sam.server.model.Event;
import com.sam.server.repository.EventRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EventService {
    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public void activateEvent(Long id) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.setActive(true);
        eventRepository.save(event);
    }

    public void deactivateEvent(Long id) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.setActive(false);
        eventRepository.save(event);
    }
}
