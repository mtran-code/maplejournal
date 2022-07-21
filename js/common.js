// return random integer within specified range
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var buffer = 0; // used in checkOff function

function checkOff(elid) {
    let element = document.getElementById(elid);
    let image = document.getElementById("stamp_" + elid);

    // if button is already stamped, reset it to unstamped
    if (element.classList.contains("checked")) {
        resetButton(elid);
    }
    // if button is not stamped, stamp it
    else {
        element.classList.toggle("checked");
        image.style.opacity = 1;

        // ====== STAMP ANIMATION CODE ======

        let theta = getRndInteger(-60, 60) * Math.PI / 180; // randomly rotate stamp by theta radians
        let newAnim = document.createElement("style");
        // buffer: store up to 5 numbered animations at once
        buffer += 1;
        if (buffer > 5) {
            buffer = 1;
        }
        newAnim.id = "anim" + buffer;
        if (document.getElementById(newAnim.id)) { // overwrite older animations from buffer
            document.head.removeChild(document.getElementById(newAnim.id));
        }
        // insert animation css
        newAnim.innerHTML = "\
            .stampInAnim" + buffer + " {\
                animation: stampInAnim" + buffer + " 150ms forwards;\
                opacity: 1;\
            }\
            @keyframes stampInAnim" + buffer + " {\
                0% {\
                    transform: matrix(1.5, 0, 0, 1.5, 0, -32);\
                    opacity: 0;\
                }\
                100% {\
                    transform: matrix(" + Math.cos(theta) + ", " + Math.sin(theta) + ", " + Math.sin(theta) * -1 + ", " + Math.cos(theta) + ", 0, 0);\
                    opacity: 1;\
                }\
            }\
        "
        document.head.appendChild(newAnim);
        image.classList.remove(...image.classList); // clear residual classes
        void image.offsetWidth;
        image.classList.add("stampInAnim" + buffer);
        image.addEventListener("animationend",
            function () {
                image.classList.remove("stampInAnim" + buffer);
                image.style.transform = "matrix(" + Math.cos(theta) + ", " + Math.sin(theta) + ", " + Math.sin(theta) * -1 + ", " + Math.cos(theta) + ", 0, 0)";
            }
        ) // set static image after animation ends
    }
}

// toggle quest bulb completion
function turnIn(elid) {
    let element = document.getElementById(elid);
    element.classList.toggle("turnedin");
}

// toggle dev buttons
function showDev() {
    let element = document.getElementById("devButtons");
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}