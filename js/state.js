function storeButtonState(elid, state) {
    const currentTime = new Date().getTime();
    const buttonData = {
        state: state,
        timestamp: currentTime
    };
    localStorage.setItem(elid, JSON.stringify(buttonData));
}

// Retrieve button state and check if it's from a previous day
function getButtonState(elid) {
    const storedData = localStorage.getItem(elid);
    if (storedData) {
        const buttonData = JSON.parse(storedData);
        const storedTime = buttonData.timestamp;
        const currentTime = new Date().getTime();
        const isPreviousDay = isDifferentDay(storedTime, currentTime);

        if (isPreviousDay) {
            // Ignore the stored data from a previous day
            localStorage.removeItem(elid);
            return null;
        }

        // Return the button state
        return buttonData.state;
    }

    return null; // No stored data found
}

// Check if two timestamps are from different days
function isDifferentDay(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    return (
        date1.getUTCFullYear() !== date2.getUTCFullYear() ||
        date1.getUTCMonth() !== date2.getUTCMonth() ||
        date1.getUTCDate() !== date2.getUTCDate()
    );
}

function initializeButtonStates() {
    for (let i = 0; i < ARCANE.length; i++) {
        let elid = ARCANE[i];
        let element = document.getElementById(elid);

        // Retrieve the button state from localStorage
        let state = localStorage.getItem(elid);

        if (state === "checked") {
            element.classList.add("checked");
            let image = document.getElementById("stamp_" + elid);
            image.style.opacity = 1;
        }
    }
}

function initializeButtonStates() {
    const buttonIds = [
        ...ARCANE,
        ...BOSS_DAILY,
        ...BOSS_WEEKLY,
        ...QUEST_DAILY,
        ...QUEST_WEEKLY
    ];

    buttonIds.forEach((elid) => {
        const storedState = getButtonState(elid);
        if (storedState === null) {
            // No stored state or from a previous day, perform initial setup
            resetButton(elid);
        } else {
            // Use the stored state
            if (storedState) {
                checkOff(elid, true);
            }
        }
    });
}


// Call the initialization function on page load
window.addEventListener("load", initializeButtonStates);
