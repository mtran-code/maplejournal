// reset button to unstamped state
function resetButton(elid) {
    let element = document.getElementById(elid);
    let image = document.getElementById("stamp_" + elid);
    if (element.classList.contains("checked")) {
        element.classList.toggle("checked");
        image.classList.remove(...image.classList);
        image.style.opacity = 0;

        image.classList.remove("stampInAnim");
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
        resetButton("dzak");
        resetButton("dmag");
        resetButton("dhilla");
        resetButton("dht");
        resetButton("dpap");
        resetButton("dvl");
        resetButton("dark");
        resetButton("dpb");
        resetButton("dpierre");
        resetButton("dvb");
        resetButton("dcqueen");
        resetButton("dvell");
        resetButton("dranmaru");
        resetButton("domnicln");
        resetButton("djulietta");
        resetButton("dgollux");

    } else if (type == "weekly_boss") {
        resetButton("whilla");
        resetButton("wpb");
        resetButton("wcyg");
        resetButton("wzak");
        resetButton("wpierre");
        resetButton("wvb");
        resetButton("wcqueen");
        resetButton("wvell");
        resetButton("wpno");
        resetButton("wmag");
        resetButton("wpap");
        resetButton("wakechi");
        resetButton("wlotus");
        resetButton("wdamien");
        resetButton("wlucid");
        resetButton("wwill");
        resetButton("wgloom");
        resetButton("wdnell");
        resetButton("wvhilla");
        resetButton("wseren");

    } else if (type == "arcane") {
        resetButton("vj");
        resetButton("vjpq");
        resetButton("chuchu");
        resetButton("chuchupq");
        resetButton("lach");
        resetButton("lachpq");
        resetButton("arcana");
        resetButton("arcanapq");
        resetButton("morass");
        resetButton("morasspq");
        resetButton("esfera");
        resetButton("esferapq");

    } else if (type == "daily_quest") {
        resetQuest("bulb_fairybros");
        resetQuest("bulb_legion");
        resetQuest("bulb_ursus");
        resetQuest("bulb_mapletour");
        resetQuest("bulb_commerci");
        resetQuest("bulb_monsterpark");
        resetQuest("bulb_yugarden");
        resetQuest("bulb_phantomforest");

    } else if (type == "weekly_quest") {
        resetQuest("bulb_guild");
        resetQuest("bulb_dojo");
        resetQuest("bulb_scrapyard");
        resetQuest("bulb_worldtree");
        resetQuest("bulb_kritias");
    } else {
        return;
    }
}