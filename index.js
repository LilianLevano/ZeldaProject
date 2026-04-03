"use strict";

// Monsters = 835
// Games = 32

const allButtonsCategories = document.querySelectorAll(".category");
const url = `https://zelda.fanapis.com/api/`;
let lastChosenCategory;

let lastPage;

const fetchData = async (category, page) => {
  let data;
  let res;

  switch (category) {
    case "games":
      res = await fetch(
        `https://zelda.fanapis.com/api/games?limit=50&page=${page}`,
      );
      data = await res.json();
      break;
      

    case "characters":
      console.log("characters selected");
      res = await fetch(
        `https://zelda.fanapis.com/api/characters?limit=50&page=${page}`,
      );
      data = await res.json();
      break;

    case "monsters":
      console.log("monsters selected");
            res = await fetch(
        `https://zelda.fanapis.com/api/monsters?limit=50&page=${page}`,
      );
      data = await res.json();
      break;

    case "bosses":
      console.log("bosses selected");
            res = await fetch(
        `https://zelda.fanapis.com/api/bosses?limit=50&page=${page}`,
      );
      data = await res.json();
      break;

    case "dungeons":
      console.log("dungeons selected");
            res = await fetch(
        `https://zelda.fanapis.com/api/dungeons?limit=50&page=${page}`,
      );
      data = await res.json();
      break;

    case "places":
      console.log("places selected");
            res = await fetch(
        `https://zelda.fanapis.com/api/places?limit=50&page=${page}`,
      );
      data = await res.json();
      break;

    case "items":
      console.log("items selected");
            res = await fetch(
        `https://zelda.fanapis.com/api/items?limit=50&page=${page}`,
      );
      data = await res.json();
      break;
  }

  return data.data;
};

const makeCoverCategory = (category, arrayResults) => {
  const main = document.getElementById("main");

  const cover = document.createElement("section");
  cover.classList.add("cover-category");
  main.appendChild(cover);

  const inputPage = document.createElement("input");
  inputPage.type = "number";
  inputPage.id = "page-number";
  inputPage.placeholder = lastPage || 0;

  inputPage.addEventListener("change", async () => {
    let page = Number(inputPage.value);
    
    let arrayResults = await fetchData(category, page);
    lastPage = page;
    cover.remove();
    makeCoverCategory(category, arrayResults);
  });

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
  cover.append(inputPage);

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
        const developperTitle = document.createElement("h2");
        const developper = document.createElement("span");
        developper.classList.add("without-font");
        developper.textContent = result.developer;

        developperTitle.textContent = `developper : `;
        developperTitle.classList.add("capital");
        developperTitle.append(developper);
        card.append(developperTitle);

        const publisherTitle = document.createElement("h2");
        const publisher = document.createElement("span");
        publisher.classList.add("without-font");
        publisher.textContent = result.publisher;

        publisherTitle.textContent = `publisher : `;
        publisherTitle.classList.add("capital");
        publisherTitle.append(publisher);
        card.append(publisherTitle);

        const releasedDateTitle = document.createElement("h2");
        const releasedDate = document.createElement("span");
        releasedDate.classList.add("without-font");
        releasedDate.textContent = result.released_date;

        releasedDateTitle.textContent = `Release date : `;
        releasedDateTitle.classList.add("capital");
        releasedDateTitle.append(releasedDate);
        card.append(releasedDateTitle);

        break;

      case "characters":
        console.log("characters selected");
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
