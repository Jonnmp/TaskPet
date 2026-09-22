const {addTask, getTasks} = require ("./TaskManager.js");
const ical = require("node-ical");
const fs = require("fs");
const path = require("path");

const calendarPath = path.join(__dirname, "../../calendar-config.json");

async function syncCalendar() {
    const configData = fs.readFileSync(calendarPath, "utf-8");
    const config = JSON.parse(configData)
    const events = await ical.async.fromURL(config.icsURL)
    const eventsArray = Object.values(events);
    const filteredEvents = (eventsArray.filter(event =>  event.type === "VEVENT" && !event.summary.includes("Asistencia")))
    const existingTasks = getTasks();

    filteredEvents.forEach(event => {
        const yaExiste = existingTasks.some(task => task.id === event.uid);

        if (!yaExiste) {
            addTask({
                id: event.uid,
                text: event.summary,
                description: event.description,
                reminder: event.start
            });
        }
    });
    console.log(filteredEvents[0])
}

module.exports = { syncCalendar };
syncCalendar();
