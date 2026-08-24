const moods = {
    happy: [
        "Buen trabajo hoy",
        "Vamos bastante bien",
        "Pequeños avances tambien cuentan"
    ],

    sleepy: [
        "Creo que toca una pausa",
        "Llevas rato trabajando",
        "Un descanso corto tampoco hace daño"
    ],

    focused: [
        "Seguimos con esa tarea?",
        "Modo concentracion activado",
        "Una cosa a la vez"
    ],

    concerned: [
        "Oye, como van los pendientes?",
        "Creo que hay algo pendiente",
        "Vamos a revisar las tareas"
    ]
};

function getRandomMood() {

    const moodKeys = Object.keys(moods);

    const randomMood = moodKeys[Math.floor(Math.random() * moodKeys.length)];

    return randomMood;
}

function getMoodMessage() {
    const mood = getRandomMood();

    const messages = moods[mood];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return {
        mood,
        message: randomMessage
    };
}

module.exports = {
    getMoodMessage
};