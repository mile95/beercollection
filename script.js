document.addEventListener("DOMContentLoaded", function () {
    function shuffleImages() {
        const container = document.getElementById('imageContainer');
        const images = Array.from(container.getElementsByTagName('img'));

        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }

        container.innerHTML = '';
        images.forEach(img => container.appendChild(img));

        const imageCountHeader = document.getElementById('headerCount');
        imageCountHeader.textContent = `${images.length} beers collected`;
    }

    shuffleImages();
});
