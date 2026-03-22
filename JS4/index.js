const stage = document.querySelector(".box-container");

const palette = [
    "#1d4ed8",
    "#dc2626",
    "#059669",
    "#7c3aed",
    "#ea580c",
    "#0f766e",
    "#be185d",
    "#4338ca"
];

let currentId = 1;

const dragState = {
    box: null,
    shiftX: 0,
    shiftY: 0
};

function allBoxes() {
    return [...stage.querySelectorAll(".box")];
}

function randomColor(except = "") {
    const options = palette.filter(color => color !== except);
    return options[Math.floor(Math.random() * options.length)];
}

function numericStyleValue(element, prop, fallback = 0) {
    const value = parseInt(element.style[prop], 10);
    return Number.isNaN(value) ? fallback : value;
}

function ensurePosition(box, left, top) {
    const maxLeft = stage.clientWidth - box.offsetWidth;
    const maxTop = stage.clientHeight - box.offsetHeight;

    const safeLeft = Math.max(0, Math.min(left, maxLeft));
    const safeTop = Math.max(0, Math.min(top, maxTop));

    box.style.left = `${safeLeft}px`;
    box.style.top = `${safeTop}px`;
}

function createBox(left, top) {
    currentId += 1;

    const box = document.createElement("div");
    box.className = "box";
    box.textContent = currentId;
    box.style.left = `${left}px`;
    box.style.top = `${top}px`;
    box.style.backgroundColor = randomColor();

    stage.appendChild(box);
    ensurePosition(box, left, top);
}

function removeBox(box) {
    if (allBoxes().length === 1) return;
    box.remove();
}

function toggleSize(box, shouldGrow) {
    box.classList.toggle("box-large", shouldGrow);
    ensurePosition(
        box,
        numericStyleValue(box, "left", box.offsetLeft),
        numericStyleValue(box, "top", box.offsetTop)
    );
}

function targetBox(event) {
    return event.target.closest(".box");
}

stage.addEventListener("contextmenu", (event) => {
    const box = targetBox(event);
    if (!box) return;

    event.preventDefault();
    const current = getComputedStyle(box).backgroundColor;
    box.style.backgroundColor = randomColor(current);
});

stage.addEventListener("mousedown", (event) => {
    const box = targetBox(event);
    if (!box) return;

    if (event.button !== 0) return;

    const boxRect = box.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    if (event.shiftKey) {
        toggleSize(box, true);
    }

    dragState.box = box;
    dragState.shiftX = event.clientX - boxRect.left;
    dragState.shiftY = event.clientY - boxRect.top;

    event.preventDefault();
});

document.addEventListener("mousemove", (event) => {
    if (!dragState.box) return;

    const stageRect = stage.getBoundingClientRect();

    const left = event.clientX - stageRect.left - dragState.shiftX;
    const top = event.clientY - stageRect.top - dragState.shiftY;

    ensurePosition(dragState.box, left, top);
});

document.addEventListener("mouseup", () => {
    dragState.box = null;
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Shift") return;
    if (!dragState.box) return;

    toggleSize(dragState.box, true);
});

document.addEventListener("keyup", (event) => {
    if (event.key !== "Shift") return;

    allBoxes().forEach(box => toggleSize(box, false));
});

stage.addEventListener("dblclick", (event) => {
    const box = targetBox(event);
    if (!box) return;

    if (event.altKey) {
        removeBox(box);
        return;
    }

    const baseLeft = numericStyleValue(box, "left", box.offsetLeft);
    const baseTop = numericStyleValue(box, "top", box.offsetTop);

    createBox(baseLeft + 35, baseTop + 35);
});