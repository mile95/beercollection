function fetchData() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      renderTable(data);
      const total = data.length;
      const obtained = data.filter(i => i.obtained).length;
      updateHeaderCount(total, obtained);
      setupImagePopup();
    })
    .catch(error => console.error('Error fetching the JSON:', error));
}

function renderTable(data) {
  const tableContainer = document.getElementById('beerTable');

  data.forEach(beer => {
    const imageClass = beer.class === 'large' ? 'large-image' : 'small-image';
    const obtained = beer.obtained ? "obtained" : "non-obtained"

    tableContainer.innerHTML += `
      <span class="${obtained}">${beer.name}</span>
      <span class="${obtained}">${beer.brewery}</span>
      <span class="${obtained}">${beer.team}</span>
      <span class="${obtained} + column-wide">${beer.extra}
        <br><br>
        <span>
          <a href="${beer.references}" target="_blank">Reference</a>
        </span>
      </span>
      <div class="${obtained} + image-container">
        <img src="${beer.image}" class="${imageClass}" alt="${beer.name}" data-fullsize="${beer.image}">
      </div>
      <span class="${obtained}">${beer.obtained ? beer.obtained : 'N/A'}</span>
    `;
  });
}

function updateHeaderCount(total, obtained) {
  document.getElementById('headerCount').innerText = `${obtained}/${total} beers collected`;
}

function setupImagePopup() {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModal = document.getElementById('closeModal');

  document.querySelectorAll('.image-container img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImage.src = img.dataset.fullsize;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

fetchData();
