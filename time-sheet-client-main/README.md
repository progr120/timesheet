<div align="center">
  <h1>🕒 Gestione TimeSheet</h1>
  <p>
    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/PrimeReact-10.5.1-6366F1?style=for-the-badge&logo=react" alt="PrimeReact">
    <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens" alt="JWT">
    <img src="https://img.shields.io/badge/Axios-1.6.7-5A29E4?style=for-the-badge&logo=axios" alt="Axios">
  </p>
</div>

<div align="center">
  <p>Un'applicazione web moderna per la gestione del tempo e delle attività, con un'interfaccia utente intuitiva e funzionalità complete per il tracciamento dei progetti e delle attività.</p>
</div>

---

## 📁 Struttura del Progetto

### 🎯 Componenti Principali

#### 🔐 Autenticazione
- **Funzionalità**:
  - Login con JWT
  - Registrazione utenti
  - Gestione sessioni
- **Componenti**:
  - `Login.js`: Gestione accesso utenti
  - `Register.js`: Registrazione nuovi utenti
  - `AuthContext.js`: Gestione stato autenticazione

#### 📋 Gestione Progetti
- **Funzionalità**:
  - Creazione e modifica progetti
  - Visualizzazione lista progetti
  - Eliminazione progetti
- **Componenti**:
  - `Projects.js`: Interfaccia gestione progetti
  - `ProjectForm.js`: Form creazione/modifica

#### ⚡ Gestione Attività
- **Funzionalità**:
  - Registrazione tempo attività
  - Associazione attività a progetti
  - Tracciamento ore lavorate
- **Componenti**:
  - `Activities.js`: Gestione attività
  - `ActivityForm.js`: Form inserimento attività

### 🛠 Servizi

#### API Service
- Configurazione Axios
- Gestione token JWT
- Intercettori richieste
- **Riferimento**: `services/api.js`

### 📊 Interfaccia Utente

#### Componenti UI
- PrimeReact per componenti moderni
- Layout responsivo
- Tema chiaro/scuro
- Gestione stati con Context API

#### Stili
- CSS modulare
- Tema personalizzabile
- Design responsivo
- Supporto modalità dark

## 🚀 Come Eseguire

1. **Prerequisiti**:
   - Node.js (versione recente)
   - npm o yarn
   - API backend attiva

2. **Configurazione**:
   ```bash
   git clone [repository-url]
   cd gestione-app
   npm install
   ```

3. **Sviluppo**:
   ```bash
   npm start
   ```

4. **Build Produzione**:
   ```bash
   npm run build
   ```

## 🔧 Configurazione

- Configurare l'URL dell'API in `src/services/api.js`
- Personalizzare il tema in `src/styles/Theme.css`
- Modificare le variabili d'ambiente nel file `.env`

## 📜 Licenza

Questo progetto è distribuito sotto licenza MIT - vedere il file [LICENSE](LICENSE) per i dettagli.
