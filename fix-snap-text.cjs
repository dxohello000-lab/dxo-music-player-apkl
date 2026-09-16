const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Move the tagline
const heroRegex = /<div class="hero">\s*<h1 class="brand-text">DXO MUSIC<\/h1>\s*<div class="tagline-small">संगीत ही जीवन है - सफ़र का साथी<\/div>\s*<\/div>/;
const newHeroHTML = `<div class="hero">
      <h1 class="brand-text">DXO MUSIC</h1>
    </div>
    
    <div style="text-align: center; z-index: 10; padding-bottom: 15px;">
      <div class="tagline-small">संगीत ही जीवन है - सफ़र का साथी</div>
    </div>`;
html = html.replace(heroRegex, newHeroHTML);

// 2. Add scroll snap CSS to track list
const trackListCSSRegex = /\.track-list \{\s*flex: 1; overflow-y: auto; padding: 0 24px 24px;\s*-webkit-overflow-scrolling: touch;\s*\}/;
const newTrackListCSS = `.track-list {
      flex: 1; overflow-y: auto; padding: 0 24px 24px;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: y mandatory;
    }`;
html = html.replace(trackListCSSRegex, newTrackListCSS);

const trackRowCSSRegex = /\.track-row \{\s*display: flex; align-items: center; gap: 12px; padding: 10px;\s*border-radius: 12px; cursor: pointer; transition: background 0\.2s; margin-bottom: 4px;\s*\}/;
const newTrackRowCSS = `.track-row {
      display: flex; align-items: center; gap: 12px; padding: 10px;
      border-radius: 12px; cursor: pointer; transition: background 0.2s; margin-bottom: 4px;
      scroll-snap-align: start;
      scroll-margin-top: 10px;
    }`;
html = html.replace(trackRowCSSRegex, newTrackRowCSS);

// 3. Update the scrollIntoView block
const jsScrollRegex = /if \(activeEl\) activeEl\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);/;
const jsScrollNew = `if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });`;
html = html.replace(jsScrollRegex, jsScrollNew);

fs.writeFileSync('index.html', html);
