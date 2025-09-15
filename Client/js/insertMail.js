
async function sendEmail() { 
    const email = document.getElementById('emailInput').value;

       
    try {
        
        const response = await fetch(`http://localhost:3000/user/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const existingUser = await response.json();
            console.log(existingUser)
            
         
           
           

            if (existingUser) {
                
                localStorage.setItem('friendToken', existingUser.token);
                
                createToast(' ברוך הבא לשאלון של, ' + existingUser.userName, "success");
                debugger;
                window.location.href = 'openFriendQuiz.html';

            } else {
                createToast('אימייל לא קיים. אנא נסו שוב.', "error");
            }
        } else {
            console.error('שגיאה בקבלת המשתמשים');
            createToast('שגיאה בקבלת נתוני המשתמשים מהשרת.', "error");
        }
    } catch (error) {
        console.error('Error:', error);
        createToast('שגיאה בחיבור לשרת.', "error");
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



