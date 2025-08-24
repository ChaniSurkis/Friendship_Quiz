const numCorrect=[]
const nameFriend=[]


async function bringI() {
    try {
     
        const response = await fetch(`http://localhost:3000/answersQuiz/${localStorage.getItem('userId')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let answerUser;
        if (response.ok) {
            answerUser = await response.json();
           
        } else {
          
            alert('שגיאה בקבלת נתוני המשתמשים מהשרת.');
            return;
        }

        const answer = answerUser[0];
        const numCorrect = [];
        const nameFriend = [];

        for (const ans of answer) { 
            // לולאת for...of כדי לתמוך ב-await
            
            numCorrect.push(ans.numOfCorrects);
          
            const name = await bringNames(ans.answeredUserId); // ממתין לפונקציה bringNames
     
            nameFriend.push(name);
        }

       
        // nameFriend.forEach(x => {
        //     console.log("name:", x);
        // });
     
        createPageContent(numCorrect,nameFriend)
        
    } catch (error) {
        console.error('Error:', error);
        alert('שגיאה בחיבור לשרת');
    }
}





async function bringNames(userid) {
    try {
        
        const response = await fetch(`http://localhost:3000/user/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();
        
            
            // בדיקה אם users[0] קיים ומכיל userName
            if (users[0][0] && users[0][0].userName) {
             
                return users[0][0].userName;
            } else {
               
                return "No username found";
            }
        } else {
         
            alert('שגיאה בקבלת נתוני המשתמשים מהשרת.');
        }
    } catch (error) {
     
        alert('שגיאה בחיבור לשרת');
    }
    return "ch"; // ערך ברירת מחדל במידה ויש שגיאה
}

// פונקציה ליצירת התוכן של הדף
function createPageContent(corrects, names) {
    const container = document.getElementById('container');

    // יצירת כותרת
    const title = document.createElement('h1');
    title.textContent = "לוח החברים שלך";
    container.appendChild(title);

    if (corrects.length === 0) {
        // אם אין חברים שענו על השאלון
        const noAnswersMessage = document.createElement('p');
        noAnswersMessage.textContent = "אף אחד לא ענה עדיין על השאלון שלך";
        container.appendChild(noAnswersMessage);
    } else {
        // יצירת טבלה
        const table = document.createElement('table');
        table.id = 'friendsTable';

        // יצירת שורת הכותרת של הטבלה
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const nameHeader = document.createElement('th');
        nameHeader.textContent = "שם חבר";
        headerRow.appendChild(nameHeader);

        const correctAnswersHeader = document.createElement('th');
        correctAnswersHeader.textContent = "מספר תשובות נכונות";
        headerRow.appendChild(correctAnswersHeader);

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // יצירת חלק ה-Body של הטבלה
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        container.appendChild(table);

        // מילוי הטבלה עם נתונים
        populateTable(corrects, names);
    }

    // כפתור חזרה לדף הבית
    const backButton = document.createElement('button');
    backButton.textContent = "חזור לדף הבית";
    backButton.addEventListener('click', function() {
        window.location.href = "chooseOption.html"; // הפניה לדף הבחירה
    });
    container.appendChild(backButton);
}

// פונקציה למילוי הטבלה עם נתוני החברים
function populateTable(corrects, names) {
    const tableBody = document.getElementById('friendsTable').getElementsByTagName('tbody')[0];

    for (let index = 0; index < corrects.length; index++) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = names[index]; // שם המשתמש
        row.appendChild(nameCell);

        const correctAnswersCell = document.createElement('td');
        correctAnswersCell.textContent = corrects[index]; // מספר התשובות הנכונות לכל חבר
        row.appendChild(correctAnswersCell);

        tableBody.appendChild(row)       
    }

}

// קריאה לפונקציה כאשר הדף נטען
window.onload = bringI;

