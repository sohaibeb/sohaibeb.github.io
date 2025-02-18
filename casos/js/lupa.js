document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".equips").forEach((img) => {
        let lupa = document.createElement("div");
        lupa.classList.add("lupa-lens");
        document.body.appendChild(lupa);

        img.addEventListener("mousemove", function (e) {
            let { left, top, width, height } = img.getBoundingClientRect();
            let x = e.pageX - left - window.scrollX;
            let y = e.pageY - top - window.scrollY;

            lupa.style.display = "block";
            lupa.style.left = `${e.pageX}px`;
            lupa.style.top = `${e.pageY}px`;
            lupa.style.backgroundImage = `url(${img.src})`;
            lupa.style.backgroundSize = `${width * 2}px ${height * 2}px`;
            lupa.style.backgroundPosition = `-${x}px -${y}px`;
        });

        img.addEventListener("mouseleave", function () {
            lupa.style.display = "none";
        });
    });
});
