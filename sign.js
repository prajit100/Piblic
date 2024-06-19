const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let drawing = false;
let penColor = '#000000';

// Adjust canvas size
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    ctx.scale(ratio, ratio);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);

document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('save').addEventListener('click', saveCanvas);
document.getElementById('pen-color').addEventListener('change', changePenColor);
document.getElementById('add-text').addEventListener('click', addTextSignature);

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
    e.preventDefault();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineTo(getX(e), getY(e));
    ctx.stroke();
    e.preventDefault();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'signature.png';
    link.click();
}

function changePenColor(e) {
    penColor = e.target.value;
}

function addTextSignature() {
    const text = document.getElementById('text-signature').value;
    if (text) {
        ctx.font = '24px Arial';
        ctx.fillStyle = penColor;
        ctx.fillText(text, 10, canvas.height - 10);
    }
}

function getX(e) {
    return e.clientX - canvas.offsetLeft || e.touches[0].clientX - canvas.offsetLeft;
}

function getY(e) {
    return e.clientY - canvas.offsetTop || e.touches[0].clientY - canvas.offsetTop;
}
