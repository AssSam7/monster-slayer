new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      // Resetting the healths
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    endGame() {
      this.gameIsRunning = false;
    },
    attack() {
      // Damage given to monster by player
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;

      // Adding the attack to the turns log
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits the monster and damages ${damage} HP`,
      });

      // Check if we won
      if (this.checkWin()) {
        return;
      }

      // Damage given by the monster
      this.monsterAttacks();
    },
    specialAttack() {
      // Damage given to monster by player
      this.monsterHealth -= this.calculateDamage(10, 20);

      // Check if we won
      if (this.checkWin()) {
        return;
      }

      // Damage given by the monster
      this.monsterAttacks();
    },
    healUp() {
      // Heal the player by certain amount only if it's less than 100
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      // Monster attacks
      this.monsterAttacks();
    },
    giveUp() {
      // If the player decides to give up stop the game
      this.endGame();
    },
    // Reduce the health of the player when the monster attacks
    monsterAttacks() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      // Adding the attack to the turns log
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits the player and damages ${damage} HP`,
      });
      this.checkWin();
    },
    calculateHealing(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    calculateDamage(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
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
    },
  },
});
