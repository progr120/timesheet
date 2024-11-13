package it.timesheet.domain.data.proggeto;

import it.timesheet.domain.data.attivita.ListDataAttivita;

import java.util.List;

public record ListDataProggetoConAttivita(
        Long id,
        Long idUser,
        List<ListDataAttivita> attivitaList,
        String nomeProggeto,
        String descrizione) {
}
