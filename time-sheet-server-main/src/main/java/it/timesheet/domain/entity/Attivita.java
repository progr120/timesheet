package it.timesheet.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "attivita")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Attivita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProggeto", referencedColumnName = "id")
    private Proggeto proggeto;

    private LocalTime dataInizio;

    private LocalTime dataFine;

    @Override
    public String toString() {
        return "Attivita{" +
                "id=" + id +
                ", proggeto=" + proggeto +
                ", dataInizio=" + dataInizio +
                ", dataFine=" + dataFine +
                '}';
    }
}
