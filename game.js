/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let upButton= document.querySelector("#up");
let downButton= document.querySelector("#down");
let leftButton= document.querySelector("#left");
let rightButton= document.querySelector("#right");
let spanlives = document.querySelector("#lives");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPosition = [];

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize", setCanvasSize)

   function setCanvasSize(){
    if (window.innerHeight > window.innerWidth){
        canvasSize= window.innerWidth * 0.7;
    }
    else {canvasSize = window.innerHeight *0.7}

   canvas.setAttribute("width", canvasSize)
   canvas.setAttribute("height",canvasSize)

   elementsSize = (canvasSize /10) -1;
   startGame();
}

function startGame() {

    game.font = elementsSize +"px Verdana";
    game.textAlign= "";

    const map = maps[level];

    if (!map){
        gameWin()
        return;
    }
    const mapRows = map.trim().split("\n");
    const mapRowsCols= mapRows.map(row=>row.trim().split(""));

    showLives();

    enemyPosition = [];

    mapRowsCols.forEach((row, rowI)=>{
        row.forEach((col,colI)=>{
            const emoji= emojis[col];
            const posX = elementsSize* (colI);
            const posY = elementsSize*(rowI+1);

            if (col=="O"){
                playerPosition.x = posX;
                playerPosition.y = posY;
            } else if (col=="I"){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col=="X"){
                enemyPosition.push({
                    x:posX,
                    y:posY,
                })}

            game.fillText(emoji, posX, posY);

            })});
//     for (let i = 1; i <= 10; i++) {
//         for (let z = 0; z <= 9.; z++) {
//             game.fillText(emojis[mapRowsCols[i-1][z]], elementsSize*z,elementsSize*i);
//         }

//    }
            movePlayer();
}

function movePlayer () {
    const giftCollisionX = playerPosition.x.toFixed(3)==giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3)==giftPosition.y.toFixed(3);
    const giftCollision= giftCollisionX && giftCollisionY;

    if (giftCollision){
        levelWin();
    }
        const enemyCollision= enemyPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision){
        levelFail();
    }

    game.fillText(emojis["PLAYER"],playerPosition.x,playerPosition.y);
    clearMap();
    renderMap();
    game.fillText(emojis["PLAYER"],playerPosition.x,playerPosition.y);
    console.log(playerPosition.x,playerPosition.y);
    } 
function gameWin(){
    console.log("felicitaciones");
}

function showLives(){
        spanlives.innerHTML = emojis["HEART"].repeat(lives);
}

function levelWin(){
    level++;
    startGame();
}

function levelFail(){
    lives--;

    if (lives<=0){
    level=0;
    lives=3;

    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    giftPosition.x= undefined;
    giftPosition.y= undefined;
    enemyPosition.length = [];
    startGame();

}

function clearMap() {
    game.clearRect(0,0,canvasSize,canvasSize);
}

function renderMap(){
    const map = maps[level];
    const mapRows = map.trim().split("\n");
    const mapRowsCols= mapRows.map(row=>row.trim().split(""));

    mapRowsCols.forEach((row, rowI)=>{
        row.forEach((col,colI)=>{
            const emoji= emojis[col];
            const posX = elementsSize* (colI);
            const posY = elementsSize*(rowI+1);
            game.fillText(emoji, posX, posY);

            })});
}

let arrowUp= window.addEventListener("keydown",validar);
let arrowDown= window.addEventListener("keydown",validar);
let arrowLeft= window.addEventListener("keydown",validar);
let arrowRight= window.addEventListener("keydown",validar);

upButton.addEventListener("click",moveUp);
downButton.addEventListener("click",moveDown);
leftButton.addEventListener("click",moveLeft);
rightButton.addEventListener("click",moveRight);

function moveUp(){
    if((playerPosition.y-elementsSize)<elementsSize) {
    }else {
    (playerPosition.y -= elementsSize );
    movePlayer();
}
}
function moveDown(){
    if ((playerPosition.y+elementsSize)>canvas.height) {
    } else{
    playerPosition.y += elementsSize;
    movePlayer();
    }
}
function moveLeft(){
    if ((playerPosition.x-elementsSize)<0) {
    } else{
    playerPosition.x -= elementsSize;
    movePlayer();
    }
}
function moveRight(){
    if ((playerPosition.x+elementsSize)> canvasSize){
    } else{
    playerPosition.x += elementsSize;
    movePlayer();
    }
}

function validar(event){
    if(event.key==="ArrowUp") moveUp();
        else if(event.key==="ArrowDown")moveDown();
        else if(event.key==="ArrowLeft")moveLeft();
        else if(event.key==="ArrowRight")moveRight();
}
