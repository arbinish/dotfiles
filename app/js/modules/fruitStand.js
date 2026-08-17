/**
 * Module 1: El Puesto de Frutas (Grades K–1)
 * Interactive Ten-Frame addition and subtraction with real matching fruit emojis (mangos, avocados, papayas, oranges).
 */

const FruitStandModule = {
  currentProblem: null,
  activeSlots: new Set(),

  fruitPairs: [
    {
      iconA: '🥭', nameEsA: 'mangos', nameEnA: 'mangos',
      iconB: '🥑', nameEsB: 'aguacates', nameEnB: 'avocados'
    },
    {
      iconA: '🍊', nameEsA: 'naranjas', nameEnA: 'oranges',
      iconB: '🍈', nameEsB: 'papayas', nameEnB: 'papayas'
    },
    {
      iconA: '🍓', nameEsA: 'fresas', nameEnA: 'strawberries',
      iconB: '🍌', nameEsB: 'plátanos', nameEnB: 'bananas'
    },
    {
      iconA: '🍉', nameEsA: 'sandías', nameEnA: 'watermelons',
      iconB: '🍋', nameEsB: 'limones', nameEnB: 'limes'
    }
  ],

  init() {
    this.render();
    this.generateProblem();
  },

  render() {
    const container = document.getElementById('module-workspace');
    if (!container) return;

    container.innerHTML = `
      <div class="quest-card animate-fade-in">
        <div class="quest-header">
          <div class="quest-tag">🍎 ${t('fruitTitle')}</div>
          <button class="audio-btn" id="fruit-speak-btn" title="${t('audioRead')}">
            🔊 <span class="audio-btn-label">${t('audioRead')}</span>
          </button>
        </div>

        <div class="story-prompt" id="fruit-prompt-text">
          <!-- Story prompt injected dynamically -->
        </div>

        <div class="manipulative-zone">
          <div class="manipulative-title" id="manipulative-title-display">
            🍎 ${t('tenFrameInstruction')}
          </div>
          
          <div class="ten-frame" id="ten-frame-grid" role="region" aria-label="Ten Frame">
            ${Array.from({ length: 10 }, (_, i) => `
              <div class="ten-frame-slot" data-index="${i}" onclick="FruitStandModule.toggleSlot(${i})">
                <span class="slot-number">${i + 1}</span>
                <div class="bean-item hidden" id="slot-fruit-${i}">🍎</div>
              </div>
            `).join('')}
          </div>

          <div class="manipulative-controls">
            <button class="btn btn-secondary btn-sm" onclick="FruitStandModule.clearTenFrame()">
              🧹 ${t('clearFruits')}
            </button>
            <span class="bean-counter-badge" id="fruit-count-display">0 / 10 🍎</span>
          </div>
        </div>

        <div class="answer-interaction-zone">
          <div class="equation-display" id="fruit-equation-display">
            <!-- e.g. 4 + 3 = ? -->
          </div>

          <div class="numpad-grid" id="fruit-numpad">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => `
              <button class="btn btn-numpad" onclick="FruitStandModule.selectAnswer(${num})">${num}</button>
            `).join('')}
          </div>

          <div class="feedback-box hidden" id="fruit-feedback"></div>
        </div>
      </div>
    `;

    document.getElementById('fruit-speak-btn').addEventListener('click', () => {
      if (this.currentProblem) {
        audio.speakText(this.currentProblem.spokenText, currentLang, false);
      }
    });
  },

  generateProblem() {
    this.activeSlots.clear();
    const isAdd = Math.random() > 0.35; // 65% addition, 35% subtraction
    const pair = this.fruitPairs[Math.floor(Math.random() * this.fruitPairs.length)];
    let a, b, answer, promptText, spokenText;

    const fruitAName = currentLang === 'es' ? pair.nameEsA : pair.nameEnA;
    const fruitBName = currentLang === 'es' ? pair.nameEsB : pair.nameEnB;

    if (isAdd) {
      a = Math.floor(Math.random() * 5) + 1; // 1 to 5
      b = Math.floor(Math.random() * (10 - a)) + 1; // ensures sum <= 10
      answer = a + b;
      promptText = t('fruitPromptAdd', {
        a: `<strong>${a}</strong>`,
        fruitA: `${pair.iconA} ${fruitAName}`,
        b: `<strong>${b}</strong>`,
        fruitB: `${pair.iconB} ${fruitBName}`
      });

      spokenText = currentLang === 'es'
        ? `Don José necesita tu ayuda. Coloca ${a} ${fruitAName} y ${b} ${fruitBName} en el mostrador. ¿Cuántas frutas hay en total?`
        : `Don José needs your help! Put ${a} ${fruitAName} and ${b} ${fruitBName} on the counter. How many fruits in total?`;
    } else {
      a = Math.floor(Math.random() * 6) + 5; // 5 to 10
      b = Math.floor(Math.random() * (a - 1)) + 1; // ensures positive result
      answer = a - b;
      promptText = t('fruitPromptSub', {
        a: `<strong>${a}</strong>`,
        fruitA: `${pair.iconA} ${fruitAName}`,
        b: `<strong>${b}</strong>`
      });

      spokenText = currentLang === 'es'
        ? `Había ${a} ${fruitAName} frescas en el puesto. Los clientes compraron ${b}. ¿Cuántas frutas quedan?`
        : `There were ${a} fresh ${fruitAName} on the stand. Customers bought ${b}. How many fruits are left?`;
    }

    this.currentProblem = { isAdd, a, b, answer, pair, promptText, spokenText };
    this.clearTenFrame();

    document.getElementById('fruit-prompt-text').innerHTML = promptText;
    document.getElementById('fruit-equation-display').innerHTML = `
      <span>${pair.iconA} ${a}</span>
      <span class="math-operator">${isAdd ? '+' : '−'}</span>
      <span>${isAdd ? pair.iconB : '🛒'} ${b}</span>
      <span class="math-operator">=</span>
      <span class="answer-box-blank">?</span>
    `;

    const feedback = document.getElementById('fruit-feedback');
    feedback.className = 'feedback-box hidden';
    feedback.innerHTML = '';

    // Pass isAuto = true to respect the auto-read toggle
    setTimeout(() => {
      audio.speakText(spokenText, currentLang, true);
    }, 400);
  },

  getSlotFruitEmoji(index) {
    if (!this.currentProblem) return '🍎';
    const { isAdd, a, pair } = this.currentProblem;
    if (isAdd) {
      // First 'a' slots get Fruit A (e.g. 🥭), remaining get Fruit B (e.g. 🥑)
      return index < a ? pair.iconA : pair.iconB;
    } else {
      // Subtraction: all slots get Fruit A (e.g. 🍈)
      return pair.iconA;
    }
  },

  toggleSlot(index) {
    audio.playPop();
    const el = document.getElementById(`slot-fruit-${index}`);
    if (!el) return;

    if (this.activeSlots.has(index)) {
      this.activeSlots.delete(index);
      el.classList.add('hidden');
    } else {
      this.activeSlots.add(index);
      el.textContent = this.getSlotFruitEmoji(index);
      el.classList.remove('hidden');
    }

    this.updateFruitCounter();
  },

  clearTenFrame() {
    this.activeSlots.clear();
    for (let i = 0; i < 10; i++) {
      const el = document.getElementById(`slot-fruit-${i}`);
      if (el) {
        el.classList.add('hidden');
        el.textContent = this.getSlotFruitEmoji(i);
      }
    }
    this.updateFruitCounter();
  },

  updateFruitCounter() {
    const count = this.activeSlots.size;
    const display = document.getElementById('fruit-count-display');
    if (!display || !this.currentProblem) return;

    const { isAdd, a, pair } = this.currentProblem;
    if (isAdd) {
      let countA = 0;
      let countB = 0;
      this.activeSlots.forEach(idx => {
        if (idx < a) countA++;
        else countB++;
      });
      display.textContent = `${countA} ${pair.iconA} + ${countB} ${pair.iconB} = ${count} 🍎`;
    } else {
      display.textContent = `${count} ${pair.iconA} / 10`;
    }
  },

  selectAnswer(selected) {
    if (!this.currentProblem) return;
    const feedback = document.getElementById('fruit-feedback');
    const equationDisplay = document.getElementById('fruit-equation-display');
    const { isAdd, a, b, answer, pair } = this.currentProblem;

    if (selected === answer) {
      audio.playSuccess();
      stateManager.addPoints(10, 'fruitStand');

      equationDisplay.innerHTML = `
        <span>${pair.iconA} ${a}</span>
        <span class="math-operator">${isAdd ? '+' : '−'}</span>
        <span>${isAdd ? pair.iconB : '🛒'} ${b}</span>
        <span class="math-operator">=</span>
        <span class="answer-box-correct">${selected}</span>
      `;

      feedback.className = 'feedback-box feedback-success animate-pop';
      feedback.innerHTML = `
        <div class="feedback-title">🎉 ${t('excellent')}</div>
        <div class="feedback-sub">${t('starsEarned')}</div>
        <button class="btn btn-primary btn-next" onclick="FruitStandModule.generateProblem()">
          ${t('nextProblem')}
        </button>
      `;

      audio.speakText(t('excellent'), currentLang, false);
    } else {
      audio.playGentleHint();
      feedback.className = 'feedback-box feedback-hint animate-shake';
      feedback.innerHTML = `
        <div class="feedback-title">💡 ${t('keepGoing')}</div>
        <div class="feedback-sub">${currentLang === 'es' ? 'Toca las casillas arriba para contar las frutas una por una.' : 'Tap the slots above to count the fruits one by one.'}</div>
      `;
    }
  }
};
