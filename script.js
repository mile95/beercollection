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
        <span><a href="${beer.references}" target="_blank">reference</a></span>
        <div class="image-container">
          <img src="${beer.image}" class="${imageClass}">
        </div>
        <span>${beer.obtained}</span>
      `;
    });

    document.getElementById('headerCount').innerText = `${data.length} beers collected`;
  })
  .catch(error => console.error('Error fetching the JSON:', error));
