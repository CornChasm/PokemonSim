let partyArray = JSON.parse(localStorage.getItem("playerParty"));
let enemyPartyArray = JSON.parse(localStorage.getItem("enemyParty"));
localStorage.setItem("playerParty", JSON.stringify(partyArray));
localStorage.setItem("enemyParty", JSON.stringify(enemyPartyArray));
if (localStorage.getItem("playerParty")) {
  partyArray = JSON.parse(localStorage.getItem("playerParty"));
  enemyPartyArray = JSON.parse(localStorage.getItem("enemyParty"));
  for (let i = 0; i < partyArray.length; i++) {
    document.getElementById(`partyText${i}`).innerHTML = `${
      pokemonStats[partyArray[i].number].name
    }`;
    document.getElementById(
      `partyImage${i}`
    ).style.backgroundImage = `url(../res/img/Gen1Opponent.png)`;
    document.getElementById(`partyImage${i}`).style.backgroundPositionX = `-${
      64 * (partyArray[i].number - 1)
    }px`;
    document.getElementById(`partyImage${i}`).style.backgroundPositionY = `-${
      64 * Math.floor((partyArray[i].number - 1) / 30)
    }px`;
  }
}

const moveGrid = document.querySelector(".moveGrid");
let moveGridChildren = moveGrid.children;
let currentMoveClicked = 0;
let currentOutline = 1;
for (let i = 0; i < pokemonMoves.length - 1; i++) {
  moveGrid.appendChild(document.createElement("div"));
  moveGridChildren[i].setAttribute("id", `move${i}`);
  moveGridChildren[i].innerHTML = `${pokemonMoves[i + 1].name}`;
  moveGridChildren[i]
    .appendChild(document.createElement("div"))
    .setAttribute("id", `nameType${i}`);
  document.getElementById(`nameType${i}`).style.backgroundPositionX = `-${
    80 * pokemonTypes.findIndex((el) => el.type === pokemonMoves[i + 1].type)
  }px`;
  document.getElementById(`move${i}`).onclick = () => {
    currentMoveClicked = i + 1;
    document.getElementById(`move${currentOutline - 1}`).style.outlineColor =
      "black";
    document.getElementById(`move${i}`).style.outlineColor = "#c30a0a";
    currentOutline = currentMoveClicked;
    document.querySelector(
      ".name"
    ).innerHTML = `${pokemonMoves[currentMoveClicked].name}`;
    document.querySelector(
      ".attack"
    ).innerHTML = `ATK: ${pokemonMoves[currentMoveClicked].attack}`;
    document.querySelector(
      ".accuracy"
    ).innerHTML = `ACC: ${pokemonMoves[currentMoveClicked].accuracy}`;
    document.querySelector(
      ".pp"
    ).innerHTML = `PP: ${pokemonMoves[currentMoveClicked].pp}`;
    document.querySelector(
      ".description"
    ).innerHTML = `${pokemonMoves[currentMoveClicked].description}`;
    document.getElementById("type1").style.backgroundPositionX = `-${
      80 *
      pokemonTypes.findIndex(
        (el) => el.type === pokemonMoves[currentMoveClicked].type
      )
    }px`;
    document.getElementById("type1").style.display = "block";
    if (pokemonMoves[currentMoveClicked].category == "physical") {
      document.querySelector(".category").innerHTML = "Physical";
    } else if (pokemonMoves[currentMoveClicked].category == "special") {
      document.querySelector(".category").innerHTML = "Special";
    } else {
      document.querySelector(".category").innerHTML = "Status";
    }
  };
}
let currentMoveOrder = 0;
let currentPkmnOutline = 0;
let currentChosenPokemon = 0;
let fullPartyMoves = [];
let enemyFullPartyMoves = [];
let enemyPartyMoves = [];
let partyMoves = [];
document.getElementById(`partyPkmn${currentPkmnOutline}`).style.outlineColor =
  "#c30a0a";
for (let i = 0; i < 6; i++) {
  document.getElementById(`partyPkmn${i}`).onclick = () => {
    partyMoves = [];
    currentMoveOrder = 0;
    currentChosenPokemon = i;
    document.getElementById(
      `partyPkmn${currentPkmnOutline}`
    ).style.outlineColor = "black";
    document.getElementById(
      `partyPkmn${currentChosenPokemon}`
    ).style.outlineColor = "#c30a0a";
    currentPkmnOutline = currentChosenPokemon;
  };
}
function addToMoveset() {
  if (currentMoveClicked != 0) {
    fullPartyMoves[currentChosenPokemon] = [];
    partyMoves[currentMoveOrder] = pokemonMoves[currentMoveClicked];
    fullPartyMoves[currentChosenPokemon].push(partyMoves);
    console.log(fullPartyMoves);

    currentMoveOrder++;
    if (currentMoveOrder == 4) {
      currentMoveOrder = 0;
    }
  }
}
function randomizeMoveset() {
  for (let i = 0; i < 4; i++) {
    partyMoves[i] =
      pokemonMoves[Math.floor(Math.random() * (pokemonMoves.length - 1)) + 1];
  }
  fullPartyMoves[currentChosenPokemon] = partyMoves;
  partyMoves = [];
  console.log(fullPartyMoves[currentChosenPokemon]);
}
function randomizeIncompleteMoveset() {
  for (let i = 0; i < partyArray.length; i++) {
    if (!fullPartyMoves[i]) {
      for (let j = 0; j < 4; j++) {
        partyMoves[j] =
          pokemonMoves[
            Math.floor(Math.random() * (pokemonMoves.length - 1)) + 1
          ];
      }
      fullPartyMoves[i] = partyMoves;
      partyMoves = [];
      console.log(fullPartyMoves[i]);
    }
  }
}
randomizeIncompleteMoveset();
function nextButton() {
  window.location.href = "../battle";
  localStorage.setItem("playerPartyMoveset", JSON.stringify(fullPartyMoves));
  localStorage.setItem(
    "enemyPartyMoveset",
    JSON.stringify(enemyFullPartyMoves)
  );
}

function randomizeEnemyMoveset() {
  for (let j = 0; j < enemyPartyArray.length; j++) {
    for (let i = 0; i < 4; i++) {
      enemyPartyMoves[i] =
        pokemonMoves[Math.floor(Math.random() * (pokemonMoves.length - 1)) + 1];
    }
    enemyFullPartyMoves[j] = enemyPartyMoves;
    enemyPartyMoves = [];
  }
}
randomizeEnemyMoveset();
console.log(enemyFullPartyMoves);
// after clicking next if a value in fullPartyMoves array is empty do randomizeMoveset()
