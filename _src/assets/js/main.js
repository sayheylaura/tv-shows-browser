'use strict';

const searchBarEl = document.querySelector('.search-bar');
const submitBtnEl = document.querySelector('.submit-btn');
const resultsListEl = document.querySelector('.results__list');

submitBtnEl.addEventListener('click', handleSearchBtn);

function fetchData() {
  const baseApi = 'http://api.tvmaze.com/search/shows?q=';
  const searchValue = searchBarEl.value;
  const uri = baseApi + searchValue;
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let resultsContent = '';
      for (let i = 0; i < data.length; i++) {
        const showName = data[i].show.name;
        if (data[i].show.image === null) {
          resultsContent += `<li><img src="https://via.placeholder.com/210x295/cccccc/666666/?text=TV" alt=""><h2>${showName}</h2></li>`;
        } else {
          resultsContent += `<li><img src="${data[i].show.image.medium}" alt=""><h2>${showName}</h2></li>`;
        }
      }
      resultsListEl.innerHTML = resultsContent;
    });
}

function handleSearchBtn(event) {
  event.preventDefault();
  fetchData();
}