var inc = 0.01;
var scl = 10;
var cols, rows;
var start = 0;
var zOffset = 0;
var noiseFactor = 3;
var xDegScale = 5;
var xResolution = 3;
var xStart = 0;

var fr;

function setup() {
  createCanvas(600, 600);
  rows = 50;
  fr = createP("");
  angleMode(DEGREES); // Change the mode to DEGREES
}

function draw() {
  fill(255);
  stroke(255);
  rect(0, 0, width, height);
  stroke(0);
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < width / xResolution; x++) {
      var new_y =
        (noise(x * inc, y * inc, zOffset) * noiseFactor +
          sin(x * xDegScale + xStart)) *
          20 +
        10 * y;
      var old_y =
        (noise((x - 1) * inc, y * inc, zOffset) * noiseFactor +
          sin((x - 1) * xDegScale + xStart)) *
          20 +
        10 * y;
      line((x - 1) * xResolution, old_y, x * xResolution, new_y);
    }
  }
  xStart += 5;
  zOffset += 0.02;
  inc += 0.0003;
  fr.html(floor(frameRate()));
}
