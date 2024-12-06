let currMoleTile;
let currPlantTile;
let currBonusMoleTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    // Set up the grid in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
    setInterval(setBonusMole, 1000); // Attempt to set bonus mole every 3 seconds after score reaches 100
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver || score >= 100) return; // Stop showing the regular mole once score reaches 100 
    if (currMoleTile) currMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if ((currPlantTile && currPlantTile.id == num) || (currBonusMoleTile && currBonusMoleTile.id == num)) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if ((currMoleTile && currMoleTile.id == num) || (currBonusMoleTile && currBonusMoleTile.id == num)) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function setBonusMole() {
    if (gameOver || score < 100) return; // Only set bonus mole if score is at least 100
    if (currBonusMoleTile) currBonusMoleTile.innerHTML = "";

    let bonusMole = document.createElement("img");
    bonusMole.src = "./bonus-mole.jpg"; // Separate image for the bonus mole

    let num = getRandomTile();
    if ((currMoleTile && currMoleTile.id == num) || (currPlantTile && currPlantTile.id == num)) return;

    currBonusMoleTile = document.getElementById(num);
    currBonusMoleTile.appendChild(bonusMole);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
    } else if (this == currBonusMoleTile) {
        score += 30; // Bonus mole gives 30 points
    } else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score;
        gameOver = true;
        return;
    }

    document.getElementById("score").innerText = score.toString();
}
