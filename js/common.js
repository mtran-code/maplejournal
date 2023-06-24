// return random integer within specified range
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Encapsulate buffer variable in a function to create a closure
function createCheckOffFunction() {
    var buffer = 0; // used in checkOff function
    return function checkOff(elid, skipAnimation = false) {
        const element = document.getElementById(elid);
        const image = document.getElementById("stamp_" + elid);
        const newState = !element.classList.contains("checked");
        storeButtonState(elid, newState);

        // if button is already stamped, reset it to unstamped and exit
        if (element.classList.contains("checked")) {
            resetButton(elid);
            return;
        }

        // if button is not stamped, stamp it
        element.classList.add("checked");
        image.style.opacity = 1;

        // ====== STAMP ANIMATION CODE ======
        if (skipAnimation) {
            return;
        }

        let theta = getRndInteger(-60, 60) * Math.PI / 180; // randomly rotate stamp by theta radians

        let newAnim = document.createElement("style");
        // insert animation css
        newAnim.innerHTML = `
        .stampInAnim${buffer} {
            animation: stampInAnim${buffer} 150ms forwards;
            opacity: 1;
        }
        @keyframes stampInAnim${buffer} {
            0% {
                transform: matrix(1.5, 0, 0, 1.5, 0, -32);
                opacity: 0;
            }
            100% {
                transform: matrix(${Math.cos(theta)}, ${Math.sin(theta)}, ${Math.sin(theta) * -1}, ${Math.cos(theta)}, 0, 0);
                opacity: 1;
            }
        }
        `;
        // Remove older animations from the buffer
        if (document.getElementById(`anim${buffer}`)) {
            document.head.removeChild(document.getElementById(`anim${buffer}`));
        }

        // Add the animation style element to the document head
        document.head.appendChild(newAnim);

        // Apply the animation class to the image
        image.classList.remove(...image.classList); // Clear residual classes
        void image.offsetWidth;
        image.classList.add(`stampInAnim${buffer}`);

        // Listen for the animationend event to set static image after animation ends
        image.addEventListener("animationend", function () {
            image.classList.remove(`stampInAnim${buffer}`);
            image.style.transform = `matrix(${Math.cos(theta)}, ${Math.sin(theta)}, ${Math.sin(theta) * -1}, ${Math.cos(theta)}, 0, 0)`;
        });

        // Increment the buffer value
        buffer = (buffer + 1) % 30; // Limit buffer to values 0-5
    };
}
// Use function
var checkOff = createCheckOffFunction();

// toggle quest bulb completion
function turnIn(elid) {
    let element = document.getElementById(elid);
    element.classList.toggle("turnedin");
}

// toggle dev buttons
function showDev() {
    let element = document.getElementById("devButtons");
    element.style.display = (element.style.display === "block") ? "none" : "block";
}