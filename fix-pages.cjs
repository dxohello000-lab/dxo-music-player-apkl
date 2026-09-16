const fs = require('fs');

function addBackButton(file) {
  let html = fs.readFileSync(file, 'utf8');
  
  // Clean up any existing back buttons we might have added previously
  html = html.replace(/<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">\s*<a href="index\.html".*?<\/svg>\s*Back to App\s*<\/a>\s*<\/div>/g, '');
  html = html.replace(/<div style="text-align: center; margin-top: 30px;">\s*<a href="index\.html".*?>Got it<\/a>\s*<\/div>/g, '');

  const backBtnHtml = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <a href="/" style="display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); text-decoration: none; font-size: 0.9rem; font-weight: 600; padding: 8px 12px; background: rgba(255,255,255,0.05); border-radius: 20px;">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
        Back to App
      </a>
    </div>
  `;
  
  if (html.includes('<main>')) {
    html = html.replace(/<main>/, `<main>\n${backBtnHtml}`);
  }

  const gotItHtml = `
    <div style="text-align: center; margin-top: 30px;">
      <a href="/" style="display: inline-block; background: white; color: black; padding: 12px 32px; border-radius: 30px; font-weight: 700; text-decoration: none; font-size: 1rem;">Got it</a>
    </div>
  `;

  if (html.includes('</main>')) {
    html = html.replace(/<\/main>/, `${gotItHtml}\n</main>`);
  }

  fs.writeFileSync(file, html);
}

addBackButton('public/privacy.html');
addBackButton('public/terms.html');
