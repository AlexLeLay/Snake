// Créer la direction
// Prendre en compte la direction pour les inputs
// Direction de départ toujours vers la droite

// Arranger la position du corps du serpent après inputs

// Bonus: ajouter un menu de sélection de
// la vitesse et de la couleur du serpent
// comptage de points
// 

let speed = 3;
let xDirection; // -1 vers la gauche, 1 vers la droite, 0 pour aucun
let yDirection; // -1 vers le haut, 1 vers le bas, 0 pour aucun

const cellSize = 20;
let x = cellSize * 5;
let y = cellSize * 5;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 400;
const height = canvas.height = 400;

xDirection = 1;
yDirection = 0;

let snake = [
    {x: x, y: y},
    {x: x - cellSize, y: y},
    {x: x - cellSize * 2, y: y}
];

function draw() {
    if (canvas.getContext) {
        ctx.clearRect(0, 0, width, height);

        snake.forEach((part) => {
            part.x += cellSize * xDirection;
            part.y += cellSize * yDirection;

            // loop horizontal
            if (part.x >= width) {
                part.x = 0;
            }

            if (part.x < 0) {
                part.x = width - cellSize;
            }

            // loop vertical
            if (part.y >= height) {
                part.y = 0;
            }

            if (part.y < 0) {
                part.y = height - cellSize;
            }

            ctx.fillStyle = "green";
            ctx.fillRect(part.x, part.y, cellSize, cellSize);

            
        })
        setTimeout(draw, 1000 / speed);
    }
}

draw();

window.addEventListener("keydown", (key) => {
    if (yDirection == 0 ) {
        if (key.code === "ArrowDown") {
            xDirection = 0;
            yDirection = 1;
            snake[0].x += cellSize * xDirection;
            snake[0].y += cellSize * yDirection;
        }
        
        if (key.code === "ArrowUp") {
            xDirection = 0;
            yDirection = -1;
            snake[0].x += cellSize * xDirection;
            snake[0].y += cellSize * yDirection;
        }
    }

    if (xDirection == 0 ) {
        if (key.code === "ArrowRight") {
            xDirection = 1;
            yDirection = 0;
            snake[0].x += cellSize * xDirection;
            snake[0].y += cellSize * yDirection;
        }
        
        if (key.code === "ArrowLeft") {
            xDirection = -1;
            yDirection = 0;
            snake[0].x += cellSize * xDirection;
            snake[0].y += cellSize * yDirection;
        }
    }

})
