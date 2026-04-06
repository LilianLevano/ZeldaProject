let alleCategorieen = document.querySelectorAll(".categorie");
let laatsteGeselecteerdeCategorie = document.getElementById("eersteCat");
let divItems = document.getElementById("items-container");
let alleItems = document.querySelectorAll(".item");
let laatsteGekozeItem;

document.addEventListener("DOMContentLoaded", async () => {
  await resetItemContainer();
  alleItems = document.querySelectorAll(".item");
});

document.getElementById("test").addEventListener("click", () => {
  console.log(laatsteGekozeItem);
});

for (let buttonCategorie of alleCategorieen) {
  buttonCategorie.addEventListener("click", async () => {
    laatsteGeselecteerdeCategorie = buttonCategorie;

    await resetItemContainer();

    alleItems = document.querySelectorAll(".item");
  });
}

async function resetItemContainer() {
  divItems.innerHTML = "";

  let valueGeselecteerdeCategorie =
    laatsteGeselecteerdeCategorie.getAttribute("value");

  await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/category/${valueGeselecteerdeCategorie}`,
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let lijstData = data.data;

      for (let item of lijstData) {
        let naamItem = item.name;
        let idItem = item.id;
        let urlImageItem = item.image;

        let itemCard = document.createElement("article");
        itemCard.classList.add("item");

        itemCard.addEventListener("click", () => {
          console.log(itemCard);
          console.log(itemCard.getAttribute("value"));
          laatsteGekozeItem = itemCard;
          toonAlleInfo(itemCard);
        });

        let divInfoItem = document.createElement("div");
        divInfoItem.classList.add("info-item");

        let titelItem = document.createElement("h2");
        titelItem.classList.add("titel-item");
        titelItem.textContent = naamItem;

        divInfoItem.appendChild(titelItem);

        let idItemHTML = document.createElement("p");
        idItemHTML.classList.add("id-item");
        idItemHTML.textContent = idItem;

        divInfoItem.appendChild(idItemHTML);

        let img = document.createElement("img");
        img.src = urlImageItem;

        itemCard.appendChild(img);
        itemCard.appendChild(divInfoItem);
        itemCard.setAttribute("value", idItem);
        divItems.appendChild(itemCard);
      }
    });
}

function toonAlleInfo(itemCard) {
  fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${itemCard.getAttribute("value")}`,
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);

      let item = data.data;

      let cover = document.createElement("section");
      cover.classList.add("cover");
      document.body.appendChild(cover);

      let article = document.createElement("article");

      let h1TitelItem = document.createElement("h1");
      h1TitelItem.textContent = item.name;
      article.appendChild(h1TitelItem);

      let divInArticle = document.createElement("div");
      divInArticle.classList.add("in-article");

      let img = document.createElement("img");
      img.src = item.image;
      divInArticle.appendChild(img);

      let beschrijving = document.createElement("p");
      beschrijving.textContent = item.description;
      divInArticle.appendChild(beschrijving);

      let divExtraInfo = document.createElement("div");
      divExtraInfo.classList.add("extraInfo");

      let h2Drops = document.createElement("h2");

      let arrayDrops = item.drops;

      if (arrayDrops) {
        h2Drops.textContent = "DROPS:";
        divExtraInfo.appendChild(h2Drops);
        let p = document.createElement("p");

        if (arrayDrops.length === 0) {
          p.textContent = "No drops";
          divExtraInfo.appendChild(p);
        } else {
          for (let drop of arrayDrops) {
            p.textContent += drop + ", ";
          }

          divExtraInfo.appendChild(p);
        }
      }

      let buttonSluiten = document.createElement("button");
      buttonSluiten.textContent = "Sluiten";

      buttonSluiten.classList.add("close-button");
      buttonSluiten.addEventListener("click", () => {
        cover.remove();
      });

      article.appendChild(divInArticle);
      article.appendChild(divExtraInfo);
      article.appendChild(buttonSluiten);
      cover.appendChild(article);
    });
}
