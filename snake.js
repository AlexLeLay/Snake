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


let color = "green"; // On prendra l'input pour la couleur
let speed = 1;       // et la vitesse
let xDirection;      // -1 vers la gauche, 1 vers la droite, 0 pour aucun
let yDirection;      // -1 vers le haut, 1 vers le bas, 0 pour aucun

const cellSize = 20;
let x = cellSize * 5;
let y = cellSize * 5;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let tile;
const width = canvas.width = 400;
const height = canvas.height = 400;

xDirection = 1;
yDirection = 0;

let snake = [
    {x: x, y: y, xDir: xDirection, yDir: yDirection},
    {x: x - cellSize, y: y, xDir: xDirection, yDir: yDirection},
    {x: x - cellSize * 2, y: y, xDir: xDirection, yDir: yDirection}
];

// console.log(snake);

// Ajouter un statut de case remplie pour éviter d'ajouter un fruit
// sur le serpent
// Fruit placé aléatoirement

// Quand on mange un fruit push un objet dans snake[]
// avec array.push()


const head = snake[0];
const tail = snake[snake.length - 1];
// console.log(tail);

// console.log(head);


function draw() {
    if (canvas.getContext) {
        ctx.clearRect(0, 0, width, height);

        if (tile) {
            ctx.fillStyle = "red";
            ctx.fillRect(tile.x, tile.y, cellSize, cellSize);
            // console.log(tile);
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x == tile.x && snake[i].y == tile.y) {
                    snake[i].xDir = tile.xDir;
                    snake[i].yDir = tile.yDir;
                }


            }
            
        }

        head.x += cellSize * head.xDir;
        head.y += cellSize * head.yDir;

        for (let i = 1; i < snake.length; i++) {
            
            snake[i].x += cellSize * snake[i].xDir;
            snake[i].y += cellSize * snake[i].yDir;
        }


        for (let i = 0; i < snake.length; i++) {
            



            // console.log(snake[i].x);
            








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

        
        setTimeout(draw, 1000 / speed);
    }
}

draw();

// Directions


window.addEventListener("keydown", (key) => {
    if (yDirection == 0 ) {
        if (key.code === "ArrowDown") {
            xDirection = 0;
            yDirection = 1;
            head.xDir = xDirection;
            head.yDir = yDirection;
            tile = {x: head.x, y: head.y, xDir: xDirection, yDir: yDirection};
        }
        
        if (key.code === "ArrowUp") {
            xDirection = 0;
            yDirection = -1;
            head.xDir = xDirection;
            head.yDir = yDirection;
            tile = {x: head.x, y: head.y, xDir: xDirection, yDir: yDirection};
        }
    }

    if (xDirection == 0 ) {
        if (key.code === "ArrowRight") {
            xDirection = 1;
            yDirection = 0;
            head.xDir = xDirection;
            head.yDir = yDirection;
            tile = {x: head.x, y: head.y, xDir: xDirection, yDir: yDirection};
        }
        
        if (key.code === "ArrowLeft") {
            xDirection = -1;
            yDirection = 0;
            head.xDir = xDirection;
            head.yDir = yDirection;
            tile = {x: head.x, y: head.y, xDir: xDirection, yDir: yDirection};            
        }
    }

})
