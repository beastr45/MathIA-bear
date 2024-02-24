
// declare misc. vars and canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const monkey = new Image();

let theta=0;
let rotSpeed=(15  / 60) * (2 * Math.PI); // Adjust the rotation speed as needed

const scale = 600;


var prevTime; // start as undefined to prevent jumping

function init(){
    monkey.src = "monkey.png"
    // ctx.translate(canvas.width/2, canvas.height/2);

    requestAnimationFrame(render);
}

//fix resize
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


function render(now){
    window.requestAnimationFrame(render);
    // calculate factor
    delta = (now - prevTime) / 1000;
    prevTime = now;
    if (isNaN(delta)) return; // skip very first delta to prevent jumping
    ctx.clearRect(0,0,canvas.width,canvas.height);
    

    theta += rotSpeed * delta;

    ctx.save();
    // ctx.drawImage(monkey, (canvas.width/2)-(300/2),(canvas.height/2)-(300/2), 300,300);
    ctx.translate(canvas.width/2, canvas.height/2);
    // ctx.transform(Math.cos(theta),-Math.sin(theta), //
    //                  Math.sin(theta),Math.cos(theta),  //
    //                  0,0)                              //
    ctx.transform(Math.cos(theta),0, //
                     0,Math.sin(theta),  //
                     0,0)                              //
    ctx.drawImage(monkey, 0-(scale/2),0-(scale/2), scale,scale);
    ctx.restore();
}

init();
