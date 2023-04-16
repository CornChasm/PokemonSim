const pkmnGrid = document.querySelector(".pkmnGrid");
let pkmnGridChildren = pkmnGrid.children;
let currentPokemonClicked = 0;
let currentOutline = 1;
for (let i = 0; i < pokemonStats.length - 1; i++) {
  pkmnGrid.appendChild(document.createElement("div"));
  pkmnGridChildren[i].setAttribute("id", `pkmn${i}`);
}
let bgPositionY = 0;
for (let i = 0; i < pokemonStats.length - 1; i++) {
  if (i % 30 == 0 && i != 0) {
    bgPositionY++;
  }
  document.getElementById(`pkmn${i}`).style.backgroundPositionX = `-${
    128 * i
  }px`;
  document.getElementById(`pkmn${i}`).style.backgroundPositionY = `-${
    128 * bgPositionY
  }px`;
  document.getElementById(`pkmn${i}`).ondragstart = function() { return false; };
  document.getElementById(`pkmn${i}`).onclick = () => {
    currentPokemonClicked = i + 1;
    document.getElementById(`pkmn${currentOutline - 1}`).style.outlineColor =
      "black";
    document.getElementById(`pkmn${i}`).style.outlineColor = "#c30a0a";
    currentOutline = currentPokemonClicked;
    document.querySelector(
      ".name"
    ).innerHTML = `${pokemonStats[currentPokemonClicked].name}`;
    document.querySelector(
      ".hp"
    ).innerHTML = `HP: ${pokemonStats[currentPokemonClicked].hp}`;
    document.querySelector(
      ".attack"
    ).innerHTML = `ATK: ${pokemonStats[currentPokemonClicked].attack}`;
    document.querySelector(
      ".defense"
    ).innerHTML = `DEF: ${pokemonStats[currentPokemonClicked].defense}`;
    document.querySelector(
      ".sp_attack"
    ).innerHTML = `SPATK: ${pokemonStats[currentPokemonClicked].sp_attack}`;
    document.querySelector(
      ".sp_defense"
    ).innerHTML = `SPDEF: ${pokemonStats[currentPokemonClicked].sp_defense}`;
    document.querySelector(
      ".speed"
    ).innerHTML = `SPD: ${pokemonStats[currentPokemonClicked].speed}`;
    document.querySelector(
      ".total"
    ).innerHTML = `TOTAL: ${pokemonStats[currentPokemonClicked].total}`;
    document.getElementById("type1").style.backgroundPositionX = `-${
      80 *
      pokemonTypes.findIndex(
        (i) => i.type === pokemonStats[currentPokemonClicked].type1.type
      )
    }px`;
    document.getElementById("type1").style.display = "block";
    if (pokemonStats[currentPokemonClicked].type2.type) {
      document.getElementById("type2").style.backgroundPositionX = `-${
        80 *
        pokemonTypes.findIndex(
          (i) => i.type === pokemonStats[currentPokemonClicked].type2.type
        )
      }px`;
      document.getElementById("type2").style.display = "block";
    } else {
      document.getElementById("type2").style.display = "none";
    }
  };
}
let currentEmptyPartySlot = 0;
let isPartyFull = 0;
let partyArray = new Array();
let enemyPartyArray = new Array();
function addToParty() {
  if (currentPokemonClicked != 0) {
    document.getElementById(
      `partyText${currentEmptyPartySlot}`
    ).innerHTML = `${pokemonStats[currentPokemonClicked].name}`;
    document.getElementById(
      `partyImage${currentEmptyPartySlot}`
    ).style.backgroundImage = `url(../res/img/Gen1Opponent.png)`;
    document.getElementById(
      `partyImage${currentEmptyPartySlot}`
    ).style.backgroundPositionX = `-${64 * (currentPokemonClicked - 1)}px`;
    document.getElementById(
      `partyImage${currentEmptyPartySlot}`
    ).style.backgroundPositionY = `-${
      64 * Math.floor((currentPokemonClicked - 1) / 30)
    }px`;
    partyArray[currentEmptyPartySlot] = pokemonStats[currentPokemonClicked];
    enemyPartyArray[currentEmptyPartySlot] =
      pokemonStats[Math.floor(Math.random() * (pokemonStats.length - 1)) + 1];
    currentEmptyPartySlot++;
    if (currentEmptyPartySlot == 6) {
      currentEmptyPartySlot = 0;
      isPartyFull = 1;
    }
    console.log(
      `Player Pokemon ${currentEmptyPartySlot + 1}: `,
      partyArray[currentEmptyPartySlot]
    );
    console.log(
      `Enemy Pokemon ${currentEmptyPartySlot + 1}: `,
      enemyPartyArray[currentEmptyPartySlot]
    );
  }
}
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
function nextButton() {
  if (
    currentEmptyPartySlot != 0 ||
    isPartyFull != 0 ||
    localStorage.getItem("playerParty")
  ) {
    window.location.href = "../moves";
  }
  localStorage.setItem("playerParty", JSON.stringify(partyArray));
  localStorage.setItem("enemyParty", JSON.stringify(enemyPartyArray));
}
