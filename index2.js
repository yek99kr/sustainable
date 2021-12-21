const {
  Engine,
  Composite,
  Bodies,
  Mouse,
  MouseConstraint,
  Constraint,
  Composites,
  Render,
  Body,
  Runner,
} = Matter;

const canvas = document.querySelector(".canvas");
const width = window.innerWidth;
const height = window.innerHeight;
let garbages = [];
let isDrawing;

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
  element: canvas,
  engine: engine,
  options: {
    background: "white",
    showAngleIndicator: false,
    wireframes: false,
  },
});

render.canvas.width = width;
render.canvas.height = height;

//Render
Render.run(render);

let runner = Runner.create();

Runner.run(runner, engine);

//mouse
let canvasmouse = Mouse.create(canvas);
const options = {
  mouse: canvasmouse,
};
let mConstraint = MouseConstraint.create(engine, options);
// Composite.add(world, mConstraint);

//Ground
const g = Bodies.rectangle(width / 2, height + 51, width, 100, {
  isStatic: true,
});
const c = Bodies.rectangle(width / 2, -51, width, 100, { isStatic: true });
const r = Bodies.rectangle(width + 50, height / 2, 100, height, {
  isStatic: true,
});
const l = Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
Composite.add(world, [g, c, r, l]);

//Earth
const earth = Bodies.rectangle(width / 2, height / 2, 400, 400, {
  render: {
    sprite: {
      texture: "p.png",
      xScale: 1,
      yScale: 1,
    },
  },
});
earth.restitution = 1;
Composite.add(world, earth);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  mousewheel: true,
  loop: true,
  speed: 10,
  effect: "creative",
  creativeEffect: {
    prev: {
      opacity: 0,
    },
    next: {
      opacity: 0,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/////////////Garbages desktop
if (window.innerWidth > 700) {
  canvas.addEventListener("mousemove", function (e) {
    e.preventDefault();
    if (!this.isDrawing) {
      return;
    }

    if (garbages.length > 500) {
      return;
    }
    let clientX = e.clientX || e.pageX;
    let clientY = e.clientY || e.pageY;

    createGarbage(clientX, clientY, 60, 60);

    switch (garbages.length) {
      case 100:
        Body.scale(earth, 0.9, 0.9);
        earth.render.sprite.xScale = 0.9;
        earth.render.sprite.yScale = 0.9;
        break;

      case 200:
        Body.scale(earth, 0.8, 0.8);
        earth.render.sprite.xScale = 0.69;
        earth.render.sprite.yScale = 0.69;
        break;

      case 300:
        Body.scale(earth, 0.7, 0.7);
        earth.render.sprite.xScale = 0.5;
        earth.render.sprite.yScale = 0.5;
        break;

      case 400:
        Body.scale(earth, 0.5, 0.5);
        earth.render.sprite.xScale = 0.25;
        earth.render.sprite.yScale = 0.25;
        break;

      case 450:
        Body.scale(earth, 0.4, 0.4);
        earth.render.sprite.xScale = 0.1;
        earth.render.sprite.yScale = 0.1;
        break;

      case 500:
        earth.position.x = -1000;
        earth.position.y = -1000;

        document.querySelector(".swiper").style.display = "block";
    }
  });
  canvas.addEventListener("mouseup", function (e) {
    e.preventDefault();
    this.isDrawing = false;
  });
  canvas.addEventListener("mousedown", function (e) {
    e.preventDefault();
    this.isDrawing = true;
  });
}

/////////////Garbages mobile
if (window.innerWidth <= 700) {
  // document.querySelector(".swiper-button-next").style.zIndex = "none";
  // document.querySelector(".swiper-button-prev").style.display = "none";

  // var swiper = new Swiper(".mySwiper", {
  //   slidesPerView: 1,
  //   loop: true,
  //   freeMode: true,
  // });
  Body.scale(earth, 0.8, 0.8);
  earth.render.sprite.xScale = 0.69;
  earth.render.sprite.yScale = 0.69;

  canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    let clientX = e.touches[0].clientX || e.touches[0].pageX;
    let clientY = e.touches[0].clientY || e.touches[0].pageY;
    // let clientX = e.clientX || e.pageX;
    // let clientY = e.clientY || e.pageY;

    if (garbages.length > 200) {
      return;
    }

    createGarbageM(clientX, clientY, 36, 36);

    switch (garbages.length) {
      case 50:
        Body.scale(earth, 0.7, 0.7);
        earth.render.sprite.xScale = 0.5;
        earth.render.sprite.yScale = 0.5;
        break;

      case 100:
        Body.scale(earth, 0.6, 0.6);
        earth.render.sprite.xScale = 0.35;
        earth.render.sprite.yScale = 0.35;
        break;

      case 150:
        Body.scale(earth, 0.5, 0.5);
        earth.render.sprite.xScale = 0.2;
        earth.render.sprite.yScale = 0.2;
        break;

      case 200:
        earth.position.x = -1000;
        earth.position.y = -1000;

        document.querySelector(".swiper").style.display = "block";
    }
  });
}

function createGarbage(x, y, w, h) {
  let randomimg = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  let body = Matter.Bodies.rectangle(x, y, w, h, {
    render: {
      sprite: {
        texture: `n${randomimg}.png`,
        xScale: 0.28,
        yScale: 0.28,
      },
    },
  });
  Composite.add(world, body);

  garbages.push(body);
}

function createGarbageM(x, y, w, h) {
  let randomimg = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  let body = Matter.Bodies.rectangle(x, y, w, h, {
    render: {
      sprite: {
        texture: `n${randomimg}.png`,
        xScale: 0.18,
        yScale: 0.18,
      },
    },
  });
  Composite.add(world, body);

  garbages.push(body);
}
