package it.timesheet.domain.repository;

import it.timesheet.domain.entity.Attivita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttivitaRepository extends JpaRepository<Attivita, Long> {
}
