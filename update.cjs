const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace Timer HTML
html = html.replace(
  /<div class="clock-pill flex-center"[\s\S]*?<\/div>/,
  `<div class="clock-display" id="clock-display">
        <span id="clock-hm">00:00</span>
        <div class="flip-group">
            <span class="flip-digit" id="clock-s">00</span>
        </div>
        <span id="clock-ampm" style="font-size: 0.75rem; margin-left:2px;">AM</span>
      </div>`
);

// 2. Add Timer CSS
const cssTimer = `
    .clock-display {
      display: flex; align-items: center; gap: 2px;
      font-weight: 800; font-size: 0.95rem; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;
      background: rgba(10, 5, 2, 0.65);
      border: 1px solid rgba(255,255,255,0.08);
      padding: 6px 14px; border-radius: 30px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.5);
    }
    .clock-blink { animation: blink 1s infinite; }
    @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    .flip-group { display: inline-flex; flex-direction: column; height: 1.2em; overflow: hidden; position: relative; width: 1.6em; align-items: center; justify-content: flex-start; }
    .flip-digit { position: absolute; top: 0; left: 0; width: 100%; text-align: center; font-variant-numeric: tabular-nums; }
    .slide-in-bottom { animation: slideInBottom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .slide-out-top { animation: slideOutTop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    @keyframes slideInBottom { 0% { transform: translateY(100%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
    @keyframes slideOutTop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-100%); opacity: 0; } }
    .tab-btn { background: rgba(255,255,255,0.1); color: var(--text-muted); padding: 8px 16px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; transition: 0.2s; border: 1px solid transparent; }
    .tab-btn.active { background: rgba(255,140,66,0.2); color: var(--yellow); border-color: rgba(255,140,66,0.4); }
`;
html = html.replace('/* Top Bar */', cssTimer + '\n    /* Top Bar */');

// 3. Replace Timer JS
html = html.replace(
  /\/\/ 1\. Clock[\s\S]*?1000\);/,
  `// 1. Live Flip Clock
    let lastSec = -1;
    function updateClock() {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes().toString().padStart(2, '0');
        const s = now.getSeconds().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        
        const hmEl = document.getElementById('clock-hm');
        const ampmEl = document.getElementById('clock-ampm');
        if (hmEl) hmEl.innerHTML = \`\${h}<span class="clock-blink">:</span>\${m}\`;
        if (ampmEl) ampmEl.innerText = ampm;
        
        if (lastSec !== s) {
            const group = document.querySelector('.flip-group');
            if (group) {
                const newDigit = document.createElement('span');
                newDigit.className = 'flip-digit slide-in-bottom';
                newDigit.id = 'clock-s';
                newDigit.innerText = s;
                
                const oldDigit = document.getElementById('clock-s');
                if (oldDigit) {
                    oldDigit.className = 'flip-digit slide-out-top';
                    oldDigit.removeAttribute('id');
                    setTimeout(() => { if (oldDigit.parentNode) oldDigit.parentNode.removeChild(oldDigit); }, 300);
                }
                
                group.appendChild(newDigit);
            }
            lastSec = s;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();`
);

// 4. Update Playlist CSS (modal instead of bottom sheet)
html = html.replace(
  /\.bottom-sheet \{[\s\S]*?flex-direction: column;\n    \}/,
  `.bottom-sheet {
      position: absolute; top: 50%; left: 50%; width: 90%; max-width: 420px; height: 80dvh; max-height: 800px;
      background: rgba(10, 5, 2, 0.75); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
      border-radius: 24px; z-index: 50; border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 25px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15);
      transform: translate(-50%, -50%) scale(0.95); opacity: 0; pointer-events: none;
      transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      display: flex; flex-direction: column;
    }`
);
html = html.replace(
  /\.bottom-sheet\.active \{ transform: translateY\(0\); \}/,
  `.bottom-sheet.active { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; }`
);

// 5. Replace About Modal HTML
html = html.replace(
  /<div id="about-modal">[\s\S]*?<\/div>\s*<\/div>/,
  `<div id="about-modal">
      <div class="about-content" id="about-content" style="opacity: 1;">
        <h2 style="font-size: 1.8rem; margin-bottom: 20px;">DXO MUSIC</h2>
        
        <div class="tabs" style="display:flex; gap:10px; margin-bottom: 20px; justify-content: center; flex-wrap: wrap;">
          <button class="tab-btn active" onclick="showTab('about')">About</button>
          <button class="tab-btn" onclick="showTab('policy')">Privacy Policy</button>
          <button class="tab-btn" onclick="showTab('terms')">Terms</button>
        </div>

        <div class="about-scroll-area" id="tab-about">
          <p style="color:var(--text-muted); font-size: 0.95rem; margin-bottom: 20px; text-align: center;">संगीत ही जीवन है - सफ़र का साथी</p>
          <ul class="about-features" style="margin-bottom: 20px;">
            <li>🎬 <strong>Live Video Backgrounds:</strong> Enjoy beautiful live video wallpapers while you listen.</li>
            <li>📝 <strong>Custom Playlists:</strong> Paste any YouTube URL to play your own custom mixes instantly.</li>
            <li>💿 <strong>Vinyl Player:</strong> Smooth spinning album art.</li>
            <li>🔀 <strong>Smart Queue:</strong> Real shuffle and repeat logic for endless playback.</li>
          </ul>
        </div>

        <div class="about-scroll-area" id="tab-policy" style="display:none; text-align: left;">
          <h3 style="color:var(--yellow); margin-bottom:10px;">Privacy Policy</h3>
          <p style="margin-bottom: 15px; line-height: 1.5; font-size: 0.9rem;">Your privacy is strictly respected. This application operates entirely in your browser. We do not collect, store, track, or share any personal data whatsoever.</p>
          <p style="margin-bottom: 15px; line-height: 1.5; font-size: 0.9rem;">Your playback history, volume preferences, and saved playlists are stored securely within your device's LocalStorage and never transmitted to our servers.</p>
          <p style="line-height: 1.5; font-size: 0.9rem;">Content streaming is powered by standard YouTube iframe APIs, which may be subject to YouTube's own privacy terms.</p>
        </div>

        <div class="about-scroll-area" id="tab-terms" style="display:none; text-align: left;">
          <h3 style="color:var(--yellow); margin-bottom:10px;">Terms & Conditions</h3>
          <ul class="about-features" style="margin-top:10px;">
            <li><strong>As-Is Service:</strong> Provided purely as a free, open utility interface without warranties.</li>
            <li><strong>Third-Party Content:</strong> All audio and visual content is served directly from YouTube. We do not host any media files.</li>
            <li><strong>Usage Limits:</strong> By using this tool, you must adhere to YouTube's standard Terms of Service regarding embedded content playback.</li>
          </ul>
        </div>

        <button class="btn-got-it" id="btn-about-close" style="width: 100%;">Close</button>
      </div>
    </div>`
);

// 6. Replace About Modal JS logic (remove the delayed animation)
html = html.replace(
  /function toggleAbout[\s\S]*?\}, 400\);\n    \}/,
  `function toggleAbout(show) {
      if (show) {
        aboutModal.classList.add('active');
      } else {
        aboutModal.classList.remove('active');
      }
    }
    
    window.showTab = function(tabId) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('tab-about').style.display = 'none';
      document.getElementById('tab-policy').style.display = 'none';
      document.getElementById('tab-terms').style.display = 'none';
      document.getElementById('tab-' + tabId).style.display = 'block';
    }`
);

fs.writeFileSync('index.html', html);
