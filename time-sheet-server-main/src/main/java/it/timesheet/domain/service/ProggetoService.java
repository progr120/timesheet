package it.timesheet.domain.service;

import it.timesheet.domain.data.attivita.ListDataAttivita;
import it.timesheet.domain.data.proggeto.CreateDataProggeto;
import it.timesheet.domain.data.proggeto.ListDataProggeto;
import it.timesheet.domain.data.proggeto.ListDataProggetoConAttivita;
import it.timesheet.domain.data.proggeto.UpdateDataProggeto;
import it.timesheet.domain.entity.Attivita;
import it.timesheet.domain.entity.Proggeto;
import it.timesheet.domain.repository.AttivitaRepository;
import it.timesheet.domain.repository.ProggetoRepository;
import it.timesheet.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProggetoService {

    @Autowired
    private ProggetoRepository proggetoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttivitaRepository attivitaRepository;

    public void createProggeto(CreateDataProggeto data) {
        var utente = userRepository.getReferenceById(data.idUtente());

        var proggeto = new Proggeto(null, utente, data.nomeProggeto(), data.descrizione());

        proggetoRepository.save(proggeto);
    }

    public List<ListDataProggeto> proggetoList() {
        return proggetoRepository.findAll().stream()
                .map(p -> new ListDataProggeto(p.getId(),
                        p.getUser().getId(),
                        p.getNomeProggeto(),
                        p.getDescrizione()))
                .toList();
    }

    public void updateProggeto(UpdateDataProggeto data) {
        var utente = userRepository.getReferenceById(data.idUtente());

        var proggeto = new Proggeto(data.id(), utente, data.nomeProggeto(), data.descrizione());

        proggetoRepository.save(proggeto);
    }

    public void deleteProggeto(Long id) {
        var proggeto = proggetoRepository.getReferenceById(id);

        proggetoRepository.delete(proggeto);
    }

//    public Proggeto proggetoListById(Long id) {
//        return proggetoRepository.getReferenceById(id);
//    }

    public List<ListDataProggeto> readProggetoListByIdUtente(Long id) {
        var utente = userRepository.getReferenceById(id);

        return proggetoRepository.findAll().stream()
                .filter(p -> p.getUser().getId().equals(utente.getId()))
                .map(p -> new ListDataProggeto(p.getId(),
                        p.getUser().getId(),
                        p.getNomeProggeto(),
                        p.getDescrizione()))
                .toList();
    }

    public List<ListDataProggetoConAttivita> readProggetoConAttivita(Long idUtente) {
        var utente = userRepository.getReferenceById(idUtente);

        var proggeto = proggetoRepository.findAll().stream()
                .filter(p -> p.getUser().getId().equals(utente.getId()))
                .toList();

        Map<Long, List<Attivita>> attivita = new HashMap<>();
        proggeto.forEach(p -> attivita.put(p.getId(), attivitaRepository.findAll().stream()
                .filter(v -> v.getProggeto().getId().equals(p.getId()))
                .toList()));

        return proggeto.stream()
                .map(p -> new ListDataProggetoConAttivita(
                        p.getId(),
                        utente.getId(),
                        attivita.get(p.getId()).stream().map(v -> new ListDataAttivita(v.getId(),
                                        v.getProggeto().getId(),
                                        v.getDataInizio(),
                                        v.getDataFine()))
                                .toList(),
                        p.getNomeProggeto(),
                        p.getDescrizione()
                ))
                .toList();
    }
}
