var canvas = document.getElementById("screen");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

var minWidth = 20;
var cFactor = Math.min(canvas.width, canvas.height) / minWidth;
var simWidth = canvas.width / cFactor;
var simHeight = canvas.height / cFactor;

function cX(pos) {
    return pos.x * cFactor;
}

function cY(pos) {
    return canvas.height - pos.y * cFactor;
}

function setting() {
    
}

var g = -10.0;
var dt = 1.0 / 60.0;
var ball = {
    radius: 0.2,
    pos: {x: 0.2, y: 0.2},
    vel: {x: 10.0, y: 20.0}
};

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "#FF0000";

    c.beginPath();
    c.arc(cX(ball.pos), cY(ball.pos), cFactor * ball.radius, 0, 2 * Math.PI);
    c.closePath();
    c.fill();
}

function simulate() {
    ball.vel.y += g*dt;
    ball.pos.x += ball.vel.x*dt;
    ball.pos.y += ball.vel.y*dt;

    if (ball.pos.x <= ball.radius) {
        ball.pos.x = ball.radius;
        ball.vel.x *= -1;
    }
    if (ball.pos.x >= simWidth-ball.radius) {
        ball.pos.x = simWidth-ball.radius;
        ball.vel.x *= -1;
    }
    if (ball.pos.y <= ball.radius) {
        ball.pos.y = ball.radius;
        ball.vel.y *= -1;
    }
    if (ball.pos.y >= simHeight-ball.radius) {
        ball.pos.y = simHeight-ball.radius;
        ball.vel.y *= -1;
    }
}

function update() {
    simulate();
    draw();
    requestAnimationFrame(update);
}

update();