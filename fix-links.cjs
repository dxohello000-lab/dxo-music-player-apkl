const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the inline terms/privacy with full-page links
const oldPrivacy = /<div class="about-faq" style="margin-top: 20px;">\s*<h3>Privacy Policy<\/h3>\s*<p style="font-size: 0\.85rem; color: var\(--text-muted\); line-height: 1\.5; margin-bottom: 10px;">.*?<\/p>\s*<\/div>/g;
const oldTerms = /<div class="about-faq" style="margin-top: 20px;">\s*<h3>Terms & Conditions<\/h3>\s*<p style="font-size: 0\.85rem; color: var\(--text-muted\); line-height: 1\.5;">.*?<\/p>\s*<\/div>/g;

html = html.replace(oldPrivacy, '');
html = html.replace(oldTerms, '');

// Add links in the FAQ area
const newLinks = `          <div class="about-faq" style="margin-top: 20px; text-align: center;">
            <a href="privacy.html" style="color: var(--yellow); text-decoration: none; font-size: 0.9rem; font-weight: 700; display: block; margin-bottom: 12px;">View Privacy Policy</a>
            <a href="terms.html" style="color: var(--yellow); text-decoration: none; font-size: 0.9rem; font-weight: 700; display: block;">View Terms of Service</a>
          </div>`;

html = html.replace(/<\/div>\s*<\/div>\s*<button class="btn-got-it" id="btn-about-close">Got it<\/button>/, `</div>\n${newLinks}\n        </div>\n\n        <button class="btn-got-it" id="btn-about-close">Got it</button>`);

// Fix splash screen name
html = html.replace(/<div class="splash-title devanagari">Chai Wala MUSIC<\/div>/, '<div class="splash-title devanagari">DXO MUSIC</div>');
html = html.replace(/alt="Chai Wala MUSIC"/, 'alt="DXO MUSIC"');

fs.writeFileSync('index.html', html);
