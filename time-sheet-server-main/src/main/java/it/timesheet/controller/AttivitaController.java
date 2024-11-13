package it.timesheet.controller;

import it.timesheet.domain.data.attivita.CreateDataAttivita;
import it.timesheet.domain.data.attivita.ListDataAttivita;
import it.timesheet.domain.data.attivita.UpdateDataAttivita;
import it.timesheet.domain.service.AttivitaService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attivita")
public class AttivitaController {

    @Autowired
    private AttivitaService attivitaService;

    @PostMapping
    @Transactional
    public ResponseEntity<String> createAttivita(@RequestBody @Valid CreateDataAttivita data) {
        try {
            attivitaService.createAttivita(data);
            return ResponseEntity.ok("Create Activity Success!");
        } catch (Exception e) {
            throw new RuntimeException("Error create activity: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ListDataAttivita>> readAttivita() {
        try {
            var lista = attivitaService.attivitaList();
            return ResponseEntity.ok(lista);
        } catch (Exception e) {
            throw new RuntimeException("Error create activity: " + e.getMessage());
        }
    }

    @PutMapping
    @Transactional
    public ResponseEntity<String> updateAttivita(@RequestBody @Valid UpdateDataAttivita data) {
        try {
            attivitaService.updateAttivita(data);
            return ResponseEntity.ok("Update Activity Success!");
        } catch (Exception e) {
            throw new RuntimeException("Error create activity: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteAttivita(@PathVariable Long id) {
        try {
            attivitaService.deleteAttivita(id);
            return ResponseEntity.ok("Activity Delete Success!");
        } catch (Exception e) {
            throw new RuntimeException("Error create activity: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ListDataAttivita>> readAttivitaByIdProggeto(@PathVariable Long id) {
        try {
            var lista = attivitaService.readAttivitaPerIdProggeto(id);
            return ResponseEntity.ok(lista);
        } catch (Exception e) {
            throw new RuntimeException("Error create activity: " + e.getMessage());
        }
    }
}
