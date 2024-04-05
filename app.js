const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

document.getElementById('clearButton').addEventListener('click', clearCanvas);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function endDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}