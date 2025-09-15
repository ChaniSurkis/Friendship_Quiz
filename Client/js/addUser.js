

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מונע את הרענון של הדף

    // קבלת הערכים מהשדות
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const passwordUser = document.getElementById('password').value;

  
let imagePath,flag=true;
if(userName.trim()===''||email.trim()===''||passwordUser.trim()==='')
    createToast("אין אפשרות לשדות ריקים","error")
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
            const emailExists = checkEmail;
          console.log(emailExists);
            // בדיקה אם המייל כבר קיים
            if (emailExists[0]) {
               
                createToast("המייל כבר קיים במערכת", "warning");
                return; 
            }
        }

        // העלאת התמונה קודם
         imagePath = await uploadFile(); 

        if (!imagePath) {
            createToast("שגיאה בהעלאת התמונה", "error");
            return; 
        }
    } catch (error) {
    
        createToast("שגיאה בחיבור לשרת", "erroe");
    }
    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, passwordUser, email, imagePath })
        });    
      if (!response.ok) {
           flag=false; 
      createToast("סיסמא שגויה-דרוש מינימום 6 תווים","error");

      }
      if (response.ok) {
        flag=true
        const data = await response.json(); 
        console.log('Success:', data);
        localStorage.setItem('token', data.token);
        
        createToast("המשתמש נוסף בהצלחה","succes");
 window.location.href = "chooseOption.html";
    }

      const result = await response.json();
}
    catch (error) {

      createToast(error.message, "error");
    }


if(flag){

        try {
            const responseEmail = await fetch(`http://localhost:3000/user/email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responseEmail.ok) {
                const checkEmail = await responseEmail.json();
                localStorage.setItem('userId', checkEmail[0].userId);
                localStorage.setItem('userName', checkEmail[0].userName);
                localStorage.setItem('email', checkEmail[0].email);
                window.location.href = "chooseOption.html";
            } else {
                createToast("שגיאה בהוספת המשתמש", "error");
            }

        } catch (error) {
            console.error('Error:', error);
            createToast("שגיאה בחיבור לשרת", "error");
        }
    }
    
});
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        createToast('Please select a file first!', "error");
        return null; 
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
        const fileName = result.replace('File uploaded successfully: ', '').trim(); 
        console.log("imagePath:", fileName);
        return fileName;
    } catch (error) {
        console.error('Error uploading file:', error);
        createToast(`Error uploading file: ${error.message}`, "error");
        return null
    }
}
function clearFields() {
    document.getElementById('userName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('fileInput').value = ''; // אם רוצים לנקות גם את שדה הקובץ
}


