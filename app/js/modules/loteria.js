/**
 * Module 5: Lotería Matemática (Interactive Math Bingo)
 * Fast mental math game featuring all 4 operations: Addition, Subtraction, Multiplication, and Division!
 */

const LoteriaModule = {
  cardGrid: [],
  currentCard: null,
  markedCells: new Set(),
  equationsDeck: [],
  deckIndex: 0,
  currentOpFilter: 'all', // 'all', 'add', 'sub', 'mul', 'div'

  init() {
    this.render();
    this.startNewGame();
  },

  render() {
    const container = document.getElementById('module-workspace');
    if (!container) return;

    container.innerHTML = `
      <div class="quest-card animate-fade-in">
        <div class="quest-header">
          <div class="quest-tag">🃏 ${t('loteriaHeader')}</div>
          <button class="audio-btn" id="loteria-speak-btn" title="${t('audioRead')}">
            🔊 <span class="audio-btn-label">${t('audioRead')}</span>
          </button>
        </div>

        <!-- Operation Filter Bar -->
        <div class="loteria-op-filter-bar">
          <button class="btn-op-filter ${this.currentOpFilter === 'all' ? 'active' : ''}" onclick="LoteriaModule.setOpFilter('all', this)">
            ${t('opAll')}
          </button>
          <button class="btn-op-filter ${this.currentOpFilter === 'add' ? 'active' : ''}" onclick="LoteriaModule.setOpFilter('add', this)">
            ${t('opAdd')}
          </button>
          <button class="btn-op-filter ${this.currentOpFilter === 'sub' ? 'active' : ''}" onclick="LoteriaModule.setOpFilter('sub', this)">
            ${t('opSub')}
          </button>
          <button class="btn-op-filter ${this.currentOpFilter === 'mul' ? 'active' : ''}" onclick="LoteriaModule.setOpFilter('mul', this)">
            ${t('opMul')}
          </button>
          <button class="btn-op-filter ${this.currentOpFilter === 'div' ? 'active' : ''}" onclick="LoteriaModule.setOpFilter('div', this)">
            ${t('opDiv')}
          </button>
        </div>

        <div class="loteria-game-layout">
          <!-- Caller (El Cantor) Card -->
          <div class="loteria-caller-box">
            <div class="caller-label">${t('loteriaCaller')}</div>
            <div class="caller-card animate-pop" id="loteria-caller-card">
              <div class="caller-tag">${t('callerTag')}</div>
              <div class="caller-equation" id="caller-equation">4 × 5</div>
              <div class="caller-hint" id="caller-hint">= ?</div>
            </div>
            <button class="btn btn-secondary btn-sm mt-2" onclick="LoteriaModule.drawNextCard()">
              ${t('nextCard')}
            </button>
          </div>

          <!-- 4x4 Player Card (Tabla) -->
          <div class="loteria-player-board">
            <div class="board-header">
              <span>${t('yourBingoCard')}</span>
              <button class="btn btn-sm btn-outline" onclick="LoteriaModule.startNewGame()">
                🔄 ${t('newCard')}
              </button>
            </div>

            <div class="loteria-grid" id="loteria-grid-container">
              <!-- 4x4 Grid rendered here -->
            </div>

            <div class="loteria-actions">
              <button class="btn btn-primary btn-buenas animate-pulse" id="btn-shout-buenas" onclick="LoteriaModule.shoutBuenas()">
                🎉 ${t('shoutBuenas')}!
              </button>
            </div>
          </div>
        </div>

        <div class="feedback-box hidden" id="loteria-feedback"></div>
      </div>
    `;

    document.getElementById('loteria-speak-btn').addEventListener('click', () => {
      if (this.currentCard) {
        audio.speakText(this.currentCard.spokenText, currentLang, false);
      }
    });
  },

  setOpFilter(op, btnEl) {
    this.currentOpFilter = op;
    document.querySelectorAll('.btn-op-filter').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    this.startNewGame();
  },

  startNewGame() {
    this.markedCells.clear();
    this.generateBoardAndDeck();
    this.renderBoard();
    this.drawNextCard();
  },

  generateBoardAndDeck() {
    const addPool = [];
    const subPool = [];
    const mulPool = [];
    const divPool = [];

    // 1. Addition Pool (+)
    for (let i = 5; i <= 25; i += 2) {
      for (let j = 4; j <= 20; j += 3) {
        addPool.push({ eq: `${i} + ${j}`, val: i + j, op: 'add' });
      }
    }

    // 2. Subtraction Pool (−)
    for (let i = 15; i <= 50; i += 3) {
      for (let j = 3; j <= Math.min(i - 2, 25); j += 2) {
        subPool.push({ eq: `${i} − ${j}`, val: i - j, op: 'sub' });
      }
    }

    // 3. Multiplication Pool (×)
    for (let i = 2; i <= 9; i++) {
      for (let j = 2; j <= 9; j++) {
        mulPool.push({ eq: `${i} × ${j}`, val: i * j, op: 'mul' });
      }
    }

    // 4. Division Pool (÷)
    for (let divisor = 2; divisor <= 9; divisor++) {
      for (let quotient = 2; quotient <= 10; quotient++) {
        const dividend = divisor * quotient;
        divPool.push({ eq: `${dividend} ÷ ${divisor}`, val: quotient, op: 'div' });
      }
    }

    let candidatePool = [];

    if (this.currentOpFilter === 'add') candidatePool = addPool;
    else if (this.currentOpFilter === 'sub') candidatePool = subPool;
    else if (this.currentOpFilter === 'mul') candidatePool = mulPool;
    else if (this.currentOpFilter === 'div') candidatePool = divPool;
    else {
      // 'all': Mix all 4 operations evenly
      const sAdd = addPool.sort(() => 0.5 - Math.random());
      const sSub = subPool.sort(() => 0.5 - Math.random());
      const sMul = mulPool.sort(() => 0.5 - Math.random());
      const sDiv = divPool.sort(() => 0.5 - Math.random());

      candidatePool = [
        ...sAdd.slice(0, 10),
        ...sSub.slice(0, 10),
        ...sMul.slice(0, 10),
        ...sDiv.slice(0, 10)
      ].sort(() => 0.5 - Math.random());
    }

    // Select 16 unique value cards for the player board
    const shuffled = candidatePool.sort(() => 0.5 - Math.random());
    const uniqueValues = new Map();

    for (const item of shuffled) {
      if (!uniqueValues.has(item.val)) {
        uniqueValues.set(item.val, item);
      }
      if (uniqueValues.size >= 16) break;
    }

    this.cardGrid = Array.from(uniqueValues.values()).slice(0, 16);
    this.equationsDeck = [...this.cardGrid].sort(() => 0.5 - Math.random());
    this.deckIndex = -1;
  },

  renderBoard() {
    const grid = document.getElementById('loteria-grid-container');
    if (!grid) return;

    grid.innerHTML = this.cardGrid.map((item, index) => `
      <div class="loteria-cell ${this.markedCells.has(index) ? 'marked' : ''}" 
           id="loteria-cell-${index}" 
           onclick="LoteriaModule.stampCell(${index})">
        <span class="cell-number">${item.val}</span>
        <div class="cell-frijolito ${this.markedCells.has(index) ? '' : 'hidden'}" id="frijol-${index}">🫘</div>
      </div>
    `).join('');
  },

  drawNextCard() {
    this.deckIndex = (this.deckIndex + 1) % this.equationsDeck.length;
    this.currentCard = this.equationsDeck[this.deckIndex];

    const callerEq = document.getElementById('caller-equation');
    const callerHint = document.getElementById('caller-hint');

    if (callerEq) callerEq.textContent = this.currentCard.eq;
    if (callerHint) callerHint.textContent = `= ?`;

    // Format spoken phrase for all 4 arithmetic operations
    let spokenEq = this.currentCard.eq;
    if (currentLang === 'es') {
      spokenEq = spokenEq
        .replace('+', 'más')
        .replace('−', 'menos')
        .replace('-', 'menos')
        .replace('×', 'por')
        .replace('÷', 'entre');
      this.currentCard.spokenText = `¡La carta es: ${spokenEq}!`;
    } else {
      spokenEq = spokenEq
        .replace('+', 'plus')
        .replace('−', 'minus')
        .replace('-', 'minus')
        .replace('×', 'times')
        .replace('÷', 'divided by');
      this.currentCard.spokenText = `The card is: ${spokenEq}!`;
    }

    audio.playPop();
    setTimeout(() => {
      audio.speakText(this.currentCard.spokenText, currentLang, true);
    }, 200);
  },

  stampCell(index) {
    if (!this.currentCard) return;
    const cellData = this.cardGrid[index];
    const cellEl = document.getElementById(`loteria-cell-${index}`);
    const frijolEl = document.getElementById(`frijol-${index}`);

    if (cellData.val === this.currentCard.val) {
      // Correct match
      audio.playSuccess();
      this.markedCells.add(index);
      if (cellEl) cellEl.classList.add('marked');
      if (frijolEl) frijolEl.classList.remove('hidden');

      // Auto draw next card
      setTimeout(() => {
        this.drawNextCard();
      }, 700);
    } else {
      audio.playGentleHint();
      if (cellEl) {
        cellEl.classList.add('animate-shake');
        setTimeout(() => cellEl.classList.remove('animate-shake'), 400);
      }
    }
  },

  shoutBuenas() {
    const feedback = document.getElementById('loteria-feedback');
    if (this.markedCells.size >= 4) {
      audio.playCelebration();
      stateManager.addPoints(25, 'loteria');

      feedback.className = 'feedback-box feedback-success animate-pop';
      feedback.innerHTML = `
        <div class="feedback-title">${t('buenasWinTitle')}</div>
        <div class="feedback-sub">${t('buenasWinSub')}</div>
        <button class="btn btn-primary btn-next mt-2" onclick="LoteriaModule.startNewGame()">
          ${t('playAnother')}
        </button>
      `;

      audio.speakText(currentLang === 'es' ? '¡Buenas! ¡Felicidades, ganaste la Lotería!' : 'Bingo! Congratulations, you won Lotería!', currentLang, false);
    } else {
      audio.playGentleHint();
      feedback.className = 'feedback-box feedback-hint animate-shake';
      feedback.innerHTML = `
        <div class="feedback-title">💡 ${t('keepPlaying')}</div>
        <div class="feedback-sub">${t('buenasNeedMore')}</div>
      `;
    }
  }
};
