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

// Note form: sends through Web3Forms (https://web3forms.com), no backend of our own.
// Success is shown only when the response is OK *and* json.success is true.
const form = document.getElementById('note') as HTMLFormElement | null;
if (form) {
  const d = form.dataset;
  const st = document.getElementById('f-status')!;
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const field = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement;
  const say = (text: string, kind?: 'ok' | 'err') => {
    st.textContent = text;
    st.classList.toggle('is-ok', kind === 'ok');
    st.classList.toggle('is-err', kind === 'err');
  };
  // Error line with a LinkedIn link (opens in a new tab).
  const sayError = () => {
    say(d.errorBefore!, 'err');
    if (d.errorHref) {
      const a = document.createElement('a');
      a.href = d.errorHref;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = d.errorLink!;
      st.append(a, d.errorAfter!);
    } else {
      st.append(d.errorLink!, d.errorAfter!);
    }
  };
  let sending = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;

    // 1. Validate: list only what's missing, focus the first one.
    const checks: [string, string | undefined][] = [
      ['name', d.missingName],
      ['email', d.missingEmail],
      ['message', d.missingMessage],
    ];
    const missing = checks.filter(([n]) => {
      const el = field(n);
      return !el.value.trim() || !el.checkValidity();
    });
    if (missing.length) {
      say(d.missingPrefix + missing.map(([, text]) => text).join(', '), 'err');
      field(missing[0][0]).focus();
      return;
    }

    // 2. Send.
    sending = true;
    const label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = d.sending!;
    try {
      const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
      data.replyto = data.email;
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json && json.success === true) {
        form.reset();
        say(d.success!, 'ok');
      } else {
        sayError();
      }
    } catch {
      sayError();
    } finally {
      sending = false;
      btn.disabled = false;
      btn.innerHTML = label;
    }
  });
}
