module.exports = {
    currentDate(task) {
        const today = new Date();
        return task.date.getDate() === today.getDate()
            && task.date.getMonth() === today.getMonth()
            && task.date.getFullYear() === today.getFullYear();
    },
    currentDay(days) {
        let isToday = false;
        const today = new Date();
        days.forEach(value => {
            if (parseInt(value.day) === today.getDay()) {
                isToday = true;
            }
        })
        return isToday;
    }
}