import { Component, OnInit } from '@angular/core';
import './assets/img/bullet.png';
import './assets/img/spritesheet.png';
import './assets/img/spritesheet.json';

@Component({
  selector: 'app-tower-defense',
  templateUrl: './tower-defense.component.html',
  styleUrls: ['./tower-defense.component.css']
})
export class TowerDefenseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    game = new Phaser.Game(config);
  }
}

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 640,
  height: 512,
  scene: {
      key: 'main',
      preload: preload,
      create: create,
      update: update
  }
};
var game;

var graphics;
var path;
var enemies;

var ENEMY_SPEED = 1/10000;

function preload() {
  // load the game assets – enemy and turret atlas
  this.load.atlas('sprites', './assets/img/spritesheet.png', './assets/img/spritesheet.json');
  this.load.image('bullet', 'bullet');
}

var Enemy = new Phaser.Class ({
  Extends: Phaser.GameObjects.Image,
  initialize:
    function enemy(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy', (res) => {
        console.log(res)
      });
      console.log(Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy'))
      this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    },
    update: function (time, delta) {
        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += ENEMY_SPEED * delta;

        // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);

        // update enemy x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // if we have reached the end of the path, remove the enemy
        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    },
    startOnPath: function ()
    {
        // set the t parameter at the start of the path
        this.follower.t = 0;

        // get x and y of the given t point
        path.getPoint(this.follower.t, this.follower.vec);

        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

    },
})

function create() {
  var graphics = this.add.graphics();
  path = this.add.path(96, -32);
  path.lineTo(96, 164);
  path.lineTo(480, 164);
  path.lineTo(480, 544);

  graphics.lineStyle(3, 0xffffff, 1);
  // visualize the path
  path.draw(graphics);

  enemies = this.add.group({
    classType: Enemy,
    runChildUpdate: true
  })
  this.nextEnemy = 0;
}

function update(time, delta) {
  // if its time for the next enemy
  if (time > this.nextEnemy) {
    var enemy = enemies.get();
    if (enemy) {
        enemy.setActive(true);
        enemy.setVisible(true);

        // place the enemy at the start of the path
        enemy.startOnPath();

        this.nextEnemy = time + 2000;
    }
  }
}
