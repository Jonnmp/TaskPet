const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../taskpet-data.json");

function saveWindowPosition(position) {
    fs.writeFileSync(
        dataPath,
        JSON.stringify(position, null, 2)
    );
}

function getWindowPosition() {
    try {
        if (fs.existsSync(dataPath)) {
            const data = fs.readFileSync(dataPath, "utf-8");
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Error reading saved position:", error);
    }

    return null;
}

module.exports = {
    saveWindowPosition,
    getWindowPosition
};