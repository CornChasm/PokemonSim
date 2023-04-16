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

  for (let i = 0; i < enemyPartyArray.length; i++) {
    document.getElementById(`enemyPartyText${i}`).innerHTML = `${
      pokemonStats[enemyPartyArray[i].number].name
    }`;
    document.getElementById(
      `enemyPartyImage${i}`
    ).style.backgroundImage = `url(../res/img/Gen1Opponent.png)`;
    document.getElementById(
      `enemyPartyImage${i}`
    ).style.backgroundPositionX = `-${64 * (enemyPartyArray[i].number - 1)}px`;
    document.getElementById(
      `enemyPartyImage${i}`
    ).style.backgroundPositionY = `-${
      64 * Math.floor((enemyPartyArray[i].number - 1) / 30)
    }px`;
  }
}

let playerMoveset = JSON.parse(localStorage.getItem("playerPartyMoveset"));
let enemyMoveset = JSON.parse(localStorage.getItem("enemyPartyMoveset"));
let playerMovesetCurrentPP = [];
let playerMovesetPPSetup = [];
for (let i = 0; i < playerMoveset.length; i++) {
  for (let j = 0; j < playerMoveset[i].length; j++) {
    playerMovesetPPSetup[j] = playerMoveset[i][j].pp;
  }
  playerMovesetCurrentPP[i] = playerMovesetPPSetup;
  playerMovesetPPSetup = [];
}

let playerPokemonCurrentHP = [];
let playerPokemonMaxHP = [];
let playerPokemonATK = [];
let playerPokemonDEF = [];
let playerPokemonSPATK = [];
let playerPokemonSPDEF = [];
let playerPokemonSPD = [];
let enemyPokemonCurrentHP = [];
let enemyPokemonMaxHP = [];
let enemyPokemonATK = [];
let enemyPokemonDEF = [];
let enemyPokemonSPATK = [];
let enemyPokemonSPDEF = [];
let enemyPokemonSPD = [];
for (let i = 0; i < partyArray.length; i++) {
  playerPokemonCurrentHP[i] = Math.floor(2 * partyArray[i].hp) + 110;
  playerPokemonMaxHP[i] = Math.floor(2 * partyArray[i].hp) + 110;
  playerPokemonATK[i] = Math.floor(2 * partyArray[i].attack) + 5;
  playerPokemonDEF[i] = Math.floor(2 * partyArray[i].defense) + 5;
  playerPokemonSPATK[i] = Math.floor(2 * partyArray[i].sp_attack) + 5;
  playerPokemonSPDEF[i] = Math.floor(2 * partyArray[i].sp_defense) + 5;
  playerPokemonSPD[i] = Math.floor(2 * partyArray[i].speed) + 5;
  enemyPokemonCurrentHP[i] = Math.floor(2 * enemyPartyArray[i].hp) + 110;
  enemyPokemonMaxHP[i] = Math.floor(2 * enemyPartyArray[i].hp) + 110;
  enemyPokemonATK[i] = Math.floor(2 * enemyPartyArray[i].attack) + 5;
  enemyPokemonDEF[i] = Math.floor(2 * enemyPartyArray[i].defense) + 5;
  enemyPokemonSPATK[i] = Math.floor(2 * enemyPartyArray[i].sp_attack) + 5;
  enemyPokemonSPDEF[i] = Math.floor(2 * enemyPartyArray[i].sp_defense) + 5;
  enemyPokemonSPD[i] = Math.floor(2 * enemyPartyArray[i].speed) + 5;
}

let currentPlayerPokemon = 0;
let currentEnemyPokemon = 0;
let currentOnMouseOver = 0;
function playerSwitch() {
  document.querySelector(`.playerPokemonName`).innerHTML = `${
    pokemonStats[partyArray[currentPlayerPokemon].number].name
  }`;
  document.querySelector(
    `.playerPokemonHP`
  ).innerHTML = `${playerPokemonCurrentHP[currentPlayerPokemon]}/${playerPokemonMaxHP[currentPlayerPokemon]} HP`;
  document.getElementById(`playerPokemon`).style.backgroundPositionX = `-${
    256 * (partyArray[currentPlayerPokemon].number - 1)
  }px`;
  document.getElementById(`playerPokemon`).style.backgroundPositionY = `-${
    256 * Math.floor((partyArray[currentPlayerPokemon].number - 1) / 30)
  }px`;
  for (let i = 0; i < playerMoveset[currentPlayerPokemon].length; i++) {
    document.querySelector(
      `#move${i}`
    ).innerHTML = `${playerMoveset[currentPlayerPokemon][i].name}`;
    document.getElementById(`move${i}`).onmouseover = () => {
      currentOnMouseOver = i;
      if (
        pokemonMoves[playerMoveset[currentPlayerPokemon][currentOnMouseOver].id]
          .category == "physical"
      ) {
        document.querySelector(".category").innerHTML = "Physical";
      } else if (
        pokemonMoves[playerMoveset[currentPlayerPokemon][currentOnMouseOver].id]
          .category == "special"
      ) {
        document.querySelector(".category").innerHTML = "Special";
      } else {
        document.querySelector(".category").innerHTML = "Status";
      }
      document.getElementById("type").style.backgroundPositionX = `-${
        160 *
        pokemonTypes.findIndex(
          (el) =>
            el.type ===
            pokemonMoves[
              playerMoveset[currentPlayerPokemon][currentOnMouseOver].id
            ].type
        )
      }px`;
      document.getElementById("type").style.display = "block";
      document.querySelector(".pp").innerHTML = `${
        playerMovesetCurrentPP[currentPlayerPokemon][currentOnMouseOver]
      }/${
        pokemonMoves[playerMoveset[currentPlayerPokemon][currentOnMouseOver].id]
          .pp
      }`;
    };
  }
}
function enemySwitch() {
  if (enemyPokemonCurrentHP[currentEnemyPokemon] <= 0) {
    currentEnemyPokemon++;
  }
  if (currentEnemyPokemon == enemyPartyArray.length) {
    alert("You win!");
    window.location.href = "../pokemon";
  }
  document.querySelector(`.enemyPokemonName`).innerHTML = `${
    pokemonStats[enemyPartyArray[currentEnemyPokemon].number].name
  }`;
  document.querySelector(
    `.enemyPokemonHP`
  ).innerHTML = `${enemyPokemonCurrentHP[currentEnemyPokemon]}/${enemyPokemonMaxHP[currentEnemyPokemon]} HP`;
  document.getElementById(`enemyPokemon`).style.backgroundPositionX = `-${
    256 * (enemyPartyArray[currentEnemyPokemon].number - 1)
  }px`;
  document.getElementById(`enemyPokemon`).style.backgroundPositionY = `-${
    256 * Math.floor((enemyPartyArray[currentEnemyPokemon].number - 1) / 30)
  }px`;
}
playerSwitch();
enemySwitch();
for (let i = 0; i < partyArray.length; i++) {
  document.getElementById(`partyPkmn${i}`).onclick = () => {
    if (currentPlayerPokemon != i) {
      currentPlayerPokemon = i;
      playerSwitch();
    }
  };
}

let damage = 0;
let enemyDamage = 0;
let stab = 1;
let type1 = 1;
let type2 = 1;
let multiHit = 1;
function playerAttack() {
  if (
    playerMoveset[currentPlayerPokemon][currentOnMouseOver].type ==
      partyArray[currentPlayerPokemon].type1.type ||
    playerMoveset[currentPlayerPokemon][currentOnMouseOver].type ==
      partyArray[currentPlayerPokemon].type1.type
  ) {
    stab = 1.25;
  }
  if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[
            playerMoveset[currentPlayerPokemon][currentOnMouseOver].id
          ].type
      )
    ].bad.includes(enemyPartyArray[currentEnemyPokemon].type1.type)
  ) {
    type1 /= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[
            playerMoveset[currentPlayerPokemon][currentOnMouseOver].id
          ].type
      )
    ].good.includes(enemyPartyArray[currentEnemyPokemon].type1.type)
  ) {
    type1 *= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[
            playerMoveset[currentPlayerPokemon][currentOnMouseOver].id
          ].type
      )
    ].immune.includes(enemyPartyArray[currentEnemyPokemon].type1.type)
  ) {
    type1 = 0;
  }
  if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[
            playerMoveset[currentPlayerPokemon][currentOnMouseOver].id
          ].type
      )
    ].bad.includes(enemyPartyArray[currentEnemyPokemon].type2.type)
  ) {
    type2 /= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[
            playerMoveset[currentPlayerPokemon][currentOnMouseOver].id
          ].type
      )
    ].good.includes(enemyPartyArray[currentEnemyPokemon].type2.type)
  ) {
    type2 *= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[
            playerMoveset[currentPlayerPokemon][currentOnMouseOver].id
          ].type
      )
    ].immune.includes(enemyPartyArray[currentEnemyPokemon].type2.type)
  ) {
    type2 = 0;
  }
  switch (playerMoveset[currentPlayerPokemon][currentOnMouseOver].category) {
    // (((52*currentMovePower*currentPokemonATK/enemyPokemonDEF)/50)+2)*stab*type1*type2*multiHit*random
    // currentPokemonATK and DEF depends on the move category
    // random is a integer between 217 and 255 / 255 example: 235/255
    case "physical":
      damage = Math.floor(
        ((52 *
          playerMoveset[currentPlayerPokemon][currentOnMouseOver].attack *
          playerPokemonATK[currentPlayerPokemon]) /
          enemyPokemonDEF[currentEnemyPokemon] /
          50 +
          2) *
          stab *
          type1 *
          type2 *
          multiHit *
          ((Math.floor(Math.random() * (255 - 217)) + 217) / 255)
      );
      break;
    case "special":
      damage = Math.floor(
        ((52 *
          playerMoveset[currentPlayerPokemon][currentOnMouseOver].attack *
          playerPokemonSPATK[currentPlayerPokemon]) /
          enemyPokemonSPDEF[currentEnemyPokemon] /
          50 +
          2) *
          stab *
          type1 *
          type2 *
          multiHit *
          ((Math.floor(Math.random() * (255 - 217)) + 217) / 255)
      );
      break;
    case "status":
      break;
  }
  enemyPokemonCurrentHP[currentEnemyPokemon] -= damage;
  damage = 0;
  stab = 1;
  type1 = 1;
  type2 = 1;
  multiHit = 1;
  playerMovesetCurrentPP[currentPlayerPokemon][currentOnMouseOver]--;
  document.querySelector(".pp").innerHTML = `${
    playerMovesetCurrentPP[currentPlayerPokemon][currentOnMouseOver]
  }/${
    pokemonMoves[playerMoveset[currentPlayerPokemon][currentOnMouseOver].id].pp
  }`;
}
for (let i = 0; i < playerMoveset[currentPlayerPokemon].length; i++) {
  document.getElementById(`move${i}`).onclick = () => {
    if (
      playerMovesetCurrentPP[currentPlayerPokemon][currentOnMouseOver] > 0 &&
      playerPokemonCurrentHP[currentPlayerPokemon] > 0
    ) {
      if (
        playerPokemonSPD[currentPlayerPokemon] >=
        enemyPokemonSPD[currentEnemyPokemon]
      ) {
        playerAttack();
        document.querySelector(
          `.enemyPokemonHP`
        ).innerHTML = `${enemyPokemonCurrentHP[currentEnemyPokemon]}/${enemyPokemonMaxHP[currentEnemyPokemon]} HP`;
        if (enemyPokemonCurrentHP[currentEnemyPokemon] <= 0) {
          enemySwitch();
        } else {
          enemyAttack();
        }
      } else {
        enemyAttack();
        playerAttack();
        enemySwitch();
      }
    }
  };
}
let currentEnemyMove = 0;
function enemyAttack() {
  currentEnemyMove = Math.floor(Math.random() * 4);
  if (
    enemyMoveset[currentEnemyPokemon][currentEnemyMove].type ==
      enemyPartyArray[currentEnemyPokemon].type1.type ||
    enemyMoveset[currentEnemyPokemon][currentEnemyMove].type ==
      enemyPartyArray[currentEnemyPokemon].type1.type
  ) {
    stab = 1.25;
  }
  if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[enemyMoveset[currentEnemyPokemon][currentEnemyMove].id]
            .type
      )
    ].bad.includes(partyArray[currentPlayerPokemon].type1.type)
  ) {
    type1 /= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[enemyMoveset[currentEnemyPokemon][currentEnemyMove].id]
            .type
      )
    ].good.includes(partyArray[currentPlayerPokemon].type1.type)
  ) {
    type1 *= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[enemyMoveset[currentEnemyPokemon][currentEnemyMove].id]
            .type
      )
    ].immune.includes(partyArray[currentPlayerPokemon].type1.type)
  ) {
    type1 = 0;
  }
  if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[enemyMoveset[currentEnemyPokemon][currentEnemyMove].id]
            .type
      )
    ].bad.includes(partyArray[currentPlayerPokemon].type2.type)
  ) {
    type2 /= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[enemyMoveset[currentEnemyPokemon][currentEnemyMove].id]
            .type
      )
    ].good.includes(partyArray[currentPlayerPokemon].type2.type)
  ) {
    type2 *= 2;
  } else if (
    pokemonTypes[
      pokemonTypes.findIndex(
        (el) =>
          el.type ===
          pokemonMoves[enemyMoveset[currentEnemyPokemon][currentEnemyMove].id]
            .type
      )
    ].immune.includes(partyArray[currentPlayerPokemon].type2.type)
  ) {
    type2 = 0;
  }
  switch (enemyMoveset[currentEnemyPokemon][currentEnemyMove].category) {
    // (((52*currentMovePower*currentPokemonATK/enemyPokemonDEF)/50)+2)*stab*type1*type2*multiHit*random
    // currentPokemonATK and DEF depends on the move category
    // random is a integer between 217 and 255 / 255 example: 235/255
    case "physical":
      damage = Math.floor(
        ((52 *
          enemyMoveset[currentEnemyPokemon][currentEnemyMove].attack *
          enemyPokemonATK[currentEnemyPokemon]) /
          playerPokemonDEF[currentPlayerPokemon] /
          50 +
          2) *
          stab *
          type1 *
          type2 *
          multiHit *
          ((Math.floor(Math.random() * (255 - 217)) + 217) / 255)
      );
      break;
    case "special":
      damage = Math.floor(
        ((52 *
          enemyMoveset[currentEnemyPokemon][currentEnemyMove].attack *
          enemyPokemonSPATK[currentEnemyPokemon]) /
          playerPokemonSPDEF[currentPlayerPokemon] /
          50 +
          2) *
          stab *
          type1 *
          type2 *
          multiHit *
          ((Math.floor(Math.random() * (255 - 217)) + 217) / 255)
      );
      break;
    case "status":
      break;
  }
  playerPokemonCurrentHP[currentPlayerPokemon] -= damage;
  damage = 0;
  stab = 1;
  type1 = 1;
  type2 = 1;
  multiHit = 1;
  document.querySelector(
    `.playerPokemonHP`
  ).innerHTML = `${playerPokemonCurrentHP[currentPlayerPokemon]}/${playerPokemonMaxHP[currentPlayerPokemon]} HP`;
}
function openTab() {
  window.open("../typeChart", "_blank");
}
