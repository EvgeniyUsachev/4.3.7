'use strict';

const input = document.querySelector('input');
const inputValue = document.querySelector('input').value;
const li = document.querySelectorAll('li');
const completeBox = document.querySelector('.autocomplete-box');
const cardName = document.querySelector('.card-name');
const cardOwner = document.querySelector('.card-owner');
console.log(li);
function debounce(fn) {
  let interval;
  return function () {
    let callFn = () => fn.apply(this, arguments);

    clearTimeout(interval);

    interval = setTimeout(callFn, 400);
  };
}
// let b;
async function onChange(e) {
  return new Promise((resolve, reject) => {
    let b = e.target.value;
    console.log(e.target.value);
    resolve(b);
  })
    .then((input) =>
      fetch(
        `https://api.github.com/search/repositories?q=${input}+in:name&sort=stars`
      )
    )
    .then((response) => response.json())
    .then((repoArr) => showRepo(repoArr))
    .then((repoArr) =>
      li.forEach((item) => {
        item.addEventListener('click', addCard(repoArr));
      })
    )
    .catch((error) => completeBox.classList.remove('autocomplete-box--active'));
}

onChange = debounce(onChange);
input.addEventListener('keyup', onChange);

async function showRepo(repoArr) {
  console.log(repoArr);
  console.log(repoArr.items[0]);
  try {
    for (let i = 0; i < 5; i++) {
      li[i].textContent = repoArr.items[i].name;
    }
    completeBox.classList.add('autocomplete-box--active');
  } catch (e) {
    completeBox.classList.remove('autocomplete-box--active');
  }
  return repoArr;
}

li.forEach((item) => {
  item.addEventListener('click', addCard);
});

async function addCard(repoArr) {
  return new Promise((resolve, reject) => {
    const name = document.createElement('span');
    name.textContent = repoArr.items[0].name;

    cardName.appendChild(name);
  });

  // card.classList.add('card');
  // const name = document.createElement('span');
  // name.classList.add('name');
  // name.textContent =
}

// function cardTemplate(post) {
//   const card = document.createElement('div');
//   card.classList.add('card');
//   const cardBody = document.createElement('div');
//   cardBody.classList.add('card-body');
//   const title = document.createElement('h5');
//   title.classList.add('card-title');
//   title.textContent = post.title;
//   const article = document.createElement('p');
//   article.textContent = post.body;
//   article.classList.add('card-text');
//   cardBody.appendChild(title);
//   cardBody.appendChild(article);
//   card.appendChild(cardBody);
//   return card;
// }
