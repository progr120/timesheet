import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Layout from './Layout';
import api from '../services/api';
import '../styles/DashboardStyle.css';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalActivities: 0,
        recentProjects: [],
        recentActivities: []
    });

    useEffect(() => {
        loadDashboardData();
    }, [user]);

    async function loadDashboardData() {
        try {
            const projectsResponse = await api.get(`/proggeto/${user}`);
            const projects = projectsResponse.data;

            const detailsResponse = await api.get(`/proggeto/detail/${user}`);
            const projectsWithActivities = detailsResponse.data;

            const totalActivities = projectsWithActivities.reduce(
                (total, project) => total + (project.attivitaList?.length || 0),
                0
            );

            const allActivities = projectsWithActivities
                .flatMap(project => (project.attivitaList || [])
                    .map(activity => ({
                        ...activity,
                        proggetoNome: project.nomeProggeto
                    })))
                .sort((a, b) => new Date(`1970-01-01T${b.dataInizio}`) - new Date(`1970-01-01T${a.dataInizio}`))
                .slice(0, 5);

            const recentProjects = projects.slice(-5).map(project => {
                const projectWithActivities = projectsWithActivities.find(p => p.id === project.id);
                const totalHours = calculateTotalHours(projectWithActivities?.attivitaList || []);
                return {
                    ...project,
                    totalHours
                };
            });

            setStats({
                totalProjects: projects.length,
                totalActivities: totalActivities,
                recentProjects: recentProjects,
                recentActivities: allActivities
            });
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        }
    }

    const dateInicioTemplate = (rowData) => {
        return rowData.dataInizio.substring(0, 5);
    };

    const dateFimTemplate = (rowData) => {
        return rowData.dataFine.substring(0, 5);
    };

    function calculateHoursDifference(dataInizio, dataFine) {
        const [hoursInizio, minutesInizio] = dataInizio.split(':').map(Number);
        const [hoursFine, minutesFine] = dataFine.split(':').map(Number);

        const totalMinutes = (hoursFine * 60 + minutesFine) - (hoursInizio * 60 + minutesInizio);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    }

    function calculateTotalHours(activities) {
        const totalMinutes = activities.reduce((total, activity) => {
            const [hoursInizio, minutesInizio] = activity.dataInizio.split(':').map(Number);
            const [hoursFine, minutesFine] = activity.dataFine.split(':').map(Number);
            return total + ((hoursFine * 60 + minutesFine) - (hoursInizio * 60 + minutesInizio));
        }, 0);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    }

    const durationTemplate = (rowData) => {
        return calculateHoursDifference(rowData.dataInizio, rowData.dataFine);
    };

    return (
        <Layout>
            <div className="dashboard-container">
                <h1>Dashboard</h1>

                <div className="stats-grid">
                    <Card title="Totale Progetti" className="stats-card">
                        <h2>{stats.totalProjects}</h2>
                    </Card>

                    <Card title="Totale Attività" className="stats-card">
                        <h2>{stats.totalActivities}</h2>
                    </Card>
                </div>

                <div className="dashboard-content">
                    <div className="overview-section">
                        <h1>Panoramica</h1>
                        <Panel className="overview-panel">
                            <div className="overview-stats">
                                <div className="stat-item">
                                    <i className="pi pi-folder" style={{ fontSize: '2rem', color: '#42A5F5' }}></i>
                                    <div className="stat-details">
                                        <span className="stat-label">Progetti</span>
                                        <span className="stat-value">{stats.totalProjects}</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <i className="pi pi-calendar" style={{ fontSize: '2rem', color: '#66BB6A' }}></i>
                                    <div className="stat-details">
                                        <span className="stat-label">Attività</span>
                                        <span className="stat-value">{stats.totalActivities}</span>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    <div className="tables-section">
                        <Card title="Progetti Recenti">
                            <DataTable value={stats.recentProjects} rows={5}>
                                <Column field="nomeProggeto" header="Nome" />
                                <Column field="descrizione" header="Descrizione" />
                                <Column field="totalHours" header="Ore Totali" />
                            </DataTable>
                        </Card>

                        <Card title="Attività Recenti">
                            <DataTable value={stats.recentActivities} rows={5}>
                                <Column field="proggetoNome" header="Progetto" />
                                <Column field="dataInizio" header="Ora Inizio" body={dateInicioTemplate} />
                                <Column field="dataFine" header="Ora Fine" body={dateFimTemplate} />
                                <Column field="duration" header="Durata" body={durationTemplate} />
                            </DataTable>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}