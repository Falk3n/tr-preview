(() => {
  const here = location.pathname.replace(/index\.html$/, '');
  const base = here.replace(/(a|b|c|app)\/$/, '');
  const small = matchMedia('(max-width: 560px)').matches;
  const items = small
    ? [['', 'Overview'], ['a/', 'A'], ['b/', 'B'], ['c/', 'C'], ['app/', 'App']]
    : [['', 'Overview'], ['a/', 'A · Clinical'], ['b/', 'B · Performance'], ['c/', 'C · Studio'], ['app/', 'App']];
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
  document.body.appendChild(bar);
})();
