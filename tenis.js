// pobieramy element canvas
const canvas = document.querySelector('canvas');
// pobieramy i ustawiamy kontekst gry
// do nowych właściwości i metod odwołamy się za pomocą obiektu ctx
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

// wielkość naszej piłki, kwadrat
const ballSize = 20;
// pozycja początkowa piłki
let ballX = cw / 2 - ballSize / 2; // od 490 do 510 px
let ballY = ch / 2 - ballSize / 2; // od 240 do 260 px

// wielkość rakietki
const paddleHeight = 100;
const paddleWidth = 20;

// pozycje początkowe rakietek
const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

// wielkość linii przerywanej
const lineWidth = 6;
const lineHeight = 16;

// prędkość lotu piłki
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

	// zmiana położenia przy każdorazowym wywołaniu funkcji
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	//sprawdzenie czy piłka nie dotknęła krawędzi stołu
	if (ballY <= 0 || ballY + ballSize >= ch) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballX <= 0 || ballX + ballSize >= cw) {
		ballSpeedX = -ballSpeedX;
	}
}

function table() {
	ctx.fillStyle = 'black'; // czarny kolor domyśnie
	ctx.fillRect(0, 0, cw, ch); // rysujemy czarny stół do ping-ponga

	// rysujemy przerywaną linię
	for (let linePosition = 20; linePosition < ch; linePosition += 30) {
		ctx.fillStyle = "gray";
		ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
	}
}

// jak daleko od okna przeglądarki znajduje się canvas
topCanvas = canvas.offsetTop;
// console.log(topCanvas);

function playerPosition(e) {
	// console.log("Pozycja myszy to " + e.clientY - topCanvas);
	playerY = e.clientY - topCanvas - paddleHeight / 2;
}

// nasłuchiwanie zdarzenia: ruch myszką
canvas.addEventListener("mousemove", playerPosition);

function game() {
	table();
	ball();
	player();
	ai();
}

// co ma być wywołane i jak często
setInterval(game, 1000 / 60);

// Uwagi:
// 1. Nie wolno podawać wymiarów canvasa w stylach css
// 2. Domyślne wymiary canvas to 300x150
// 3. Tło w canvasie jest domyślnie przezroczyste
