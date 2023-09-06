import { createApp } from "./utils/createApp.js";
import { customLoader } from "./utils/Loader.js";
import { createRocket, createBullet, addInviders } from "./helper.js";

export const assetsObj = {
  rocket: "assets/rocket.png",
  bluerinvader: "assets/blueinvader.png",
  redinvader: "assets/redinvader.png",
  pinkinvader: "assets/pinkivader.png",
  yellowinvader: "assets/yellowinvader.png",
};

let width = 600;
let height = 600;
let direction = 0;
let speed = 5;
let pressedButton = null;
let bullets = [];
let invidersBullets = [];
let containerDirection = 1;
let containerDirectionY = 1;
let containerSpeed = 1;
let containerSpeedY = 0.5;
let score = 0;

customLoader(assetsObj, initGame);

function initGame(resources) {
  const app = createApp(width, height);
  root.appendChild(app.view);

  let container = new PIXI.Container();
  let scoreText = new PIXI.Text(`Score: ${score}`, { fontSize: 24 });
  scoreText.x = 10;
  scoreText.y = 10;
  app.stage.addChild(container);
  app.stage.addChild(scoreText);

  let rocket = createRocket(width / 2, 500, app.stage, resources);
  addInviders(width, container, resources);

  let random = () => Math.random() * 4000 + 1000;

  function invaiderShoots(params) {
    setTimeout(() => {
      let randomInvaider =
        container.children[
          Math.floor(Math.random() * container.children.length)
        ];
      let invidersBullet = createBullet(
        container.x + randomInvaider.x + 15,
        container.y + randomInvaider.y,
        app.stage
      );
      invidersBullets.push(invidersBullet);
      invidersBullet.gasrolisDrosX = randomInvaider.x + container.x + 15;
      invaiderShoots();
    }, random());
  }
  invaiderShoots();

  app.ticker.add(() => {
    if (
      rocket.x + direction * speed < width - 15 &&
      rocket.x + direction * speed > 15
    ) {
      rocket.x = rocket.x + direction * speed;
    }
    if (
      container.x + containerDirection * speed > 130 ||
      container.x + containerDirection * speed < -130
    ) {
      containerDirection = -containerDirection;
    }
    container.x = container.x + containerDirection * containerSpeed;

    if (
      container.y + containerDirectionY * containerSpeedY > 10 ||
      container.y + containerDirectionY * containerSpeedY < -10
    ) {
      containerDirectionY = -containerDirectionY;
    }

    container.y = container.y + containerDirectionY * containerSpeedY;

    bullets.forEach((bullet) => {
      bullet.y -= 10;
      if (bullet.y < 0) {
        bullets = bullets.filter((b) => b !== bullet);
        app.stage.removeChild(bullet);
      }
      container.children.forEach((invider) => {
        if (
          bullet.y === invider.y - 30 &&
          bullet.x <= container.x + invider.x + 30 &&
          bullet.x > container.x + invider.x
        ) {
          container.removeChild(invider);
          bullets = bullets.filter((b) => b !== bullet);
          app.stage.removeChild(bullet);
          score += 10;
          scoreText.text = `Score: ${score}`;
        }
      });
    });

    invidersBullets.forEach((bullet) => {
      bullet.y += 10;
      if (bullet.y > 600) {
        bullets = bullets.filter((b) => b !== bullet);
        app.stage.removeChild(bullet);
      }
      if (
        bullet.y > rocket.y &&
        bullet.y < rocket.y + 50 &&
        bullet.gasrolisDrosX <= rocket.x + 25 &&
        bullet.gasrolisDrosX > rocket.x - 25
      ) {
        console.log("moxvda");
        invidersBullets = invidersBullets.filter((b) => b !== bullet);
        app.stage.removeChild(rocket);
        app.ticker.stop();
      }
    });

    if (container.children.length === 0) {
      console.log("You Win");
    }
  });

  function BulletAndShooting() {
    let bullet = createBullet(rocket.x, rocket.y - 10, app.stage);
    bullets.push(bullet);
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      BulletAndShooting();
    }
  });
  function destroy(bullet) {
    for (let i = 0; i < container.children.length; i++) {
      if (
        bullet.y === container.children[i].y &&
        bullet.x - 30 < container.children[i].x &&
        bullet.x > container.children[i].x - 30
      ) {
        container.removeChild(container.children[i-1]);
        app.stage.removeChild(bullet);
      }
    }

    console.log(container.children[0].y, container.children[0].x);

    if (container.x == 0) {
      app.ticker.add(containerMovesRight);
    }

    if (container.x === 250) {
      app.ticker.remove(containerMovesRight);
    }

    function containerMovesRight() {
      container.x += 1;
      if (container.x === 250) {
        app.ticker.remove(containerMovesRight);
        app.ticker.add(containerMovesLeft);
        console.log("marjal");
      }
    }

    function containerMovesLeft() {
      container.x -= 1;
      if (container.x === -350) {
        app.ticker.remove(containerMovesLeft);
        app.ticker.add(containerMovesRight);
      }
    }
  }
}

// achos bagia gasasworebeli
window.addEventListener("keydown", (e) => {
  if (e.key === "d" && pressedButton !== "d") {
    direction = 1;
    pressedButton = "d";
  }
  if (e.key === "a" && pressedButton !== "a") {
    direction = -1;
    pressedButton = "a";
  }
});

// achos bagia gasasworebeli
window.addEventListener("keyup", (e) => {
  if (e.key === "d" && pressedButton === "d") {
    pressedButton = null;
    direction = 0;
  }
  if (e.key === "a" && pressedButton === "a") {
    pressedButton = null;
    direction = 0;
  }
});
