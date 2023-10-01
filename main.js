let untyped='';
let typed='';
let score=0;
let words=0;
let i = 0;

const untypedfield = document.getElementById('untyped');
const typedfiels = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const scoreShow = document.getElementById('score');

const textList = [
  'Hello world',
  'This is my App',
  'How are you?',
  'This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'

];

const createText = () => {
  typed ='';
  typedfiels.textContent=typed;

  let random = Math.floor(Math.random()*textList.length);
  untyped = textList[random];
  untypedfield.textContent = untyped;
}

const keypress = e => {

  //textListの空白を読み飛ばす操作
  if(untyped.substring(0,1) == ' '){
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfiels.textContent=typed;
    untypedfield.textContent=untyped;
  }
  //ミスtypeしたときの表示
  if(e.key != untyped.substring(0,1)){
    score--;
    wrap.classList.add('mistyped');
    setTimeout(()=>{
      wrap.classList.remove('mistyped');
    }, 100);
    scoreShow.textContent=score;
    if(score < 0){
      gameOver();
    }

    return;
  }
  score++;
  words++;
  scoreShow.textContent=score;
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1);
  typedfiels.textContent=typed;
  untypedfield.textContent=untyped;

if(untyped === ''){
  createText();
}

};

const rankCheck = words => {

  let text ='';

  if (words < 100){
    text = `あなたはCランク　\n Bランクまではあと${100-words}文字です`
  } else if(words < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - words}文字です。`;    
  } else if(words < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - words}文字です。`;    
  } else if(words >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }

  return `${words}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`

}

const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(words));
  if(result == true) {
    window.location.reload();
    i=0;
  }
};


const timer = () => {
  let time = count.textContent;

  const id = setInterval(()=>{
    time--;
    count.textContent = time;

    if(time < 0){
      gameOver(id);
    }
  }, 1000  );
};

//enterキーでゲーム開始する操作
document.addEventListener("keydown", keyDown);
function keyDown(e) {
  if (e.key === "Enter") {
    if(i==0){
      gameStart();
    
    i++;
    }
  }
}

const gameStart =()=>{

  untypedfield.textContent='Ready GO!';
  
  setTimeout(()=>{

    timer();
    createText();
    document.addEventListener('keypress', keypress);
 
  }, 1000);
}

untypedfield.innerText=' Game Start \n --Press [Enter]--';
