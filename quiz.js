const urlParams = new URLSearchParams(window.location.search);
const nameOfUser = urlParams.get('name');
var currentScore = 0;
const question = document.getElementById('question');
const option1 =document.getElementById('btn1');
const option2 =document.getElementById('btn2');
const option3 =document.getElementById('btn3');
const option4 =document.getElementById('btn4');
const op1 =document.querySelector('.b1');
const op2 =document.querySelector('.b2');
const op3 =document.querySelector('.b3');
const op4 =document.querySelector('.b4');
const score = document.getElementById('scorecard');
const submit = document.getElementById('submit');
let next = document.getElementById('next');
let j=1,i=0;
let n;

category();
function category(){
    question.innerHTML = "Select number of questions";
    op1.innerHTML = "Computer Science";
    op2.innerHTML = "10 Questions";
    op3.innerHTML = "15 Questions";
    option4.style.display = "none";
                op2.addEventListener("click",()=>{
                    op1.style.background = "orange";
                    op2.style.background = "orange";
                    var APIurl="https://opentdb.com/api.php?amount=10&category=18";                   
                    n=10;
                    //updateTimerDisplay(60);
                    startTimer(60);
                    displayQuestion(APIurl,n);
                });
                op3.addEventListener("click",()=>{
                    
                    op1.style.background = "orange";
                    op3.style.background = "orange";
                    var APIurl="https://opentdb.com/api.php?amount=15&category=18";
                    n=15;
                    //updateTimerDisplay(90);
                    startTimer(90);
                    displayQuestion(APIurl,n);
                 });
                
        
        
}
async function displayQuestion(APIurl,n){
    const result= await fetch(`${APIurl}`);
    const data = await result.json();
    console.log(data);
    next.addEventListener("click", ()=>{
        if(i>=0 && i<=n){
        showQuestion(data.results[i++],n);
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
function showQuestion(data,n){
    let correctans = data.correct_answer;
    let incorrectans = data.incorrect_answers;
    let options = incorrectans;
    //to insrt option in random position
    options.splice(Math.floor(Math.random() * (incorrectans.length + 1)),0,correctans);
    if(j>=0 && j<=n){
    question.innerHTML = `${j++}.` +" " + `${data.question}`;
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
    option1.addEventListener("click", ()=>{
        if(option1.innerHTML == correctans){
            currentScore+=1;
            option1.style.background = "green";
            option2.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
        }else if(option1.innerHTML != correctans){
            option1.style.background = "red";
            option2.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
        }
    });
    option2.addEventListener("click", ()=>{
        if(option2.innerHTML == correctans){
            option2.style.background = "green";
            option1.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
            currentScore+=1;
        }else if(option2.innerHTML != correctans){
            option2.style.background = "red";
            option1.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
        }   
    });
    option3.addEventListener("click", ()=>{
        if(option3.innerHTML == correctans){
            option3.style.background = "green";
            option1.style.display = "none";
            option2.style.display = "none";
            option4.style.display = "none";
            currentScore+=1;
        }else if(option3.innerHTML != correctans){
            option3.style.background = "red";
            option1.style.display = "none";
            option2.style.display = "none";
            option4.style.display = "none";
        }
    });
    option4.addEventListener("click", ()=>{
        if(option4.innerHTML == correctans){
            option4.style.background = "green";
            option1.style.display = "none";
            option2.style.display = "none";
            option3.style.display = "none";
            currentScore+=1;
        }else if(option4.innerHTML != correctans){
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

function refreshpage(){
    window.location.href = "index.html";
}

console.log(currentScore);