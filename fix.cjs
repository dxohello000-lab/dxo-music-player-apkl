const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the corrupted about modal and app container ends
const brokenHTML = /<!-- About Modal -->[\s\S]*?<!-- \/app-container -->/;
const fixedHTML = `<!-- About Modal -->
    <div id="about-modal">
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
    </div>

  </div> <!-- /app-container -->`;

html = html.replace(brokenHTML, fixedHTML);

// Also restore footer and splash screen texts
html = html.replace(/<div class="footer" id="btn-about">DXO MUSIC<\/div>/, '<div class="footer" id="btn-about">made with ❤️ by Dipanshu</div>');
html = html.replace(/<div class="splash-title devanagari">DXO MUSIC<\/div>/, '<div class="splash-title devanagari">Chai Wala MUSIC</div>');

// Make DXO MUSIC font a bit smaller for mobile so it fits
html = html.replace(/font-size: 3.2rem; font-weight: 800; line-height: 1.1; margin-bottom: 0;/, 'font-size: min(3.2rem, 12vw); font-weight: 800; line-height: 1.1; margin-bottom: 0;');

fs.writeFileSync('index.html', html);
