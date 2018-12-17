'use strict';

const searchBarEl = document.querySelector('.search-bar');
const submitBtnEl = document.querySelector('.submit-btn');
const resultsListEl = document.querySelector('.results__list');

submitBtnEl.addEventListener('click', handleSearchBtn);

function handleSearchBtn(event) {
    event.preventDefault();
    console.log('hola');
}