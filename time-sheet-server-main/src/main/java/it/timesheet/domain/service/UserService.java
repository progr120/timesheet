package it.timesheet.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import it.timesheet.domain.data.utente.RegistrationData;
import it.timesheet.domain.entity.User;
import it.timesheet.domain.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void registerUser(RegistrationData registrationData) {
        String encodedPassword = passwordEncoder.encode(registrationData.password());

        User user = new User();
        user.setLogin(registrationData.login());
        user.setPassword(encodedPassword);
        user.setRole(registrationData.role());
        user.setStatus(registrationData.status());

        repository.save(user);
    }
}
