let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let inventory = ["stick"];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".'
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],  
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightFangedBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "slime cave",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [() => attack(0), () => dodge(0), goTown],
    text: "You are fighting a slime."
  },
  {
    name: "fanged beast cave",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [() => attack(1), () => dodge(1), goTown],
    text: "You are fighting a fanged beast."
  },
  {
    name: "dragon lair",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [() => attack(2), () => dodge(2), goTown],
    text: "You are fighting the dragon."
  },
  {
    name: "after fight",
    "button text": ["Go To Town Square", "Go To Town Square", "Go To Town Square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "easter egg",
    "button text": [2, 8, "Go To Town Square?"],
    "button functions": [easterEgg2, easterEgg8, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];
const monsters = [
  {
    name: "slime", health: 15, originalHealth: 15, power: 5
  },
  {
    name: "fanged beast", health: 60, originalHealth: 60, power: 20
  },
  {
    name: "dragon", health: 300, originalHealth: 300, power: 100
  }
];


button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function monsterUpdate(monsterNumber) {
  monsterName.innerText = monsters[monsterNumber].name;
  monsterHealth.innerText = monsters[monsterNumber].health;
}

function goTown() {
  update(locations[0]);
  monsterStats.style.display = "none";
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    health += 10;
    healthText.innerText = health;
    gold -= 10;
    goldText.innerText = gold;
  } else {
    text.innerText = "You do not have enough gold to buy health."
  }
}

function buyWeapon() {
  if (gold >= 30) {
    if (currentWeaponIndex === 0) {
      gold -= 30;
      goldText.innerText = gold;
      inventory.push("dagger");
      text.innerText = "You now have a " + inventory[inventory.length - 1] + ". In your inventory you have: " + inventory;
      currentWeaponIndex += 1;
    } else if (currentWeaponIndex === 1) {
      gold -= 30;
      goldText.innerText = gold;
      inventory.push("claw hammer");
      text.innerText = "You now have a " + inventory[inventory.length - 1] + ". In your inventory you have: " + inventory;
      currentWeaponIndex += 1;
    } else if (currentWeaponIndex === 2) {
      gold -= 30;
      goldText.innerText = gold;
      inventory.push("sword");
      text.innerText = "You now have a " + inventory[inventory.length - 1] + ". In your inventory you have: " + inventory;
      currentWeaponIndex += 1;
    } else if (currentWeaponIndex === 3) {
      button2.innerText = "Sell weapon for 15 gold";
      text.innerText = "You already have the most powerful weapon!";
      button2.onclick = sellWeapon;
    } 
  } else {
    text.innerText = "You do not have enough gold to buy a weapon.";
  }
}

function sellWeapon() {
  if (currentWeaponIndex > 0) {
    let soldWeapon = inventory.pop();
    gold += 15;
    goldText.innerText = gold;
    text.innerText = "You have sold your " + soldWeapon + ". Now you have: " + inventory;
    }
    
  if (currentWeaponIndex === 0) {
      text.innerText = "You can't sell your only weapon.";
    }

  if (currentWeaponIndex > 0) {
      currentWeaponIndex -= 1;
    }
}

function fightSlime() {
  update(locations[3]);
  monsterUpdate(0);
  monsterStats.style.display = "block";
}

function fightFangedBeast() {
  update(locations[4]);
  monsterUpdate(1);
  monsterStats.style.display = "block";
}

function fightDragon() {
  update(locations[5]);
  monsterUpdate(2);
  monsterStats.style.display = "block";
}

function attack(monsterNumber) {
  let attackPower;

  if (currentWeaponIndex === 0) {
    attackPower = 6;
  } else if (currentWeaponIndex === 1) {
    attackPower = 31;
  } else if (currentWeaponIndex === 2) {
    attackPower = 51;
  } else if (currentWeaponIndex === 3) {
    attackPower = 71;
  }

  if (Math.random() > 0.5) {
    monsters[monsterNumber].health -= attackPower;
    monsterHealth.innerText = monsters[monsterNumber].health;
    text.innerText = "The " + monsters[monsterNumber].name + " attacks. You attack it with your " + inventory[currentWeaponIndex] + ".";
  } else {
    health -= Math.round(Math.random() * monsters[monsterNumber].power + monsters[monsterNumber].power);
    healthText.innerText = health;
    text.innerText = "The " + monsters[monsterNumber].name + " attacks. You attack it with your " + inventory[currentWeaponIndex] + ". You miss.";
  }


  if (monsters[monsterNumber].health <= 0) {
    monsterStats.style.display = "none";
    monsters[monsterNumber].health = monsters[monsterNumber].originalHealth; 
    monsterHealth.innertext = monsters[monsterNumber].originalHealth

    if (monsterNumber === 0) {
    xp += 2;
    xpText.innerText = xp;
    gold += 13;
    goldText.innerText = gold;
    }

    if (monsterNumber === 1) {
    xp += 8;
    xpText.innerText = xp;
    gold += 53;
    goldText.innerText = gold;
    }

    if (monsterNumber === 2) {
    xp += 32;
    xpText.innerText = xp;
    gold += 212;
    goldText.innerText = gold;
    }

    update(locations[6]);
  }

  if (health <= 0) {
  button1.innerText = "REPLAY?";
  button2.innerText = "REPLAY?";
  button3.innerText = "REPLAY?";
  xp = 0;
  xpText.innerText = xp;
  health = 100;
  healthText.innerText = health;
  gold = 50;
  goldText.innerText = gold;
  button1.onclick = goTown;
  button2.onclick = goTown;
  button3.onclick = goTown;
  text.innerText = "You die. &#x2620;";
  monsterStats.style.display = "none";
  }
}

function dodge(monsterNumber) {
  text.innerText = "You dodge the attack from the " + monsters[monsterNumber].name + ".";
}

function easterEgg() {
  update(locations[7]);
}

function easterEgg2() {
  let numbers = [];

  for (let i = 0; i <= 10; i++) {
    numbers.push(Math.round(Math.random() * 10))
    numbers.push("\n");
}
  if (numbers.includes(2)) {
    gold += 20;
    goldText.innerText = gold;  
    text.innerText = "You picked 2. Here are the random numbers:\n" + numbers.join("") + "Right! You win 20 gold!"; 
  } else {
    health -= 10;
    healthText.innerText = health;  
    text.innerText = "You picked 2. Here are the random numbers:\n" + numbers.join("") + "Wrong! You lose 10 health!";
  }
}

function easterEgg8() {
  let numbers = [];

  for (let i = 0; i <= 10; i++) {
    numbers.push(Math.round(Math.random() * 10))
    numbers.push("\n");
}
  if (numbers.includes(8)) {
    gold += 20;
    goldText.innerText = gold;  
    text.innerText = "You picked 8. Here are the random numbers:\n" + numbers.join("") + "Right! You win 20 gold!"; 
  } else {
    health -= 10;
    healthText.innerText = health;  
    text.innerText = "You picked 8. Here are the random numbers:\n" + numbers.join("") + "Wrong! You lose 10 health!";
  }
}
