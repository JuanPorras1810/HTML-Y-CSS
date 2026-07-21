const canvas = document.querySelector('#gameCanvas')
const ctx = canvas.getContext('2d')

const titleCanvas = document.querySelector('#titleCanvas')
const titleCtx = titleCanvas.getContext('2d')

const $sprite = document.querySelector('#sprite')
const $replayBtn = document.querySelector('#replayBtn')

canvas.width = 448
canvas.height = 400

function cargarTitulo() {
    titleCtx.imageSmoothingEnabled = false;
    titleCtx.drawImage(
        $sprite,
        0, 5,
        220, 49,
        9,
        12,
        430,
        65
    );
}

if ($sprite.complete) {
    cargarTitulo();
} else {
    $sprite.onload = cargarTitulo;
}

// VARIABLES DEL JUEGO 
let lives = 3;
let score = 0;
let gameOver = false;
let rankingSaved = false;

const NEON_COLORS = [
    { base: '#ff007f', glow: 'rgba(255, 0, 127, 0.8)' },
    { base: '#00f0ff', glow: 'rgba(0, 240, 255, 0.8)' },
    { base: '#39ff14', glow: 'rgba(57, 255, 20, 0.8)' },
    { base: '#ffff00', glow: 'rgba(255, 255, 0, 0.8)' },
    { base: '#ff4500', glow: 'rgba(255, 69, 0, 0.8)' },
    { base: '#9400d3', glow: 'rgba(148, 0, 211, 0.8)' },
    { base: '#00ffaa', glow: 'rgba(0, 255, 170, 0.8)' },
    { base: '#ff0055', glow: 'rgba(255, 0, 85, 0.8)' }
];

// RANKING 
function getRanking() {
    const rawData = localStorage.getItem('arkanoid_ranking');
    return rawData ? JSON.parse(rawData) : [];
}

function saveScoreToRanking(finalScore) {
    if (finalScore <= 0) return;
    let ranking = getRanking();
    
    if (ranking.includes(finalScore)) return;
    ranking.push(finalScore);
    ranking.sort((a, b) => b - a);
    ranking = ranking.slice(0, 10);

    localStorage.setItem('arkanoid_ranking', JSON.stringify(ranking));
    updateRankingUI();
}

function updateRankingUI() {
    const ranking = getRanking();
    const $rankingList = document.querySelector('#rankingList');
    $rankingList.innerHTML = '';

    if (ranking.length === 0) return;

    ranking.forEach((points, index) => {
        const li = document.createElement('li');

        if (index === 0) li.className = 'top-1';
        else if (index === 1) li.className = 'top-2';
        else if (index === 2) li.className = 'top-3';

        li.innerHTML = `<span>${index + 1}.º ARC</span> <span>${points}</span>`;
        $rankingList.appendChild(li);
    });
}

updateRankingUI();

// VARIABLES DE LA PELOTA
const ballRadius = 4;
let x = canvas.width / 2;
let y = canvas.height - 30;
let baseSpeed = 3;
let dx = -baseSpeed;
let dy = -baseSpeed;

// VARIABLES DE LA PALETA 
const PADDLE_SENSITIVITY = 8;
const paddleHeight = 10;
const paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

// VARIABLES DE LOS LADRILLOS 
const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 31;
const brickHeight = 14;
const brickPadding = 2;
const brickOffsetTop = 50;
const brickOffsetLeft = 11;
let bricks = [];

const BRICK_STATUS = { ACTIVE: 1, DESTROYED: 0 };

function generateBricks() {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            const randomColorIndex = Math.floor(Math.random() * NEON_COLORS.length);
            bricks[c][r] = {
                x: brickX,
                y: brickY,
                status: BRICK_STATUS.ACTIVE,
                colorIndex: randomColorIndex
            };
        }
    }
}

generateBricks();

function resetBallAndPaddle() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = dx > 0 ? baseSpeed : -baseSpeed;
    dy = -baseSpeed;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function restartGame() {
    lives = 3;
    score = 0;
    baseSpeed = 3;
    dx = -baseSpeed;
    dy = -baseSpeed;
    gameOver = false;
    rankingSaved = false;
    $replayBtn.style.display = 'none';
    generateBricks();
    resetBallAndPaddle();
    draw();
}

$replayBtn.addEventListener('click', restartGame);

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00f0ff';
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
}

function drawPaddle() {
    ctx.drawImage($sprite, 29, 174, paddleWidth, paddleHeight, paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

            const neon = NEON_COLORS[currentBrick.colorIndex];

            ctx.save();
            ctx.beginPath();
            ctx.rect(currentBrick.x, currentBrick.y, brickWidth, brickHeight);

            ctx.shadowBlur = 8;
            ctx.shadowColor = neon.glow;
            ctx.fillStyle = neon.base;
            ctx.fill();

            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.closePath();
            ctx.restore();
        }
    }
}

function drawUI() {
    ctx.save();
    ctx.font = 'bold 13px "Courier New"';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ff007f';
    ctx.fillText(`LIVES: ${'❤️ '.repeat(lives)}`, 20, 25);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#00f0ff';
    ctx.fillText(`SCORE: ${score}`, canvas.width - 20, 25);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`FPS: ${framesPerSec}`, 20, canvas.height - 15);

    ctx.restore();
}

function checkLevelCleared() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === BRICK_STATUS.ACTIVE) {
                return false;
            }
        }
    }
    return true;
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

            const isBallSameXAsBrick = x > currentBrick.x && x < currentBrick.x + brickWidth;
            const isBallSameYAsBrick = y > currentBrick.y && y < currentBrick.y + brickHeight;

            if (isBallSameXAsBrick && isBallSameYAsBrick) {
                dy = -dy;
                currentBrick.status = BRICK_STATUS.DESTROYED;
                score += 10;

                if (checkLevelCleared()) {
                    baseSpeed *= 1.20;
                    generateBricks();
                    resetBallAndPaddle();
                }
            }
        }
    }
}

function ballMovement() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    }

    const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;
    const isBallTouchingPaddle = y + dy > paddleY;

    if (isBallSameXAsPaddle && isBallTouchingPaddle) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius || y + dy > paddleY + paddleHeight) {
        lives--;
        if (lives <= 0) {
            gameOver = true;
        } else {
            resetBallAndPaddle();
        }
    }

    x += dx;
    y += dy;
}

function paddleMovement() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += PADDLE_SENSITIVITY;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= PADDLE_SENSITIVITY;
    }
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const relativeX = (touch.clientX - rect.left) * scaleX;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }, { passive: true });

    function keyDownHandler(event) {
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') rightPressed = true;
        if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') leftPressed = true;
    }

    function keyUpHandler(event) {
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') rightPressed = false;
        if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') leftPressed = false;
    }
}

const fps = 60;
let msPrev = window.performance.now();
let msFPSPrev = window.performance.now() + 1000;
const msPerFrame = 1000 / fps;
let frames = 0;
let framesPerSec = fps;

function draw() {
    if (gameOver) {
        if (!rankingSaved) {
            saveScoreToRanking(score);
            rankingSaved = true;
            $replayBtn.style.display = 'block';
        }

        cleanCanvas();
        ctx.fillStyle = '#ff007f';
        ctx.font = 'bold 32px "Courier New"';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff007f';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#00f0ff';
        ctx.font = '18px "Courier New"';
        ctx.fillText(`SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 5);
        return;
    }

    window.requestAnimationFrame(draw);

    const msNow = window.performance.now();
    const msPassed = msNow - msPrev;

    if (msPassed < msPerFrame) return;

    const excessTime = msPassed % msPerFrame;
    msPrev = msNow - excessTime;
    frames++;

    if (msFPSPrev < msNow) {
        msFPSPrev = window.performance.now() + 1000;
        framesPerSec = frames;
        frames = 0;
    }

    cleanCanvas();
    drawBall();
    drawPaddle();
    drawBricks();
    drawUI();

    collisionDetection();
    ballMovement();
    paddleMovement();
}

draw();
initEvents();