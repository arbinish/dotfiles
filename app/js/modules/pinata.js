/**
 * Module 4: La Piñata de Fiesta (Grades 4–5)
 * Division & Fair Sharing: Splitting candies equally into party bags (*bolsitas*).
 */

const PinataModule = {
  currentProblem: null,

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
          <div class="quest-tag">🪅 ${t('pinataTitle')}</div>
          <button class="audio-btn" id="pinata-speak-btn" title="${t('audioRead')}">
            🔊 <span class="audio-btn-label">${t('audioRead')}</span>
          </button>
        </div>

        <div class="story-prompt" id="pinata-prompt-text">
          <!-- Story prompt injected dynamically -->
        </div>

        <!-- Visual Piñata & Candy Distribution Zone -->
        <div class="pinata-display-zone">
          <div class="pinata-mascot-box animate-float">
            <span class="pinata-icon">🪅</span>
            <div class="pinata-candy-shower" id="pinata-candy-shower">
              <!-- Candies -->
            </div>
          </div>

          <div class="party-bags-row" id="party-bags-container">
            <!-- Bolsitas rendered dynamically -->
          </div>
        </div>

        <!-- Answer Interaction Zone -->
        <div class="answer-interaction-zone">
          <div class="equation-display" id="pinata-equation-display">
            <!-- e.g. 24 ÷ 4 = ? -->
          </div>

          <div class="options-pill-grid" id="pinata-options">
            <!-- Choices -->
          </div>

          <div class="feedback-box hidden" id="pinata-feedback"></div>
        </div>
      </div>
    `;

    document.getElementById('pinata-speak-btn').addEventListener('click', () => {
      if (this.currentProblem) {
        audio.speakText(this.currentProblem.spokenText, currentLang, false);
      }
    });
  },

  generateProblem() {
    const friends = Math.floor(Math.random() * 4) + 3; // 3 to 6 bags/friends
    const perBag = Math.floor(Math.random() * 5) + 3;  // 3 to 7 candies per bag
    const total = friends * perBag;

    const promptText = t('pinataPrompt', {
      total: `<strong>${total}</strong>`,
      friends: `<strong>${friends}</strong>`
    });

    const spokenText = currentLang === 'es'
      ? `¡Se rompió la piñata con ${total} dulces! Repártelos en partes iguales entre ${friends} bolsitas de fiesta. ¿Cuántos dulces tocan por bolsita?`
      : `The piñata broke open with ${total} candies! Divide them equally among ${friends} party favor bags. How many candies go in each bag?`;

    this.currentProblem = { total, friends, perBag, promptText, spokenText };

    document.getElementById('pinata-prompt-text').innerHTML = promptText;
    document.getElementById('pinata-equation-display').innerHTML = `
      <span>${total}</span>
      <span class="math-operator">÷</span>
      <span>${friends}</span>
      <span class="math-operator">=</span>
      <span class="answer-box-blank">?</span>
    `;

    // Render Candy shower
    const shower = document.getElementById('pinata-candy-shower');
    const candyIcons = ['🍬', '🍭', '🍫', '🍬', '🍭'];
    shower.innerHTML = Array.from({ length: Math.min(total, 12) }, (_, i) => `
      <span class="candy-sparkle animate-pop" style="animation-delay: ${i * 40}ms">
        ${candyIcons[i % candyIcons.length]}
      </span>
    `).join('');

    // Render Bolsitas
    const bagsContainer = document.getElementById('party-bags-container');
    bagsContainer.innerHTML = Array.from({ length: friends }, (_, i) => `
      <div class="party-bag-slot">
        <span class="bag-icon">🛍️</span>
        <span class="bag-label">${t('partyBagLabel')} ${i + 1}</span>
      </div>
    `).join('');

    this.renderOptions(perBag);

    const feedback = document.getElementById('pinata-feedback');
    feedback.className = 'feedback-box hidden';
    feedback.innerHTML = '';

    setTimeout(() => {
      audio.speakText(spokenText, currentLang, true);
    }, 400);
  },

  renderOptions(correctAnswer) {
    const optionsContainer = document.getElementById('pinata-options');
    if (!optionsContainer) return;

    const answersSet = new Set([correctAnswer]);
    while (answersSet.size < 4) {
      const fake = Math.max(1, correctAnswer + (Math.floor(Math.random() * 5) - 2));
      answersSet.add(fake);
    }

    const options = Array.from(answersSet).sort((a, b) => a - b);
    optionsContainer.innerHTML = options.map(opt => `
      <button class="btn btn-option-choice" onclick="PinataModule.checkAnswer(${opt})">
        🍬 ${opt} ${currentLang === 'es' ? 'dulces' : 'candies'}
      </button>
    `).join('');
  },

  checkAnswer(selected) {
    if (!this.currentProblem) return;
    const feedback = document.getElementById('pinata-feedback');
    const equationDisplay = document.getElementById('pinata-equation-display');

    if (selected === this.currentProblem.perBag) {
      audio.playSuccess();
      stateManager.addPoints(10, 'pinata');

      equationDisplay.innerHTML = `
        <span>${this.currentProblem.total}</span>
        <span class="math-operator">÷</span>
        <span>${this.currentProblem.friends}</span>
        <span class="math-operator">=</span>
        <span class="answer-box-correct">${selected}</span>
      `;

      feedback.className = 'feedback-box feedback-success animate-pop';
      feedback.innerHTML = `
        <div class="feedback-title">🪅 ${t('awesome')}</div>
        <div class="feedback-sub">${t('pinataEquation', { total: this.currentProblem.total, friends: this.currentProblem.friends, perBag: selected })}</div>
        <button class="btn btn-primary btn-next" onclick="PinataModule.generateProblem()">
          ${t('nextProblem')}
        </button>
      `;

      audio.speakText(t('awesome'), currentLang, false);
    } else {
      audio.playGentleHint();
      feedback.className = 'feedback-box feedback-hint animate-shake';
      feedback.innerHTML = `
        <div class="feedback-title">💡 ${t('keepGoing')}</div>
        <div class="feedback-sub">${currentLang === 'es' ? `Piensa qué número multiplicado por ${this.currentProblem.friends} te da ${this.currentProblem.total}.` : `Think: what number multiplied by ${this.currentProblem.friends} gives ${this.currentProblem.total}?`}</div>
      `;
    }
  }
};
