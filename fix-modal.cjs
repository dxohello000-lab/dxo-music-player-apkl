const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the entire about-modal with the original structure + policies
const brokenHTMLRegex = /<!-- About Modal -->[\s\S]*?<!-- \/app-container -->/;
const restoredModal = `<!-- About Modal -->
    <div id="about-modal">
      <div class="about-intro" id="about-msg">Welcome!</div>
      <div class="about-content" id="about-content">
        <h2>About DXO MUSIC</h2>
        <p>Your aesthetic companion for the journey.</p>
        
        <div class="about-scroll-area">
          <ul class="about-features">
            <li>🎬 <strong>Live Video Background:</strong> Your track's video plays right behind the player, with a premium light-show effect while it's playing.</li>
            <li>📝 <strong>Custom Playlists:</strong> Paste any YouTube mix or playlist URL to load it.</li>
            <li>💿 <strong>Vinyl Player:</strong> Spinning album art with smooth controls.</li>
            <li>🔀 <strong>Smart Queue:</strong> True Fisher-Yates shuffle & repeat modes.</li>
          </ul>

          <div class="about-faq">
            <h3>FAQ & How to Use</h3>
            <div class="faq-item">
              <strong>Q: How do I play my own music?</strong>
              <span>A: Click "+ PLAYLIST" and paste any YouTube playlist or video URL.</span>
            </div>
            <div class="faq-item">
              <strong>Q: Where is this hosted?</strong>
              <span>A: It's a fully static app running entirely in your browser. No data is stored externally!</span>
            </div>
          </div>
          
          <div class="about-faq" style="margin-top: 20px;">
            <h3>Privacy Policy</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px;">Your privacy is strictly respected. This application operates entirely in your browser. We do not collect, store, track, or share any personal data. Your playback history and preferences are stored securely within your device's LocalStorage and never transmitted to our servers.</p>
          </div>

          <div class="about-faq" style="margin-top: 20px;">
            <h3>Terms & Conditions</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">Provided purely as a free, open utility interface without warranties. All audio and visual content is served directly from YouTube. We do not host any media files. By using this tool, you must adhere to YouTube's standard Terms of Service.</p>
          </div>
        </div>

        <button class="btn-got-it" id="btn-about-close">Got it</button>
        <div style="font-size:0.75rem; color:var(--text-muted);">Created by Dipanshu</div>
      </div>
    </div>
  </div> <!-- /app-container -->`;

html = html.replace(brokenHTMLRegex, restoredModal);

// 2. Restore the original toggleAbout script animation
const scriptRegex = /function toggleAbout\(show\) \{[\s\S]*?tabId\)\.style\.display = 'block';\n    \}/;
const restoredScript = `function toggleAbout(show) {
      if (show) {
        aboutModal.classList.add('active');
        if(aboutMsg) aboutMsg.style.opacity = '1';
        if(aboutContent) aboutContent.style.opacity = '0';
        setTimeout(() => {
          if(aboutMsg) aboutMsg.style.opacity = '0';
          setTimeout(() => { if(aboutContent) aboutContent.style.opacity = '1'; }, 500);
        }, 1500);
      } else {
        aboutModal.classList.remove('active');
        setTimeout(() => {
          if(aboutContent) aboutContent.style.opacity = '0';
          if(aboutMsg) aboutMsg.style.opacity = '1';
        }, 400);
      }
    }`;

html = html.replace(scriptRegex, restoredScript);

fs.writeFileSync('index.html', html);
