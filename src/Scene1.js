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

const intervalConfig = 500;
const frameRateConfig = 5;
const SCHOOL_NAME = "Trường Tiểu học Đồng Tiến";
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
  isDelay;
  isIncrease;
  broadContainer;
  textBroad;
  lastTime;
  interval;
  zoneItem;
  today;
  textSchoolName;

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

    this.load.spritesheet('lv12', 'assets/sprites/anime2.png', {
          frameWidth: 200,
          frameHeight: 200
        }
    );

    this.load.spritesheet('lv13', 'assets/sprites/anime3.png', {
          frameWidth: 200,
          frameHeight: 200
        }
    );
    this.cameras.main.setBackgroundColor('#ffffff')
    this.isDelay = false;
    this.isIncrease = false;
    this.today = 0;
  }

  getTime() {
    let d = new Date();
    return d.getTime();
  }

  //create gameConfig;
  create() {
    this.createBackground();
    this.createItemDefault();
    this.createItem();
    this.addZone();
    this.createAnim();
    const image = this.add.image(0, 0, 'broad');
    this.textSchoolName = this.add.text(
        0,
        0,
        SCHOOL_NAME,
        {color: '#000000', font: 'bold 35px Arial'}
    ).setOrigin(0);
    this.textSchoolName.x = this.cameras.main.width - this.textSchoolName.width - 10;
    this.textSchoolName.y = 10;
    this.textBroad = this.add.text(0, 10, this.today + " day",
        {color: '#000000', font: 'bold 55px Arial'}).setOrigin(0.5);
    this.broadContainer = this.add.container(this.cameras.main.width / 2,
        image.height / 2, [image, this.textBroad]);
    this.lastTime = this.getTime();
    this.interval = intervalConfig;

  }

  createAnim() {
    this.anims.create({
      key: 'walklv1',
      frames: this.anims.generateFrameNumbers('lv11',
          {frames: [0, 1, 2, 3, 4, 5, 6, 7]}),
      frameRate: frameRateConfig,
      delay: 300
    });
    this.anims.create({
      key: 'walklv2',
      frames: this.anims.generateFrameNumbers('lv11',
          {frames: [8, 9, 10, 11, 12, 13, 14, 15]}),
      frameRate: frameRateConfig,
      delay: 300
    });
    this.anims.create({
      key: 'walklv3',
      frames: this.anims.generateFrameNumbers('lv11',
          {frames: [16, 17, 18, 19, 20, 21, 22, 23]}),
      frameRate: frameRateConfig,
      delay: 300
    });
    this.anims.create({
      key: 'walklv4',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [24, 25, 26, 27, 28, 29, 30, 31]
      }),
      frameRate: frameRateConfig,
      delay: 1500
    });
    this.anims.create({
      key: 'walklv5',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
          48]
      }),
      frameRate: frameRateConfig,
      delay: 1500
    });
    this.anims.create({
      key: 'walklv6',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [49, 50, 51, 52, 53, 54, 55, 56]
      }),
      frameRate: frameRateConfig,
      delay: 1500
    });
    this.anims.create({
      key: 'walklv7',
      frames: this.anims.generateFrameNumbers('lv11', {
        frames: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
          72, 73]
      }),
      frameRate: frameRateConfig,
      delay: 1000
    });
    this.anims.create({
      key: 'bon',
      frames: this.anims.generateFrameNumbers('lv12',
          {frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: frameRateConfig,
      repeat: -1,
    });
    this.anims.create({
      key: 'tuoi',
      frames: this.anims.generateFrameNumbers('lv13',
          {frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: frameRateConfig,
      repeat: -1,
    });
  }

  createBackground() {
    let image = this.add.image(this.cameras.main.width / 2,
        this.cameras.main.height / 2, 'background1');
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
      let i = this.add.image(0, 0, item.key).setName("image").setScale(0.24);
      let a;
      if (item.name === ITEMS.SPRINKLER) {
        a = this.add.sprite(-75, 105).setName("anim").setScale(0.7);
      } else if (item.name === ITEMS.FERTILIZER) {
        a = this.add.sprite(-50, 100).setName("anim").setScale(0.7);
      } else {
        a = this.add.sprite(-50, 100).setName("anim").setScale(0.7);
      }

      const image = this.add.container(startX, baseY, [
        a, i
      ]);
      image.setName(item.name);
      image.setSize(i.width * 0.24, i.height * 0.24);
      image.setInteractive();
      switch (item.name) {
        case ITEMS.PEA:
          tweenRun = this.tweens.add({
            targets: image.getByName('image'),
            angle: {from: -10, to: 10},
            duration: 250,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image.getByName('image'),
            angle: 0,
            duration: 500,
            loop: 0,
            paused: true
          });
          break;
        case ITEMS.PICKAXE:
          tweenRun = this.tweens.add({
            targets: image.getByName('image'),
            angle: {from: -90, to: -120},
            duration: 250,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image.getByName('image'),
            angle: 0,
            duration: 500,
            loop: 0,
            paused: true
          });
          break;
        case ITEMS.FERTILIZER:
          tweenRun = this.tweens.add({
            targets: image.getByName('image'),
            angle: {from: -90, to: -120},
            duration: 250,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image.getByName('image'),
            angle: 0,
            duration: 500,
            loop: 0,
            paused: true
          });
          break;
        case ITEMS.SPRINKLER:
          tweenRun = this.tweens.add({
            targets: image.getByName('image'),
            angle: {from: -30, to: -60},
            duration: 500,
            yoyo: true,
            loop: -1,
            paused: true
          });
          tweenBack = this.tweens.add({
            targets: image.getByName('image'),
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
      gameObject.setScale(1.5);
    }, this);

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {
      vm.mapTweenRun.get(gameObject.name).play();
      vm.gamePlay(gameObject, dropZone);

      if (gameObject.getByName('anim')) {
        if (gameObject.name === ITEMS.SPRINKLER) {
          gameObject.getByName('anim').play('tuoi').setAlpha(1);
        } else if (gameObject.name === ITEMS.FERTILIZER) {
          gameObject.getByName('anim').play('bon').setAlpha(1);
        }
      }
    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {
      vm.mapTweenRun.get(gameObject.name).stop();
      vm.mapTweenBack.get(gameObject.name).play();
      if (gameObject.getByName('anim')) {
        gameObject.getByName('anim').setAlpha(0);
      }

    });
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('drop', function (pointer, gameObject, dropZone) {
      console.log(gameObject.name);
      gameObject.x = gameObject.input.dragStartX;
      gameObject.y = gameObject.input.dragStartY;
      gameObject.setScale(1);
      vm.mapTweenRun.get(gameObject.name).stop();
      vm.mapTweenBack.get(gameObject.name).play();
      if (gameObject.getByName('anim')) {
        gameObject.getByName('anim').setAlpha(0);
      }
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
        gameObject.setScale(1);
      }
    });
  }

  gamePlay(item, zone) {
    let vm = this;
    console.log("Before: ", vm.statusProcess);

    if (!vm.isDelay) {
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
            this.isIncrease = true;
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
            this.isIncrease = true;
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
            this.isIncrease = true;
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
            this.isIncrease = true;
            vm.statusProcess++;
            vm.isWatering = false;
            vm.isFertilize = false;
          }
          break;
      }
      this.updateProcess();
    }
    console.log("After: ", vm.statusProcess);
  }

  addZone() {
    this.pea = this.add.sprite(this.cameras.main.width / 2 - 150,
        this.cameras.main.height / 2 + 70, 'lv-2');
    this.zoneItems = this.add.zone(this.cameras.main.width / 2 - 150,
        this.cameras.main.height / 2 + 150, 600, 300);
    this.zoneItems.setInteractive();
    this.zoneItems.input.dropZone = true;
    //  Just a visual display of the drop zone
    // var graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(this.zoneItems.x - this.zoneItems.input.hitArea.width / 2,
    //   this.zoneItems.y - this.zoneItems.input.hitArea.height / 2, this.zoneItems.width,
    //   this.zoneItems.height);
  }

  updateProcess() {
    switch (this.statusProcess) {
        // cuốc ra
      case STATUS_TREE.STATUS_2:
        this.startAnimation('walklv1');
        break;
        // cho hạt
      case STATUS_TREE.STATUS_3:
        this.startAnimation('walklv2');
        break;
        // lấp đất
      case STATUS_TREE.STATUS_4:
        this.startAnimation('walklv3');
        break;
        // ươm mầm
      case STATUS_TREE.STATUS_5:
        this.startAnimation('walklv4');
        break;
        // mầm lớn
      case STATUS_TREE.STATUS_6:
        this.startAnimation('walklv5');
        break;
        // trưởng thành
      case STATUS_TREE.STATUS_7:
        this.startAnimation('walklv6');
        break;
      case STATUS_TREE.STATUS_8:
        this.startAnimation('walklv7');
        break;
    }
  }

  startAnimation(name) {
    this.isDelay = true;
    this.pea.anims.play(name);
    this.pea.on('animationcomplete', () => {
      this.anims.remove(name);
      this.isIncrease = false;
      this.isDelay = false;
    });
  }

  update() {
    const currentTime = this.getTime()
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.interval -= deltaTime;
    if (this.isIncrease && this.interval < 0) {
      this.interval = intervalConfig;
      this.today++;
      if(this.today > 1) {
        this.textBroad.setText(this.today + " days");
      } else {
        this.textBroad.setText(this.today + " day");
      }
    }
  }
}

