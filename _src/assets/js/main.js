'use strict';

// HTML elements
const searchBarEl = document.querySelector('.search-bar');
const submitBtnEl = document.querySelector('.submit-btn');
const resultsListEl = document.querySelector('.results__list');

// Variables used in different scopes, therefore must be global
let searchValue = '';

// Add listener to search button
submitBtnEl.addEventListener('click', handleSearchBtn);

// When button is clicked
function handleSearchBtn(event) {
  // Prevent default behavior (input type submit in a form refreshes the page because tries to send info to backend)
  event.preventDefault();
  // API request
  fetchData();
}

// API request function
function fetchData() {
  // Store in a constant the base API with search query parameter
  const baseApi = 'http://api.tvmaze.com/search/shows?q=';
  // Info in the search query parameter must be the user's search
  searchValue = searchBarEl.value;
  // URI for API request is composed of base API and the user's search
  const uri = baseApi + searchValue;

  //API request
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      let resultsContent = '';

      // data is an array of objects. Each object contains a TV show's info. For each of these objects:
      for (let i = 0; i < data.length; i++) {
        // Store the show's name in a constant
        const showName = data[i].show.name;

        // Store the show's image in a constant
        const showImage = data[i].show.image;

        // Store the show's id in a constant
        const showID = data[i].show.id;

        // If there's no image available
        if (!showImage) {
          resultsContent += `<li class="results__item results__item${[i + 1]}" id="${showID}"> <img src="https://via.placeholder.com/210x295/cccccc/666666/?text=TV" alt=""> <h2>${showName}</h2></li>`;
        } else { // If there's an image available
          resultsContent += `<li class="results__item results__item${[i + 1]}" id="${showID}"> <img src="${showImage.medium}" alt=""> <h2>${showName}</h2></li>`;
        }
      }
      // Paint results in HTML
      resultsListEl.innerHTML = resultsContent;

      // After the list of the shows matching the user's search appears, the user can click on each show to add it to favorites
      // First we collect the items created, they are stored in an array and we add a listener to them. Also, if a show's id is in localStorage, that means it's a favorite show: add the favorite class to the item created, whatever the user's search is
      collectShowItems();
    });
}

// Function to collect the items created after the user's search and add a listener to them. Also, if the item's id is in localStorage, it has to appear as a favorite show: add the favorite class to that item every time it appears in a user's search
function collectShowItems() {
  // Create an array with all the items
  const resultsItems = resultsListEl.querySelectorAll('.results__item');

  // For each item in the array
  for (const item of resultsItems) {
    // Add a listener
    item.addEventListener('click', handleFavoriteShow);
    // Get item's id
    const itemID = parseInt(item.getAttribute('id'));
    // Get localStorage info for that item (if that item is storaged, localStorage contains the item's id; else it's null)
    const savedShow = localStorage.getItem(`${itemID}`);
    // If the item's id is in localStorage
    if (!!savedShow && savedShow.includes(itemID)) {
      // Add favorite class to item
      item.classList.add('results__item--favorite');
    }
  }
}

// When a show is clicked
function handleFavoriteShow(event) {
  // Store the clicked show in a constant
  const currentShow = event.currentTarget;
  // Store the clicked show's id in a constant
  const currentShowID = parseInt(currentShow.getAttribute('id'));

  // Styles for clicked show are changed. If user clicks again to unfav the show, the item's styles return to default
  currentShow.classList.toggle('results__item--favorite');

  // If the clicked show is added to favorites
  if (!!currentShow.classList.contains('results__item--favorite')) {
    // Store its id in localStorage
    localStorage.setItem(`${currentShowID}`, `${currentShowID}`);
  } else if (!currentShow.classList.contains('results__item--favorite')) { //If the clicked show is removed from favorites
    // Remove its id from localStorage
    localStorage.removeItem(`${currentShowID}`);
  }
}