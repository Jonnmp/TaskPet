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

    console.log("Status: ", response.status);

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

module.exports = {
    login,
    getAccessToken,
};

login("Jonnmp", "Bx20070225").then(data => {                        
    console.log("Login exitoso, access token:", data.access.substring(0, 20) + "...");          
}).catch(err => console.error(err.message));
