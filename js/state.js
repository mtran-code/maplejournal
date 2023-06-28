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
        if (buttonData && buttonData.timestamp) {
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
    }

    return null; // No stored data found
}

// Check if two timestamps are from different UTC days
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
    const buttonIds = [
        ...ARCANE,
        ...BOSS_DAILY,
        ...BOSS_WEEKLY
    ];

    const bulbIds = [
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

    bulbIds.forEach((elid) => {
        const storedState = getButtonState(elid);
        if (storedState === null) {
            // No stored state or from a previous day, perform initial setup
            resetButton(elid);
        } else {
            // Use the stored state
            if (storedState) {
                document.getElementById(elid).classList.toggle("turnedin");
            }
        }
    });
}


// Call the initialization function on page load
window.addEventListener("load", initializeButtonStates);
