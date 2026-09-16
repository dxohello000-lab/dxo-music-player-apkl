const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldScript = `    function toggleAbout(show) {
      if (show) {
        aboutModal.classList.add('active');
        aboutMsg.style.opacity = '1';
        aboutContent.style.opacity = '0';
        setTimeout(() => {
          aboutMsg.style.opacity = '0';
          setTimeout(() => { aboutContent.style.opacity = '1'; }, 500);
        }, 1500);
      } else {
        aboutModal.classList.remove('active');
        setTimeout(() => {
          aboutContent.style.opacity = '0';
          aboutMsg.style.opacity = '1';
        }, 400);
      }
    }`;

const newScript = `    function toggleAbout(show) {
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
    }`;

html = html.replace(oldScript, newScript);

fs.writeFileSync('index.html', html);
