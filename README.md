<h1 align="center"> Welcome to Monster Slayer 👹</h1>

> This app is actually a game called 'Monster Slayer'. There is a player and a monster, the objective of the player is to defeat monster and reduce his health to 0. Player gets a special attack which helps him to slay the monster easily.

## Table of contents 📔

<!-- 1. [Live demo](#live-demo-)
2. [Tech stack](#tech-stack-)
3. [User stories](#user-stories-)
4. [Hooking up the health bars](#hooking-up-the-health-bars-)
5. [Implementing the game](#implementing-the-game-)
6. [Rendering the game feed](#rendering-the-game-feed-) -->

<ol>
  <li>
    <a href="#live-demo-">Live demo</a>
  </li>
  <li>
    <a href="#tech-stack-">Tech stack</a>
  </li>
  <li>
    <a href="#user-stories-">User stories</a>
  </li>
  <li>
    <a href="#hooking-up-the-health-bars-">Hooking up the health bars</a>
    <ol>
      <li><a href="#vue-instance-setup">Vue Instance Setup</a></li>
      <li>
        <a href="#html-template-binding-the-data">HTML Template (Binding the data)</a>
      </li>
    </ol>
  </li>
  <li>
    <a href="#implementing-the-game-">Implementing the game</a>
    <ol>
      <li><a href="#adding-the-click-event-to-the-start-new-game-button">Adding the click event to Start new game button</a></li>
      <li><a href="#implementing-the-attack">Implementing the attack</a></li>
      <li><a href="#check-win">Check win</a></li>
      <li><a href="#implementing-the-special-attack">Implementing the special attack</a></li>
      <li><a href="#implementing-the-heal-mechanism">Implementing the heal mechanism</a></li>
    </ol>
  </li>
  <li>
    <a href="#rendering-the-game-feed-">Rendering the game feed</a>
    <ol>
      <li><a href="#">Creating a turns array for the feed</a></li>
      <li><a href="#">Adding the items to the turns array</a></li>
      <li><a href="#">Outputting the feed using v-for</a></li>
      <li><a href="#">Conditionally styling the log</a></li>
    </ol>
  </li>
</ol>

## Live Demo 🪁

https://festive-hopper-c7f0c4.netlify.app/

## Tech Stack 👩‍💻

- 🌈 Foundation CSS
- 🟩 Vue JS
- 🟨 Javascript (ES6+)

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

### 1. Adding the click event to the Start new game button

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

## Rendering the Game feed 🎲

Every move or action player performs would render a game feed to the template highlighting the action

### 1. Creating a turns array for the feed

Adding the turns property to the data

```javascript
data: {
  playerHealth: 100,
  monsterHealth: 100,
  gameIsRunning: false,
  turns: [],
}
```

### 2. Adding the items to the turns array

Since every new action should be top of the feed, we should use the **unshift()** method instead of **push()**

```javascript
this.turns.unshift({
  isPlayer: true,
  text: `Player hits the monster and damages ${damage} HP`,
});
```

### 3. Outputting the feed using v-for

Since all the turns are present in this array (turns), we can render it to the template using v-for directive

```html
<section class="row log" v-if="turns.length" id="feed">
  <div class="small-12 columns">
    <ul>
      <li v-for="turn in turns">{{ turn.text }}</li>
    </ul>
  </div>
</section>
```

### 4. Conditionally styling the log

In the turns array while we are passing the data to the feed, we are also passing if it's player or not to conditionally style the log for player and monster. Apply the **player-turn** class if it's a player, else apply **monster-turn** class

```html
<section class="row log" v-if="turns.length" id="feed">
  <div class="small-12 columns">
    <ul>
      <li
        v-for="turn in turns"
        :class="{'player-turn': turn.isPlayer, 'monster-turn': !turn.isPlayer}"
      >
        {{ turn.text }}
      </li>
    </ul>
  </div>
</section>
```
