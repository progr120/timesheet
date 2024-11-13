package it.timesheet.domain.data.utente;

import it.timesheet.domain.entity.RoleUser;

public record AuthenticationData(String login, String password, RoleUser role) {
}
