const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const contador = document.querySelector(".contador-ativo");
let isJumping = false;
let position = 0;
let correctJumpCounter = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    
    isJumping = true;

    let upInterval = setInterval(()=>{
        if(position >= 150){
            clearInterval(upInterval);

            //descer
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }

            }, 20);
        }else{
            //subir
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20)

}

function createCactus(){
    const cactus = document.createElement("div");
    let cactusPosition = 900;
    let randomTime = Math.random()*5000;
    
    cactus.classList.add("cactus");
    cactus.style.left = 900 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            correctJumpCounter++;
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = `<h1 class="game-over">Fim de jogo</h1>
            <br>
            <h2 class="contador-game-over">Total de cactos pulados: ${correctJumpCounter}</h2>`;
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
        
    }, 20);

    setTimeout(createCactus, randomTime);
}

function adicionaAoContador(){
    setInterval(() => contador.innerHTML = correctJumpCounter, 20);
}
adicionaAoContador();
createCactus();

document.addEventListener('keyup', handleKeyUp)