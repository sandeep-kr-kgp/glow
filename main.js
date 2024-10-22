import './style.css';
import { Firework } from './fireworks';
function init() {
  const params = new URLSearchParams(window.location.search);
  const text = params.get('text') ?? 'Hello World';
  document.querySelector('#app').innerHTML = `
    ${text
      .split('-')
      .map((word) => {
        return `<div class="text">
        ${word
          .split('')
          .map((c) => `<div class="character">${c}</div>`)
          .join('')}
        </div>`;
      })
      .join('')}
`;
  document.querySelectorAll('.character').forEach((c) => {
    c.addEventListener('mouseover', function (e) {
      if (e.target.classList.contains('glowing'))
        e.target.classList.remove('glowing');
      else e.target.classList.add('glowing');
    });
  });
}
init();
Firework();
