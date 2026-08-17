/**
 * Module 2: La Panadería de Don Carlos (Grades 2–3)
 * Visual Multiplication Arrays with fresh conchas & empanadas in baking trays.
 */

const PanaderiaModule = {
  currentProblem: null,
  selectedFlavor: 'rosa', // rosa, chocolate, vainilla

  flavors: {
    rosa: { icon: '🌸', name: 'Concha Rosa', color: '#F472B6' },
    chocolate: { icon: '🍫', name: 'Concha Chocolate', color: '#92400E' },
    vainilla: { icon: '🧁', name: 'Concha Vainilla', color: '#FDE68A' }
  },

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
          <div class="quest-tag">🥖 ${t('panaderiaTitle')}</div>
          <button class="audio-btn" id="panaderia-speak-btn" title="${t('audioRead')}">
            🔊 <span class="audio-btn-label">${t('audioRead')}</span>
          </button>
        </div>

        <div class="story-prompt" id="panaderia-prompt-text">
          <!-- Story prompt injected dynamically -->
        </div>

        <!-- Flavor Selector -->
        <div class="flavor-selector-bar">
          <span class="flavor-label">${t('conchaFlavor')}</span>
          <button class="btn-flavor active" onclick="PanaderiaModule.setFlavor('rosa', this)">🌸 ${t('conchaPink')}</button>
          <button class="btn-flavor" onclick="PanaderiaModule.setFlavor('chocolate', this)">🍫 ${t('conchaChoc')}</button>
          <button class="btn-flavor" onclick="PanaderiaModule.setFlavor('vainilla', this)">🧁 ${t('conchaVanilla')}</button>
        </div>

        <!-- Baking Tray Array Visualizer -->
        <div class="baking-tray-container">
          <div class="baking-tray-header">
            <span>${t('bakingTrayTitle')}</span>
            <span class="array-tag" id="array-tag-display">3 × 4</span>
          </div>

          <div class="baking-tray" id="baking-tray-grid">
            <!-- Conchas grid rendered here -->
          </div>
        </div>

        <!-- Answer Options / Numpad -->
        <div class="answer-interaction-zone">
          <div class="equation-display" id="panaderia-equation-display">
            <!-- e.g. 3 × 4 = ? -->
          </div>

          <div class="options-pill-grid" id="panaderia-options">
            <!-- Multiple choice / numpad buttons -->
          </div>

          <div class="feedback-box hidden" id="panaderia-feedback"></div>
        </div>
      </div>
    `;

    document.getElementById('panaderia-speak-btn').addEventListener('click', () => {
      if (this.currentProblem) {
        audio.speakText(this.currentProblem.spokenText, currentLang, false);
      }
    });
  },

  setFlavor(flavor, btnEl) {
    this.selectedFlavor = flavor;
    document.querySelectorAll('.btn-flavor').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    if (this.currentProblem) {
      this.renderTray(this.currentProblem.rows, this.currentProblem.cols);
    }
  },

  generateProblem() {
    // Generate multiplication fact between 2x2 and 6x6 for elementary learners
    const rows = Math.floor(Math.random() * 4) + 2; // 2 to 5 rows
    const cols = Math.floor(Math.random() * 5) + 2; // 2 to 6 columns
    const answer = rows * cols;

    const promptText = t('panaderiaPrompt', {
      rows: `<strong>${rows}</strong>`,
      cols: `<strong>${cols}</strong>`
    });

    const spokenText = currentLang === 'es'
      ? `Doña Elena hornea una charola con ${rows} filas y ${cols} conchas en cada fila. ¿Cuántas conchas hay en total?`
      : `Doña Elena is baking a tray with ${rows} rows and ${cols} conchas in each row. How many conchas in total?`;

    this.currentProblem = { rows, cols, answer, promptText, spokenText };

    document.getElementById('panaderia-prompt-text').innerHTML = promptText;
    document.getElementById('array-tag-display').textContent = `${rows} × ${cols}`;
    document.getElementById('panaderia-equation-display').innerHTML = `
      <span>${rows}</span>
      <span class="math-operator">×</span>
      <span>${cols}</span>
      <span class="math-operator">=</span>
      <span class="answer-box-blank">?</span>
    `;

    this.renderTray(rows, cols);
    this.renderOptions(answer);

    const feedback = document.getElementById('panaderia-feedback');
    feedback.className = 'feedback-box hidden';
    feedback.innerHTML = '';

    setTimeout(() => {
      audio.speakText(spokenText, currentLang, true);
    }, 400);
  },

  renderTray(rows, cols) {
    const grid = document.getElementById('baking-tray-grid');
    if (!grid) return;

    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const flavorData = this.flavors[this.selectedFlavor] || this.flavors.rosa;

    let html = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        html += `
          <div class="concha-slot animate-pop" style="animation-delay: ${(r * cols + c) * 30}ms">
            <span class="concha-glyph" style="text-shadow: 0 4px 8px ${flavorData.color}">${flavorData.icon}</span>
          </div>
        `;
      }
    }
    grid.innerHTML = html;
  },

  renderOptions(correctAnswer) {
    const optionsContainer = document.getElementById('panaderia-options');
    if (!optionsContainer) return;

    // Generate 4 plausible options including correct answer
    const answersSet = new Set([correctAnswer]);
    while (answersSet.size < 4) {
      const offset = (Math.floor(Math.random() * 5) - 2) * 2;
      const fake = Math.max(2, correctAnswer + (offset === 0 ? 3 : offset));
      answersSet.add(fake);
    }

    const options = Array.from(answersSet).sort((a, b) => a - b);
    optionsContainer.innerHTML = options.map(opt => `
      <button class="btn btn-option-choice" onclick="PanaderiaModule.checkAnswer(${opt})">
        ${opt}
      </button>
    `).join('');
  },

  checkAnswer(selected) {
    if (!this.currentProblem) return;
    const feedback = document.getElementById('panaderia-feedback');
    const equationDisplay = document.getElementById('panaderia-equation-display');

    if (selected === this.currentProblem.answer) {
      audio.playSuccess();
      stateManager.addPoints(10, 'panaderia');

      equationDisplay.innerHTML = `
        <span>${this.currentProblem.rows}</span>
        <span class="math-operator">×</span>
        <span>${this.currentProblem.cols}</span>
        <span class="math-operator">=</span>
        <span class="answer-box-correct">${selected}</span>
      `;

      feedback.className = 'feedback-box feedback-success animate-pop';
      feedback.innerHTML = `
        <div class="feedback-title">🍞 ${t('awesome')}</div>
        <div class="feedback-sub">${t('panaderiaEquation', { rows: this.currentProblem.rows, cols: this.currentProblem.cols, answer: selected })}</div>
        <button class="btn btn-primary btn-next" onclick="PanaderiaModule.generateProblem()">
          ${t('nextProblem')}
        </button>
      `;

      audio.speakText(t('awesome'), currentLang, false);
    } else {
      audio.playGentleHint();
      feedback.className = 'feedback-box feedback-hint animate-shake';
      feedback.innerHTML = `
        <div class="feedback-title">💡 ${t('keepGoing')}</div>
        <div class="feedback-sub">${currentLang === 'es' ? `Cuenta las filas: ${this.currentProblem.rows} filas con ${this.currentProblem.cols} conchas cada una.` : `Count the rows: ${this.currentProblem.rows} rows with ${this.currentProblem.cols} conchas each.`}</div>
      `;
    }
  }
};
