<h1> Welcome to Monster Slayer 👹</h1>

> This app is actually a game called 'Monster Slayer'. There is a player and a monster, the objective of the player is to defeat monster and reduce his health to 0. Player gets a special attack which helps him to slay the monster easily.

## Tech Stack 👩‍💻

- 🌈 Foundation CSS
- 🟩 Vue JS

## User Stories 🏷️

- Player can start a new game
- Player can attack the monster
- Player gets casualities in response to attack
- Player can heal during the game
- Player can use special attack to defeat the monster
- Player can give up

## Hooking up the health bars 🍸

### 1. Vue Instance Setup

To manage the health of player and monster, we need to have a data property within our Vue instance corresponding to the health

```javascript
new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
  },
});
```

Initially both the healths are at **100**. We also need a boolean to check if game is already running to toggle between the **Start new game** button and **Attacks panel** like the above one

### 2. HTML Template (Binding the data)

We can use the above health data to display onto the template and also style the health width based on it

**Player Health bar**

```html
<div class="healthbar">
  <div
    class="healthbar text-center"
    style="background-color: green; margin: 0; color: white"
    :style="{ width: playerHealth + '%'}"
  >
    {{ playerHealth }}
  </div>
</div>
```

**Monster Health bar**

```html
<div
  class="healthbar text-center"
  style="background-color: green; margin: 0; color: white"
  :style="{ width: monsterHealth + '%'}"
>
  {{ monsterHealth }}
</div>
```

**Showing the Start new game panel if game is not running**

```html
<section class="row controls" v-if="!gameIsRunning">
  <div class="small-12 columns">
    <button id="start-game">START NEW GAME</button>
  </div>
</section>
```

**Showing the Game moves if game is already running**

```html
<section class="row controls" v-else>
  <div class="small-12 columns">
    <button id="attack">ATTACK</button>
    <button id="special-attack">SPECIAL ATTACK</button>
    <button id="heal">HEAL</button>
    <button id="give-up">GIVE UP</button>
  </div>
</section>
```

## Implementing the game 🎬

Whenever the user clicks the **Start new game** button, it should hide this panel, show user the attacks panel by setting the boolean to true

### 1. Adding the click event to Start new game button

Since we have to write some bunch of code here, we call a method serving this purpose

```html
<div class="small-12 columns">
  <button id="start-game" @click="startGame">START NEW GAME</button>
</div>
```

Writing the initial functionality in this method

```javascript
methods: {
    startGame() {
      this.gameIsRunning = true;
      // Resetting the healths
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
  }
```

### 2. Implementing the attack

When a user uses the attack, he should give some damage to the monster and also consume some damage in return. We will implement the damage using the **Math.random()** in-built function in javascript.

**Calculating the damage**

```javascript
calculateDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

**Rendering the damage**

```javascript
attack() {
  // Damage given to monster by player
  let damage = this.calculateDamage(3, 10);
  this.monsterHealth -= damage;
      ...
      ...

  // Damage consumed by player from monster
  damage = this.calculateDamage(5, 12);
  this.playerHealth -= damage;
  ...
  ...
}
```

### 3. Check win

Now that damage is being given and taken, checking if any of the monster or player won

```javascript
checkWin() {
  if (this.monsterHealth <= 0) {
    if (confirm("You Won! Start New Game?")) {
      this.startGame();
    } else {
      this.gameIsRunning = false;
    }

    return true;
  } else if (this.playerHealth <= 0) {
    if (confirm("You Lost! Start New Game?")) {
      this.startGame();
    } else {
      this.gameIsRunning = false;
    }
    return true;
  }
  return false;
}
```

Using it in our attack method

```javascript
attack() {
  // Damage given to monster by player
  let damage = this.calculateDamage(3, 10);
  this.monsterHealth -= damage;

  // Check if we won
  if (this.checkWin()) {
    return;
  }

  // Damage consumed by player from monster
  damage = this.calculateDamage(5, 12);
  this.playerHealth -= damage;

  // Check if monster won
  this.checkWin();
}
```

### 4. Implementing the special attack

Special attack is similar to normal attack, it just differs in the amount of damage given to the monster

```javascript
specialAttack() {
  // Damage given to monster by player
  this.monsterHealth -= this.calculateDamage(10, 20);

  // Check if we won
  if (this.checkWin()) {
    return;
  }

  // Damage given by the monster
  this.monsterAttacks();
}
```

### 5. Implementing the heal mechanism

Whenever player decides to heal, he can increase his health but also consume the damage at the same time as the monster could attack even when the player is healing

```javascript
healUp() {
  // Heal the player by certain amount only if it's less than 100
  if (this.playerHealth <= 90) {
    this.playerHealth += 10;
  } else {
    this.playerHealth = 100;
  }
  // Monster attacks
  this.monsterAttacks();
}
```
