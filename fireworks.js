const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
export function Firework(x, y, height, yVol, R, G, B) {
  this.x = x;
  this.y = y;
  this.yVol = yVol;
  this.height = height;
  this.R = R;
  this.G = G;
  this.B = B;
  this.radius = 1;
  this.boom = false;
  var boomHeight = Math.floor(Math.random() * 200) + 50;
  this.draw = function () {
    ctx.fillStyle = 'rgba(' + R + ',' + G + ',' + B + ')';
    ctx.strokeStyle = 'rgba(' + R + ',' + G + ',' + B + ')';
    ctx.beginPath();
    //   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
    ctx.fill();
  };
  this.update = function () {
    this.y -= this.yVol;
    if (this.radius < 20) {
      this.radius += 0.35;
    }
    if (this.y < boomHeight) {
      this.boom = true;

      for (var i = 0; i < 120; i++) {
        particleArray.push(
          new Particle(
            this.x,
            this.y,
            // (Math.random() * 2) + 0.5//
            Math.random() * 2 + 1,
            this.R,
            this.G,
            this.B,
            1
          )
        );
      }
    }
    this.draw();
  };
  this.update();
}

function Particle(x, y, radius, R, G, B, A) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.R = R;
  this.G = G;
  this.B = B;
  this.A = A;
  this.timer = 0;
  this.fade = false;

  // Change random spread
  this.xVol = Math.random() * 10 - 4;
  this.yVol = Math.random() * 10 - 4;

  this.draw = function () {
    //   ctx.globalCompositeOperation = "lighter"
    ctx.fillStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + this.A + ')';
    ctx.save();
    ctx.beginPath();
    // ctx.fillStyle = "white"
    ctx.globalCompositeOperation = 'screen';
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
    ctx.fill();

    ctx.restore();
  };
  this.update = function () {
    this.x += this.xVol;
    this.y += this.yVol;

    // Comment out to stop gravity.
    if (this.timer < 200) {
      this.yVol += 0.12;
    }
    this.A -= 0.02;
    if (this.A < 0) {
      this.fade = true;
    }
    this.draw();
  };
  this.update();
}

var fireworkArray = [];
var particleArray = [];
for (var i = 0; i < 6; i++) {
  var x = Math.random() * canvas.width;
  var y = canvas.height;
  var R = Math.floor(Math.random() * 255);
  var G = Math.floor(Math.random() * 255);
  var B = Math.floor(Math.random() * 255);
  var height = Math.floor(Math.random() * 20) + 10;
  fireworkArray.push(new Firework(x, y, height, 5, R, G, B));
}

function animate() {
  requestAnimationFrame(animate);
  // ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < fireworkArray.length; i++) {
    fireworkArray[i].update();
  }
  for (var j = 0; j < particleArray.length; j++) {
    particleArray[j].update();
  }
  if (fireworkArray.length < 4) {
    var x = Math.random() * canvas.width;
    var y = canvas.height;
    var height = Math.floor(Math.random() * 20);
    var yVol = 5;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    fireworkArray.push(new Firework(x, y, height, yVol, R, G, B));
  }

  fireworkArray = fireworkArray.filter((obj) => !obj.boom);
  particleArray = particleArray.filter((obj) => !obj.fade);
}
animate();

window.addEventListener('resize', (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
