package it.timesheet.domain.data.attivita;

import java.time.LocalTime;

public record ListDataAttivita(Long id, Long idProggeto, LocalTime dataInizio, LocalTime dataFine) {
}
