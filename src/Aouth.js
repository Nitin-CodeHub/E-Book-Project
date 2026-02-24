 
    /* ═══════════════════════════════════════════════════════════════
   ⚙️  CONFIGURATION — Replace these placeholders before deploying
   ═══════════════════════════════════════════════════════════════ */
const SUPABASE_URL    = 'https://gvahwgwyyzjpretlwpmz.supabase.co';
const SUPABASE_ANON   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YWh3Z3d5eXpqcHJldGx3cG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NTM2NzgsImV4cCI6MjA4NzQyOTY3OH0.nG1lR-WxaRfFDvWyU8lp5PY9XC0Dp9-Yjk_kihLjdqU';
const REDIRECT_URL    = 'https://YOUR_REDIRECT_URL_AFTER_LOGIN'; // e.g. '/dashboard'

/* ── Init Supabase ─────────────────────────────────────────── */
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);

/* ── Tab State ─────────────────────────────────────────────── */
let currentTab = 'login';

function switchTab(tab) {
  // Hide all panels
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  const indicator = document.getElementById('tab-indicator');

  if (tab === 'login') {
    document.getElementById('panel-login').classList.add('active');
    document.getElementById('tab-login').classList.add('active');
    document.getElementById('tab-login').setAttribute('aria-selected', 'true');
    document.getElementById('tab-signup').setAttribute('aria-selected', 'false');
    indicator.classList.remove('right');
    indicator.style.display = '';
  } else if (tab === 'signup') {
    document.getElementById('panel-signup').classList.add('active');
    document.getElementById('tab-signup').classList.add('active');
    document.getElementById('tab-signup').setAttribute('aria-selected', 'true');
    document.getElementById('tab-login').setAttribute('aria-selected', 'false');
    indicator.classList.add('right');
    indicator.style.display = '';
  } else {
    // reset — hide tab bar indicator
    document.getElementById('panel-reset').classList.add('active');
    indicator.style.display = 'none';
  }

  clearToast();
  currentTab = tab;
}

/* ── Toast ─────────────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg, type = 'error') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast show ${type}`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 5500);
}

function clearToast() {
  const el = document.getElementById('toast');
  el.classList.remove('show');
}

/* ── Field Validation Helpers ──────────────────────────────── */
function setError(id, msg) {
  const err = document.getElementById(id);
  if (err) err.textContent = msg;
  const input = err?.previousElementSibling?.tagName === 'INPUT'
    ? err.previousElementSibling
    : err?.parentElement?.querySelector('input');
  if (msg && input) input.classList.add('invalid');
  else if (input) input.classList.remove('invalid');
}

function clearErrors(prefix) {
  document.querySelectorAll(`[id^="${prefix}-"][id$="-err"]`).forEach(el => {
    el.textContent = '';
    const input = el.previousElementSibling?.tagName === 'INPUT'
      ? el.previousElementSibling
      : el.parentElement?.querySelector('input');
    if (input) input.classList.remove('invalid');
  });
}

function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

/* ── Button Loading State ──────────────────────────────────── */
function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  const txt = btn.querySelector('.btn-text');
  const ldr = btn.querySelector('.btn-loader');
  btn.disabled = loading;
  txt.hidden = loading;
  ldr.hidden = !loading;
}

/* ── Password Visibility ───────────────────────────────────── */
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.querySelector('svg').style.opacity = isHidden ? '0.5' : '1';
}

/* ── Password Strength ─────────────────────────────────────── */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return 'weak';
  if (score <= 3) return 'fair';
  return 'strong';
}

document.getElementById('signup-password').addEventListener('input', function() {
  const bar = document.getElementById('pw-bar');
  if (!this.value) { bar.className = 'pw-bar'; return; }
  bar.className = `pw-bar ${getStrength(this.value)}`;
});

/* ═══════════════════════════════════════════════════════════════
   🔐  LOGIN
   ═══════════════════════════════════════════════════════════════ */
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors('login');
  clearToast();

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  let valid = true;

  if (!email) { setError('login-email-err', 'Email is required.'); valid = false; }
  else if (!isValidEmail(email)) { setError('login-email-err', 'Enter a valid email address.'); valid = false; }

  if (!password) { setError('login-password-err', 'Password is required.'); valid = false; }

  if (!valid) return;

  setLoading('btn-login', true);

  const { data, error } = await db.auth.signInWithPassword({ email, password });

  setLoading('btn-login', false);

  if (error) {
    const map = {
      'Invalid login credentials': 'Incorrect email or password. Please try again.',
      'Email not confirmed': 'Please verify your email before signing in.',
    };
    const msg = map[error.message] || error.message || 'Sign in failed. Please try again.';
    showToast(msg, 'error');
    return;
  }

  showToast('Signed in! Redirecting…', 'success');
  setTimeout(() => { window.location.href = REDIRECT_URL; }, 900);
});

/* ═══════════════════════════════════════════════════════════════
   🆕  SIGN UP
   ═══════════════════════════════════════════════════════════════ */
document.getElementById('form-signup').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors('signup');
  clearToast();

  const username = document.getElementById('signup-username').value.trim();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  let valid = true;

  if (!username) { setError('signup-username-err', 'Username is required.'); valid = false; }
  else if (username.length < 3) { setError('signup-username-err', 'Username must be at least 3 characters.'); valid = false; }

  if (!email) { setError('signup-email-err', 'Email is required.'); valid = false; }
  else if (!isValidEmail(email)) { setError('signup-email-err', 'Enter a valid email address.'); valid = false; }

  if (!password) { setError('signup-password-err', 'Password is required.'); valid = false; }
  else if (password.length < 8) { setError('signup-password-err', 'Password must be at least 8 characters.'); valid = false; }

  if (!valid) return;

  setLoading('btn-signup', true);

  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: {
      data: { username },
      emailRedirectTo: REDIRECT_URL,
    },
  });

  setLoading('btn-signup', false);

  if (error) {
    const map = {
      'User already registered': 'An account with this email already exists.',
    };
    const msg = map[error.message] || error.message || 'Sign up failed. Please try again.';
    showToast(msg, 'error');
    return;
  }

  // If email confirmation is required
  if (data?.user && !data.session) {
    showToast('Account created! Check your inbox to confirm your email.', 'success');
    document.getElementById('form-signup').reset();
    document.getElementById('pw-bar').className = 'pw-bar';
    return;
  }

  // If email confirmation is disabled in Supabase — redirect immediately
  showToast('Account created! Redirecting…', 'success');
  setTimeout(() => { window.location.href = REDIRECT_URL; }, 900);
});

/* ═══════════════════════════════════════════════════════════════
   🔑  RESET PASSWORD
   ═══════════════════════════════════════════════════════════════ */
document.getElementById('form-reset').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors('reset');
  clearToast();

  const email = document.getElementById('reset-email').value.trim();
  let valid = true;

  if (!email) { setError('reset-email-err', 'Email is required.'); valid = false; }
  else if (!isValidEmail(email)) { setError('reset-email-err', 'Enter a valid email address.'); valid = false; }

  if (!valid) return;

  setLoading('btn-reset', true);

  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${REDIRECT_URL}`,
  });

  setLoading('btn-reset', false);

  if (error) {
    showToast(error.message || 'Could not send reset email. Please try again.', 'error');
    return;
  }

  showToast('Reset link sent! Check your inbox.', 'success');
  document.getElementById('reset-email').value = '';
});

/* ── Handle Supabase session on page load ──────────────────── */
(async () => {
  const { data: { session } } = await db.auth.getSession();
  if (session) {
    // User is already signed in — redirect
    window.location.href = REDIRECT_URL;
  }
})();