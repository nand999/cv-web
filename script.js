// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  }else{
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }

}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function(){
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function(){
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

// ============================================================
// Home Section Background Particle Animation
// ============================================================
(function () {
  const canvas = document.getElementById('home-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const PARTICLE_COUNT = 80;
  const MAX_DIST = 130;        // max distance for connecting lines
  const COLORS = ['#4070f4', '#6e93f7', '#a0b8ff', '#c0d0ff'];

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : (Math.random() > 0.5 ? -10 : H + 10);
      this.r  = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.5 + 0.3;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;
      // Soft bounce off edges
      if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
        this.reset(false);
      }
    }
    draw() {
      const pulsedR = this.r + Math.sin(this.pulse) * 0.6;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, pulsedR, 0, Math.PI * 2);
      ctx.fillStyle = this.col;
      ctx.shadowColor = this.col;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.25;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = '#4070f4';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  // Subtle floating geometric shapes in background
  function drawShapes() {
    const shapes = [
      { x: W * 0.85, y: H * 0.15, size: 60, rot: 0 },
      { x: W * 0.1,  y: H * 0.75, size: 40, rot: 0 },
      { x: W * 0.75, y: H * 0.80, size: 50, rot: 0 },
    ];
    const t = Date.now() * 0.0003;
    shapes.forEach((s, idx) => {
      const rot = t + idx * 1.2;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(rot);
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = '#4070f4';
      ctx.lineWidth = 2;
      // Draw hexagon
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const angle = (Math.PI / 3) * k;
        const px = Math.cos(angle) * s.size;
        const py = Math.sin(angle) * s.size;
        k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    });
  }

  let animId;
  function animate() {
    ctx.clearRect(0, 0, W, H);

    // No solid fill — let page background show through
    drawShapes();
    drawLines();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  resize();
  init();
  animate();
})();