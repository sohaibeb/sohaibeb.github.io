const marquee = document.getElementById('marquee');
const track = document.getElementById('marquee-track');

const cloneTrack = () => {
  const trackWidth = track.scrollWidth;
  const containerWidth = marquee.offsetWidth;

  while (track.scrollWidth < containerWidth * 2) {
    const clone = track.cloneNode(true);
    clone.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
    track.append(...clone.children);
  }
};

cloneTrack();

let offset = 0;
const speed = 0.5; //<-- 
let isPaused = false;

function animate() {
  if (!isPaused) {
    offset -= speed;
    if (Math.abs(offset) >= track.scrollWidth / 2) {
      offset = 0;
    }
    track.style.transform = `translateX(${offset}px)`;
  }
  requestAnimationFrame(animate);
}

marquee.addEventListener('mouseenter', () => (isPaused = true));
marquee.addEventListener('mouseleave', () => (isPaused = false));

requestAnimationFrame(animate);
