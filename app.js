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
      let max = 10;
      let min = 3;
      let damage = Math.floor(Math.random() * (max - min + 1)) + min;
      this.monsterHealth -= damage;

      // Check if we won
      if (this.monsterHealth <= 0) {
        alert("You Won!");
        this.gameIsRunning = false;
        return;
      }

      // Damage consumed by player from monster
      max = 12;
      min = 5;
      damage = Math.floor(Math.random() * (max - min + 1)) + min;
      this.playerHealth -= damage;

      // Check if monster won
      if (this.playerHealth <= 0) {
        alert("You Lost!");
        this.gameIsRunning = false;
      }
    },
    specialAttack() {},
    healUp() {},
    giveUp() {},
  },
});
