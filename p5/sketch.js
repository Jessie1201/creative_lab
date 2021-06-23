function setup() {
    createCanvas(windowWidth, windowHeight);
    //    background(100, 100 , 0);
}

function draw() {
    background(100, 100, 0);
    rectMode(CENTER);
    rect(50, 85, 70, 50);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}






//'use strict';
//
//var sketch = function (p) {
//    var agents = [];
//    var agentCount = 4000;
//    var noiseScale = 300;
//    var noiseStrength = 10;
//    var overlayAlpha = 10;
//    var agentAlpha = 90;
//    var strokeWidth = 0.3;
//    var drawMode = 1;
//
//    p.setup = function () {
//        p.createCanvas(p.windowWidth, p.windowHeight);
//
//        for (var i = 0; i < agentCount; i++) {
//            agents[i] = new Agent();
//        }
//    };
//
//    p.draw = function () {
//        p.fill(255, overlayAlpha);
//        p.noStroke();
//        p.rect(0, 0, p.width, p.height);
//        c
//
//        // Draw agents
//        p.stroke(0, agentAlpha);
//        for (var i = 0; i < agentCount; i++) {
//            if (drawMode == 1) agents[i].update1(noiseScale, noiseStrength, strokeWidth);
//            else agents[i].update2(noiseScale, noiseStrength, strokeWidth);
//        }
//    };
//
//    p.keyReleased = function () {
//        if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
//        if (p.key == '1') drawMode = 1;
//        if (p.key == '2') drawMode = 2;
//        if (p.key == ' ') {
//            var newNoiseSeed = p.floor(p.random(10000));
//            p.noiseSeed(newNoiseSeed);
//        }
//        if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
//    };
//};
//
//var myp5 = new p5(sketch);