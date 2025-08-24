

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מונע את הרענון של הדף

    // קבלת הערכים מהשדות
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const passwordUser = document.getElementById('password').value;

  
let imagePath,flag=true;
if(userName.trim()===''||email.trim()===''||passwordUser.trim()==='')
    showMessage("אין אפשרות לשדות ריקים")
    try {
        // בדיקה אם האימייל כבר קיים במערכת
        const check = await fetch(`http://localhost:3000/user/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (check.ok) {
            const checkEmail = await check.json();
            const emailExists = checkEmail[0];
          
            // בדיקה אם המייל כבר קיים
            if (emailExists[0]) {
               
                showMessage("המייל כבר קיים במערכת", true);
                return; // אם המייל קיים, לא שולחים את הטופס
            }
        }

        // העלאת התמונה קודם
         imagePath = await uploadFile(); // קבל את שם התמונה מהפונקציה

        if (!imagePath) {
            showMessage("שגיאה בהעלאת התמונה", true);
            return; // אם התמונה לא הועלתה, לא נמשיך
        }
    } catch (error) {
    
        showMessage("שגיאה בחיבור לשרת", true);
    }
    try {

        // שליחת בקשת POST להוספת משתמש חדש
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, passwordUser, email, imagePath })
        });
        // שליחת בקשה לשרת עם fetch
    
      if (!response.ok) {
           flag=false; 
      showMessage("סיסמא שגויה-דרוש מינימום 6 תווים",true);

      }
      if (response.ok) {
        flag=true
        const data = await response.json(); // הנתונים המוחזרים מהשרת
        // const token = data.token; 
        // localStorage.setItem('token',token) 
        showMessage("המשתמש נוסף בהצלחה");

    }
  
      // אם הצלחה
      const result = await response.json();
}
    catch (error) {
    
      showToast(error.message, "error");
    }


if(flag){

        // בלוק זה היה בתוך try הקודם
        try {
            const responseEmail = await fetch(`http://localhost:3000/user/email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responseEmail.ok) {
                const checkEmail = await responseEmail.json();
                localStorage.setItem('userId', checkEmail[0][0].userId);
                localStorage.setItem('userName', checkEmail[0][0].userName);
                localStorage.setItem('email', checkEmail[0][0].email);
                window.location.href = "chooseOption.html";
            } else {
                showMessage("שגיאה בהוספת המשתמש", true);
            }

        } catch (error) {
            console.error('Error:', error);
            showMessage("שגיאה בחיבור לשרת", true);
        }
    }
    
});

// פונקציה להעלאת קובץ
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        showToast('Please select a file first!', "error");
        return null; // אם אין קובץ, לא תשלח שם קובץ
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const result = await response.text();
        console.log(result);

        // כאן אנחנו מחלקים את התשובה ומחסירים את המילים המיותרות
        const fileName = result.replace('File uploaded successfully: ', '').trim(); // הסרה של המילים המיותרות

        console.log("imagePath:", fileName);
        return fileName; // מחזיר את שם הקובץ הנכון
    } catch (error) {
        console.error('Error uploading file:', error);
        showToast(`Error uploading file: ${error.message}`, "error");
        return null; // אם יש שגיאה בהעלאת הקובץ, מחזיר null
    }
}

// פונקציה לניקוי השדות
function clearFields() {
    document.getElementById('userName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('fileInput').value = ''; // אם רוצים לנקות גם את שדה הקובץ
}

// פונקציה להצגת הודעות
function showMessage(message, isError) {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerText = message;
    messageBox.style.display = "block";
    messageBox.style.backgroundColor = isError ? "#f08080" : "#90ee90"; // אדום לשגיאה, ירוק להצלחה
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.classList.add('toast-message', type);
  toast.textContent = message;

  document.body.appendChild(toast);

  // הצגה עם אנימציה
  setTimeout(() => {
    toast.classList.add('show');
  }, 10); // המתנה קטנה כדי לאפשר ל־transition לעבוד

  // הסרה אחרי 4 שניות
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500); // המתן שהאנימציה תסתיים
  }, 4000);
}
