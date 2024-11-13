import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { confirmDialog } from 'primereact/confirmdialog';
import Layout from '../components/Layout';
import api from '../services/api';
import '../styles/ActivitiesStyle.css';
import { useAuth } from '../contexts/AuthContext';

export default function Activities() {
    const { user } = useAuth();
    const [activities, setActivities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [activityData, setActivityData] = useState({
        id: null,
        idProggeto: null,
        dataInizio: null,
        dataFine: null
    });

    useEffect(() => {
        if (user) {
            loadProjects();
            loadActivities();
        }
    }, [user]);

    async function loadActivities() {
        try {
            const response = await api.get('/attivita');
            setActivities(response.data);
        } catch (error) {
            console.error('Errore nel caricamento delle attività:', error);
        }
    }

    async function loadProjects() {
        try {
            const response = await api.get(`/proggeto/${user}`);
            setProjects(response.data);
        } catch (error) {
            console.error('Errore nel caricamento dei progetti:', error);
        }
    }

    async function handleSubmit() {
        try {
            if (editMode) {
                await api.put('/attivita', activityData);
            } else {
                await api.post('/attivita', activityData);
            }
            setVisible(false);
            loadActivities();
            resetForm();
        } catch (error) {
            console.error('Errore nel salvare l\'attività:', error);
        }
    }

    function resetForm() {
        setActivityData({
            id: null,
            idProggeto: null,
            dataInizio: null,
            dataFine: null
        });
        setEditMode(false);
    }

    const timeTemplate = (rowData, field) => {
        const time = rowData[field];
        return time ? time.substring(0, 5) : '';
    };

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

    function handleEdit(activity) {
        setActivityData({
            id: activity.id,
            idProggeto: activity.idProggeto,
            dataInizio: activity.dataInizio,
            dataFine: activity.dataFine
        });
        setEditMode(true);
        setVisible(true);
    }

    function handleDelete(id) {
        confirmDialog({
            message: 'Sei sicuro di voler eliminare questa attività?',
            header: 'Conferma eliminazione',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await api.delete(`/attivita/${id}`);
                    loadActivities();
                } catch (error) {
                    console.error('Errore durante l\'eliminazione dell\'attività:', error);
                }
            }
        });
    }

    return (
        <Layout>
            <div className="common-container">
                <div className="common-header">
                    <h1>Attività</h1>
                    <Button
                        icon="pi pi-plus"
                        className="p-button-rounded"
                        onClick={() => {
                            resetForm();
                            setVisible(true);
                        }}
                    />
                </div>

                {activities && activities.length > 0 ? (
                    <DataTable
                        value={activities}
                        emptyMessage="Nessuna attività trovata"
                    >
                        <Column field="idProggeto" header="Progetto"
                            body={(rowData) => {
                                const project = projects.find(p => p.id === rowData.idProggeto);
                                return project ? project.nomeProggeto : '';
                            }}
                        />
                        <Column field="dataInizio" header="Ora Inizio"
                            body={(rowData) => timeTemplate(rowData, 'dataInizio')}
                        />
                        <Column field="dataFine" header="Ora Fine"
                            body={(rowData) => timeTemplate(rowData, 'dataFine')}
                        />
                        <Column body={actionBodyTemplate} header="Azioni" style={{ width: '120px' }} />
                    </DataTable>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        Nessuna attività trovata
                    </div>
                )}

                <Dialog
                    header={editMode ? "Modifica Attività" : "Nuova Attività"}
                    visible={visible}
                    style={{ width: '50vw' }}
                    modal
                    onHide={() => {
                        setVisible(false);
                        resetForm();
                    }}
                >
                    <div className="activity-form">
                        <div className="field">
                            <label htmlFor="project">Progetto</label>
                            <Dropdown
                                id="project"
                                value={activityData.idProggeto}
                                options={projects}
                                onChange={(e) => setActivityData({ ...activityData, idProggeto: e.value })}
                                optionLabel="nomeProggeto"
                                optionValue="id"
                                placeholder="Seleziona un progetto"
                                className="w-full"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="dataInizio">Ora Inizio</label>
                            <Calendar
                                id="dataInizio"
                                value={activityData.dataInizio ? new Date(`2000-01-01T${activityData.dataInizio}`) : null}
                                onChange={(e) => {
                                    const time = e.value ? e.value.toTimeString().substring(0, 8) : null;
                                    setActivityData({ ...activityData, dataInizio: time });
                                }}
                                timeOnly
                                hourFormat="24"
                                className="w-full"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="dataFine">Ora Fine</label>
                            <Calendar
                                id="dataFine"
                                value={activityData.dataFine ? new Date(`2000-01-01T${activityData.dataFine}`) : null}
                                onChange={(e) => {
                                    const time = e.value ? e.value.toTimeString().substring(0, 8) : null;
                                    setActivityData({ ...activityData, dataFine: time });
                                }}
                                timeOnly
                                hourFormat="24"
                                className="w-full"
                            />
                        </div>

                        <div className="dialog-footer">
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