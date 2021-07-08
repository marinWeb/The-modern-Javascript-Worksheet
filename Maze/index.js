const { Render, World, Engine, Bodies, Runner, Body, Events } = Matter;

const cellsHorizontal = 4;
const cellsVertical = 6;

const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
];

World.add(world, walls);

//Maze creation
const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const idx = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[idx];
    arr[idx] = temp;
  }

  return arr;
};

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCells = (row, column) => {
  //If we have visited the cell at [row,column] return
  if (grid[row][column]) return;

  //if we haven't visisted the cell at [row, column] mark it visited by turning the grid value true
  grid[row][column] = true;

  //Assemble randomly ordered list of neighbours
  const neighbours = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left'],
  ]);

  //FOr each neighbour
  for (let neighbour of neighbours) {
    const [nextRow, nextColumn, direction] = neighbour;
    //see if that neighbour is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }
    //if we have visited that neighbour move to next neighbour
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    //Remove the wall from either horizontal or vertical
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    //visit that next cell
    stepThroughCells(nextRow, nextColumn);
  }
};

stepThroughCells(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      10,
      {
        isStatic: true,
        label: 'wall',
        render: {
          fillStyle: 'red',
        },
      }
    );

    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      10,
      unitLengthY,
      {
        isStatic: true,
        label: 'wall',
        render: {
          fillStyle: 'red',
        },
      }
    );

    World.add(world, wall);
  });
});

//Goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    isStatic: true,
    label: 'goal',
    render: {
      fillStyle: 'green',
    },
  }
);

World.add(world, goal);

//Ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: 'ball',
  render: {
    fillStyle: 'blue',
  },
});

World.add(world, ball);

document.addEventListener('keydown', (e) => {
  const { x, y } = ball.velocity;

  if (e.code === 'KeyW') {
    Body.setVelocity(ball, { x, y: y - 5 });
  } else if (e.code === 'KeyD') {
    Body.setVelocity(ball, { x: x + 5, y });
  } else if (e.code === 'KeyS') {
    Body.setVelocity(ball, { x, y: y + 5 });
  } else if (e.code === 'KeyA') {
    Body.setVelocity(ball, { x: x - 5, y });
  }
});

//Collision Detection between the ball and the goal
Events.on(engine, 'collisionStart', (e) => {
  e.pairs.forEach((collision) => {
    let labels = ['ball', 'goal'];

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector('.winner').classList.remove('hidden');
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === 'wall') {
          Body.setStatic(body, false);
        }
      });
    }
  });
});
