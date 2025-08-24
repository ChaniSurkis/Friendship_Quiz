let currentQuestionIndex = 0; 
let answeredQuestions = []; 
let totalAnswers = 0; 
async function createQuiz() {
    try {
        const response = await fetch('http://localhost:3000/question');
        const data = await response.json();
        
        // השאלות נמצאות במערך הראשון בתוך data
        const questions = data[0]; 
        questions.forEach(q => {
            if (typeof q.questionText === "string") {
            q.questionText = q.questionText.replace('{שם}',localStorage.getItem('userName') || ''); 
            }
        });
        // בדיקה אם יש שאלות


        if (!Array.isArray(questions) || questions.length === 0) {
            alert("אין שאלות זמינות");
            return;
        }
        if (questions.length === 0) {
            alert("אין שאלות זמינות");
            return;}

     
        // הצגת השאלה הראשונה
        displayQuestion(questions);
    } catch (error) {
 
        alert('שגיאה בטעינת השאלות מהשרת');
    }
}

// פונקציה להצגת השאלה הנוכחית
function displayQuestion(questions) {
    const questionrList = document.getElementById('questionrList');
    questionrList.innerHTML = ''; // ניקוי תוכן קודם

    // קבלת השאלה הנוכחית לפי האינדקס
    const currentQuestion = questions[currentQuestionIndex];
   
    // יצירת הקונטיינר של השאלון
    const quizContainer = document.createElement('div');
    quizContainer.classList.add('quiz-container');

    // יצירת כותרת לשאלון
    const questionTitle = document.createElement('h2');
    questionTitle.textContent = currentQuestion.questionText; // הצגת הטקסט של השאלה
    quizContainer.appendChild(questionTitle);

    // יצירת קונטיינר לתשובות
    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers');
    quizContainer.appendChild(answersContainer);

    // יצירת תשובות (כפתורי רדיו) רק אם יש תשובות מוגדרות
    for (let i = 1; i <= 6; i++) {
        const option = currentQuestion[`option${i}`];

        // נוודא שיש תשובה כזאת (היא אינה ריקה)
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

    // כפתור שליחה
    const submitButton = document.createElement('button');
    submitButton.textContent = 'שלח תשובה';
    submitButton.onclick = () => submitQuiz(questions); // מעביר את השאלות לפונקציית השליחה
    quizContainer.appendChild(submitButton);

    // כפתור "שנה שאלה"
    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.textContent = "שנה שאלה";

    // פונקציה שמופעלת בלחיצה על כפתור "שנה שאלה"
    nextQuestionButton.onclick = () => {
      
        // עדכון אינדקס השאלה הנוכחית
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length; // אם עברנו את מספר השאלות, נחזור לשאלה הראשונה

        // הדפסת אינדקס השאלה הנוכחית כדי לוודא שהוא מתעדכן
      
        displayQuestion(questions);
    };
    
    quizContainer.appendChild(nextQuestionButton);

    // הוסף את השאלון ל-body
    questionrList.appendChild(quizContainer);
}

// פונקציה שמופעלת בסיום השאלון
function showHomeButton() {
    const questionrList = document.getElementById('questionrList');

    // יצירת כפתור "לעמוד הבית"
    const homeButton = document.createElement('button');
    homeButton.textContent = 'לעמוד הבית';
    homeButton.onclick = () => window.location.href = 'chooseOption.html'; // מפנה לעמוד הבית

    // עיצוב הכפתור כך שיתאים לשאר הלחצנים
    homeButton.classList.add('home-button');
    questionrList.appendChild(homeButton);
}

// פונקציה שמופעלת בלחיצה על כפתור שליחה
// שינוי בתוך פונקציית submitQuiz כך שבסיום השאלון יופיע כפתור "לעמוד הבית"
async function submitQuiz(questions) {
    const answers = document.querySelectorAll('input[name="question"]');
 
    let selectedAnswer;

    for (const answer of answers) {
        if (answer.checked) {
            selectedAnswer = answer.value;
           
            break;
        }
    }

    if (selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];
        const userId = localStorage.getItem('userId'); // החלף את זה במזהה המשתמש הנכון שלך

        // שליחת הנתונים לשרת
        try {
            const response = await fetch('http://localhost:3000/submit-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    questionId: currentQuestion.questionId, // מזהה השאלה שמגיע מהשרת
                    correctAnswerNumber: selectedAnswer, // מספר התשובה שהמשתמש בחר
                }),
            });

            if (response.ok) {
              
            } else {
                console.error('שגיאה בשמירת הנתונים');
            }
        } catch (error) {
            console.error('שגיאה בבקשת POST:', error);
        }

        answeredQuestions.push(currentQuestionIndex); // הוספת השאלה שנענתה למערך
        totalAnswers++; // עדכון מספר התשובות שנענו

        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length || totalAnswers >= 10) {
            alert("סיימת לענות על השאלון");
            showHomeButton(); // הצגת כפתור לעמוד הבית
            return;
        }

        while (answeredQuestions.includes(currentQuestionIndex)) {
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length) {
                alert("סיימת לענות על השאלון");
                showHomeButton(); // הצגת כפתור לעמוד הבית
                return;
            }
        }

        displayQuestion(questions);
    } else {
        alert("אנא בחר תשובה לפני השליחה.");
    }
}

// קריאה לפונקציה ליצירת השאלון כשהדף נטען
window.onload = () => createQuiz();
