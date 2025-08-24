
async function sendEmail() { 
    const email = document.getElementById('emailInput').value;

       
    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();
         
            // בדוק אם `users` הוא אובייקט או מערך וודא שיש בו את המידע הרצוי
            const existingUser = users[0].find(user => 
                user.email == email 
                
            );

            if (existingUser) {
                localStorage.setItem('userQuizEmail',email)
                localStorage.setItem('userQuizId', existingUser.userId);
                localStorage.setItem('userQuizName',existingUser.userName)
                alert(' ברוך הבא לשאלון של, ' + existingUser.userName);
                window.location.href = 'openFriendQuiz.html';
            } else {
                alert('אימייל או סיסמה לא נכונים. אנא נסו שוב.');
            }
        } else {
            console.error('שגיאה בקבלת המשתמשים');
            alert('שגיאה בקבלת נתוני המשתמשים מהשרת.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('שגיאה בחיבור לשרת');
    }
}





    // כאן תוסיף את הקוד לשליחת האימייל בפועל
    // זה יכול לכלול שימוש בספריית שליחת אימיילים או פונקציות אחרות
    // למשל, אם אתה משתמש בספריית Mail.js:
    // Mail.send({
    //     to: email,
    //     subject: 'אימייל בדיקה',
    //     body: 'הודעה שנשלחה באמצעות JavaScript'
    // });



