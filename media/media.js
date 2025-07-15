class LogosMarquee {
  constructor({
    containerSelector = ".marquee__ctn",
    trackSelector = ".marquee__track",
    speed = 60
  } = {}) {
    this.container = document.querySelector(containerSelector);
    this.track = document.querySelector(trackSelector);
    this.speed = speed;

    if (!this.container || !this.track) return;

    this.trackWidth = this.track.getBoundingClientRect().width;
    this.pos = 0;
    this.start = null;
    this.rafId = null;
    this.isPaused = true; // ✅ Start in paused state

    this.init();
  }

  init() {
    // Clone track for seamless scroll
    this.clone = this.track.cloneNode(true);
    this.container.appendChild(this.clone);
    this.container.style.width = `${this.trackWidth * 2}px`;
    this.container.style.willChange = "transform";

    this.animate = this.animate.bind(this);

    // Hover pause/resume
    this.container.addEventListener("mouseenter", () => this.pause());
    this.container.addEventListener("mouseleave", () => this.resume());

    this.resume(); // ✅ Start scrolling immediately
  }

  animate(timestamp) {
    if (!this.start) this.start = timestamp;

    const elapsed = timestamp - this.start;
    this.pos = -(elapsed / 1000) * this.speed;

    if (Math.abs(this.pos) >= this.trackWidth) {
      this.start = timestamp;
      this.pos = 0;
    }

    this.container.style.transform = `translateX(${this.pos}px)`;

    if (!this.isPaused) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  pause() {
    this.isPaused = true;
    cancelAnimationFrame(this.rafId);
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.start = performance.now() - (Math.abs(this.pos) / this.speed) * 1000;
    this.rafId = requestAnimationFrame(this.animate);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    if (this.clone) this.clone.remove();
    this.container.style.transform = "";
    this.container.style.willChange = "";
    this.container.removeEventListener("mouseenter", this.pause);
    this.container.removeEventListener("mouseleave", this.resume);
  }
}

window.addEventListener("load", () => {
  new LogosMarquee({
    containerSelector: ".marquee__ctn",
    trackSelector: ".marquee__track",
    speed: 80
  });
});
