function adaptApiTask(apiTask) {
    return {
        id: apiTask.id,
        text: apiTask.text,
        createdAt: apiTask.created_at,
        reminder: apiTask.reminder_at,
        reminderMinutes: apiTask.reminder_minutes,
        reminderInterval: apiTask.reminder_interval,
        completed: apiTask.completed,
        reminderFinal: apiTask.last_reminded_at,
    };
}

module.exports = {
    adaptApiTask,
};