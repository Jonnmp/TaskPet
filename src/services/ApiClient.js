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

module.exports = {
    login,
    getAccessToken,
    createTask,
};

async function test() {
    await login("Jonnmp", "Bx20070225");
    const nuevaTarea = await createTask({ text: "Tarea creada via API desde Electron" });
    console.log("Tarea creada:", nuevaTarea);
}

test();
