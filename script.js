const word = document.getElementById('word');
const text = document.querySelector('#text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.querySelector('.end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.querySelector('#difficulty'); 


const words = [
        'sigh',
        'tense',
        'airplane',
        'ball',
        'pies',
        'juice',
        'warlike',
        'bad',
        'north',
        'dependent',
        'steer',
        'silver',
        'highfalutin',
        'superficial',
        'quince',
        'eight',
        'feeble',
        'admit',
        'drag',
        'loving'
];

//Init word
let randomWord;

//Init score
let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') === null ? 'medium' : 
localStorage.getItem('difficulty');

difficultySelect.value = difficulty;
//Focus on text on start
text.focus();

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
time--;
timeEl.innerText = `${time}s`;

if(time === 0) {
   clearInterval(timeInterval);
   endGame();
}
}

function getRandomWord() {
    return words[Math.floor(Math.random()*words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
score++;
scoreEl.innerHTML = score;
}

function endGame() {
    endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button class="reload-btn">Reload<button>
    `;
    endGameEl.classList.add('show');
}

function increaseTime() {
switch(difficulty) {
case 'easy':
time += 5;
break;
case 'medium':
time += 3;
break;
case 'hard':
time ++;
break;
}
updateTime();
}

addWordToDOM();

text.addEventListener('input', e => {
   const insertedText = e.target.value;
  
   if(insertedText === randomWord) {
       addWordToDOM();
       updateScore();
       e.target.value = '';
       increaseTime();
   }

})

endGameEl.addEventListener('click', e => {
    if(e.target.classList.contains('reload-btn')) {
        window.location.reload();
    }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select
settingsForm.addEventListener('change', e => {
difficulty = e.target.value;
localStorage.setItem('difficulty', difficulty);
})