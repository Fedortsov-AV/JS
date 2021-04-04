/*
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.

2*. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п.,
 */
'use strict';
const styleTable = `<style>
                        table {
                        border-collapse: collapse;
                        -moz-text-size-adjust: auto;
                        text-decoration-color: black;
                        }
                        tr {
                        width: 20px;
                        height: 20px;

                        }
                        td {
                        border: 1px solid #000000;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        }
                        .whitetext {
                        text-shadow: 1px 1px 2px black, 0 0 1em white;
                        color: white;
                        }
                        .blacktext {
                        text-shadow: 1px 1px 2px #fffefe, 0 0 1em white;
                        color: black;
                        }
                    </style>`;
document.head.innerHTML = styleTable;

 const HTMLString =`<div class="good">
                            <table id="chess"></table>
                    </div>`;
document.body.innerHTML = HTMLString;
const litera = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']



const settings = {
  row: 10,
  col: 10,
  chesses: [
        // Черные фигуры
        {name: 'П', position: 21},
        {name: 'П', position: 22},
        {name: 'П', position: 23},
        {name: 'П', position: 24},
        {name: 'П', position: 25},
        {name: 'П', position: 26},
        {name: 'П', position: 27},
        {name: 'П', position: 28},
        {name: 'Л', position: 11},
        {name: 'Л', position: 18},
        {name: 'К', position: 12},
        {name: 'К', position: 17},
        {name: 'С', position: 13},
        {name: 'С', position: 16},
        {name: 'Ф', position: 14},
        {name: 'Кр', position: 15},
        // Белые фигуры
        {name: 'П', position: 71},
        {name: 'П', position: 72},
        {name: 'П', position: 73},
        {name: 'П', position: 74},
        {name: 'П', position: 75},
        {name: 'П', position: 76},
        {name: 'П', position: 77},
        {name: 'П', position: 78},
        {name: 'Л', position: 81},
        {name: 'Л', position: 88},
        {name: 'К', position: 82},
        {name: 'К', position: 87},
        {name: 'С', position: 83},
        {name: 'С', position: 86},
        {name: 'Ф', position: 84},
        {name: 'Кр', position: 85}
    ],
}

const game = {
  settings,
  containerElement: '',
  cellElements: [],

  init(){
    this.containerElement = document.getElementById('chess');
    this.initCells();
    this.render();
  },

  initCells() {
    this.containerElement.innerHTML = '';
    this.cellElements = [];
    let i = 0;
    for (let row = 0; row < this.settings.row; row++) {
      const trElem = document.createElement('tr');
      this.containerElement.appendChild(trElem);

      for (let col = 0; col < this.settings.col; col++, i++) {
        const cell = document.createElement('td');
        trElem.appendChild(cell);
        this.cellElements.push(cell);
         if (row % 2 === col % 2) {
                this.cellElements[i].bgColor = 'black';
            } else {
                trElem.backgroundColor = 'black';
            };
      };
    };
  },

  render (){
    for (let i = 0; i < 10; i++){
      this.cellElements[i].bgColor = "#88888";
    };

     for (let i = 90; i < 100; i++){
      this.cellElements[i].bgColor = "#88888";
    };

    for (let i = 0; i < 100; i++){
      if (i % 10 === 0 || i % 10 === 9) {this.cellElements[i].bgColor = "#88888";}
    };


    for (let i = 90; i < 100; i++){
     this.cellElements[i].textContent = litera[i-91];
    };


    for (let i = 0; i < 9; i++){
     this.cellElements[i].textContent = litera[i-1];
    };

    for (let i = 11; i < 90; i += 10){
      this.cellElements[(i-1)].textContent = 9 - (i-1) / 10;
    };

    for (let i = 20; i < 100; i += 10){
      this.cellElements[(i-1)].textContent = 9 - (i-10) / 10;


    };

    for (let i in this.settings.chesses){
      if (i < 16){
      this.cellElements[this.settings.chesses[i].position].className = 'blacktext';
      } else {
        this.cellElements[this.settings.chesses[i].position].className = 'whitetext';
      };
      this.cellElements[this.settings.chesses[i].position].textContent = this.settings.chesses[i].name
    };

  }
};

game.init();

game.cellElements
