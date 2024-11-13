package it.timesheet.domain.data.utente;

import it.timesheet.domain.entity.RoleUser;

public record RegistrationData(String login, String password, RoleUser role, boolean status) {
}