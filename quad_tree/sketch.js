let qtree, range;

function setup() {
  createCanvas(400, 400);

  let boundary = new Rectangle(200, 200, 200, 200);
  qtree = new QuadTree(boundary, 4);
  range = new Rectangle(250, 250, 107, 75);
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    for (var i = 0; i < 5; i++) {
      let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5));
      qtree.insert(m);
    }
  }
  qtree.show();
  stroke(0, 255, 0);
  rectMode(CENTER);
  strokeWeight(1);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  let points = qtree.query(range);
  console.log(points.length);
  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y);
  }
}
