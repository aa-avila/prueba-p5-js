let canvas_w = 200;
let canvas_h = 200;
let bg_opacity = 30;
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

const sketch = (p) => {

    p.setup = function () {
        p.frameRate(60);
        p.createCanvas(canvas_w, canvas_h);
        if (canvas_w < canvas_h) {
            maxDiam = canvas_w / 2;
        } else {
            maxDiam = canvas_h / 2;
        }
        r = p.random(255);
        g = p.random(255);
        b = p.random(255);
    };

    p.draw = function () {
        p.background(0, bg_opacity);
        rad = diam / 2;

        //random mov
        xAcc = p.random(-randAcc, randAcc);
        yAcc = p.random(-randAcc, randAcc);

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
        r = r + p.random(-5, 5);
        g = g + p.random(-5, 5);
        b = b + p.random(-5, 5);

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

        p.fill(r, g, b);
        p.circle(xPos, yPos, diam);
    };
};

const crearCanvasP5 = () => {
    const bg_opacity_text = document.getElementById("bg_opacity").value;
    const canvas_w_text = document.getElementById("canvas_w").value;
    const canvas_h_text = document.getElementById("canvas_h").value;

    bg_opacity = parseInt(bg_opacity_text, 10);
    canvas_w = parseInt(canvas_w_text, 10);
    canvas_h = parseInt(canvas_h_text, 10);

    if (canvas_w === 0 || canvas_h === 0) {
        throw new Error("El ancho o el alto no pueden ser 0.");
    }

    if (!bg_opacity || !canvas_h || !canvas_w) {
        throw new Error("Datos incorrectos. Se admiten sólo números.");
    }

    if (bg_opacity < 0 || bg_opacity > 255) {
        throw new Error("La opacidad supera los límites establecidos (0-255).")
    }

    xPos = canvas_w / 2;
    yPos = canvas_h / 2;
    xVel = 0;
    yVel = 0;
    xAcc = 0;
    yAcc = 0;
    diam = initDiam;
    // let myp5 = new p5(sketch, window.document.getElementById("p5-container"));
    new p5(sketch, document.getElementById("p5-container"));
}

const borrarCanvasP5 = () => {
    document.getElementById("p5-container").innerHTML = "";
}

const handleBtnCanvas = () => {
    try {
        let btn = document.getElementById("btnCanvas");
        if (btn.className === "canvasAdd btn btn-success") {
            crearCanvasP5();
            btn.className = "canvasRemove btn btn-danger";
            btn.innerHTML = "Borrar";
        } else {
            borrarCanvasP5();
            btn.className = "canvasAdd btn btn-success";
            btn.innerHTML = "Crear";
        }
    } catch (error) {
        alert(error.message);
    }
}




