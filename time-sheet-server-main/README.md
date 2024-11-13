<div align="center">
  <h1>🕒 Progetto TimeSheet</h1>
  <p>
    <img src="https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=java" alt="Java">
    <img src="https://img.shields.io/badge/Spring%20Boot-3.3.5-6DB33F?style=for-the-badge&logo=springboot" alt="Spring Boot">
    <img src="https://img.shields.io/badge/Spring%20Security-Authentication-6DB33F?style=for-the-badge&logo=springsecurity" alt="Spring Security">
    <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql" alt="MySQL">
    <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens" alt="JWT">
  </p>
</div>

<div align="center">
  <p>Un'applicazione per gestire attività e progetti, con funzionalità di registrazione e autenticazione degli utenti, oltre alla creazione e gestione di progetti e attività.</p>
</div>

---

## 📁 Struttura del Progetto

### 🎯 Controller REST

#### 🔐 AuthenticationController
- **Endpoint**:
  - `POST /login`: Autentica l'utente e genera un token JWT
  - `POST /register`: Registra un nuovo utente nel sistema

#### 📋 ProggetoController (`/proggeto`)
- **Endpoint**:
  - `POST /`: Crea un nuovo progetto
  - `GET /`: Recupera tutti i progetti
  - `PUT /`: Aggiorna un progetto esistente
  - `DELETE /{id}`: Elimina un progetto specifico
  - `GET /{id}`: Recupera progetti per ID utente
  - `GET /detail/{idUtente}`: Recupera progetti con attività per utente

#### ⚡ AttivitaController (`/attivita`)
- **Endpoint**:
  - `POST /`: Crea una nuova attività
  - `GET /`: Recupera tutte le attività
  - `PUT /`: Aggiorna un'attività esistente
  - `DELETE /{id}`: Elimina un'attività specifica
  - `GET /{id}`: Recupera attività per ID progetto

### 🛠 Servizi

#### AttivitaService
- Gestione delle operazioni CRUD per le attività
- Filtro delle attività per progetto

#### ProggetoService
- Gestione delle operazioni CRUD per i progetti
- Recupero progetti con attività associate

### 📊 Modelli di Dati

#### Entità
- `User`: Gestione degli utenti del sistema
- `Proggeto`: Gestione dei progetti
- `Attivita`: Gestione delle attività associate ai progetti

#### DTO (Data Transfer Objects)
- **Autenticazione**:
  - `AuthenticationData`: Dati per il login
  - `RegistrationData`: Dati per la registrazione
- **Progetto**:
  - `CreateDataProggeto`: Dati per la creazione
  - `UpdateDataProggeto`: Dati per l'aggiornamento
  - `ListDataProggeto`: Dati per la visualizzazione
- **Attività**:
  - `CreateDataAttivita`: Dati per la creazione
  - `UpdateDataAttivita`: Dati per l'aggiornamento
  - `ListDataAttivita`: Dati per la visualizzazione

### 🔒 Sicurezza
- Autenticazione basata su JWT
- Protezione degli endpoint con Spring Security
- Gestione dei ruoli utente

## 🚀 Come Eseguire

1. **Prerequisiti**:
   - Java 21
   - MySQL
   - Maven

2. **Configurazione**:
   - Clona il repository
   - Configura il database in `application.properties`
   - Assicurati che le porte necessarie siano disponibili

3. **Esecuzione**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

## 📜 Licenza

Questo progetto è sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.
