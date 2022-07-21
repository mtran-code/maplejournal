// ====== COUNTDOWN TIMER CODE ======
setInterval(function () {
    let now = new Date(); // get current time

    let daily_reset = new Date();
    daily_reset.setUTCHours(24, 0, 0, 0); // get next daily reset time

    let daily_distance = daily_reset.getTime() - now.getTime(); // get time until reset

    // split and convert from ms to units
    let d_days = Math.floor(daily_distance / (1000 * 60 * 60 * 24));
    let d_hours = Math.floor((daily_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let d_minutes = Math.floor((daily_distance % (1000 * 60 * 60)) / (1000 * 60));
    let d_seconds = Math.floor((daily_distance % (1000 * 60)) / 1000);

    // reset buttons and quests on reset
    if (d_days == 0 &&
        d_hours == 0 &&
        d_minutes == 0 &&
        d_seconds == 0) {
        resetAll("daily_boss");
        resetAll("arcane");
        resetAll("daily_quest");
    }

    if (d_hours > 0) { // when hours left > 0, format: hh:mm
        if (d_minutes < 10) {
            d_minutes = "0" + String(d_minutes);
        } // change single digit format (1 -> 01)

        // hide/show units
        document.getElementById("daily_hr").style.display = "inline";
        document.getElementById("daily_hr_unit").style.display = "inline";
        document.getElementById("daily_sec").style.display = "none";
        document.getElementById("daily_sec_unit").style.display = "none";

        document.getElementById("daily_hr").innerHTML = d_hours;
        document.getElementById("daily_min").innerHTML = d_minutes;

    } else { // when hours left = 0, format: mm:ss
        if (d_seconds < 10) {
            d_seconds = "0" + String(d_seconds);
        } // change single digit format (1 -> 01)

        document.getElementById("daily_hr").style.display = "none";
        document.getElementById("daily_hr_unit").style.display = "none";
        document.getElementById("daily_sec").style.display = "inline";
        document.getElementById("daily_sec_unit").style.display = "inline";

        document.getElementById("daily_min").innerHTML = d_minutes;
        document.getElementById("daily_sec").innerHTML = d_seconds;
    }

    let weekly_reset = new Date();
    weekly_reset.setUTCHours(0, 0, 0, 0);
    let w_daysleft = ((8 - now.getUTCDay()) % 7); // get days until reset day
    if (w_daysleft == 0) {
        w_daysleft = 7;
    } // if current day reset, get next weeks reset
    weekly_reset.setUTCDate(weekly_reset.getUTCDate() + w_daysleft); // get next weekly reset time

    let weekly_distance = weekly_reset.getTime() - now.getTime();

    let w_days = Math.floor(weekly_distance / (1000 * 60 * 60 * 24));
    let w_hours = Math.floor((weekly_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let w_minutes = Math.floor((weekly_distance % (1000 * 60 * 60)) / (1000 * 60));
    let w_seconds = Math.floor((weekly_distance % (1000 * 60)) / 1000);

    if (w_days == 0 &&
        w_hours == 0 &&
        w_minutes == 0 &&
        w_seconds == 0) {
        resetAll("weekly_quest");
    }

    if (w_days > 0) {
        if (w_hours < 10) {
            w_hours = "0" + String(w_hours);
        }
        document.getElementById("weekly_day").style.display = "inline";
        document.getElementById("weekly_day_unit").style.display = "inline";
        document.getElementById("weekly_hr").style.display = "inline";
        document.getElementById("weekly_hr_unit").style.display = "inline";
        document.getElementById("weekly_min").style.display = "none";
        document.getElementById("weekly_min_unit").style.display = "none";
        document.getElementById("weekly_sec").style.display = "none";
        document.getElementById("weekly_sec_unit").style.display = "none";

        document.getElementById("weekly_day").innerHTML = w_days;
        document.getElementById("weekly_hr").innerHTML = w_hours;

    } else if (w_hours > 0) {
        if (w_minutes < 10) {
            w_minutes = "0" + String(w_minutes);
        }
        document.getElementById("weekly_day").style.display = "none";
        document.getElementById("weekly_day_unit").style.display = "none";
        document.getElementById("weekly_hr").style.display = "inline";
        document.getElementById("weekly_hr_unit").style.display = "inline";
        document.getElementById("weekly_min").style.display = "inline";
        document.getElementById("weekly_min_unit").style.display = "inline";
        document.getElementById("weekly_sec").style.display = "none";
        document.getElementById("weekly_sec_unit").style.display = "none";

        document.getElementById("weekly_hr").innerHTML = w_hours;
        document.getElementById("weekly_min").innerHTML = w_minutes;

    } else {
        if (w_seconds < 10) {
            w_seconds = "0" + String(w_seconds);
        }
        document.getElementById("weekly_day").style.display = "none";
        document.getElementById("weekly_day_unit").style.display = "none";
        document.getElementById("weekly_hr").style.display = "none";
        document.getElementById("weekly_hr_unit").style.display = "none";
        document.getElementById("weekly_min").style.display = "inline";
        document.getElementById("weekly_min_unit").style.display = "inline";
        document.getElementById("weekly_sec").style.display = "inline";
        document.getElementById("weekly_sec_unit").style.display = "inline";

        document.getElementById("weekly_min").innerHTML = w_minutes;
        document.getElementById("weekly_sec").innerHTML = w_seconds;
    }

    let boss_reset = new Date();
    boss_reset.setUTCHours(0, 0, 0, 0);
    let b_daysleft = ((11 - now.getUTCDay()) % 7); // get days until reset day
    if (b_daysleft == 0) {
        b_daysleft = 7;
    } // if current day reset, get next weeks reset
    boss_reset.setUTCDate(boss_reset.getUTCDate() + b_daysleft);

    let boss_distance = boss_reset.getTime() - now.getTime();

    let b_days = Math.floor(boss_distance / (1000 * 60 * 60 * 24));
    let b_hours = Math.floor((boss_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let b_minutes = Math.floor((boss_distance % (1000 * 60 * 60)) / (1000 * 60));
    let b_seconds = Math.floor((boss_distance % (1000 * 60)) / 1000);

    if (b_days == 0 &&
        b_hours == 0 &&
        b_minutes == 0 &&
        b_seconds == 0) {
        resetAll("weekly_boss");
    }

    if (b_days > 0) {
        if (b_hours < 10) {
            b_hours = "0" + String(b_hours);
        }
        document.getElementById("boss_day").style.display = "inline";
        document.getElementById("boss_day_unit").style.display = "inline";
        document.getElementById("boss_hr").style.display = "inline";
        document.getElementById("boss_hr_unit").style.display = "inline";
        document.getElementById("boss_min").style.display = "none";
        document.getElementById("boss_min_unit").style.display = "none";
        document.getElementById("boss_sec").style.display = "none";
        document.getElementById("boss_sec_unit").style.display = "none";

        document.getElementById("boss_day").innerHTML = b_days;
        document.getElementById("boss_hr").innerHTML = b_hours;
    } else if (b_hours > 0) {
        if (b_minutes < 10) {
            b_minutes = "0" + String(b_minutes);
        }
        document.getElementById("boss_day").style.display = "none";
        document.getElementById("boss_day_unit").style.display = "none";
        document.getElementById("boss_hr").style.display = "inline";
        document.getElementById("boss_hr_unit").style.display = "inline";
        document.getElementById("boss_min").style.display = "inline";
        document.getElementById("boss_min_unit").style.display = "inline";
        document.getElementById("boss_sec").style.display = "none";
        document.getElementById("boss_sec_unit").style.display = "none";

        document.getElementById("boss_hr").innerHTML = b_hours;
        document.getElementById("boss_min").innerHTML = b_minutes;
    } else {
        if (b_seconds < 10) {
            b_seconds = "0" + String(b_seconds);
        }
        document.getElementById("boss_day").style.display = "none";
        document.getElementById("boss_day_unit").style.display = "none";
        document.getElementById("boss_hr").style.display = "none";
        document.getElementById("boss_hr_unit").style.display = "none";
        document.getElementById("boss_min").style.display = "inline";
        document.getElementById("boss_min_unit").style.display = "inline";
        document.getElementById("boss_sec").style.display = "inline";
        document.getElementById("boss_sec_unit").style.display = "inline";

        document.getElementById("boss_min").innerHTML = b_minutes;
        document.getElementById("boss_sec").innerHTML = b_seconds;
    }
}, 1000); // repeat every second