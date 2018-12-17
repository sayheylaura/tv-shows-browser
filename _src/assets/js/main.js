'use strict';

const searchBarEl = document.querySelector('.search-bar');
const submitBtnEl = document.querySelector('.submit-btn');
const resultsListEl = document.querySelector('.results__list');

submitBtnEl.addEventListener('click', handleSearchBtn);

function fetchData() {
    const baseApi = 'http://api.tvmaze.com/search/shows?q=';
    const searchValue = searchBarEl.value;
    const uri = baseApi + searchValue;
    console.log(uri);
}

function handleSearchBtn(event) {
    event.preventDefault();
    fetchData();
}