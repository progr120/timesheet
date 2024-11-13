package it.timesheet.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "proggeto")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Proggeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUtente", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    private String nomeProggeto;

    private String descrizione;

    @Override
    public String toString() {
        return "Proggeto{" +
                "id=" + id +
                ", user=" + user +
                ", nomeProggeto='" + nomeProggeto + '\'' +
                ", descrizione='" + descrizione + '\'' +
                '}';
    }
}
