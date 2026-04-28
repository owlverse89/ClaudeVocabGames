// VocabArena — Definition Drop game logic

const TOTAL_Q    = 5;
const TOTAL_LIVES = 3;
const FALL_MS    = 7000; // constant fall duration in milliseconds

const LEVEL_META = {
  novice:    { label: 'Novice',    sub: 'Begin your word adventure',      icon: '🌱' },
  sleuth:    { label: 'Sleuth',    sub: 'Sharpen your word instincts',     icon: '🔍' },
  wordsmith: { label: 'Wordsmith', sub: 'Master the art of words',         icon: '✍️' }
};

const BADGES = [
  { min: 5, emoji: '👑', name: 'Wordsmith Supreme',  desc: 'The ultimate master of words — flawless!' },
  { min: 4, emoji: '⚡', name: 'Wizard of Words',    desc: 'Almost legendary — one step from perfection!' },
  { min: 3, emoji: '🕸️', name: 'Word Weaver',        desc: 'Weaving words with real skill!' },
  { min: 2, emoji: '🔍', name: 'Word Scout',         desc: "You're on the right trail — keep exploring!" },
  { min: 0, emoji: '🌱', name: 'Word Wanderer',      desc: 'Every great wordsmith starts here. Keep going!' }
];

// ── state ──────────────────────────────────────────────────────────────────
let S = {
  grade: null,
  level: null,
  questions: [],   // { word, definition, example, status: 'pending'|'correct'|'missed' }
  idx: 0,
  score: 0,
  lives: TOTAL_LIVES,
  answered: false,
  rafId: null,
  fallStart: null
};

// ── element helpers ────────────────────────────────────────────────────────
const $  = id => document.getElementById(id);
const screens = ['welcome','level','played','game','results'];

function showScreen(name) {
  screens.forEach(n => {
    const el = $('screen-' + n);
    el.style.display = 'none';
    el.classList.remove('active');
  });
  const target = $('screen-' + name);
  target.style.display = 'flex';
  target.classList.add('active');
}

// ── boot ───────────────────────────────────────────────────────────────────
(function init() {
  buildGradeGrid();
  $('back-to-grades').addEventListener('click', () => showScreen('welcome'));
  $('try-other-btn').addEventListener('click', () => {
    buildLevelCards(S.grade);
    showScreen('level');
  });
  $('play-again-btn').addEventListener('click', () => showScreen('welcome'));
  showScreen('welcome');
})();

// ── grade grid ─────────────────────────────────────────────────────────────
function buildGradeGrid() {
  const grid = $('grade-grid');
  grid.innerHTML = '';
  for (let g = 3; g <= 10; g++) {
    const btn = document.createElement('button');
    btn.className = 'grade-btn';
    btn.innerHTML = `<span>${g}</span><span class="lbl">Grade</span>`;
    btn.addEventListener('click', () => selectGrade(g));
    grid.appendChild(btn);
  }
}

function selectGrade(grade) {
  S.grade = grade;
  $('grade-label').textContent = grade;
  buildLevelCards(grade);
  showScreen('level');
}

// ── level cards ────────────────────────────────────────────────────────────
function buildLevelCards(grade) {
  const container = $('level-cards');
  container.innerHTML = '';
  Object.entries(LEVEL_META).forEach(([key, meta]) => {
    const played = isPlayedToday(grade, key);
    const card = document.createElement('div');
    card.className = `level-card ${key}`;
    card.innerHTML = `
      <span class="lv-icon">${meta.icon}</span>
      <div class="lv-info">
        <div class="lv-name">${meta.label}${played ? '<span class="played-badge">Played today</span>' : ''}</div>
        <div class="lv-sub">${meta.sub}</div>
      </div>
      <span class="lv-arrow">›</span>
    `;
    card.addEventListener('click', () => pickLevel(grade, key));
    container.appendChild(card);
  });
}

function pickLevel(grade, level) {
  if (isPlayedToday(grade, level)) {
    $('played-desc').textContent = `Grade ${grade} — ${LEVEL_META[level].label}`;
    showScreen('played');
    return;
  }
  S.level = level;
  startGame(grade, level);
}

// ── localStorage daily limit ───────────────────────────────────────────────
function storageKey(grade, level) { return `va_${grade}_${level}`; }

function isPlayedToday(grade, level) {
  const stored = localStorage.getItem(storageKey(grade, level));
  return stored === todayStr();
}

function markPlayed(grade, level) {
  localStorage.setItem(storageKey(grade, level), todayStr());
}

function todayStr() { return new Date().toDateString(); }

// ── game start ─────────────────────────────────────────────────────────────
function startGame(grade, level) {
  const pool    = wordDatabase[`grade${grade}`][level];
  const shuffled = shuffle([...pool]);
  S.questions   = shuffled.slice(0, TOTAL_Q).map(q => ({ ...q, status: 'pending' }));
  S.idx         = 0;
  S.score       = 0;
  S.lives       = TOTAL_LIVES;
  S.answered    = false;
  showScreen('game');
  refreshHeader();
  loadQuestion(0);
}

// ── question loader ────────────────────────────────────────────────────────
function loadQuestion(idx) {
  if (idx >= TOTAL_Q) { endGame(); return; }

  S.idx      = idx;
  S.answered = false;

  const q = S.questions[idx];
  $('def-text').textContent = q.definition;

  // build 4 choices
  const others  = wordDatabase[`grade${S.grade}`][S.level]
                    .filter(w => w.word !== q.word);
  const wrongs  = shuffle(others).slice(0, 3).map(w => w.word);
  const choices = shuffle([q.word, ...wrongs]);

  const grid = $('word-choices');
  grid.innerHTML = '';
  choices.forEach(word => {
    const btn = document.createElement('button');
    btn.className = 'word-btn';
    btn.textContent = word;
    btn.addEventListener('click', () => handleAnswer(word));
    grid.appendChild(btn);
  });

  refreshHeader();
  beginFall();
}

// ── header refresh ─────────────────────────────────────────────────────────
function refreshHeader() {
  // hearts
  const livesEl = $('lives-display');
  livesEl.innerHTML = '';
  for (let i = 0; i < TOTAL_LIVES; i++) {
    const h = document.createElement('span');
    h.className = 'heart' + (i >= S.lives ? ' lost' : '');
    h.textContent = '❤️';
    livesEl.appendChild(h);
  }
  $('question-counter').textContent = `${S.idx + 1} / ${TOTAL_Q}`;
  $('score-count').textContent = S.score;
}

// ── falling animation ──────────────────────────────────────────────────────
function beginFall() {
  stopFall();

  const card     = $('def-card');
  const area     = $('game-area');
  const areaH    = area.clientHeight;
  const cardH    = card.offsetHeight || 120;
  const startY   = -(cardH + 10);
  const endY     = areaH - cardH;
  const dist     = endY - startY;

  card.style.top = startY + 'px';

  // timer bar
  const bar = $('timer-bar');
  bar.style.transition = 'none';
  bar.style.width = '100%';
  bar.offsetHeight; // force reflow
  bar.style.transition = `width ${FALL_MS}ms linear`;
  bar.style.width = '0%';

  S.fallStart = null;

  function step(ts) {
    if (!S.fallStart) S.fallStart = ts;
    const elapsed  = ts - S.fallStart;
    const progress = Math.min(elapsed / FALL_MS, 1);
    card.style.top = (startY + progress * dist) + 'px';

    if (progress >= 1) {
      if (!S.answered) triggerMiss();
      return;
    }
    S.rafId = requestAnimationFrame(step);
  }
  S.rafId = requestAnimationFrame(step);
}

function stopFall() {
  if (S.rafId) { cancelAnimationFrame(S.rafId); S.rafId = null; }
  // freeze timer bar at current width
  const bar = $('timer-bar');
  const w   = getComputedStyle(bar).width;
  bar.style.transition = 'none';
  bar.style.width = w;
}

// ── answer handling ────────────────────────────────────────────────────────
function handleAnswer(chosen) {
  if (S.answered) return;
  S.answered = true;
  stopFall();

  const correct = S.questions[S.idx].word;
  const isRight = chosen === correct;

  // colour buttons
  document.querySelectorAll('.word-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct)              btn.classList.add('correct');
    else if (btn.textContent === chosen && !isRight) btn.classList.add('wrong');
  });

  if (isRight) {
    S.questions[S.idx].status = 'correct';
    S.score++;
    refreshHeader();
    setTimeout(advance, 1100);
  } else {
    S.questions[S.idx].status = 'missed';
    S.lives--;
    refreshHeader();
    showFeedback('❌', 'Not quite!', correct);
  }
}

function triggerMiss() {
  if (S.answered) return;
  S.answered = true;
  stopFall();

  S.questions[S.idx].status = 'missed';
  S.lives--;
  refreshHeader();

  const correct = S.questions[S.idx].word;
  document.querySelectorAll('.word-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('reveal');
  });
  showFeedback('⏰', 'Time\'s up!', correct);
}

function showFeedback(emoji, msg, correctWord) {
  $('fb-emoji').textContent  = emoji;
  $('fb-msg').textContent    = msg;
  $('fb-word').textContent   = correctWord;
  $('feedback-overlay').classList.remove('hidden');

  setTimeout(() => {
    $('feedback-overlay').classList.add('hidden');
    S.lives <= 0 ? endGame() : advance();
  }, 1800);
}

function advance() {
  const next = S.idx + 1;
  if (next >= TOTAL_Q || S.lives <= 0) endGame();
  else loadQuestion(next);
}

// ── end game ───────────────────────────────────────────────────────────────
function endGame() {
  stopFall();
  markPlayed(S.grade, S.level);
  buildResults();
  showScreen('results');
}

// ── results screen ─────────────────────────────────────────────────────────
function buildResults() {
  const badge = BADGES.find(b => S.score >= b.min);
  $('badge-emoji').textContent = badge.emoji;
  $('badge-title').textContent = badge.name;
  $('badge-desc').textContent  = badge.desc;
  $('result-num').textContent  = S.score;
  $('result-denom').textContent = `/ ${TOTAL_Q} correct`;

  const accordion = $('word-accordion');
  accordion.innerHTML = '';

  S.questions.forEach((q, i) => {
    const statusIcon =
      q.status === 'correct' ? '✅' :
      q.status === 'missed'  ? '❌' : '⬜';

    const item = document.createElement('div');
    item.className = 'word-item';
    item.innerHTML = `
      <div class="word-item-header" data-i="${i}">
        <span class="wi-word">${q.word}</span>
        <span class="wi-right">
          <span class="wi-status">${statusIcon}</span>
          <span class="wi-chevron">▼</span>
        </span>
      </div>
      <div class="word-item-body" id="wib-${i}">
        <div class="wi-inner">
          <p class="wi-def"><strong>Definition:</strong> ${q.definition}</p>
          <p class="wi-ex">"${q.example}"</p>
        </div>
      </div>
    `;

    const header = item.querySelector('.word-item-header');
    const body   = item.querySelector('.word-item-body');

    header.addEventListener('click', () => {
      const open = body.classList.toggle('expanded');
      header.classList.toggle('open', open);
    });

    accordion.appendChild(item);
  });
}

// ── utilities ──────────────────────────────────────────────────────────────
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
