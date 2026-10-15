const API_BASE_URL = 'http://localhost:8000/api';

let accessToken = null;
let refreshToken = null;

async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });


    if (!response.ok) {
        throw new Error('Login failed: Usuario o contraseña incorrectos');
    }

    const data = await response.json();
    accessToken = data.access;
    refreshToken = data.refresh;
    return data;
}

function getAccessToken() {
    return accessToken;
}

async function refreshAccessToken() {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Sesion expirada. Por favor, inicia sesión nuevamente.');
    }

    const data = await response.json();
    accessToken = data.access;
    refreshToken = data.refresh || refreshToken;
}

async function authFetch(url, options = {}) {
    const makeRequest = () => fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    let response = await makeRequest();

    if (response.status === 401) {
        await refreshAccessToken();
        response = await makeRequest();
    }

    return response;
}

async function createTask(taskData) {
    const response = await authFetch(`${API_BASE_URL}/tasks/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error("No se pudo crear la tarea");
    }

    return await response.json();
}

async function getTasks() {
    const response = await authFetch(`${API_BASE_URL}/tasks/`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("No se pudieron obtener las tareas");
    }

    return await response.json();
}

async function completeTask(taskId) {
    const response = await authFetch(`${API_BASE_URL}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
    });

    if (!response.ok) {
        throw new Error("No se pudo completar la tarea");
    }

    return await response.json();
}

async function deleteTask(taskId) {
    const response = await authFetch(`${API_BASE_URL}/tasks/${taskId}/`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar la tarea");
    }

    return true;
}

async function markReminded(taskId) {
    const response = await authFetch(`${API_BASE_URL}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ last_reminded_at: new Date().toISOString() }),
    });

    if (!response.ok) {
        throw new Error("No se pudo marcar la tarea como recordada");
    }

    return await response.json();
}

module.exports = {
    login,
    getAccessToken,
    createTask,
    getTasks,
    completeTask,
    deleteTask,
    markReminded
};

