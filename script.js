//let nameOfUser;
document.addEventListener("DOMContentLoaded", function() {
    const userInfoForm = document.getElementById('userInfoForm');
    const startQuizButton = document.getElementById('startQuiz');
    
 
    startQuizButton.addEventListener("click", function() {
         const name = document.getElementById('name').value;
         //userName = document.getElementById('userName').value;
         const usn = document.getElementById('usn').value;
         //nameOfUser = name;
         

        if (name && usn) {
            // Store user data in session storage for later use
            sessionStorage.setItem("userName", name);
            sessionStorage.setItem("userUSN", usn);
            // Redirect to quiz page
            window.location.href = "quiz.html?name=" + name// + "?usn=" + usn; 
        } else {
            alert("Please enter your name and USN.");
        }
    });
});
//export name; 
//let nameOfUser = document.getElementById('name').value;
//export {nameOfUser};

