// reset button to unstamped state
function resetButton(elid) {
    let element = document.getElementById(elid);
    let image = document.getElementById("stamp_" + elid);
    if (element.classList.contains("checked")) {
        element.classList.toggle("checked");
        image.classList.remove(...image.classList);
        image.style.opacity = 0;
    }
}

// reset quest bulb to incomplete
function resetQuest(elid) {
    let element = document.getElementById(elid);
    if (element.classList.contains("turnedin")) {
        element.classList.toggle("turnedin");
    }
}

// reset all buttons/quests within specified section
function resetAll(type) {
    if (type == "daily_boss") {
        for (let i = 0; i < BOSS_DAILY.length; i++) {
            resetButton(BOSS_DAILY[i]);
        }
    } else if (type == "weekly_boss") {
        for (let i = 0; i < BOSS_WEEKLY.length; i++) {
            resetButton(BOSS_WEEKLY[i]);
        }
    } else if (type == "arcane") {
        for (let i = 0; i < ARCANE.length; i++) {
            resetButton(ARCANE[i]);
        }
    } else if (type == "daily_quest") {
        for (let i = 0; i < QUEST_DAILY.length; i++) {
            resetButton(QUEST_DAILY[i]);
        }
    } else if (type == "weekly_quest") {
        for (let i = 0; i < QUEST_WEEKLY.length; i++) {
            resetButton(QUEST_WEEKLY[i]);
        }
    } else {
        return;
    }
}