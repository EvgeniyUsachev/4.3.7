'use strict';

const input = document.querySelector('input');
const inputValue = document.querySelector('input').value;
// const li = document.querySelectorAll('li');
const completeBox = document.querySelector('.autocomplete-box');
const cardName = document.querySelector('.card-name');
const cardOwner = document.querySelector('.card-owner');
const cardStars = document.querySelector('.card-stars');
const searchInput = document.querySelector('.search-input');
const wrapper = document.querySelector('.wrapper');
function debounce(fn) {
  let interval;
  return function () {
    let callFn = () => fn.apply(this, arguments);

    clearTimeout(interval);

    interval = setTimeout(callFn, 400);
  };
}

input.addEventListener('keyup', debounce(main));

async function addRepoCard(repoArr) {
  let liArr = Array.from(li);
  liArr.forEach((item) => {
    item.addEventListener('click', addCard);
  });
  async function addCard(e) {
    // console.log(repoArr.items[0]);
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    const name = document.createElement('span');
    name.textContent = `Name: ${repoArr.items[liArr.indexOf(e.target)].name}`;
    newCard.appendChild(name);

    const owner = document.createElement('span');
    owner.textContent = `Owner: ${
      repoArr.items[liArr.indexOf(e.target)].owner.login
    }`;
    newCard.appendChild(owner);

    const stars = document.createElement('span');
    stars.textContent = `Stars: ${
      repoArr.items[liArr.indexOf(e.target)].stargazers_count
    }`;

    newCard.appendChild(stars);

    wrapper.appendChild(newCard);
    ///

    ///

    ///

    // console.log(repoArr.items[liArr.indexOf(e.target)].owner.login);
    // const stars = document.createElement('span');
    // stars.textContent = repoArr.items[liArr.indexOf(e.target)].stargazers_count;
    // const owner = document.createElement('span');
    // owner.textContent = repoArr.items[liArr.indexOf(e.target)].owner.login;
    // const name = document.createElement('span');
    // name.textContent = repoArr.items[liArr.indexOf(e.target)].name;
    // cardOwner.appendChild(owner);
    // cardName.appendChild(name);
    // cardStars.appendChild(stars);
  }
}

async function main(e) {
  try {
    let userInput = e.target.value;
    let repoArr = await getRepos(userInput);
    let shortArr = await showRepos(repoArr);
    await addRepoCard(shortArr);
  } catch (e) {
    completeBox.classList.remove('autocomplete-box--active');
    li.remove();
  }
}

function getRepos(userInput) {
  return fetch(
    `https://api.github.com/search/repositories?q=${userInput}+in:name&sort=stars`
  ).then((response) => response.json());
}

async function showRepos(repoArr) {
  console.log(repoArr);
  //   console.log(repoArr.items[0]);

  try {
    if (repoArr) {
      for (let i = 0; i < 5; i++) {
        const li = document.createElement('li');
        li.textContent = repoArr.items[i].name;
        completeBox.appendChild(li);
        completeBox.classList.add('autocomplete-box--active1');
        console.log(li);
      }
    } else {
      li.remove();
    }
  } catch (e) {
    completeBox.classList.remove('autocomplete-box--active1');
    li.forEach((item) => item.remove);
  }
  return repoArr;
}
