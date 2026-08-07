class AirplaneLoader {
  constructor(options = {}) {
    this.container = options.container || document.body;
    this.duration = options.duration || 3000;
    this.showDuration = options.showDuration || 2000;
    this.onComplete = options.onComplete || function() {};
    
    this.messages = [
      "Loading your portfolio...",
      "Setting up the galaxy...",
      "Deploying your projects...",
      "Ready to explore!"
    ];
    
    this.init();
  }

  init() {
    this.loaderElement = document.createElement('div');
    this.loaderElement.className = 'airplane-loader-overlay';
    
    this.loaderElement.innerHTML = `
      <div class="airplane-loader-content">
        <div class="sky-container">
          <div class="stars"></div>
          <div class="clouds">
            <div class="cloud cloud-1"></div>
            <div class="cloud cloud-2"></div>
            <div class="cloud cloud-3"></div>
          </div>
          
          <div class="airplane-container">
            <div class="motion-trail"></div>
            <svg class="airplane" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00d4ff" />
                  <stop offset="100%" stop-color="#6d28d9" />
                </linearGradient>
              </defs>
              <path class="plane-body" d="M10,25 Q30,20 70,25 Q90,25 95,20 L95,30 Q90,30 70,25 Q30,30 10,25 Z" fill="url(#planeGrad)"/>
              <path class="plane-wing-top" d="M40,25 L50,5 L60,25 Z" fill="#ff006e" />
              <path class="plane-wing-bottom" d="M40,25 L50,45 L60,25 Z" fill="#ff006e" />
              <path class="plane-tail" d="M10,25 L5,15 L15,25 Z" fill="#6d28d9" />
              <!-- Propeller -->
              <g class="propeller" transform="translate(95, 25)">
                <path d="M0,-10 L5,0 L0,10 L-5,0 Z" fill="#fff" />
                <circle cx="0" cy="0" r="2" fill="#ff006e" />
              </g>
            </svg>
          </div>
        </div>
        
        <div class="loading-indicators">
          <div class="dots-container">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="message-container" id="loader-message">
            Loading your portfolio...
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(this.loaderElement);
  }

  show() {
    this.loaderElement.classList.add('visible');
    
    let msgIndex = 0;
    const msgElement = document.getElementById('loader-message');
    
    this.msgInterval = setInterval(() => {
      msgIndex++;
      if (msgIndex < this.messages.length) {
        msgElement.style.opacity = 0;
        setTimeout(() => {
          msgElement.innerText = this.messages[msgIndex];
          msgElement.style.opacity = 1;
        }, 300);
      } else {
        clearInterval(this.msgInterval);
      }
    }, 1000);
  }

  hide() {
    this.loaderElement.classList.remove('visible');
    clearInterval(this.msgInterval);
    
    setTimeout(() => {
      if (this.loaderElement.parentNode) {
        this.loaderElement.parentNode.removeChild(this.loaderElement);
      }
      this.onComplete();
    }, 500); // Wait for fade out
  }
}

// Global initialization logic as requested
document.addEventListener('DOMContentLoaded', () => {
  const loader = new AirplaneLoader({
    container: document.body,
    duration: 3000,
    showDuration: 2000
  });

  // Show loading animation
  loader.show();

  // Hide after page fully loads, but ensure it shows for at least 3 seconds
  // so the user can see the airplane fly across the screen
  const startTime = Date.now();
  
  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const minDisplayTime = 3000; // 3 seconds
    
    const timeToWait = Math.max(0, minDisplayTime - elapsed);
    
    setTimeout(() => {
      loader.hide();
    }, timeToWait);
  });
});
