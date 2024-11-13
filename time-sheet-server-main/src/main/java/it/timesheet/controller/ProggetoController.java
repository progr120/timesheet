package it.timesheet.controller;

import it.timesheet.domain.data.proggeto.CreateDataProggeto;
import it.timesheet.domain.data.proggeto.ListDataProggeto;
import it.timesheet.domain.data.proggeto.ListDataProggetoConAttivita;
import it.timesheet.domain.data.proggeto.UpdateDataProggeto;
import it.timesheet.domain.service.ProggetoService;
import it.timesheet.infra.exceptions.TimeSheetException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proggeto")
public class ProggetoController {

    @Autowired
    private ProggetoService proggetoService;

    @PostMapping
    @Transactional
    public ResponseEntity<String> createProggeto(@RequestBody @Valid CreateDataProggeto data) {
        try {
            proggetoService.createProggeto(data);
            return ResponseEntity.ok("Create Project Success!");
        } catch (Exception e) {
            throw new RuntimeException("Error create project: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ListDataProggeto>> readProggetoList() {
        try {
            var lista = proggetoService.proggetoList();
            return ResponseEntity.ok(lista);
        } catch (Exception e) {
            throw new RuntimeException("Error list project: " + e.getMessage());
        }
    }

    @PutMapping
    @Transactional
    public ResponseEntity<String> updateProggeto(@RequestBody @Valid UpdateDataProggeto data) {
        try {
            proggetoService.updateProggeto(data);
            return ResponseEntity.ok("Update Project Success!");
        } catch (Exception e) {
            throw new RuntimeException("Error update project: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteProggeto(@PathVariable Long id) {
        try {
            proggetoService.deleteProggeto(id);
            return ResponseEntity.ok("Delete Project Success!");
        } catch (Exception e) {
            throw new RuntimeException("Error delete project: " + e.getMessage());
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Proggeto> readProggetoListById(@PathVariable Long id) {
//        try {
//            var proggeto = proggetoService.proggetoListById(id);
//            return ResponseEntity.ok(proggeto);
//        } catch (Exception e) {
//            throw new RuntimeException("Error list project by id: " + e.getMessage());
//        }
//    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ListDataProggeto>> readProggetoByIdUtente(@PathVariable Long id) {
        try {
            var lista = proggetoService.readProggetoListByIdUtente(id);
            return ResponseEntity.ok(lista);
        } catch (Exception e) {
            throw new RuntimeException("Error list project by id utente: " + e.getMessage());
        }
    }

    @GetMapping("/detail/{idUtente}")
    public ResponseEntity<List<ListDataProggetoConAttivita>> readProggetoConAttivita(@PathVariable Long idUtente) {
        try {
            var proggeto = proggetoService.readProggetoConAttivita(idUtente);
            return ResponseEntity.ok(proggeto);
        } catch (Exception e) {
            throw new RuntimeException("Error list project by id utente: " + e.getMessage());
        }
    }
}
