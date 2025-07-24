const track = document.getElementById('marquee-track');
const marquee = document.getElementById('marquee');

const clone = track.cloneNode(true);
track.parentElement.appendChild(clone);

let offset = 0;
const speed = 0.5;
let isPaused = false;

function animate() {
    if (!isPaused) {
        offset -= speed;

        if (offset <= -track.offsetWidth) {
            offset = 0;
        }

        track.style.transform = `translateX(${offset}px)`;
        clone.style.transform = `translateX(${offset + track.offsetWidth}px)`;
    }
    requestAnimationFrame(animate);
}

marquee.addEventListener('mouseenter', () => (isPaused = true));
marquee.addEventListener('mouseleave', () => (isPaused = false));

requestAnimationFrame(animate);
