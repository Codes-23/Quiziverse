const urlParams = new URLSearchParams(window.location.search);
const nameOfUser = urlParams.get('name');
let currentScore = 0;
const question = document.getElementById('question');
const question2 = document.getElementById('question2');
const option1 =document.getElementById('btn1');
const option2 =document.getElementById('btn2');
const option3 =document.getElementById('btn3');
const option4 =document.getElementById('btn4');
const op1 =document.querySelector('.b1');
const op2 =document.querySelector('.b2');
const op3 =document.querySelector('.b3');

const ansop = document.querySelector(".answer-buttons");
const catop = document.querySelector(".category-buttons");
//var o1 =document.querySelector('.c1');
//var o2 =document.querySelector('.c2');
//var o3 =document.querySelector('.c3');
//var o4 =document.querySelector('.c4');

const score = document.getElementById('scorecard');
const submit = document.getElementById('submit');
let next = document.getElementById('next');
let j=0,i=1;
let n,APIurl;

function category(){
    //next.style.display = "none";
    ansop.style.display = "none";
    question2.innerHTML = "Select number of questions";
    op1.innerHTML = "Computer Science";
    op2.innerHTML = "10 Questions";
    op3.innerHTML = "15 Questions";
    
    op1.style.background = "orange";
                op2.addEventListener("click",()=>{
                    n=10;
                    op3.style.display = "none";
                    op2.style.background = "orange";
                    var APIurl="https://opentdb.com/api.php?amount=10&category=18&type=multiple";                   
                    startTimer(60);
                    displayQuestion(APIurl);
                    
                    
                });
                op3.addEventListener("click",()=>{
                    n=15;
                    op2.style.display = "none";
                    //o1.style.background = "orange";
                    op3.style.background = "orange";
                    var APIurl="https://opentdb.com/api.php?amount=15&category=18&type=multiple";
                    //updateTimerDisplay(90);
                    startTimer(90);
                    displayQuestion(APIurl);
                    
                    //makenull();
                    
                 });    
}

category();

async function displayQuestion(APIurl){
    console.log(APIurl);
    console.log(n);
    //next.style.display = "block";
    ansop.style.display = "block";
    catop.style.display = "none";
    const result= await fetch(`${APIurl}`);
    const data = await result.json();
    console.log(data);
    showQuestion(data.results[0]);
    next.addEventListener("click", ()=>{
        if(i>=1 && i<=n){
        showQuestion(data.results[i++]);
        option1.style.background = "white";
        option2.style.background = "white";
        option3.style.background = "white";
        option4.style.background = "white";
        }
        if(i==(n+1)){
            next.innerHTML = "End-Quiz";
            end();
        }
    });  
}

function showQuestion(data){
   // ansop.style.display = "block";
    //question2.style.display = "none";
    //question.style.display = "block";
    //catop.style.display = "none";
    let correctans = data.correct_answer;
    let incorrectans = data.incorrect_answers;
    let options = incorrectans;
    //to insrt option in random position
    options.splice(Math.floor(Math.random() * (incorrectans.length + 1)),0,correctans);
    if(j>=0 && j<=n){
    question.innerHTML = `${++j}.` +" " + `${data.question}`;
    option1.innerHTML = `${options[0]}`;
    option1.style.display = "block";
    option2.innerHTML = `${options[1]}`;
    option2.style.display = "block";
    option3.innerHTML = `${options[2]}`;
    option3.style.display = "block";
    option4.innerHTML = `${options[3]}`;
    option4.style.display = "block";
    checkandHighlight(correctans);
    
    
}
}

function checkandHighlight(correctans){
    //let localcurrentScore = currentScore;
    option1.addEventListener("click", ()=>{
        if(option1.innerHTML === correctans){
            currentScore+=1;
            option1.style.background = "green";
            option2.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
            //currentScore+=1;
        }
        if(option1.innerHTML != correctans){
            option1.style.background = "red";
            option2.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
        }
    });
    option2.addEventListener("click", ()=>{
        if(option2.innerHTML === correctans){
            currentScore+=1;
            option2.style.background = "green";
            option1.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
            //currentScore+=1;
            
        }
        if(option2.innerHTML != correctans){
            option2.style.background = "red";
            option1.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
        }   
    });
    option3.addEventListener("click", ()=>{
        if(option3.innerHTML === correctans){
            currentScore+=1;
            option3.style.background = "green";
            option1.style.display = "none";
            option2.style.display = "none";
            option4.style.display = "none";
            //currentScore+=1;
            
        }
        if(option3.innerHTML != correctans){
            option3.style.background = "red";
            option1.style.display = "none";
            option2.style.display = "none";
            option4.style.display = "none";
        }
    });
    option4.addEventListener("click", ()=>{
        if(option4.innerHTML === correctans){
            currentScore+=1;
            option4.style.background = "green";
            option1.style.display = "none";
            option2.style.display = "none";
            option3.style.display = "none";
            //currentScore+=1;
            
        }
        if(option4.innerHTML != correctans){
            option4.style.background = "red";
            option1.style.display = "none";
            option2.style.display = "none";
            option3.style.display = "none";
        }
    });
    console.log(currentScore);
}

const timerElement = document.querySelector(".timer");
var timeSpan = document.getElementById("remTime");
let timerInterval;
let remainingTime;
function updateTimerDisplay(remainingTime) {
    var minutes = Math.floor(remainingTime / 60);
    var seconds = remainingTime % 60;
    timeSpan.textContent = "Remaining Time " +`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
function startTimer(remainingTime) {
    timerInterval = setInterval(function() {
        if (remainingTime > 0) {
            remainingTime--;
            updateTimerDisplay(remainingTime);
        } else {
            clearInterval(timerInterval);
            end();
        }
    }, 1000); // Update every 1 second (1000 milliseconds)
}


function end(){ 
    document.querySelector(".quiz").style.display = "none";
    document.getElementById("next").style.display = "none";
    score.style.display = "block";
    score.innerHTML= `${nameOfUser}` + ", your score is " + `${currentScore}` +"/"+ `${n}`;
    timeSpan.style.display = "none";
    timerElement.innerHTML = "Page will refresh in 10s";
    const delay = 10000;
    
    setTimeout(refreshpage,delay);
}
function refreshpage(){
    window.location.href = "index.html";
}