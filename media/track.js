const track = document.getElementById('marquee-track');
const marquee = document.getElementById('marquee');

const items = [...track.children];
items.forEach(item => {
  const clone = item.cloneNode(true);
  track.appendChild(clone);
});

let offset = 0;
let lastTimestamp: number | null = null;
const speed = 50;
let isPaused = false;

function animate(timestamp: number) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  if (!isPaused) {
    offset -= (speed * delta) / 1000;

    const firstItemWidth =
      items[0].offsetWidth + parseFloat(getComputedStyle(track).gap || '0');
    const totalWidth = firstItemWidth * items.length;

    if (Math.abs(offset) >= totalWidth) {
      offset += totalWidth;
    }

    track.style.transform = `translateX(${offset}px)`;
  }

  requestAnimationFrame(animate);
}

marquee.addEventListener('mouseenter', () => (isPaused = true));
marquee.addEventListener('mouseleave', () => (isPaused = false));

requestAnimationFrame(animate);
