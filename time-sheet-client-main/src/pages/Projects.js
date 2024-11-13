import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';
import Layout from '../components/Layout';
import api from '../services/api';
import '../styles/ProjectsStyle.css';
import { useAuth } from '../contexts/AuthContext';

export default function Projects() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [projectData, setProjectData] = useState({
        id: null,
        idUtente: null,
        nomeProggeto: '',
        descrizione: ''
    });

    useEffect(() => {
        if (user) {
            loadProjects();
        }
    }, [user]);

    useEffect(() => {
        console.log('User from AuthContext:', user);
        console.log('Projects:', projects);
    }, [user, projects]);

    async function loadProjects() {
        try {
            const response = await api.get(`/proggeto/${user}`);
            console.log('Dados recebidos:', response.data);
            setProjects(response.data);
        } catch (error) {
            console.error('Errore nel caricamento dei progetti:', error);
        }
    }

    async function handleSubmit() {
        try {
            if (editMode) {
                await api.put('/proggeto', {
                    id: projectData.id,
                    idUtente: projectData.idUtente,
                    nomeProggeto: projectData.nomeProggeto,
                    descrizione: projectData.descrizione
                });
            } else {
                await api.post('/proggeto', {
                    idUtente: user,
                    nomeProggeto: projectData.nomeProggeto,
                    descrizione: projectData.descrizione
                });
            }
            setVisible(false);
            loadProjects();
            resetForm();
        } catch (error) {
            console.error('Errore nel salvare il progetto:', error);
        }
    }

    function resetForm() {
        setProjectData({
            id: null,
            idUtente: null,
            nomeProggeto: '',
            descrizione: ''
        });
        setEditMode(false);
    }

    function handleEdit(project) {
        setProjectData({
            id: project.id,
            idUtente: project.idUtente,
            nomeProggeto: project.nomeProggeto,
            descrizione: project.descrizione
        });
        setEditMode(true);
        setVisible(true);
    }

    function handleDelete(id) {
        confirmDialog({
            message: 'Sei sicuro di voler eliminare questo progetto?',
            header: 'Conferma eliminazione',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await api.delete(`/proggeto/${id}`);
                    loadProjects();
                } catch (error) {
                    console.error('Errore durante l\'eliminazione del progetto:', error);
                }
            }
        });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => handleEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        );
    };

    return (
        <Layout>
            <div className="common-container">
                <div className="common-header">
                    <h1>Progetti</h1>
                    <Button
                        icon="pi pi-plus"
                        className="p-button-rounded p-button-primary"
                        onClick={() => {
                            resetForm();
                            setVisible(true);
                        }}
                    />
                </div>

                {projects && projects.length > 0 ? (
                    <DataTable 
                        value={projects} 
                        emptyMessage="Nessun progetto trovato"
                        className="p-datatable-striped"
                    >
                        <Column 
                            field="nomeProggeto" 
                            header="Nome" 
                        />
                        <Column 
                            field="descrizione" 
                            header="Descrizione" 
                        />
                        <Column 
                            body={actionBodyTemplate} 
                            header="Azioni" 
                            style={{ width: '120px', textAlign: 'center' }} 
                        />
                    </DataTable>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        Nessun progetto trovato
                    </div>
                )}

                <Dialog
                    header={editMode ? "Modifica Progetto" : "Nuovo Progetto"}
                    visible={visible}
                    style={{ width: '50vw' }}
                    modal
                    onHide={() => {
                        setVisible(false);
                        resetForm();
                    }}
                >
                    <div className="project-form">
                        <div className="field" style={{ marginBottom: '1rem' }}>
                            <label htmlFor="nomeProggeto" style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Nome del Progetto
                            </label>
                            <InputText
                                id="nomeProggeto"
                                value={projectData.nomeProggeto}
                                onChange={(e) => setProjectData({ ...projectData, nomeProggeto: e.target.value })}
                                className="w-full"
                            />
                        </div>

                        <div className="field" style={{ marginBottom: '1rem' }}>
                            <label htmlFor="descrizione" style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Descrizione
                            </label>
                            <InputText
                                id="descrizione"
                                value={projectData.descrizione}
                                onChange={(e) => setProjectData({ ...projectData, descrizione: e.target.value })}
                                className="w-full"
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                            <Button 
                                label="Annulla" 
                                icon="pi pi-times" 
                                className="p-button-text" 
                                onClick={() => {
                                    setVisible(false);
                                    resetForm();
                                }}
                            />
                            <Button 
                                label="Salva" 
                                icon="pi pi-check" 
                                onClick={handleSubmit} 
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        </Layout>
    );
}