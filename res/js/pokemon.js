const pkmnGrid = document.querySelector(".pkmnGrid");
let pkmnGridChildren = pkmnGrid.children;
let currentPokemonClicked = 0;
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
  document.getElementById(`pkmn${i}`).onclick = () => {
    currentPokemonClicked = i + 1;
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
  };
}
let currentEmptyPartySlot = 0;
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
      64 * (Math.ceil(currentPokemonClicked / 30)-1)
    }px`;
    partyArray[currentEmptyPartySlot] = pokemonStats[currentPokemonClicked];
    enemyPartyArray[currentEmptyPartySlot] =
      pokemonStats[Math.floor(Math.random() * (pokemonStats.length - 1)) + 1];
    console.log(
      `Player Pokemon ${currentEmptyPartySlot + 1}: `,
      partyArray[currentEmptyPartySlot].name
    );
    console.log(
      `Enemy Pokemon ${currentEmptyPartySlot + 1}: `,
      enemyPartyArray[currentEmptyPartySlot].name
    );
    currentEmptyPartySlot++;
    if (currentEmptyPartySlot == 6) {
      currentEmptyPartySlot = 0;
    }
  }
}
