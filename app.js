const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const clear = document.getElementById('jsClear');
const save = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function onColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function onRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function onModeClick() {
	if (filling === true) {
		filling = false;
		mode.innerText = 'Fill';
	} else {
		filling = true;
		mode.innerText = 'Paint';
	}
}

function onCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function handleCM(event) {
	event.preventDefault();
}

function onSaveClick() {
	const image = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.href = image;
	link.download = 'PantJS[🎨].png';
	link.click();
}

function onClearClick() {
	ctx.strokeStyle = INITIAL_COLOR;
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', startPainting);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', onCanvasClick);
	canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) => color.addEventListener('click', onColorClick));

if (range) {
	range.addEventListener('input', onRangeChange);
}

if (mode) {
	mode.addEventListener('click', onModeClick);
}

if (clear) {
	clear.addEventListener('click', onClearClick);
}

if (save) {
	save.addEventListener('click', onSaveClick);
}
