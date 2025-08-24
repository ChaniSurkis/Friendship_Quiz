let currentQuestionIndex = 0; 
let answeredQuestions = []; 
let totalAnswers = 0; 

async function createQuiz() {
    try {
        const friendId = localStorage.getItem('userQuizId');
        const response = await fetch(`http://localhost:3000/questionAnswers/${friendId}`);
        const data = await response.json();

        const questions = data[0]; 
       
                 if (questions.length === 0) {
            alert("אין שאלות זמינות");
            window.location.href="chooseOption.html"
            return;
        }

        displayQuestion(questions);
    } 
    catch (error) {
        console.error('שגיאה ב-fetch:', error);
        alert('שגיאה בטעינת השאלות מהשרת');
    }
}

async function sendMail() {
    const params = {
        userQuizName: localStorage.getItem("userQuizName"),
        email: localStorage.getItem("email"),
        userQuizEmail: localStorage.getItem("userQuizEmail"),
    };

   

    const serviceId = "friendshipquiz";
    const templetId = "template_i8pksmn";
    
    try {
       
       

        const response = await emailjs.send(serviceId, templetId, params);
       
    } catch (err) {
        // במקרה של שגיאה, הדפסת השגיאה בקונסול
        console.log('Error sending email:', err);
    }
}



async function displayQuestion(questions) {
    const questionList = document.getElementById('questionList');
   
    
    questionList.innerHTML = ''; 

    const currentQuestion = questions[currentQuestionIndex];
    const quizContainer = document.createElement('div');
    quizContainer.classList.add('quiz-container');

    const response = await fetch(`http://localhost:3000/question/${currentQuestion.questionId}`);
    const datatext = await response.json();
    const textOfQuestion = datatext[0];

    const questionTitle = document.createElement('h2');
    questionTitle.textContent = textOfQuestion[0].questionText;
    quizContainer.appendChild(questionTitle);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers');
    quizContainer.appendChild(answersContainer);

    for (let i = 1; i <= 6; i++) {
        const option = textOfQuestion[0][`option${i}`];
        if (option) {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');

            const answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.id = `answer${i}`;
            answerInput.name = 'question';
            answerInput.value = i;

            const answerLabel = document.createElement('label');
            answerLabel.setAttribute('for', `answer${i}`);
            answerLabel.textContent = option;

            answerDiv.appendChild(answerInput);
            answerDiv.appendChild(answerLabel);
            answersContainer.appendChild(answerDiv);
        }
    }

    const submitButton = document.createElement('button');
    submitButton.textContent = 'שלח תשובה';

    let answeredUserId = localStorage.getItem('userId');
    let userFriendId = localStorage.getItem('userQuizId');
    let numOfCorrects;

    submitButton.onclick = () => {
        const selectedAnswer = document.querySelector('input[name="question"]:checked');
        if (selectedAnswer) {
            const answerIndex = selectedAnswer.value;
            answeredQuestions.push({
                questionId: currentQuestion.questionId,
                answer: answerIndex
            });
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion(questions);
            } else {
                alert("הגעת לסוף השאלון!");
                sendMail()
                let countrightAnswers = 0;
                for (let index = 0; index < answeredQuestions.length; index++) {
                    if (answeredQuestions[index].answer == questions[index].correctAnswerNumber) {
                        countrightAnswers++;
                    }
                }
                numOfCorrects = countrightAnswers;
                localStorage.setItem('numOfCorrectAnswers',countrightAnswers)
                addToTable(answeredUserId,userFriendId, numOfCorrects);
            }
        } else {
            alert("בחר תשובה לפני שאתה ממשיך");
        }
    };
    quizContainer.appendChild(submitButton);
    questionList.appendChild(quizContainer);
}
async function addToTable(userId, userFriendId, numOfCorrects) {
   

    try {
        const requestBody = JSON.stringify({ answeredUserId: userId, userFriendId, numOfCorrects });
      
        const response = await fetch('http://localhost:3000/answersQuiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody,
        });  
        const responseText = await response.text(); // שמור את התגובה בשורה אחת
        

        if (response.ok) {
            if (responseText) {
                const data = JSON.parse(responseText);
              
                alert('תשובות נוספו בהצלחה!');
                window.location.href = 'endOfQuiz.html';
            } else {
                console.error('Response from server is empty');
                alert('תגובת השרת ריקה');
            }
        } else {
            console.error('Server error:', response.status, response.statusText);
            alert(`שגיאה בהוספת התשובות: ${response.statusText} (קוד: ${response.status})`);
        }
    } catch (error) {
        console.error('Error in addToTable function:', error);
        alert('שגיאה בחיבור לשרת');
    }
}



window.onload = () => createQuiz();










