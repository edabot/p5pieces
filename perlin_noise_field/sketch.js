var inc = 0.11;
var scl = 10;
var cols, rows;
var start = 0;
var zOffset = 0;

var particles = [];
var flowField;

var fr;

function setup() {
  createCanvas(600, 600);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");
  for (var i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  flowField = new Array(rows * cols);
  fill(255);
  stroke(255);
  rect(0, 0, width, height);
}

function draw() {
  fill(255, 2);
  stroke(255);
  rect(0, 0, width, height);
  strokeWeight(5);
  color_r = floor(noise(zOffset) * 255);
  color_g = floor(noise(zOffset + 1000) * 255);
  color_b = floor(noise(zOffset + 10000) * 255);
  stroke(color_r, color_g, color_b, 20);
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var index = x + y * cols;
      var angle = noise(x * inc, y * inc, zOffset) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.4);
      flowField[index] = v;
      // stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // // line(0, 0, scl, 0);
      // pop();
    }
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }
  zOffset += 0.001;
  fr.html(floor(frameRate()));
}
