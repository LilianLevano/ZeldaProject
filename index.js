"use strict";

// Monsters = 835
// Games = 32

const allButtonsCategories = document.querySelectorAll(".category");
const url = `https://zelda.fanapis.com/api/`;
let lastChosenCategory;

let lastPage;

const fetchData = async (category, page) => {
  const url = `https://zelda.fanapis.com/api/${category}?limit=50&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.data;
};

let isLoading;

function addInfo(card, label, value) {
  const title = document.createElement("h2");
  const span = document.createElement("span");

  span.classList.add("without-font");
  span.textContent = value || "None";

  title.textContent = `${label} : `;
  title.classList.add("capital");
  title.append(span);

  card.append(title);
}

function updatePageSelector(cover, page=0){

  const divPaging = document.createElement('nav')
  divPaging.classList.add('page-number-nav')
  const category = cover.id

  divPaging.setAttribute('value', category)
  cover.append(divPaging)

  let allButtons = [];


  const buttonFirtPage = document.createElement('button')
  buttonFirtPage.textContent = "First page"
  buttonFirtPage.value = 0
  allButtons.push(buttonFirtPage)

  const startPage = Math.max(0, page - 1);
  const endPage = startPage + 2;

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.value = i;
    button.classList.add('round-button')
    allButtons.push(button);
    divPaging.append(button);
  }

  divPaging.prepend(buttonFirtPage);


   for(let button of allButtons){
    button.addEventListener('click', async () =>{
    if (isLoading) return;

    try {
      isLoading = true;

      for (let btn of allButtons) {
        btn.disabled = true;
      }

      const selectedPage = Number(button.value);
      lastPage = selectedPage;

      const array = await fetchData(category, selectedPage);
      cover.remove();
      makeCoverCategory(category, array);
    } finally {
      isLoading = false;
    }
    })
   }


}

const makeCoverCategory = (category, arrayResults) => {
  const main = document.getElementById("main");

  const cover = document.createElement("section");
  cover.classList.add("cover-category");
  cover.id = category
  main.appendChild(cover);

  const showPage = document.createElement("p");
  showPage.textContent = `PAGE: ${lastPage ||0}`  

  

  const button = document.createElement("button");
  button.textContent = "Close";
  button.classList.add("cover-category-close");

  button.addEventListener("click", () => {
    lastPage = 0;
    cover.remove();
  });
  cover.appendChild(button);

  const h1 = document.createElement("h1");
  h1.textContent = category;
  h1.classList.add("title-cover");
  cover.append(h1);
  cover.append(showPage);
  updatePageSelector(cover, lastPage)

 

  const containerCards = document.createElement("section");
  containerCards.classList.add("container-cards");

  for (let result of arrayResults) {
    const card = document.createElement("article");
    card.classList.add("card-in-cover-category");
    card.setAttribute("value", result.id);

    const name = document.createElement("h1");
    name.textContent = result.name;
    name.classList.add("name-result");
    card.append(name);

    const description = document.createElement("p");
    description.textContent = result.description;
    description.classList.add("without-font");
    card.append(description);

    const id = document.createElement("p");
    id.textContent = result.id;
    card.append(id);

    switch (category) {
      case "games":
        addInfo(card, "developer", result.developer);
        addInfo(card, "publisher", result.publisher);
        addInfo(card, "release date", result.released_date);

        break;

      case "characters":
        addInfo(card, "gender", result.gender);
        addInfo(card, "race", result.race);
        break;

      case "monsters":
        console.log("monsters selected");
        break;

      case "bosses":
        console.log("bosses selected");
        break;

      case "dungeons":
        console.log("dungeons selected");
        break;

      case "places":
        console.log("places selected");
        break;

      case "items":
        console.log("items selected");
        break;
    }

    containerCards.append(card);
  }

  cover.append(containerCards);
  
   
};

for (let button of allButtonsCategories) {
  button.addEventListener("click", async () => {
    lastChosenCategory = button.getAttribute("value");
    const arrayResults = await fetchData(lastChosenCategory, 0);
    console.log(arrayResults);

    makeCoverCategory(lastChosenCategory, arrayResults);
    
  });
}
