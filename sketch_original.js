const canvas_w = 400;
const canvas_h = 400;
let xPos = canvas_w / 2;
let yPos = canvas_h / 2;
let initDiam = 40;
let maxDiam;
let diam = initDiam;
let diamDecrease = false;
let rad;
let xVel = 0;
let yVel = 0;
let xAcc = 0;
let yAcc = 0;
let randAcc = -1;
let r;
let g;
let b;

function setup() {
    frameRate(60);
    createCanvas(canvas_w, canvas_h);
    if (canvas_w < canvas_h) {
        maxDiam = canvas_w / 2;
    } else {
        maxDiam = canvas_h / 2;
    }
    r = random(255);
    g = random(255);
    b = random(255);
}

function draw() {
    background(30, 30);
    rad = diam / 2;

    //random mov
    xAcc = random(-randAcc, randAcc);
    yAcc = random(-randAcc, randAcc);

    //pos calc
    xVel = xVel + xAcc;
    yVel = yVel + yAcc;
    xPos = xPos + xVel;
    yPos = yPos + yVel;

    //detec bordes-rebotes
    if (xPos < rad) {
        xPos = rad;
        xVel = -xVel;
        diam++;
    }
    if (xPos > canvas_w - rad) {
        xPos = canvas_w - rad;
        xVel = -xVel;
        diam++;
    }
    if (yPos < rad) {
        yPos = rad;
        yVel = -yVel;
        diam++;
    }
    if (yPos > canvas_h - rad) {
        yPos = canvas_h - rad;
        yVel = -yVel;
        diam++;
    }

    //detec maxDiam-resize diam
    if (diam >= maxDiam) {
        diamDecrease = true;
    }
    if (diam <= initDiam) {
        diamDecrease = false;
    }
    if (diamDecrease) {
        diam--;
    }

    //dibuja circle
    r = r + random(-5, 5);
    g = g + random(-5, 5);
    b = b + random(-5, 5);

    if (r < 0) {
        r = 0;
    }
    if (g < 0) {
        g = 0;
    }
    if (b < 0) {
        b = 0;
    }

    if (r > 255) {
        r = 255;
    }
    if (g > 255) {
        g = 255;
    }
    if (b > 255) {
        b = 255;
    }

    fill(r, g, b);
    circle(xPos, yPos, diam);
}
