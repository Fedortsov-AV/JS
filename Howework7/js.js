/*
1. Выводить счёт в режиме реального времени.
2. Генерировать временные препятствия на поле.
3. *Убрать границы поля. Т.е. при пересечении границы поля змейка появляется с противоположной стороны.
 */

"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
    startCountBlock: 20, // стартовое количество преград
    generateBlockForSnakeLen: 3, // генерация новых преград при увеличении длины змейки на 3 блока
};

const config = {
    settings,
    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    getStartCountBlock() {
      return this.settings.startCountBlock
    },

    getGeneratedBlockForSnakeLen() {
      return this.settings.generateBlockForSnakeLen
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

const map = {
    cells: null, // {x1_y1: td, x1_y2: td}
    usedCells: null,

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {}; // {x1_y1: td, x1_y2: td}
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, blockArray) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];
        console.log(snakePointsArray);
        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        blockArray.forEach((point) => {
            const blockCell = this.cells[`x${point.x}_y${point.y}`];
            blockCell.classList.add('block');
            this.usedCells.push(blockCell);
        });
    },
};

const snake = {
    config,
    body: null,
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint()); // [p3, p2, p1] // [p4, p3, p2]
        this.body.pop();
    },

    growUp() {
        const lastBodyIdx = this.getBody().length - 1;
        const lastBodyPoint = this.body[lastBodyIdx];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch(this.direction) {
            case 'up':
                return this.validateStep({x: firstPoint.x, y: firstPoint.y - 1});
            case 'right':
                return this.validateStep({x: firstPoint.x + 1, y: firstPoint.y});
            case 'down':
                return this.validateStep({x: firstPoint.x, y: firstPoint.y + 1});
            case 'left':
                return this.validateStep({x: firstPoint.x - 1, y: firstPoint.y});
        }
    },

    validateStep(point){
        if (point.x < 0) {point.x = this.config.getRowsCount()-1};
        if (point.x >= this.config.getRowsCount()){point.x = 0};
        if (point.y < 0) {point.y = this.config.getColsCount()-1};
        if (point.y >= this.config.getColsCount()){point.y = 0};
        return point;
    }
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const block = {
    pointBlock: null,

    init(point){
          this.pointBlock = point;
    },

    getCoordinatesBlock() {
        return this.pointBlock;
    },




    isOnBlock(point){
      for (let i in this.pointBlock){
          if (this.pointBlock[i].x === point.x && this.pointBlock[i].y === point.y){
              return true
          }

      };
      return false
  }

};



const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    tickInterval: null,
    block,
    score: 0,

    init(userSettings) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.score = 0;
        this.setScore();
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.block.init(this.getRandomBlock());
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.getRandomBlock();

        this.render();
    },



    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра завершена', true);
    },

    tickHandler() {
        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.score += 1;
            this.setScore();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            if (this.isGameWon()) {
                this.finish();
            }
            if (this.snake.body.length % this.config.getGeneratedBlockForSnakeLen() === 0){
                this.block.pointBlock = null;
                this.block.init(this.getRandomBlock());

            }

        }

        if (this.block.isOnBlock(this.snake.getNextStepHeadPoint())){
            return this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    setScore(){
       document.getElementById('score').textContent = `Score: ${this.score}`;
    },



    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    getRandomFreeCoordinates() {

       const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.block.getCoordinatesBlock()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
    },

    getRandomBlock(){
        const rndBlock =[];
        const exclude = [...this.snake.getBody()];
         for (let i = 0; i < this.config.getStartCountBlock(); i++){
             const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                rndBlock.push(rndPoint);
            }
        };
       return rndBlock
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.block.getCoordinatesBlock());
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },
};

game.init({speed: 5});
