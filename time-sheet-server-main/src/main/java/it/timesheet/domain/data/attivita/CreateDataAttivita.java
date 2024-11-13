package it.timesheet.domain.data.attivita;

import java.time.LocalTime;

public record CreateDataAttivita(Long idProggeto, LocalTime dataInizio, LocalTime dataFine) {
}
