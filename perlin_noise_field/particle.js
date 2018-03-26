function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector(0, 0);
  this.maxspeed = 4;

  this.previousPos = this.pos.copy();

  this.update = function() {
    this.updatePrevious();
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };
  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.show = function() {
    line(this.pos.x, this.pos.y, this.previousPos.x, this.previousPos.y);
  };

  this.updatePrevious = function() {
    this.previousPos.x = this.pos.x;
    this.previousPos.y = this.pos.y;
  };

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrevious();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrevious();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrevious();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrevious();
    }
  };

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    this.applyForce(vectors[index]);
  };
}
