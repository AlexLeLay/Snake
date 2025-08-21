// Créer la direction
// Prendre en compte la direction pour les inputs
// Direction de départ toujours vers la droite

// Arranger la position du corps du serpent après inputs

// Bonus: ajouter un menu de sélection pour
// la vitesse et de la couleur du serpent
// Comptage de points
// Tableau meilleurs scores avec BDD

// stocker les inputs dans un tableau au cas où
// ça se fait plus rapidement que le délacement du serpent
// ou limiter à 1 input par frame


let color;  // On prendra l'input pour la couleur
let speed;  // et la vitesse
let xDirection = 1;      // -1 vers la gauche, 1 vers la droite, 0 pour aucun
let yDirection = 0;      // -1 vers le haut, 1 vers le bas, 0 pour aucun

const cellSize = 20;
let x = cellSize * 5;
let y = cellSize * 5;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 400;
const height = canvas.height = 400;

let snake = [
    {x: x, y: y, xDir: xDirection, yDir: yDirection},
    {x: x - cellSize, y: y},
    {x: x - cellSize * 2, y: y}
];

let score = 0;

console.log(snake);

const head = snake[0];
const tail = snake[snake.length - 1];
// console.log(tail);

// console.log(head);

let xPos = [];
let yPos = [];
let fruit;
let availableKey;

function draw() {
    if (canvas.getContext) {
        ctx.clearRect(0, 0, width, height);
        
        const head = snake[0];
        const tail = snake[snake.length - 1];
        availableKey = 1;

        oldPositions = [];

        snake.forEach(part => {
            oldPositions.push({x: part.x, y: part.y})
        });

        if (!fruit) {
            let valid = false;

            while (!valid) {
                const xRand = Math.round(Math.random() * (width / cellSize - 1)) * cellSize;
                const yRand = Math.round(Math.random() * (height / cellSize - 1)) * cellSize;
                let overlap = 0;
                snake.forEach(part => {
                if (part.x == xPos[xRand] && part.y == yPos[yRand]) {
                    overlap ++;
                }

                if (overlap === 0) {
                    fruit = {x: xRand, y: yRand};
                    valid = true;
                }
            })
            }

        } else {
            // Fruit placé aléatoirement

            ctx.fillStyle = "yellow";
            ctx.fillRect(fruit.x, fruit.y, cellSize, cellSize);
            if (head.x == fruit.x && head.y == fruit.y) {
                // ctx.clearRect(fruit.x, fruit.y, cellSize, cellSize);
                fruit = null;
                snake.push({x: tail.x, y: tail.y - cellSize});
                console.log(snake);
                score++;
                // console.log(score);

            }
        }


        head.x += cellSize * head.xDir;
        head.y += cellSize * head.yDir;


        for (let i = 1; i < snake.length; i++) {
            snake[i].x = oldPositions[i - 1].x;
            snake[i].y = oldPositions[i - 1].y;
        }


        for (let i = 0; i < snake.length; i++) {
            
            // loop horizontal
            if (snake[i].x >= width) {
                snake[i].x = 0;
            }

            if (snake[i].x < 0) {
                snake[i].x = width - cellSize;
            }

            // loop vertical
            if (snake[i].y >= height) {
                snake[i].y = 0;
            }

            if (snake[i].y < 0) {
                snake[i].y = height - cellSize;
            }

            ctx.fillStyle = color;
            ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);

            
        }
        ctx.font = "20px serif";
        ctx.fillText(`Score: ${(score * (speed/5)).toFixed(0)}`, 10, 50);
        
        console.log(speed);
        
        setTimeout(draw, 1000 / speed);
    }
}

let isRunning = 0;
let isGameOver = 0;
const game = document.getElementById("game");
let speedInput = document.getElementById("speed");
let speedNbr = document.getElementById("speed-nbr");

const menu = document.getElementById("menu");
const start = document.getElementById("start");
const scores = document.getElementById("scores");



speed = speedInput.value ;

speedNbr.innerHTML = speed;

speedInput.addEventListener("input", (e) => {
    speed = Number(e.target.value);
    speedNbr.innerHTML = speed;
})

const colors = document.querySelectorAll("input[name='color']");

colors.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.checked) {
            color = radio.dataset.color;         
        }
    });
});

start.addEventListener("click", () => {
    isRunning = 1;
    console.log(isRunning);
    menu.style.display = "none";
    game.style.display = "block";
    draw();
})

if (isRunning != 1) {
    game.style.display = "none";
}

// Directions


window.addEventListener("keydown", (key) => {
    if (availableKey == 1) {
        if (head.yDir == 0 ) {
            if (key.code === "ArrowDown") {
                head.xDir = 0;
                head.yDir = 1;
                availableKey = 0;
            }
            
            if (key.code === "ArrowUp") {
                head.xDir = 0;
                head.yDir = -1;
                availableKey = 0;
            }
        }

        if (head.xDir == 0 ) {
            if (key.code === "ArrowRight") {
                head.xDir = 1;
                head.yDir = 0;
                availableKey = 0;
            }
            
            if (key.code === "ArrowLeft") {
                head.xDir = -1;
                head.yDir = 0;
                availableKey = 0;
            }
        }

    }

})
