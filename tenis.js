// pobieramy element canvas
const canvas = document.querySelector('canvas');
// pobieramy i ustawiamy kontekst gry
// do nowych właściwości i metod odwołamy się za pomocą obiektu ctx
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20; // wielkość naszej piłki, kwadrat
let ballX = cw / 2 - ballSize / 2; // od 490 do 510 px
let ballY = ch / 2 - ballSize / 2; // od 240 do 260 px

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = -1;
let ballSpeedY = 1;

function player() {
	ctx.fillStyle = "#7FFF00";
	ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai() {
	ctx.fillStyle = "yellow";
	ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

function ball() {
	ctx.fillStyle = "#fff";
	ctx.fillRect(ballX, ballY, ballSize, ballSize);
	
	ballX += ballSpeedX;
	ballY += ballSpeedY;
}

function table() {
	ctx.fillStyle = 'black';  // czarny kolor domyśnie
	ctx.fillRect(0,0,cw,ch); // rysujemy czarny stół do ping-ponga
	
	for (let linePosition = 20; linePosition < ch; linePosition += 30) {
		ctx.fillStyle = "gray";
		ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
	}
}

function game() {
	table();
	ball();
	player();
	ai();
}
	
setInterval(game, 1000 / 60);

// Uwagi:
// 1. Nie wolno podawać wymiarów canvasa w stylach css
// 2. Domyślne wymiary canvas to 300x150
// 3. Tło w canvasie jest domyślnie przezroczyste
