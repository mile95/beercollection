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

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tableContainer = document.getElementById('beerTable');

    data.forEach(beer => {
      const imageClass = beer.class === 'large' ? 'large-image' : 'small-image';

      tableContainer.innerHTML += `
        <span>${beer.name}</span>
        <span>${beer.brewery}</span>
        <span>${beer.team}</span>
        <span class="column-wide">${beer.extra}</span>
        <span><a href="${beer.references}" target="_blank">Reference</a></span>
        <div class="image-container">
          <img src="${beer.image}" class="${imageClass}">
        </div>
      `;
    });

    document.getElementById('headerCount').innerText = `Total Beers: ${data.length}`;
  })
  .catch(error => console.error('Error fetching the JSON:', error));
