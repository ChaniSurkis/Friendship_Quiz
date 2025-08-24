

const back = document.getElementById("goBack");
back.addEventListener("click", func1);

function func1() {
    window.location.href = "chooseOption.html";
}

const createQuizButton = document.getElementById("createQuiz");
createQuizButton.addEventListener("click", deleteFunc);

function deleteFunc(){
    deleteAllAnswers()
    deleteFromAnswer_quiz()
}

// פונקציה למחיקת כל התשובות עבור משתמש מסוים
async function deleteAllAnswers() {
    // קבלת ה-USERID מ-localStorage
 const userId = localStorage.getItem('userId'); // הנח ש-USERID נשמר כמשתנה בשם 'userId'
    
    if (!userId) {
        alert('לא נמצא מזהה משתמש ב-localStorage.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/QuestionAnswers/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('All answers deleted for user:', data);
            alert('כל התשובות של המשתמש נמחקו בהצלחה!');
             window.location.href="createQuiz.html"
            // כאן אפשר לחדש את הנתונים בדף או לבצע עדכון של הממשק
        } else {
            console.error('Failed to delete answers:', response.status);
            alert('שגיאה במחיקת התשובות.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('שגיאה בחיבור לשרת.');
    }
}

// דוגמת קוד HTML להוספת כפתור מחיקה
// <button onclick="deleteAllAnswers()">מחק את כל התשובות</button>

async function deleteFromAnswer_quiz() {
    // קבלת ה-USERID מ-localStorage
 const userId = localStorage.getItem('userId'); // הנח ש-USERID נשמר כמשתנה בשם 'userId'
    
    if (!userId) {
        alert('לא נמצא מזהה משתמש ב-localStorage.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/answersQuiz/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('All answers deleted for user:', data);
            alert('כל התשובות של המשתמש נמחקו בהצלחה!');
            // כאן אפשר לחדש את הנתונים בדף או לבצע עדכון של הממשק
        } else {
            console.error('Failed to delete answers:', response.status);
            alert('שגיאה במחיקת התשובות.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('שגיאה בחיבור לשרת.');
    }
}

// דוגמת קוד HTML להוספת כפתור מחיקה
// <button onclick="deleteAllAnswers()">מחק את כל התשובות</button>
