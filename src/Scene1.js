const STATUS_TREE = {
  STATUS1: 1,
  STATUS2: 2,
  STATUS3: 3,
  STATUS4: 4,
  STATUS5: 5,
};

const ITEMS = {
  PEA: 'pea',
  PICKAXE: 'pickaxe',
  SPRINKLER: 'sprinkler',
  FERTILIZER: 'fertilizer',
};

class Scene1 extends Phaser.Scene {
  components = [];
  tweenFer;
  tweenSpr;
  tweenPick;
  tweenPea;

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
  }

  //create gameConfig;
  create() {
    this.createBackground();
    this.createItemDefault();
    this.createItem();
    this.addZone();
  }

  createBackground() {
    let image = this.add.image(this.cameras.main.width / 2,
        this.cameras.main.height / 2, 'background')
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)
  }

  createItemDefault() {
    const items = [
      {id: 1, name: ITEMS.PEA, key: 'pea'},
      {id: 2, name: ITEMS.PICKAXE, key: 'pickaxe'},
      {id: 3, name: ITEMS.SPRINKLER, key: 'sprinkler'},
      {id: 4, name: ITEMS.FERTILIZER, key: 'fertilizer'}
    ]
    const baseX = 100, baseY = 100;
    items.map((item, index) => {
      const image = this.add.image(0, 0, 'item').setScale(1);
      this.components.push(
          this.add.container(baseX + index * 200, baseY, [image]));
    })
  }

  createItem() {
    let vm = this;
    const items = [
      {id: 1, name: 'pea', key: 'pea'},
      {id: 2, name: 'pickaxe', key: 'pickaxe'},
      {id: 3, name: 'sprinkler', key: 'sprinkler'},
      {id: 4, name: 'fertilizer', key: 'fertilizer'}
    ]
    const baseX = 100, baseY = 100;
    items.map((item, index) => {
      const startX = baseX + index * 200;
      const image = this.add.image(startX, baseY, item.key).setScale(
          0.24).setInteractive().setName(item.name);
      if (item.name === ITEMS.FERTILIZER) {
        this.tweenFer = this.tweens.add({
          targets: image,
          angle: {from: -120, to: -180},
          duration: 250,
          yoyo: true,
          loop: -1,
          paused: true
        });
      }

      this.input.setDraggable(image);
    });

    this.input.on('dragstart', function (pointer, gameObject) {
      this.children.bringToTop(gameObject);
      gameObject.setScale(0.36);
    }, this);
    this.input.on('dragenter', function (pointer, gameObject, dropZone) {
      // console.log("duio")
      // zone.setTint(0x00ff00);
      if (gameObject.name === ITEMS.FERTILIZER) {
        // gameObject.setRotation(80);
        console.log("duio")
        vm.tweenFer.play();
      }
    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

      vm.tweenFer.stop();

    });
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('drop', function (pointer, gameObject, dropZone) {
      console.log(gameObject.name);

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
        gameObject.setScale(0.24)
      }
    });
  }

  addZone() {
    //  A drop zone
    var zone = this.add.zone(this.cameras.main.width / 2 - 200,
        this.cameras.main.height / 2 + 250, 300, 300).setDropZone();

    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x + zone.input.hitArea.x,
        zone.y + zone.input.hitArea.y, zone.input.hitArea.width,
        zone.input.hitArea.height);
  }

}

