(() => {
  // Site root = wherever assets/concept-bar.js lives, so pages at any depth (incl. /archive/) link correctly.
  const src = document.currentScript && document.currentScript.src;
  const base = src ? new URL('../', src).pathname : '/';
  const here = location.pathname.replace(/index\.html$/, '');
  const small = matchMedia('(max-width: 560px)').matches;
  const items = small
    ? [['', 'Overview'], ['a/', 'A'], ['b/', 'B'], ['c/', 'C'], ['app/', 'App']]
    : [['', 'Overview'], ['a/', 'A · Clinical'], ['b/', 'B · Performance'], ['c/', 'C · Body map'], ['app/', 'App']];
  const bar = document.createElement('nav');
  bar.className = 'cbar';
  bar.setAttribute('aria-label', 'Concept switcher');
  for (const [p, label] of items) {
    const a = document.createElement('a');
    a.href = base + p;
    a.textContent = label;
    if (base + p === here) a.className = 'on';
    bar.appendChild(a);
  }
  if (here.includes('/archive/')) {
    const a = document.createElement('a');
    a.href = here; a.textContent = small ? 'Old C' : 'Archived: old C'; a.className = 'on';
    bar.appendChild(a);
  }
  document.body.appendChild(bar);

  // Booking buttons in the concepts: show what a live site would do instead of silently doing nothing.
  const note = document.createElement('div');
  note.className = 'cnote'; note.setAttribute('role', 'status'); note.setAttribute('aria-live', 'polite');
  document.body.appendChild(note);
  let h;
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-concept]'); if (!el) return;
    const what = el.dataset.concept || el.textContent.trim();
    note.textContent = 'Concept preview: on the live site this opens booking for ' + what + '.';
    note.classList.add('on'); clearTimeout(h); h = setTimeout(() => note.classList.remove('on'), 3200);
  });
})();
