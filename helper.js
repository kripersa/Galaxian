
export function createRocket(x, y, container, resources) {
  const rocket = PIXI.Sprite.from(resources.rocket.baseTexture);
  rocket.x = x;
  rocket.y = y;
  rocket.height = 50;
  rocket.width = 50;
  rocket.rotation = Math.PI;
  rocket.anchor.set(0.5);
  container.addChild(rocket);
  return rocket;
}

export function createRedInvader(x, y, container, resources) {
  let redInvader = PIXI.Sprite.from(resources.redinvader.baseTexture);
  redInvader.x = x;
  redInvader.y = y;
  redInvader.height = 30;
  redInvader.width = 30;
  redInvader.Math = Math.PI;
  container.addChild(redInvader);
}

export function createBlueInvader(x, y, container, resources) {
  let blueInvader = PIXI.Sprite.from(resources.bluerinvader.baseTexture);
  blueInvader.x = x;
  blueInvader.y = y;
  blueInvader.height = 30;
  blueInvader.width = 30;
  blueInvader.Math = Math.PI;
  container.addChild(blueInvader);
}

export function createPinkInvader(x, y, container, resources) {
  let pinkInvader = PIXI.Sprite.from(resources.pinkinvader.baseTexture);
  pinkInvader.x = x;
  pinkInvader.y = y;
  pinkInvader.height = 30;
  pinkInvader.width = 30;
  pinkInvader.scale.y = 0.07;
  pinkInvader.scale.x = 0.08;
  pinkInvader.Math = Math.PI;
  container.addChild(pinkInvader);
}

export function createYellowInvader(x, y, container, resources) {
  let yellowInvader = PIXI.Sprite.from(resources.yellowinvader.baseTexture);
  yellowInvader.x = x;
  yellowInvader.y = y;
  yellowInvader.height = 30;
  yellowInvader.width = 30;
  yellowInvader.Math = Math.PI;
  container.addChild(yellowInvader);
}

export function createBullet(x, y, container) {
  let bullet = new PIXI.Graphics();
  bullet.beginFill(0xFF0000);
  bullet.drawCircle(0, 0, 3);
  bullet.x = x;
  bullet.y = y;
  bullet.endFill();
  container.addChild(bullet);
  return bullet;
}


export function addInviders(width, container, resources) {
  for (let i = 0; i < 2; i++) {
    createBlueInvader(width / 2 - 30 * 1 + i * 30, 100, container, resources);
  }
  for (let i = 0; i < 6; i++) {
    createRedInvader(width / 2 - 30 * 3 + i * 30, 130, container, resources);
  }

  for (let i = 0; i < 8; i++) {
    createPinkInvader(width / 2 - 30 * 4 + i * 30, 160, container, resources);
  }

  for (let i = 0; i < 10; i++) {
    createYellowInvader(width / 2 - 30 * 5 + i * 30, 190, container, resources);
  }
}