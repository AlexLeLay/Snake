const cellSize = 20;
let x = cellSize * 5;
let y = cellSize * 5;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 400;
const height = canvas.height = 400;

let snake = [
    {x: x, y: y},
    {x: x - cellSize, y: y},
    {x: x - cellSize * 2, y: y}
];

function draw() {
    if (canvas.getContext) {
        ctx.clearRect(0, 0, width, height);

        snake.forEach((part) => {
            part.x += cellSize;

            if (part.x >= width) {
                part.x = 0;
            }
            if (part.y >= height) {
                part.y = 0;
            }

            ctx.fillStyle = "green";
            ctx.fillRect(part.x, part.y, cellSize, cellSize);
        })
        setTimeout(draw, 250);
    }
}

draw();

window.addEventListener("keydown", (key) => {
    if (key.code === "ArrowDown") {
        snake[0].x += 0;
        snake[0].y += cellSize;
    }
})