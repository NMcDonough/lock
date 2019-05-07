import './sky.png';
import './dude.png';
import './bomb.png';
import './platform.png';
import './star.png';

var platforms;
var player;
var cursors;
var stars;
var score;
var scoreText;
var bombs;
var healthText;
var reset;
var gameOver = false;
var poisonTint = 0x00ff00;
var hitInterval;
var moveSpeed = 200;
var poisonInterval = 250;
var WIDTH = 1366;
var HEIGHT = 600;
var highscore;
var highscoreText;

export var config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  width: WIDTH,
  height: HEIGHT,
  canvas: null,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: {y:500},
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
}

function preload() {
  this.load.image('sky', this.sky);
  this.load.image('platform', this.platform);
  this.load.image('star', this.star);
  this.load.image('bomb', this.bomb);
  this.load.spritesheet('dude',
      this.dude,
      { frameWidth: 32, frameHeight: 48 }
  );
}
function create() {
  this.background = this.add.image(WIDTH / 2 , 300, 'sky');
  this.background.setDisplaySize(WIDTH, HEIGHT);

  reset = this.add.text(1000, 16, 'Reset', {fontSize:'25px', fill: 'black' , border: '1px solid black'});
  reset.setInteractive()
  .on('pointerdown', () => {
      this.scene.restart();
      this.physics.resume();
      gameOver = false;
  });

  platforms = this.physics.add.staticGroup();
  platforms.create(WIDTH / 2, HEIGHT - 35, 'platform').setScale(3.5).refreshBody();
  platforms.create(600, 400, 'platform');
  platforms.create(50, 250, 'platform');
  platforms.create(750, 220, 'platform');
  platforms.create(1300, 280, 'platform');

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.health = 100;

  score = 0;
  scoreText = this.add.text(15, 16, 'Score: ' + score, {fontSize:'25px', fill:'#000'});

  highscore = this.user != undefined ? this.user.highscore.phaserGame.score : 0;
  highscoreText = this.add.text(200, 16, "Highscore: " + highscore, {fontSize: '25px', fill: '#000'});

  healthText = this.add.text(600, 16, "Health: " + player.health, {fontSize:'25px', fill:'#000'});

  bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  this.physics.add.overlap(player, bombs, hitBomb, null, this);
  this.physics.add.collider(bombs, player);

  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
      key: 'star',
      repeat: 15,
      setXY: {x:15, y:0, stepX:80}
  });

  stars.children.iterate(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setCollideWorldBounds(true);
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  //this.physics.add.collider(bombs, stars, bombHitStar, null, this);
  //this.physics.add.collider(stars, stars);
}

 function update() {
  if(player.health <= 0) {
    this.physics.pause();
    player.anims.play('turn');
    healthText.setText("Game Over")
    gameOver = true;
  }

  if(gameOver) {
    gameOverResponse();
    return;
  }

  if (cursors.left.isDown) {
      player.setVelocityX(moveSpeed * -1);
      player.anims.play('left', true);
  } else if (cursors.right.isDown) {
      player.setVelocityX(moveSpeed);
      player.anims.play('right', true);
  } else {
      player.setVelocityX(0);
      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-520);
  }

  if (player.isPoisoned){
    poisonInterval -= 1;

    if(!player._isTinted)
      player.setTint(poisonTint);

    if(poisonInterval == 0){
      player.health = player.health - 1;
      healthText.setText("Health: " + player.health);
      poisonInterval = 25;
    }
  }

  if(hitInterval != null && hitInterval > 0) {
    if(!player._isTinted){
      player.setTint(0xff0000);
    }
    hitInterval -= 1;
  } else if(!player.isPoisoned) {
    hitInterval = null;
    player.clearTint();
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
      stars.children.iterate(child => {
          child.enableBody(true, child.x, 0, true, true);
      });
      createBomb(2);
  }

  if (player.health < 50){
      player.health += 1;
      healthText.setText("Health: " + player.health);
  }

  if (player.isPoisoned){
    player.isPoisoned = false;
    player.clearTint();
    moveSpeed = 200;
  }
}

function hitBomb(player, bomb) {

  if(bomb.isPoisoned) {
    player.health = player.health - 5;
    bomb.disableBody(true, true);
    player.isPoisoned = true;
    moveSpeed = 100;
    poisonInterval = 25;
  } else {
    player.health = player.health - 1;
    healthText.setText("Health: " + player.health);
    hitInterval = 10;
  }
}

function bombHitStar(bomb, star) {
  bomb.setVelocity(300, 300);
}

function startPhysics(){
  this.physics.resume();
}

function createBomb(x) {
  for(let i = 0; i < x; i ++){
    let rand = Math.random() * 100;
    let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    let bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 300);
    if (rand >= 50) {
      bomb.isPoisoned = true;
      bomb.setTint(poisonTint);
    }
  }
}
