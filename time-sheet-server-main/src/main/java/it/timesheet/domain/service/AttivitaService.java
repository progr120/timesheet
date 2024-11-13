package it.timesheet.domain.service;

import it.timesheet.domain.data.attivita.CreateDataAttivita;
import it.timesheet.domain.data.attivita.ListDataAttivita;
import it.timesheet.domain.data.attivita.UpdateDataAttivita;
import it.timesheet.domain.entity.Attivita;
import it.timesheet.domain.repository.AttivitaRepository;
import it.timesheet.domain.repository.ProggetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttivitaService {

    @Autowired
    private AttivitaRepository attivitaRepository;

    @Autowired
    private ProggetoRepository proggetoRepository;

    public void createAttivita(CreateDataAttivita data) {
        var progetto = proggetoRepository.getReferenceById(data.idProggeto());

        var attivita = new Attivita(null, progetto, data.dataInizio(), data.dataFine());

        attivitaRepository.save(attivita);
    }

    public List<ListDataAttivita> attivitaList() {
        return attivitaRepository.findAll().stream()
                .map(p -> new ListDataAttivita(p.getId(),
                        p.getProggeto().getId(),
                        p.getDataInizio(),
                        p.getDataFine()))
                .toList();
    }

    public void updateAttivita(UpdateDataAttivita data) {
        var proggeto = proggetoRepository.getReferenceById(data.idProggeto());

        var attivita = new Attivita(data.id(), proggeto, data.dataInizio(), data.dataFine());

        attivitaRepository.save(attivita);
    }

    public void deleteAttivita(Long id) {
        var attivita = attivitaRepository.getReferenceById(id);

        attivitaRepository.delete(attivita);
    }

//    public Attivita readAttivitaById(Long id) {
//        return attivitaRepository.getReferenceById(id);
//    }

    public List<ListDataAttivita> readAttivitaPerIdProggeto(Long id) {
        var proggeto = proggetoRepository.getReferenceById(id);

        return attivitaRepository.findAll().stream()
                .filter(p -> p.getProggeto().getId().equals(proggeto.getId()))
                .map(p -> new ListDataAttivita(p.getId(),
                        p.getProggeto().getId(),
                        p.getDataInizio(),
                        p.getDataFine()))
                .toList();
    }
}
