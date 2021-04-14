
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;


const fond = new Image();
fond.src = "img/fond.png";

const pommeImg = new Image();
pommeImg.src = "img/pomme.png";


let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};



let pomme = {
    x : Math.floor(Math.random()*19) * box,
    y : Math.floor(Math.random()*19) * box
}

let showScore = document.getElementById("score");
score = 0;


let directionSnake;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.key;
    if( key == "ArrowLeft" && directionSnake != "RIGHT"){
        directionSnake = "LEFT";
    }else if(key == "ArrowUp" && directionSnake != "DOWN"){
        directionSnake = "UP";
    }else if(key == "ArrowRight" && directionSnake != "LEFT"){
        directionSnake = "RIGHT";
    }else if(key == "ArrowDown" && directionSnake != "UP"){
        directionSnake = "DOWN";
    }
}

function collision(tete,tab){
    for(let i = 0; i < tab.length; i++){
        if(tete.x == tab[i].x && tete.y == tab[i].y){
            return true;
        }
    }
    return false;
}


function draw(){
    
    ctx.drawImage(fond,0,0);

    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle ="#47A440";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(pommeImg, pomme.x, pomme.y);
    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    if( directionSnake == "LEFT") snakeX -= box;
    if( directionSnake == "UP") snakeY -= box;
    if( directionSnake == "RIGHT") snakeX += box;
    if( directionSnake == "DOWN") snakeY += box;
    

    if(snakeX == pomme.x && snakeY == pomme.y){
        score++;
        pomme = {
            x : Math.floor(Math.random()*19) * box,
            y : Math.floor(Math.random()*19) * box
        }

    }else{
        snake.pop();
    }
    
    
    let newtete = {
        x : snakeX,
        y : snakeY
    }
    

    
    if(snakeX < 0 || snakeX > 18 * box || snakeY < 0*box || snakeY > 18*box || collision(newtete,snake)){
        clearInterval(jeu);

    }
    
    snake.unshift(newtete);
    
    showScore.innerHTML = score;
}


let jeu = setInterval(draw,160);

