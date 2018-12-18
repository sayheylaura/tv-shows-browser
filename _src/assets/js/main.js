'use strict';

const searchBarEl = document.querySelector('.search-bar');
const submitBtnEl = document.querySelector('.submit-btn');
const resultsListEl = document.querySelector('.results__list');

let savedData = '';
let showsIDs = [];

submitBtnEl.addEventListener('click', handleSearchBtn);

// When button is clicked
function handleSearchBtn(event) {
  // Prevent default behavior (input type submit in a form refreshes the page)
  event.preventDefault();
  // API request 
  fetchData();
}

// Function of API request
function fetchData() {
  // Store in a constant the base API with search query parameter
  const baseApi = 'http://api.tvmaze.com/search/shows?q=';
  // Info in the search query parameter must be the user's search
  const searchValue = searchBarEl.value;
  // URI for API request is composed of base API and the user's search
  const uri = baseApi + searchValue;

  //API request
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      savedData = data;
      let resultsContent = '';
      // data is an array of objects. Each object contains a TV show's info. For each of these objects:
      for (let i = 0; i < savedData.length; i++) {
        // Store the show's name in a constant
        const showName = savedData[i].show.name;

        // Store the show's id in a constant
        const showID = savedData[i].show.id;

        // If there's no image available
        if (savedData[i].show.image === null) {
          resultsContent += `<li class="results__item results__item${[i + 1]}" id="${showID}"><img src="https://via.placeholder.com/210x295/cccccc/666666/?text=TV" alt=""><h2>${showName}</h2></li>`;
        } else { // If there's an image available
          resultsContent += `<li class="results__item results__item${[i + 1]}" id="${showID}"><img src="${savedData[i].show.image.medium}" alt=""><h2>${showName}</h2></li>`;
        }
      }
      // Paint results in html
      resultsListEl.innerHTML = resultsContent;

      // After the list of the shows matching the user's search appears, the user can click on each show to add it to favorites
      // First we collect the items created, they are stored in an array and we add a listener to them
      collectShowItems();
    });
}

// Function to collect the items created after the user's search and add a listener to them
function collectShowItems() {
  const resultsItems = resultsListEl.querySelectorAll('.results__item');
  for (const item of resultsItems) {
    item.addEventListener('click', handleFavoriteShow);
  }
}

// When a show is clicked
function handleFavoriteShow(event) {
  // We store the clicked show in a constant
  const currentShow = event.currentTarget;

  // Background-color changes and a border is added
  currentShow.classList.toggle('results__item--favorite');

  // Create an array with favorite shows
  const favoriteShows = resultsListEl.querySelectorAll('.results__item--favorite');
  console.log(favoriteShows);

  // Store the favorite show's ids in another array
  showsIDs = [];
  for (const show of favoriteShows) {
    const currentShowID = parseInt(show.getAttribute('id'));
    showsIDs.push(currentShowID);
  }
  console.log(showsIDs);
  
  // Store the id's array in localStorage
  localStorage.setItem('showsIDs', JSON.stringify(showsIDs));
}