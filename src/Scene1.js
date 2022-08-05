const STATUS_TREE = {
  STATUS_1: 1, // Nothing
  STATUS_2: 2, // Landfill done
  STATUS_3: 3, // Drills done
  STATUS_4: 4, // Fertilization lv1
  STATUS_5: 5, // Fertilization lv2
  STATUS_6: 6, // Fertilization lv3
  STATUS_7: 7, // Fertilization lv4
  STATUS_8: 8, // Fertilization lv5
  STATUS_9: 9, // Fertilization lv5
  STATUS_10: 10, // Fertilization lv5
  STATUS_11: 11, // Fertilization lv5
};

const ITEMS = {
  PEA: 'pea',
  PICKAXE: 'pickaxe',
  SPRINKLER: 'sprinkler',
  FERTILIZER: 'fertilizer',
};

const items = [
  {id: 1, name: ITEMS.PEA, key: ITEMS.PEA},
  {id: 2, name: ITEMS.PICKAXE, key: ITEMS.PICKAXE},
  {id: 3, name: ITEMS.SPRINKLER, key: ITEMS.SPRINKLER},
  {id: 4, name: ITEMS.FERTILIZER, key: ITEMS.FERTILIZER}
];

class Scene1 extends Phaser.Scene {
  components = [];
  statusProcess;
  isWatering;
  isFertilize;
  mapTweenRun = new Map();
  mapTweenBack = new Map();
  pea;
  lv1;
  lv2;
  lv3;
  lv4;

  constructor() {
    super('Scene1');
  }

  //load image and audio;
  preload() {
    // loading gameConfig;
    // let progress = this.add.graphics();
    // let text1 = this.add.text(520, 380, "LOADING GAME!",
    //     {font: '50px Arial', fill: 'white'})

    // this.load.on('progress', function (value) {
    //   progress.clear();
    //   progress.fillStyle(0xffffff, 1);
    //   progress.fillRect(0, 270, 1525 * value, 100);
    //   text1.setText("LOADING GAME " + Math.floor(100 * value) + "%")
    // })
    //
    // this.load.on('complete', function () {
    //   progress.destroy();
    // })

    // load file json data images and audios
    this.load.pack('dataGame', 'assets/Data/dataGame.json');
    this.statusProcess = STATUS_TREE.STATUS_1;
    this.isWatering = false;
    this.isFertilize = false;

    this.load.spritesheet('lv11', 'assets/sprites/anime.png', {
          frameWidth: 400,
          frameHeight: 530
        }
    );
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  //create gameConfig;
  create() {
    this.createBackground();
    this.createItemDefault();
    this.createItem();
    this.addZone();

    this.anims.create({
      key: 'walklv1',
      frames: this.anims.generateFrameNumbers('lv11',
          {frames: [0, 1, 2, 3, 4, 5, 6, 7]}),
      frameRate: 8
    });
    this.anims.create({
      key: 'walklv2',
      frames: this.anims.generateFrameNumbers('lv11',
          {frames: [8, 9, 10, 11, 12, 13, 14, 15]}),
      frameRate: 8
    });
    this.anims.create({
      key: 'walklv3',
      frames: this.anims.generateFrameNumbers('lv11',
          {frames: [16, 17, 18, 19, 20, 21, 22, 23]}),
      frameRate: 8
    });
    this.anims.create({
      key: 'walklv4',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [24, 25, 26, 27, 28, 29, 30, 31]
      }),
      frameRate: 8
    });
    this.anims.create({
      key: 'walklv5',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
          48]
      }),
      frameRate: 8
    });
    this.anims.create({
      key: 'walklv6',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [ 49, 50, 51, 52, 53, 54, 55, 56]
      }),
      frameRate: 8
    });
    this.anims.create({
      key: 'walklv7',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
          72, 73]
      }),
      frameRate: 8
    });
  }

  createBackground() {
    let image = this.add.image(this.cameras.main.width / 2,
        this.cameras.main.height / 2, 'background');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
  }

  createItemDefault() {
    const baseX = 100, baseY = 100;
    for (let i = 0; i < 4; i++) {
      this.add.image(baseX + 200 * i, baseY, 'item').setScale(1).setOrigin(0.5);
    }
  }

  createItem() {
    let vm = this;
    const baseX = 100, baseY = 100;
    items.map((item, index) => {
      const startX = baseX + index * 200;
      let tweenRun, tweenBack;
      const image = this.add.image(startX, baseY, item.key).setScale(
          0.24).setInteractive().setName(item.name).setOrigin(0.5);
      switch (item.name) {
        case ITEMS.PEA:
          tweenRun = this.tweens.add({
            targets: image,
            angle: {from: -10, to: 10},
            duration: 250,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image,
            angle: 0,
            duration: 500,
            loop: 0,
            paused: true
          });
          break;
        case ITEMS.PICKAXE:
          tweenRun = this.tweens.add({
            targets: image,
            angle: {from: -90, to: -120},
            duration: 250,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image,
            angle: 0,
            duration: 500,
            loop: 0,
            paused: true
          });
          break;
        case ITEMS.FERTILIZER:
          tweenRun = this.tweens.add({
            targets: image,
            angle: {from: -90, to: -120},
            duration: 250,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image,
            angle: 0,
            duration: 500,
            loop: 0,
            paused: true
          });
          break;
        case ITEMS.SPRINKLER:
          tweenRun = this.tweens.add({
            targets: image,
            angle: {from: -30, to: -60},
            duration: 500,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image,
            angle: 0,
            duration: 500,
            loop: 0,
            paused: true
          });
          break;
      }
      this.mapTweenRun.set(item.name, tweenRun);
      this.mapTweenBack.set(item.name, tweenBack);
      this.input.setDraggable(image);
    });

    this.input.on('dragstart', function (pointer, gameObject) {
      this.children.bringToTop(gameObject);
      gameObject.setScale(0.36);
    }, this);

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {
      vm.mapTweenRun.get(gameObject.name).play();
      vm.gamePlay(gameObject, dropZone);
    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {
      vm.mapTweenRun.get(gameObject.name).stop();
      vm.mapTweenBack.get(gameObject.name).play();
    });
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('drop', function (pointer, gameObject, dropZone) {
      console.log(gameObject.name);
      gameObject.x = gameObject.input.dragStartX;
      gameObject.y = gameObject.input.dragStartY;
      gameObject.setScale(0.24);
      vm.mapTweenRun.get(gameObject.name).stop();
      vm.mapTweenBack.get(gameObject.name).play();
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
        gameObject.setScale(0.24)
      }
    });
  }

  gamePlay(item, zone) {
    let vm = this;
    console.log("Before: ", vm.statusProcess);
    switch (vm.statusProcess) {
      case STATUS_TREE.STATUS_1:
        if (item.name === ITEMS.PICKAXE) {
          vm.statusProcess++;
        }
        break;
      case STATUS_TREE.STATUS_2:
        if (item.name === ITEMS.PEA) {
          vm.statusProcess++;
        }
        break;
      case STATUS_TREE.STATUS_3:
        if (item.name === ITEMS.PICKAXE) {
          vm.statusProcess++;
        }
        break;
      case STATUS_TREE.STATUS_4:
        if (item.name === ITEMS.SPRINKLER) {
          vm.isWatering = true;
        }
        if (vm.isWatering) {
          vm.statusProcess++;
          vm.isWatering = false;
        }
        break;
      case STATUS_TREE.STATUS_5:
        if (item.name === ITEMS.FERTILIZER) {
          vm.isFertilize = true;
        } else if (item.name === ITEMS.SPRINKLER) {
          vm.isWatering = true;
        }
        if (vm.isFertilize && vm.isWatering) {
          vm.statusProcess++;
          vm.isWatering = false;
          vm.isFertilize = false;
        }
        break;
      case STATUS_TREE.STATUS_6:
        if (item.name === ITEMS.FERTILIZER) {
          vm.isFertilize = true;
        } else if (item.name === ITEMS.SPRINKLER) {
          vm.isWatering = true;
        }
        if (vm.isFertilize && vm.isWatering) {
          vm.statusProcess++;
          vm.isWatering = false;
          vm.isFertilize = false;
        }
        break;
      case STATUS_TREE.STATUS_7:
        if (item.name === ITEMS.FERTILIZER) {
          vm.isFertilize = true;
        } else if (item.name === ITEMS.SPRINKLER) {
          vm.isWatering = true;
        }
        if (vm.isFertilize && vm.isWatering) {
          vm.statusProcess++;
          vm.isWatering = false;
          vm.isFertilize = false;
        }
        break;
    }
    this.updateProcess();
    console.log("After: ", vm.statusProcess);
  }

  addZone() {
    this.pea = this.add.sprite(this.cameras.main.width / 2 -150,
        this.cameras.main.height / 2 + 50, 'lv-2');

    this.pea.setInteractive();
    this.pea.input.dropZone = true;
    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(this.pea.x - this.pea.input.hitArea.width / 2,
        this.pea.y - this.pea.input.hitArea.height / 2, this.pea.width,
        this.pea.height);
  }

  updateProcess() {
    switch (this.statusProcess) {
        // cuốc ra
      case STATUS_TREE.STATUS_2:
        this.pea.play('walklv1');
        break;
        // cho hạt
      case STATUS_TREE.STATUS_3:
        this.pea.play('walklv2');
        break;
        // lấp đất
      case STATUS_TREE.STATUS_4:
        this.pea.play('walklv3');
        break;
        // ươm mầm
      case STATUS_TREE.STATUS_5:
        this.pea.play('walklv4');
        break;
        // cây con
      case STATUS_TREE.STATUS_6:
        this.pea.play('walklv5');
        break;
        // trưởng thành
      case STATUS_TREE.STATUS_7:
        this.pea.play('walklv6');
        break;
      case STATUS_TREE.STATUS_8:
        this.pea.play('walklv7');
        break;
    }
  }

}

