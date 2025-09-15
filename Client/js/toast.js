function createToast(message, type = 'success') {
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-message {
        position: fixed;
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
        min-width: 250px;
        max-width: 90%;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 14px;
        color: #fff;
        opacity: 0;
        transition: all 0.5s ease;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .toast-message.show {
        top: 20px;
        opacity: 1;
      }

      .toast-message.success { background-color: #4caf50; }
      .toast-message.error   { background-color: #f44336; }
      .toast-message.warning { background-color: #ff9800; }
    `;
    document.head.appendChild(style);
  }

  // יצירת ה-toast
  const toast = document.createElement('div');
  toast.classList.add('toast-message', type);
  toast.textContent = message;

  document.body.appendChild(toast);

  // הצגה עם אנימציה
  setTimeout(() => toast.classList.add('show'), 10);

  // הסרה אחרי 4 שניות
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
