function displayResults() {
    const resultContainer = document.getElementById('resultContainer');

    // יצירת אלמנט לחצן
    const homeButton = document.createElement('button');
    homeButton.textContent = 'לדף הבית';
    homeButton.classList.add('home-button'); // הוספת מחלקה כדי לעצב את הלחצן

    // הוספת פעולה ללחצן
    homeButton.addEventListener('click', () => {
        window.location.href = 'chooseOption.html'; // הפניה לדף הבית
    });

    // יצירת האלמנטים החדשים
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    const emojiDiv = document.createElement('div');
    emojiDiv.classList.add('emoji');
    emojiDiv.textContent = '👏'; // הוספת האימוג'י

    const resultMessage = document.createElement('h1');
    resultMessage.textContent = `הצלחת לענות על ${localStorage.getItem('numOfCorrectAnswers')} שאלות!`;

    // הוספת האלמנטים ל-DOM
    resultDiv.appendChild(emojiDiv);
    resultDiv.appendChild(resultMessage);
    resultContainer.appendChild(resultDiv);

    // הוספת הלחצן ל-DOM
    document.body.appendChild(homeButton); // או כל מקום אחר שבו תרצה להוסיף אותו
}

displayResults();
