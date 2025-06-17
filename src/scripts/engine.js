const state = {
  view:{squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    life: document.querySelector('#life'),
  },
  values:{
  timerId:null,
  countDownTimerId: setInterval(countDown,1000),
  gameVelocity : 1000,
  hitPosition: 0,
  result: 0,
  currentTime : 60,
  lifeLeft : 3,
  },
}

function countDown(){
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime<=0){
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timerId);
    alert("GAMER OVER! Seu resultado é:"+ state.values.result)
  }
}

function randomSquare(){
  state.view.squares.forEach((square)=>{
    square.classList.remove("enemy");
  });
  let randomNumer = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumer];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
  state.view.squares.forEach((square)=>{
  square.addEventListener("mousedown", ()=> {
    if(square.id === state.values.hitPosition){
      state.values.result++;
      state.view.score.textContent = state.values.result;
      state.values.hitPosition = null;
    } else {
      state.values.lifeLeft--;
      state.view.life.textContent = state.values.lifeLeft;
      
    } if(state.values.lifeLeft<=0){
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timerId);
    alert("GAMER OVER! Seu resultado é:"+ state.values.result)
    }
  })
  });
}



function init(){
  moveEnemy();
  addListenerHitBox();
}

init()
