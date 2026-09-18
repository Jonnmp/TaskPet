const ical = require("node-ical");
const fs = require("fs");
const path = require("path");

const calendarPath = path.join(__dirname, "../../calendar-config.json");

async function syncCalendar() {
    const configData = fs.readFileSync(calendarPath, "utf-8");
    const config = JSON.parse(configData)
    const events = await ical.async.fromURL(config.icsURL)
    console.log(events);
    const eventsArray = Object.values(events);
    const filteredEvents = (eventsArray.filter(event =>  event.type === "VEVENT" && !event.summary.includes("Asistencia")))
    console.log(filteredEvents)
}

syncCalendar();