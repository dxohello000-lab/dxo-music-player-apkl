const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace splash screen HTML with the custom image
const splashHTMLRegex = /<div id="splash-screen">[\s\S]*?<\/div>/;
const newSplashHTML = `<div id="splash-screen">
    <div class="splash-logo-container">
      <img src="https://i.ibb.co/k2NzyGqY/Chat-GPT-Image-Aug-13-2026-05-01-28-PM.png" alt="DXO MUSIC Logo" class="splash-logo">
      <div class="splash-spinner"></div>
    </div>
    <div class="splash-title brand-text" style="font-size: 2.2rem; margin-top: 15px;">DXO MUSIC</div>
    <div class="tagline-small" style="font-size: 0.8rem; margin-top: 5px;">संगीत ही जीवन है</div>
  </div>`;
html = html.replace(splashHTMLRegex, newSplashHTML);

// Replace splash screen CSS
const splashCSSRegex = /\/\* Native-Android-feel: splash screen[\s\S]*?#splash-screen\.hide \{ opacity: 0; pointer-events: none; \}/;
const newSplashCSS = `/* Enhanced App Loading Splash Screen */
    #splash-screen {
      position: fixed; inset: 0; z-index: 9999;
      background: var(--bg);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .splash-logo-container {
      position: relative;
      width: 110px; height: 110px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 10px;
    }
    .splash-logo { 
      width: 90px; height: 90px; 
      border-radius: 26px; 
      object-fit: cover;
      box-shadow: 0 10px 40px rgba(255, 78, 0, 0.5);
      animation: logoPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      z-index: 2;
    }
    .splash-spinner {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 30px;
      border: 3px solid transparent;
      border-top-color: var(--yellow);
      border-bottom-color: var(--orange);
      animation: spin 1.5s linear infinite;
      z-index: 1;
    }
    #splash-screen .brand-text {
      animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0; transform: translateY(20px);
      animation-delay: 0.1s;
    }
    #splash-screen .tagline-small {
      animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0; transform: translateY(20px);
      animation-delay: 0.2s;
    }
    
    @keyframes logoPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 10px 40px rgba(255, 78, 0, 0.4); }
      50% { transform: scale(1.05); box-shadow: 0 15px 50px rgba(255, 78, 0, 0.7); }
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    @keyframes slideUpFade { to { opacity: 1; transform: translateY(0); } }
    
    #splash-screen.hide { 
      opacity: 0; 
      pointer-events: none; 
      transform: scale(1.05); 
    }`;
html = html.replace(splashCSSRegex, newSplashCSS);

// Make the splash screen last a bit longer to see the animation
html = html.replace(/setTimeout\(\(\) => \{\n\s*const s = document\.getElementById\('splash-screen'\);\n\s*if \(s\) \{ s\.classList\.add\('hide'\); setTimeout\(\(\) => s\.remove\(\), 400\); \}\n\s*\}, 900\);/, 
`setTimeout(() => {
        const s = document.getElementById('splash-screen');
        if (s) { s.classList.add('hide'); setTimeout(() => s.remove(), 600); }
      }, 2000);`);

fs.writeFileSync('index.html', html);
