let globalName=null
let globalMail=null;
let globalPass=null;
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מונע את רענון הדף
    const email = document.getElementById('email').value.trim(); 
    const passwordUser = document.getElementById('password').value.trim(); 
   try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, passwordUser })
        });

        if (response.ok) {
            const userMail = await response.json(); 
            
           if(!userMail||userMail.error){
                   createToast("מייל  או סיסמא לא קיימים במערכת", "error")
            } else {
                localStorage.setItem('token', userMail.token);
                
              createToast("  ברוך הבא למערכת "   +getUserFromToken().name, "success");
                    globalName=getUserFromToken().name
                    globalMail=getUserFromToken().email
                    globalPass=getUserFromToken().passwordUser
                    openUpdateProfileModal()
            }


    
        } else {
            console.error('שגיאה בקבלת המשתמשים');
            createToast('שגיאה בקבלת נתוני המשתמשים מהשרת.', "error");
        }
    } catch (error) {
        console.error('Error:', error);
        createToast('שגיאה בחיבור לשרת', "error");
    }
});

async function passwordSent(user_) {
    const params = {
        email:user_.email,
        password: user_.passwordUser
    };

  

    const serviceId = "service_ppvmkta";
    const templetId = "template_itl92vb";
    

    try {
        const response = await emailjs.send(serviceId, templetId, params);
        window.location.href = "../html/passwordSent.html";

    } catch (err) {
        // במקרה של שגיאה, הדפסת השגיאה בקונסול
        console.log('Error sending email:', err);
    }
}

async function sendPassword() {
    const email = document.getElementById('email').value.trim(); 
    try {
        const response = await fetch(`http://localhost:3000/user/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
debugger
        if (response.ok) {
            const userMail = await response.json();
            console.log(userMail);
         
                const user_ = userMail[0]; 
                     debugger
                passwordSent(user_)
           
        } else {
            console.error('שגיאה בקבלת המשתמשים');
            createToast('שגיאה בקבלת נתוני המשתמשים מהשרת.', "error");
        }
    } catch (error) {
        console.error('Error:', error);
        createToast("שגיאה בחיבור לשרת", "error");
    }
}
function openUpdateProfileModal() {
    document.getElementById('updateModal').style.display = 'block';
    // משנה את הרקע של כל הדף למושחר
document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // חצי שקוף

}
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
    const userId = getUserFromToken().id;
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
            createToast("הפרטים עודכנו בהצלחה!", false);
            window.location.href="chooseOption.html"
        } else {
            createToast("שגיאה בעדכון הפרטים", true);
        }
    } catch (error) {
        console.error('Error:', error);
        createToast("שגיאה בחיבור לשרת", true);
    }
};

function createToast(message, isError) {
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


document.getElementById('updateProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מונע את הרענון של הדף
    await updateDetails(); // קורא לפונקציה לעדכון
});
