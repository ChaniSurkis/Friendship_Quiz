let globalName=null
let globalMail=null;
let globalPass=null;

document.getElementById('signupForm').addEventListener('submit', async function(event) {
  
    event.preventDefault(); // מונע את רענון הדף
      
    const email = document.getElementById('email').value.trim(); // הסרת רווחים
    const passwordUser = document.getElementById('password').value.trim(); // הסרת רווחים

   

    try {

        const response =await fetch(`http://localhost:3000/user/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        
        if (response.ok) {
            const userMail = await response.json(); 
           if(!userMail[0][0])
                   showToast("מייל  או סיסמא לא קיימים במערכת", "error")
            else {
                if(userMail[0][0].passwordUser===passwordUser){
                   showToast(" ברוך הבא למערכת"  +userMail[0][0].userName)
                    localStorage.setItem('userName',userMail[0][0].userName)
                    localStorage.setItem('userId',userMail[0][0].userId)
                    localStorage.setItem('email',userMail[0][0].email)   
                    globalName=userMail[0][0].userName
                    globalMail=email
                    globalPass=passwordUser
                    openUpdateProfileModal()
                     }
                else{
                 
                    showToast("מייל  או סיסמא לא קיימים במערכת", "error")
                }
            
            }


    
        } else {
            console.error('שגיאה בקבלת המשתמשים');
            showToast('שגיאה בקבלת נתוני המשתמשים מהשרת.', "error");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('שגיאה בחיבור לשרת', "error");
    }
});

async function passwordSent() {
    const params = {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("userPassword"),
    };

  

    const serviceId = "service_ppvmkta";
    const templetId = "template_itl92vb";
    

    try {
        // הוספתי console.log לפני שליחת המייל
       

        const response = await emailjs.send(serviceId, templetId, params);
      
        window.location.href = "../html/passwordSent.html"

    } catch (err) {
        // במקרה של שגיאה, הדפסת השגיאה בקונסול
        console.log('Error sending email:', err);
    }
}

async function sendPassword() {
    const email = document.getElementById('email').value.trim(); // הסרת רווחים
    localStorage.setItem('email', email)


    try {
        const response = await fetch(`http://localhost:3000/user/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userMail = await response.json();

            // אם המידע של המשתמש נמצא
            if (userMail.length > 0 && userMail[0].length > 0) {
                const user = userMail[0][0]; // הפרט של המשתמש

                // שמירת הסיסמא בלוקלסטורג'
                localStorage.setItem('userPassword', user.passwordUser);

                // אם אתה רוצה להציג את הסיסמא באלרט
        
                passwordSent()
            } else {
                showToast("לא נמצא משתמש עם המייל הזה", "error");
            }
        } else {
            console.error('שגיאה בקבלת המשתמשים');
            showToast('שגיאה בקבלת נתוני המשתמשים מהשרת.', "error");
        }
    } catch (error) {
        console.error('Error:', error);
      showToast("שגיאה בחיבור לשרת", "error");
    }

}

// פונקציה לפתיחת החלונית המודאלית
function openUpdateProfileModal() {
    document.getElementById('updateModal').style.display = 'block';
}

// דוגמה לשימוש - תוכל להפעיל את הפונקציה הזו לאחר השלמת ההרשמה בהצלחה
// openUpdateProfileModal();

document.getElementById('noUpdate').addEventListener('click', function() {
    document.getElementById('updateModal').style.display = 'none'; // הסתר את המודאל
    window.location.href="chooseOption.html"
});



document.getElementById('yesUpdate').addEventListener('click', function() {
    document.getElementById('updateModal').style.display = 'none'; // הסתר את המודאל
  
    document.getElementById('userProfileUpdateModal').style.display = 'block';

     fillFormWithDummyData()
      
     

});
function fillFormWithDummyData() {
    document.getElementById('updateUserName').value = globalName;
    document.getElementById('updateEmail').value = globalMail;
    document.getElementById('updatePassword').value =globalPass
}

async function updateDetails(){
   // event.preventDefault(); // מונע את הרענון של הדף

    const userId = localStorage.getItem('userId'); 
    const userName = document.getElementById('updateUserName').value;
    const email = document.getElementById('updateEmail').value;
    const passwordUser = document.getElementById('updatePassword').value;
     
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName, email, passwordUser })
        });

        if (response.ok) {
            showMessage("הפרטים עודכנו בהצלחה!", false);
            //document.getElementById('updateForm').reset(); // ניקוי השדות בטופס לאחר עדכון
            window.location.href="chooseOption.html"
        } else {
            showMessage("שגיאה בעדכון הפרטים", true);
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage("שגיאה בחיבור לשרת", true);
    }
};

function showMessage(message, isError) {
    const messageBox = document.getElementById('messageBox'); // ודא שזה המיקום הנכון
    messageBox.innerText = message;
    messageBox.style.display = "block"; // מציג את ההודעה

    // מוסיף מחלקה לשגיאה או הצלחה
    if (isError) {
        messageBox.classList.add('error');
        messageBox.classList.remove('success');
    } else {
        messageBox.classList.add('success');
        messageBox.classList.remove('error');
    }

    setTimeout(() => {
        messageBox.style.display = "none"; // מחביא את ההודעה אחרי 3 שניות
    }, 7000);

    
}

// הוסף את ההאזנה לאירוע על הטופס
document.getElementById('updateProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מונע את הרענון של הדף
    await updateDetails(); // קורא לפונקציה לעדכון
});
// function showToast(message, type = "success") {
//   // יוצרת אלמנט חדש
//   const toast = document.createElement("div");
//   toast.className = `
//     fixed top-4 right-4 z-50 flex items-center gap-3 
//     px-4 py-3 rounded-2xl shadow-lg
//     text-sm transition-all duration-300
//     ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
//   `;

//   // מוסיפה אייקון SVG מתאים
//   const icon = document.createElement("span");
//   icon.innerHTML = type === "success"
//     ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
//          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
//          d="M5 13l4 4L19 7"/></svg>`
//     : `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
//          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
//          d="M6 18L18 6M6 6l12 12"/></svg>`;

//   const text = document.createElement("span");
//   text.textContent = message;

//   toast.appendChild(icon);
//   toast.appendChild(text);
//   document.body.appendChild(toast);

//   // מסירה אחרי 4 שניות
//   setTimeout(() => {
//     toast.classList.add("opacity-0");
//     setTimeout(() => toast.remove(), 300); // זמן מעבר
//   }, 4000);
// }
// function showToast(message, type = "success") {
//   const toast = document.createElement("div");

//   toast.className = `
//     fixed top-4 left-1/2 -translate-x-1/2 z-50
//     px-6 py-3 rounded-xl shadow-md text-sm font-medium
//     transition-all duration-300 opacity-0
//     ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
//   `;

//   toast.textContent = message;
//   document.body.appendChild(toast);

//   // הפעלה הדרגתית
//   setTimeout(() => toast.classList.remove("opacity-0"), 10);

//   // הסרה אחרי 4 שניות
//   setTimeout(() => {
//     toast.classList.add("opacity-0");
//     setTimeout(() => toast.remove(), 300);
//   }, 10000);
// }
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
  }, 14000);
}
