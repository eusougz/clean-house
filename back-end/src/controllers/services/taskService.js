module.exports = {
    currentDate(taskDate) {
        const today = new Date();
        return taskDate.substring(0,10) === today.toISOString().substring(0,10);
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