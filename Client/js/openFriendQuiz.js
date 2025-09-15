let currentQuestionIndex = 0; 
let answeredQuestions = []; 
let totalAnswers = 0; 
debugger;
async function createQuiz() {
    try {
        // const friendId = localStorage.getItem('userQuizId');
        const friendId = getFriendFromToken().id;
        debugger
        const response = await fetch(`http://localhost:3000/questionAnswers/${friendId}`);
        const data = await response.json();

        const questions = data; 
       
                 if (questions.length === 0) {
            createToast("אין שאלות זמינות", "error");
            window.location.href="chooseOption.html"
            return;
        }     

        displayQuestion(questions);
    } 
    catch (error) {
        console.error('שגיאה ב-fetch:', error);
        createToast('שגיאה בטעינת השאלות מהשרת', "error");
    }
}

async function sendMail() {
    const params = {
        userQuizName: getFriendFromToken().name,
        email: getUserFromToken().email,
        userQuizEmail: getFriendFromToken().email,
        
    };

   

    const serviceId = "friendshipquiz";
    const templetId = "template_i8pksmn";
    
    try {
        const response = await emailjs.send(serviceId, templetId, params);       
    } catch (err) {
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
    const textOfQuestion = datatext ;
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
                createToast("הגעת לסוף השאלון!", "success");
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
            createToast("בחר תשובה לפני שאתה ממשיך", "warning");
        }
    };
    quizContainer.appendChild(submitButton);
    questionList.appendChild(quizContainer);
}
async function addToTable(userId, userFriendId, numOfCorrects) {
    try {
        const requestBody = JSON.stringify({ answeredUserId: getUserFromToken().id, userFriendId:getFriendFromToken().id, correctAnswerNumber: numOfCorrects });
      
        const response = await fetch('http://localhost:3000/answersQuiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody,
        });
        console.log(response);
         debugger  
        const responseText = await response.text();
        console.log('Response Text:', responseText);
         debugger
        if (response.ok) {
            if (responseText) {
                const data = JSON.parse(responseText);
                createToast('תשובות נוספו בהצלחה!', "success");
                window.location.href = 'endOfQuiz.html';
            } else {
                console.error('Response from server is empty');
                createToast('תגובת השרת ריקה', "error");
            }
        } else {
            console.error('Server error:', response.status, response.statusText);
            createToast(`שגיאה בהוספת התשובות: ${response.statusText} (קוד: ${response.status})`, "error");
        }
    } catch (error) {
        console.error('Error in addToTable function:', error);
        createToast('שגיאה בחיבור לשרת', "error");
    }
}
 window.onload = () => createQuiz();


