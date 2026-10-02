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

async function createTask(taskData) {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error("No se pudo crear la tarea");
    }

    return await response.json();
}

async function getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("No se pudieron obtener las tareas");
    }

    return await response.json();
}

async function completeTask(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ completed: true }),
    });

    if (!response.ok) {
        throw new Error("No se pudo completar la tarea");
    }

    return await response.json();
}

async function deleteTask(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar la tarea");
    }

    return true;
}

async function test() {
    await login("Jonnmp", "Bx20070225");
    const resultado = await deleteTask(2);
    console.log("Tarea eliminada:", resultado);
    const tareas = await getTasks();
    console.log("Tareas restantes:", tareas);
}

test();

module.exports = {
    login,
    getAccessToken,
    createTask,
    getTasks,
    completeTask,
    deleteTask
};


