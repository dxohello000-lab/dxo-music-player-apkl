const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Fullscreen Button to Top Bar
const topBarRegex = /<a href="download\.html" class="pill-btn glass" id="btn-download-app".*?<\/a>\s*<button class="pill-btn glass" id="btn-open-playlist">\+ PLAYLIST<\/button>/;
const newTopBar = `<div style="display:flex; gap: 8px;">
        <button class="pill-btn glass flex-center" id="btn-fullscreen-video" aria-label="Fullscreen Video" style="padding: 0 14px;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
        </button>
        <button class="pill-btn glass" id="btn-open-playlist">+ PLAYLIST</button>
      </div>`;
if(html.includes('btn-download-app')) {
  // Try matching download button
  html = html.replace(topBarRegex, newTopBar);
} else {
  // If download button is missing or replaced
  html = html.replace(/<button class="pill-btn glass" id="btn-open-playlist">\+ PLAYLIST<\/button>/, newTopBar);
}

// 2. Add Exit Fullscreen Button and CSS
const exitBtnHTML = `    <button id="btn-exit-fullscreen" aria-label="Exit Fullscreen">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
    </button>
    <!-- Live YouTube video -->`;
html = html.replace(/<!-- Live YouTube video as the app's background.*?-->/, exitBtnHTML);

const fullscreenCSS = `    /* Fullscreen Video Mode */
    #btn-exit-fullscreen {
      display: none;
      position: absolute; top: max(20px, env(safe-area-inset-top, 20px)); right: 20px;
      background: rgba(0,0,0,0.6); padding: 12px; border-radius: 50%; color: white;
      z-index: 101; backdrop-filter: blur(4px); cursor: pointer;
    }
    body.fullscreen-active .bg-overlay,
    body.fullscreen-active .top-bar,
    body.fullscreen-active .hero,
    body.fullscreen-active .tagline-container,
    body.fullscreen-active .player-container,
    body.fullscreen-active .dj-fx-layer,
    body.fullscreen-active .bottom-sheet {
      opacity: 0 !important;
      pointer-events: none !important;
    }
    body.fullscreen-active #yt-host {
      z-index: 100;
      pointer-events: auto; /* Allow interaction with video in fullscreen */
    }
    body.fullscreen-active #btn-exit-fullscreen {
      display: block;
    }`;
html = html.replace(/<\/style>/, `${fullscreenCSS}\n  </style>`);

// Fix missing tagline container class from previous step
html = html.replace(/<div style="text-align: center; z-index: 10; padding-bottom: 15px;">/, `<div class="tagline-container" style="text-align: center; z-index: 10; padding-bottom: 15px;">`);


// 3. Add Script for Fullscreen Toggle
const scriptInsert = `    // Fullscreen Video Logic
    const btnFullscreen = document.getElementById('btn-fullscreen-video');
    const btnExitFullscreen = document.getElementById('btn-exit-fullscreen');
    
    if(btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        document.body.classList.add('fullscreen-active');
        // Native fallback if supported
        const host = document.getElementById('yt-host');
        if (host.requestFullscreen) host.requestFullscreen().catch(()=>{});
        else if (host.webkitRequestFullscreen) host.webkitRequestFullscreen();
      });
    }
    if(btnExitFullscreen) {
      btnExitFullscreen.addEventListener('click', () => {
        document.body.classList.remove('fullscreen-active');
        if (document.exitFullscreen) document.exitFullscreen().catch(()=>{});
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      });
    }
    
    // Also listen for native fullscreen exit
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) document.body.classList.remove('fullscreen-active');
    });
    document.addEventListener('webkitfullscreenchange', () => {
      if (!document.webkitFullscreenElement) document.body.classList.remove('fullscreen-active');
    });`;

html = html.replace(/const btnOpenPlaylist = document\.getElementById\('btn-open-playlist'\);/, `const btnOpenPlaylist = document.getElementById('btn-open-playlist');\n${scriptInsert}`);

fs.writeFileSync('index.html', html);
