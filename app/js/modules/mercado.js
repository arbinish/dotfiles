/**
 * Module 3: El Mercado & Tiendita (Grades 2–3)
 * Real-world money math: Adding item costs, counting bills & coins, and making change.
 */

const MercadoModule = {
  currentProblem: null,
  userSelectedChange: 0,

  itemsCatalog: [
    { name: 'Aguacate (Avocado)', icon: '🥑', price: 2 },
    { name: 'Pan Dulce (Sweet Bread)', icon: '🥐', price: 1 },
    { name: 'Leche (Milk)', icon: '🥛', price: 3 },
    { name: 'Queso Fresco (Cheese)', icon: '🧀', price: 4 },
    { name: 'Mangos Dulces', icon: '🥭', price: 2 },
    { name: 'Chocolate Caliente', icon: '☕', price: 3 }
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
          <div class="quest-tag">🛒 ${t('mercadoTitle')}</div>
          <button class="audio-btn" id="mercado-speak-btn" title="${t('audioRead')}">
            🔊 <span class="audio-btn-label">${t('audioRead')}</span>
          </button>
        </div>

        <div class="story-prompt" id="mercado-prompt-text">
          <!-- Story prompt injected dynamically -->
        </div>

        <!-- Tiendita Receipt / Cash Register -->
        <div class="cash-register-panel">
          <div class="receipt-card">
            <div class="receipt-header">${t('tienditaHeader')}</div>
            <div class="receipt-items" id="receipt-items-list"></div>
            <div class="receipt-divider"></div>
            <div class="receipt-row">
              <span>${t('totalCost')}</span>
              <strong id="receipt-total-display">$0</strong>
            </div>
            <div class="receipt-row text-muted">
              <span>${t('paidAmount')}</span>
              <span id="receipt-paid-display">$0</span>
            </div>
          </div>

          <!-- Interactive Coin / Bill Tray -->
          <div class="money-tray-zone">
            <div class="money-tray-title">💵 ${t('dragMoneyInstruction')}</div>
            
            <div class="money-bank">
              <button class="bill-btn" onclick="MercadoModule.addCash(1)">💵 $1</button>
              <button class="bill-btn" onclick="MercadoModule.addCash(5)">💵 $5</button>
              <button class="bill-btn" onclick="MercadoModule.addCash(10)">💵 $10</button>
              <button class="bill-btn" onclick="MercadoModule.addCash(20)">💵 $20</button>
            </div>

            <div class="change-counter-box">
              <span>${t('yourChange')}</span>
              <span class="change-amount" id="user-change-display">$0</span>
              <button class="btn btn-secondary btn-sm" onclick="MercadoModule.resetCash()">🧹 ${t('clearCash')}</button>
            </div>
          </div>
        </div>

        <!-- Submit / Check Answer -->
        <div class="answer-interaction-zone">
          <div class="options-pill-grid" id="mercado-options">
            <!-- Fast choices -->
          </div>

          <div class="feedback-box hidden" id="mercado-feedback"></div>
        </div>
      </div>
    `;

    document.getElementById('mercado-speak-btn').addEventListener('click', () => {
      if (this.currentProblem) {
        audio.speakText(this.currentProblem.spokenText, currentLang, false);
      }
    });
  },

  generateProblem() {
    this.userSelectedChange = 0;
    
    // Pick 2 random grocery items
    const item1 = this.itemsCatalog[Math.floor(Math.random() * this.itemsCatalog.length)];
    let item2 = this.itemsCatalog[Math.floor(Math.random() * this.itemsCatalog.length)];
    while (item2 === item1) {
      item2 = this.itemsCatalog[Math.floor(Math.random() * this.itemsCatalog.length)];
    }

    const total = item1.price + item2.price;
    // Choose bill paid: $10 or $20
    const paidBills = total <= 8 ? [10, 20] : [10, 20];
    const paid = paidBills[Math.floor(Math.random() * paidBills.length)];
    const changeDue = paid - total;

    const promptText = t('mercadoPrompt', { total, paid });
    const spokenText = currentLang === 'es'
      ? `Tu cuenta en la tiendita es de ${total} dólares. Pagas con un billete de ${paid}. ¿Cuánto cambio debes recibir?`
      : `Your grocery total is ${total} dollars. You pay with a ${paid} dollar bill. How much change should you get back?`;

    this.currentProblem = { item1, item2, total, paid, changeDue, promptText, spokenText };

    document.getElementById('mercado-prompt-text').innerHTML = promptText;
    document.getElementById('receipt-items-list').innerHTML = `
      <div class="receipt-item-row">
        <span>${item1.icon} ${item1.name.split('(')[0]}</span>
        <span>$${item1.price}</span>
      </div>
      <div class="receipt-item-row">
        <span>${item2.icon} ${item2.name.split('(')[0]}</span>
        <span>$${item2.price}</span>
      </div>
    `;
    document.getElementById('receipt-total-display').textContent = `$${total}`;
    document.getElementById('receipt-paid-display').textContent = `$${paid}`;
    document.getElementById('user-change-display').textContent = `$0`;

    this.renderOptions(changeDue);

    const feedback = document.getElementById('mercado-feedback');
    feedback.className = 'feedback-box hidden';
    feedback.innerHTML = '';

    setTimeout(() => {
      audio.speakText(spokenText, currentLang, true);
    }, 400);
  },

  addCash(amount) {
    audio.playCoin();
    this.userSelectedChange += amount;
    const display = document.getElementById('user-change-display');
    if (display) display.textContent = `$${this.userSelectedChange}`;

    if (this.currentProblem && this.userSelectedChange === this.currentProblem.changeDue) {
      this.checkAnswer(this.userSelectedChange);
    }
  },

  resetCash() {
    audio.playPop();
    this.userSelectedChange = 0;
    const display = document.getElementById('user-change-display');
    if (display) display.textContent = `$0`;
  },

  renderOptions(correctAnswer) {
    const optionsContainer = document.getElementById('mercado-options');
    if (!optionsContainer) return;

    const answersSet = new Set([correctAnswer]);
    while (answersSet.size < 4) {
      const fake = Math.max(1, correctAnswer + (Math.floor(Math.random() * 7) - 3));
      answersSet.add(fake);
    }

    const options = Array.from(answersSet).sort((a, b) => a - b);
    optionsContainer.innerHTML = options.map(opt => `
      <button class="btn btn-option-choice" onclick="MercadoModule.checkAnswer(${opt})">
        💵 $${opt}
      </button>
    `).join('');
  },

  checkAnswer(selected) {
    if (!this.currentProblem) return;
    const feedback = document.getElementById('mercado-feedback');

    if (selected === this.currentProblem.changeDue) {
      audio.playSuccess();
      stateManager.addPoints(10, 'mercado');

      feedback.className = 'feedback-box feedback-success animate-pop';
      feedback.innerHTML = `
        <div class="feedback-title">💰 ${t('excellent')}</div>
        <div class="feedback-sub">$${this.currentProblem.paid} − $${this.currentProblem.total} = $${selected} ${currentLang === 'es' ? 'de cambio' : 'change'}</div>
        <button class="btn btn-primary btn-next" onclick="MercadoModule.generateProblem()">
          ${t('nextProblem')}
        </button>
      `;

      audio.speakText(t('excellent'), currentLang, false);
    } else {
      audio.playGentleHint();
      feedback.className = 'feedback-box feedback-hint animate-shake';
      feedback.innerHTML = `
        <div class="feedback-title">💡 ${t('keepGoing')}</div>
        <div class="feedback-sub">${currentLang === 'es' ? `Resta el total ($${this.currentProblem.total}) del billete pagado ($${this.currentProblem.paid}).` : `Subtract the total ($${this.currentProblem.total}) from the bill ($${this.currentProblem.paid}).`}</div>
      `;
    }
  }
};
