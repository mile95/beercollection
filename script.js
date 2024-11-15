function fetchData() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      renderTable(data);
      updateHeaderCount(data.length);
      setupImagePopup();
    })
    .catch(error => console.error('Error fetching the JSON:', error));
}

function renderTable(data) {
  const tableContainer = document.getElementById('beerTable');

  data.forEach(beer => {
    const imageClass = beer.class === 'large' ? 'large-image' : 'small-image';

    tableContainer.innerHTML += `
      <span>${beer.name}</span>
      <span>${beer.brewery}</span>
      <span>${beer.team}</span>
      <span class="column-wide">${beer.extra}
        <br><br>
        <span>
          <a href="${beer.references}" target="_blank">Reference</a>
        </span>
      </span>
      <div class="image-container">
        <img src="${beer.image}" class="${imageClass}" alt="${beer.name}" data-fullsize="${beer.image}">
      </div>
      <span>${beer.obtained}</span>
    `;
  });
}

function updateHeaderCount(count) {
  document.getElementById('headerCount').innerText = `${count} beers collected`;
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
