
// let currentQuestionIndex = 1; // נתחיל מהשאלה הראשונה
// const questionElement = document.getElementById('question');
// const answersElement = document.getElementById('answers');
// const nextButton = document.getElementById('next-button');

// async function loadQuestion() {
//     const response = await fetch(`/api/question/${currentQuestionIndex}`);
    
//     if (!response.ok) {
//         alert('לא נמצאה השאלה.');
//         return;
//     }
    
//     const questionData = await response.json();
//     questionElement.innerText = questionData.question;

//     // Clear previous answers
//     answersElement.innerHTML = '';

//     // Create buttons for each answer
//     questionData.answers.forEach(answer => {
//         const button = document.createElement('button');
//         button.innerText = answer;
//         button.addEventListener('click', selectAnswer);
//         answersElement.appendChild(button);
//     });

//     nextButton.style.display = 'none'; // Hide the next button
// }

// function selectAnswer() {
//     alert('בחרת את התשובה: ' + this.innerText);
//     nextButton.style.display = 'block'; // Show the next button
// }

// nextButton.addEventListener('click', () => {
//     currentQuestionIndex++; // Go to the next question
//     loadQuestion();
// });

// // Load the first question on page load
// loadQuestion();
