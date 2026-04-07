const res = await fetch("data/data.json");
const data = await res.json();

function loadAllItems(data, array = false) {
  let armors;
  if (array) {
    armors = data;
  } else {
    armors = Object.values(data.armors);
  }

const order = {
  "Head": 0,
  "Chest": 1,
  "Legs": 2
};

armors.sort((a, b) => {
  const setA = a.setName || "zzz";
  const setB = b.setName || "zzz";

  const setCompare = setA.localeCompare(setB);
  if (setCompare !== 0) return setCompare;

  return order[a.bodyPart] - order[b.bodyPart];
});

  const mainList = document.getElementById("all-items");
  mainList.innerHTML = "";

  for (const armor of armors) {
    const card = document.createElement("article");
    card.classList.add("item");

    const divImage = document.createElement("div");
    divImage.classList.add("image");

    const img = document.createElement("img");
    img.src = "../images/totk/armors/" + armor.image;
    divImage.append(img);
    card.append(divImage);

    const divText = document.createElement("div");
    divText.classList.add("text-item");

    const nameArmor = document.createElement("h2");
    nameArmor.textContent = armor.name || "N/A";
    divText.append(nameArmor);

    const setName = document.createElement("h3");
    setName.textContent = "Set: " + (armor.setName || "N/A");
    divText.append(setName);

    const bodyPart = document.createElement("p");
    bodyPart.textContent = armor.bodyPart || "N/A";
    divText.append(bodyPart);

    const ns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("xmlns", ns);
    svg.setAttribute("height", "40px");
    svg.setAttribute("width", "40px");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("fill", "#000000");

    const path = document.createElementNS(ns, "path");
    path.setAttribute(
      "d",
      "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z",
    );

    svg.appendChild(path);

    const a = document.createElement("a");
    a.href = armor.wiki;
    a.classList.add("external-link");
    a.append(svg);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "obtained-button";
    input.id = armor.name;
    input.classList.add("obtained-button");

    const allObtainedArmors = JSON.parse(localStorage.getItem("armors")) || {};

    if (allObtainedArmors[armor.name]?.obtained === true) {
      input.checked = true;
    }

    input.addEventListener("change", () => {
      saveArmorState(armor.name, input.checked, 0);
      let obtainedArmor =
        JSON.parse(localStorage.getItem("obtainedArmors")) || [];

      if (input.checked === true) {
        if (!obtainedArmor.some((a) => a.name === armor.name)) {
          obtainedArmor.push(armor);
          armor.obtained = true;
        }
      } else {
        obtainedArmor = obtainedArmor.filter((a) => a.name !== armor.name);
        armor.obtained = false;
      }

      localStorage.setItem("obtainedArmors", JSON.stringify(obtainedArmor));
      console.info(JSON.parse(localStorage.getItem("obtainedArmors")));
    });

    divText.append(a, input);
    card.append(divText);
    mainList.append(card);
  }
}

loadAllItems(data);

function saveArmorState(name, obtained, level) {
  const data = JSON.parse(localStorage.getItem("armors")) || {};

  data[name] = {
    obtained,
    level,
  };

  localStorage.setItem("armors", JSON.stringify(data));
  console.log(JSON.parse(localStorage.getItem("armors")));
}

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  localStorage.setItem("armors", null);
  localStorage.setItem("obtainedArmors", JSON.stringify([]));
  console.log(localStorage.getItem("armors"));
});

const buttonObtainedOnly = document.getElementById("obtained-switch");
const buttonNotObtainedOnly = document.getElementById("not-obtained-switch");

buttonObtainedOnly.addEventListener("change", () => {
  if (buttonNotObtainedOnly.checked && buttonObtainedOnly.checked) {
    buttonNotObtainedOnly.checked = false;
  }

  const obtainedArmor =
    JSON.parse(localStorage.getItem("obtainedArmors")) || [];

  if (buttonObtainedOnly.checked) {
    loadAllItems(obtainedArmor, true);
  } else {
    loadAllItems(data);
  }
});

buttonNotObtainedOnly.addEventListener("click", () => {
  if (buttonNotObtainedOnly.checked && buttonObtainedOnly.checked) {
    buttonObtainedOnly.checked = false;
  }

  for (const [name, armor] of Object.entries(data)) {
  console.log(name, armor);
}
  
});
