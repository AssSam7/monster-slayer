new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      // Resetting the healths
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      // Damage given to monster by player
      this.monsterHealth -= this.calculateDamage(3, 10);

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
    giveUp() {},
    // Reduce the health of the player when the monster attacks
    monsterAttacks() {
      this.playerHealth -= this.calculateDamage(5, 12);
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
