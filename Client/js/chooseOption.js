const container = document.getElementById('container');
// הוספת כותרת מעל הכפתורים
const title = document.createElement('h1');
title.textContent = 'מה ברצונך לעשות?';
container.prepend(title);

// קונטיינר ללחצנים הראשיים
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');

// כפתור 1 – מענה על שאלון של חברה
const box1 = createBox('fas fa-pencil-alt', 'מענה על שאלון של חבר');
box1.addEventListener('click', function () {
    window.location.href = "insertMail.html";
});

// כפתור 2 – ליצירת שאלון על עצמי
const box2 = createBox('fas fa-plus', '  יצירת שאלון על עצמי')
box2.addEventListener('click', isQuizExist);

// הוספתם לקונטיינר
buttonContainer.appendChild(box1);
buttonContainer.appendChild(box2);
container.appendChild(buttonContainer);

// כפתור 3 – לוח החברים שלך
const box3 = createBox('fas fa-users', 'לוח החברים שלך', 'small');
box3.addEventListener('click', function () {
    window.location.href = "friendsBoard.html";
});
container.appendChild(box3);

// כפתור יציאה
const logoutBox = document.createElement('div');
logoutBox.classList.add('logout-box');
logoutBox.innerHTML = `<i class="fas fa-sign-out-alt"></i><span> יציאה ממשתמש זה</span>`;
logoutBox.addEventListener('click', function () {
    window.location.href = "openingScreen.html";
});
container.appendChild(logoutBox);

// פונקציית עזר ליצירת כפתורים
function createBox(iconClass, text, additionalClass = '') {
    const box = document.createElement('div');
    box.classList.add('box');
    if (additionalClass) box.classList.add(additionalClass);

    const icon = document.createElement('i');
    icon.className = iconClass;

    const span = document.createElement('span');
    span.textContent = text;

    box.appendChild(icon);
    box.appendChild(span);

    return box;
}

// פונקציה לבדוק אם קיים שאלון
async function isQuizExist() {
    const currentUser = localStorage.getItem('userId');

    try {
        const check = await fetch(`http://localhost:3000/QuestionAnswers/${currentUser}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!check.ok) {
            throw new Error(`שגיאה בקוד ${check.status}`);
        }

        const checkData = await check.json();

        if (checkData[0].length !== 0) {
            window.location.href = "existingQuiz.html";
        } else {
            window.location.href = "createQuiz.html";
        }

    } catch (error) {
        console.error('שגיאה ב-fetch:', error);
    }
}
