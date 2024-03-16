// declare misc vars and canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// const fs = require('fs');
import data from './model.json' assert { type: 'json' };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//assets
const monkey = new Image();

// vars
let theta = 0;
let delta
let rotSpeed = (15 / 60) * (2 * Math.PI); // Adjust the rotation speed as needed
const scale = 600;
var prevTime; // start as undefined to prevent jumping

var vertices_x = []
var vertices_y = []
var vertices_z = []
var indices = []

//fix resize
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function drawMonkey(theta) {
    ctx.save();
    // ctx.drawImage(monkey, (canvas.width/2)-(300/2),(canvas.height/2)-(300/2), 300,300);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.transform(Math.cos(theta),-Math.sin(theta), //
    //                  Math.sin(theta),Math.cos(theta),  //
    //                  0,0)                              //
    ctx.transform(Math.cos(theta), 0, //
        0, Math.sin(theta),  //
        0, 0)                              //
    ctx.drawImage(monkey, 0 - (scale / 2), 0 - (scale / 2), scale, scale);
    ctx.restore();
}

function render(now) {
    window.requestAnimationFrame(render);
    // calculate factor
    delta = (now - prevTime) / 1000;
    prevTime = now;
    if (isNaN(delta)) return; // skip very first delta to prevent jumping
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    theta += rotSpeed * delta;
    // drawMonkey(theta);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.transform(Math.cos(theta),-Math.sin(theta), //
                     Math.sin(theta),Math.cos(theta),  //
                     0,0)                              //
    // ctx.transform(Math.cos(theta), 0, //
    //     0, Math.sin(theta),  //
    //     0, 0)                              //
    ctx.drawImage(monkey, 0 - (scale / 2), 0 - (scale / 2), scale, scale);

    // for (let i = 0; i < data.vertex_x.length; i++) {
    //     ctx.fillRect(data.vertex_y[i] * 300, data.vertex_x[i] * 300, 5, 5);
    // }
    // ctx.drawImage(monkey, (canvas.width/2)-(300/2),(canvas.height/2)-(300/2), 300,300);
    ctx.restore();
}

function rotateXYZ(x, y, z) {

}
function projectXYZ(x, y, z) {

}

function init() {
    monkey.src = "monkey.png"
    // ctx.translate(canvas.width/2, canvas.height/2);
    ctx.fillStyle = '#f13980';
    // ctx.beginPath();
    // ctx.moveTo(7,0);
    // ctx.lineTo(100, 50);
    // ctx.lineTo(50, 100);
    // ctx.closePath();
    // ctx.fill();
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.restore()
    // console.log(data.indices.length);
    // for (let i = 0; i < data.indices.length; i++) {
    //     ctx.beginPath();
    //     // ctx.moveTo(data.vertex_x[data.indices[i][0]] * 100, data.vertex_z[data.indices[i][0]] * 100);
    //     for (let j = 0; j < data.indices[i].length; j++) {
    //         if (j == 2){
    //             console.log(j);
    //
    //         }
    //         ctx.lineTo(data.vertex_y[data.indices[i][j]] * 100, data.vertex_z[data.indices[i][j]] * 100);
    //     }
    //     ctx.closePath();
    //     ctx.fill();
    // }
    // ctx.restore()

    // for (let j = 0; i < 3; i++) {
    //     ctx.lineTo(data.vertex_x[data.indices[i]], data.vertex_z[data.indices[i]]);
    //     console.log(data.indices[i + j])
    // }
    // for (let i = 0; i < data.vertex_x.length; i++) {
    //     ctx.fillRect(data.vertex_y[i] * 100, data.vertex_x[i] * 100, 2, 2);
    // }
    requestAnimationFrame(render);
}

init();
