// The page's only script. It runs the four motions from HANDOFF.md and the note form.
// Without JS everything is visible: the `js` class turns on the hidden "before" states.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');

// 1. Gentle reveal, once, when 15% visible. 3. Case flow chips light when their card is revealed.
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
      const flow = e.target.querySelector<HTMLElement>('[data-flow]');
      if (flow) lightFlow(flow);
    }),
  { threshold: 0.15 },
);
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

function lightFlow(flow: HTMLElement) {
  const chips = [...flow.querySelectorAll('b')];
  if (reduce) return chips.forEach((c) => c.classList.add('lit'));
  chips.forEach((c, i) => setTimeout(() => c.classList.add('lit'), 500 + i * 450));
}

// 2. Hero card: one row highlighted at a time; pauses on hover and while the tab is hidden.
const rowsEl = document.getElementById('rows');
const count = document.getElementById('count');
if (rowsEl && count) {
  const rows = [...rowsEl.querySelectorAll('.row')];
  const pad = (n: number) => String(n).padStart(2, '0');
  let i = 0;
  let paused = false;
  const show = (n: number) => {
    rows.forEach((r, k) => r.classList.toggle('on', k === n));
    count.textContent = `${pad(n + 1)} / ${pad(rows.length)}`;
  };
  rows.forEach((r, k) => r.addEventListener('mouseenter', () => { paused = true; i = k; show(k); }));
  rowsEl.addEventListener('mouseleave', () => { paused = false; });
  if (!reduce)
    setInterval(() => {
      if (!paused && !document.hidden) { i = (i + 1) % rows.length; show(i); }
    }, 3200);
}

// 4. Header hairline after 8px of scroll.
const bar = document.getElementById('top-bar');
if (bar) addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 8), { passive: true });

// Note form: no backend. Validate, then open a mailto with everything filled in.
const form = document.getElementById('note') as HTMLFormElement | null;
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const st = document.getElementById('f-status')!;
  const d = form.dataset;
  const bad = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]')].filter((x) => !x.checkValidity());
  if (bad.length) {
    const names = bad.map((b) => form.querySelector(`label[for="${b.id}"]`)!.textContent!.toLowerCase().replace(/[?.:]+$/, '')).join(', ');
    st.textContent = d.missing!.replace('{fields}', names);
    bad[0].focus();
    return;
  }
  const v = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value;
  const body = `${v('msg')}\n\n${v('name')}\n${v('email')}`;
  const subject = d.subject!.replace('{name}', v('name'));
  location.href = `mailto:${d.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  st.textContent = d.sent!.replace('{email}', d.email!);
});
