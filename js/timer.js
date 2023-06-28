const timeUnits = ["day", "hr", "min", "sec"]

const dailyTimersData = [
    {
        title: "DAILY RESET",
        timerId: "timer-daily",
        resetTime: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
    }
];

const weeklyTimersData = [
    {
        title: "WEEKLY RESET",
        timerId: "timer-weekly",
        resetTime: new Date(Date.UTC(0, 0, 1, 0, 0, 0)) // UTC Monday 00:00:00
    },
    {
        title: "BOSS RESET",
        timerId: "timer-boss",
        resetTime: new Date(Date.UTC(0, 0, 4, 0, 0, 0)) // UTC Thursday 00:00:00
    }
];

const timersContainer = document.getElementById("timers");

function appendTimer(timerData) {
    // create single timer container
    const timerContainer = document.createElement("div");
    timerContainer.id = timerData.timerId;
    timerContainer.classList.add("timer");
    timersContainer.appendChild(timerContainer);

    // create timer label grid
    const timerLabel = document.createElement("div");
    timerLabel.classList.add("timer-label");
    timerLabel.innerHTML = `
      <span class="timer-title">${timerData.title}</span>
      <span class="time-left-label">&#128338; Time Left:</span>
    `;
    timerContainer.appendChild(timerLabel);

    // create timer display to hold time countdown
    const timerDisplay = document.createElement("div");
    timerDisplay.classList.add("timer-display");
    timerContainer.appendChild(timerDisplay);

    // create time values and units to timer display
    timeUnits.forEach((unit) => {
        const timeValue = document.createElement("span");
        timeValue.classList.add("time-value");
        timeValue.style.display = "inline";
        timeValue.textContent = "00";

        const timeUnit = document.createElement("span");
        timeUnit.classList.add("time-unit");
        timeUnit.style.display = "inline";
        timeUnit.textContent = unit;

        timerDisplay.appendChild(timeValue);
        timerDisplay.appendChild(timeUnit);
    });
}

function getTimeUntilDate(date) {
    const now = new Date();
    const targetDate = new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ));
    const diff = targetDate - Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
    );
    const seconds = Math.floor(diff / 1000 % 60);
    const minutes = Math.floor(diff / 1000 / 60 % 60);
    const hours = Math.floor(diff / 1000 / 60 / 60 % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return { days, hours, minutes, seconds };
}

function getNextOccurrence(date) {
    const now = new Date();
    const daysLeft = (date.getUTCDay() + 7 - now.getUTCDay()) % 7;
    const nextOccurrence = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + daysLeft,
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ));
    return nextOccurrence;
}

function formatUnits(timeValues, timeUnits, largestUnit) {
    // 0 = days
    // 1 = hours
    // 2 = minutes

    switch (largestUnit) {
        case 0:
            // show days
            timeValues[0].style.display = "inline";
            timeUnits[0].style.display = "inline";
            // show hours
            timeValues[1].style.display = "inline";
            timeUnits[1].style.display = "inline";
            if (timeValues[1].textContent.length === 1) {
                timeValues[1].textContent = "0" + timeValues[1].textContent;
            }
            // hide minutes
            timeValues[2].style.display = "none";
            timeUnits[2].style.display = "none";
            // hide seconds
            timeValues[3].style.display = "none";
            timeUnits[3].style.display = "none";

            break;

        case 1:
            // hide days
            timeValues[0].style.display = "none";
            timeUnits[0].style.display = "none";
            // show hours
            timeValues[1].style.display = "inline";
            timeUnits[1].style.display = "inline";
            // show minutes
            timeValues[2].style.display = "inline";
            timeUnits[2].style.display = "inline";
            if (timeValues[2].textContent.length === 1) {
                timeValues[2].textContent = "0" + timeValues[2].textContent;
            }
            // hide seconds
            timeValues[3].style.display = "none";
            timeUnits[3].style.display = "none";

            break;

        case 2:
            // hide days
            timeValues[0].style.display = "none";
            timeUnits[0].style.display = "none";
            // hide hours
            timeValues[1].style.display = "none";
            timeUnits[1].style.display = "none";
            // show minutes
            timeValues[2].style.display = "inline";
            timeUnits[2].style.display = "inline";
            // show seconds
            timeValues[3].style.display = "inline";
            timeUnits[3].style.display = "inline";
            if (timeValues[3].textContent.length === 1) {
                timeValues[3].textContent = "0" + timeValues[3].textContent;
            }

            break;
    }
}

function updateTimer(timerData, timings) {
    const timer = document.getElementById(timerData.timerId);
    const timeValues = timer.querySelectorAll("span.time-value");
    const timeUnits = timer.querySelectorAll("span.time-unit");

    timeValues[0].textContent = timings.days;
    timeValues[1].textContent = timings.hours;
    timeValues[2].textContent = timings.minutes;
    timeValues[3].textContent = timings.seconds;

    if (timings.days > 0) {
        formatUnits(timeValues, timeUnits, 0)
    } else if (timings.hours > 0) {
        formatUnits(timeValues, timeUnits, 1)
    } else {
        formatUnits(timeValues, timeUnits, 2)
    }
}

function updateDailyTimers() {
    dailyTimersData.forEach(timerData => {
        const nextReset = getNextOccurrence(timerData.resetTime);

        const now = new Date();
        nextReset.setUTCFullYear(now.getUTCFullYear());
        nextReset.setUTCMonth(now.getUTCMonth());
        nextReset.setUTCDate(now.getUTCDate() + 1);

        const timings = getTimeUntilDate(nextReset);
        updateTimer(timerData, timings);
    })
}

function updateWeeklyTimers() {
    weeklyTimersData.forEach(timerData => {
        const nextReset = getNextOccurrence(timerData.resetTime);
        const timings = getTimeUntilDate(nextReset);
        updateTimer(timerData, timings);
    })
}

function updateTimers() {
    updateDailyTimers();
    updateWeeklyTimers();
}

document.addEventListener("DOMContentLoaded", function () {
    dailyTimersData.forEach(timerData => appendTimer(timerData));
    weeklyTimersData.forEach(timerData => appendTimer(timerData));
    updateTimers();
    setInterval(updateTimers, 1000);
});