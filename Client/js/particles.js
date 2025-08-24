const particleContainer = document.querySelector('.particles');

function createParticle() {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    
    const size = Math.random() * 10 + 10; // גודל אקראי, החל מ-10
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.top = `${Math.random() * 100}%`; // מיקום אקראי
    particle.style.left = `${Math.random() * 100}%`;
    
    const duration = Math.random() * 5 + 3; // משך זמן אקראי
    particle.style.animationDuration = `${duration}s`;
    
    // צבע החלקיקים
    particle.style.backgroundColor = `rgba(255, 192, 203, 0.8)`; // צבע ורוד רך
    
    particleContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// יצירת חלקיקים כל 150 מילישניות
setInterval(createParticle, 150);
