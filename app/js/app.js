/**
 * AvanzaMath - Main Application Controller
 * Handles routing, module loading, mascot tips, and event bindings.
 */

const App = {
  currentView: 'welcome', // 'welcome', 'quests', 'fruitStand', 'panaderia', 'mercado', 'pinata', 'loteria', 'family'

  init() {
    initLanguage();
    stateManager.updateHeaderUI();
    this.bindEvents();
    this.updateStaticLabels();

    // Check if opened via a shared family progress link
    const params = new URLSearchParams(window.location.search);
    if (params.get('report') || params.get('passport') || params.get('student')) {
      this.navigateTo('family');
    } else {
      this.navigateTo('welcome');
    }

    this.registerServiceWorker();
    this.updateMascotTip();
  },

  bindEvents() {
    // Auto-Read Aloud Toggle
    const autoReadBtn = document.getElementById('btn-toggle-autoread');
    if (autoReadBtn) {
      autoReadBtn.addEventListener('click', () => {
        const enabled = audio.toggleAutoRead();
        this.updateAutoReadButtonUI(enabled);
      });
      this.updateAutoReadButtonUI(audio.autoReadEnabled);
    }

    // Bilingual Segmented Language Switcher
    document.querySelectorAll('.lang-segment-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedLang = e.currentTarget.dataset.lang;
        if (selectedLang && selectedLang !== currentLang) {
          setLanguage(selectedLang);
        }
      });
    });

    // Sound Toggle
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const enabled = audio.toggleSound();
        soundBtn.textContent = enabled ? t('soundFXOn') : t('soundFXOff');
      });
    }

    // Back to Menu button
    const backBtn = document.getElementById('btn-back-menu');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.navigateTo('quests');
      });
    }

    // Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        if (view) this.navigateTo(view);
      });
    });
  },

  navigateTo(view) {
    this.currentView = view;
    const welcomeView = document.getElementById('welcome-view');
    const homeHubView = document.getElementById('home-hub-view');
    const moduleWorkspace = document.getElementById('module-workspace-view');
    const backBtn = document.getElementById('btn-back-menu');

    // Update active tab styling
    document.querySelectorAll('.nav-tab-btn').forEach(tab => {
      const tabView = tab.dataset.view;
      if (
        (view === 'welcome' && tabView === 'welcome') ||
        (view === 'quests' && tabView === 'quests') ||
        (['fruitStand', 'panaderia', 'mercado', 'pinata'].includes(view) && tabView === 'quests') ||
        (view === 'loteria' && tabView === 'loteria') ||
        (view === 'family' && tabView === 'family')
      ) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    if (view === 'welcome') {
      if (welcomeView) welcomeView.classList.remove('hidden');
      if (homeHubView) homeHubView.classList.add('hidden');
      if (moduleWorkspace) moduleWorkspace.classList.add('hidden');
      if (backBtn) backBtn.classList.add('hidden');
      WelcomeModule.init();
      this.updateMascotTip();
    } else if (view === 'quests') {
      if (welcomeView) welcomeView.classList.add('hidden');
      if (homeHubView) homeHubView.classList.remove('hidden');
      if (moduleWorkspace) moduleWorkspace.classList.add('hidden');
      if (backBtn) backBtn.classList.add('hidden');
      this.renderQuestsHub();
      this.updateMascotTip();
    } else {
      if (welcomeView) welcomeView.classList.add('hidden');
      if (homeHubView) homeHubView.classList.add('hidden');
      if (moduleWorkspace) moduleWorkspace.classList.remove('hidden');

      // Only show back button for nested quest mini-games
      const isNestedQuest = ['fruitStand', 'panaderia', 'mercado', 'pinata'].includes(view);
      if (backBtn) {
        if (isNestedQuest) backBtn.classList.remove('hidden');
        else backBtn.classList.add('hidden');
      }

      if (view === 'fruitStand') FruitStandModule.init();
      else if (view === 'panaderia') PanaderiaModule.init();
      else if (view === 'mercado') MercadoModule.init();
      else if (view === 'pinata') PinataModule.init();
      else if (view === 'loteria') LoteriaModule.init();
      else if (view === 'family') FamilyPortalModule.init();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderQuestsHub() {
    const grid = document.getElementById('modules-grid');
    if (!grid) return;

    grid.innerHTML = `
      <!-- Nivel 1: Fruit Stand -->
      <div class="module-card card-fruit animate-pop" onclick="App.navigateTo('fruitStand')">
        <div class="module-card-icon">🍎</div>
        <div class="module-badge badge-k1">${t('fruitSubtitle')}</div>
        <h3 class="module-card-title">${t('fruitTitle')}</h3>
        <p class="module-card-desc">${t('fruitDesc')}</p>
        <div class="module-card-footer">
          <span>${t('fruitAction')}</span>
          <span class="arrow-indicator">➔</span>
        </div>
      </div>

      <!-- Nivel 2: Panadería -->
      <div class="module-card card-panaderia animate-pop" style="animation-delay: 50ms;" onclick="App.navigateTo('panaderia')">
        <div class="module-card-icon">🥖</div>
        <div class="module-badge badge-23">${t('panaderiaSubtitle')}</div>
        <h3 class="module-card-title">${t('panaderiaTitle')}</h3>
        <p class="module-card-desc">${t('panaderiaDesc')}</p>
        <div class="module-card-footer">
          <span>${t('panaderiaAction')}</span>
          <span class="arrow-indicator">➔</span>
        </div>
      </div>

      <!-- Nivel 2: Mercado -->
      <div class="module-card card-mercado animate-pop" style="animation-delay: 100ms;" onclick="App.navigateTo('mercado')">
        <div class="module-card-icon">🛒</div>
        <div class="module-badge badge-23">${t('mercadoSubtitle')}</div>
        <h3 class="module-card-title">${t('mercadoTitle')}</h3>
        <p class="module-card-desc">${t('mercadoDesc')}</p>
        <div class="module-card-footer">
          <span>${t('mercadoAction')}</span>
          <span class="arrow-indicator">➔</span>
        </div>
      </div>

      <!-- Nivel 3: Piñata -->
      <div class="module-card card-pinata animate-pop" style="animation-delay: 150ms;" onclick="App.navigateTo('pinata')">
        <div class="module-card-icon">🪅</div>
        <div class="module-badge badge-45">${t('pinataSubtitle')}</div>
        <h3 class="module-card-title">${t('pinataTitle')}</h3>
        <p class="module-card-desc">${t('pinataDesc')}</p>
        <div class="module-card-footer">
          <span>${t('pinataAction')}</span>
          <span class="arrow-indicator">➔</span>
        </div>
      </div>

      <!-- Game: Lotería -->
      <div class="module-card card-loteria animate-pop" style="animation-delay: 200ms;" onclick="App.navigateTo('loteria')">
        <div class="module-card-icon">🃏</div>
        <div class="module-badge badge-game">${t('loteriaSubtitle')}</div>
        <h3 class="module-card-title">${t('loteriaTitle')}</h3>
        <p class="module-card-desc">${t('loteriaDesc')}</p>
        <div class="module-card-footer">
          <span>${t('loteriaAction')}</span>
          <span class="arrow-indicator">➔</span>
        </div>
      </div>

      <!-- Family Portal -->
      <div class="module-card card-family animate-pop" style="animation-delay: 250ms;" onclick="App.navigateTo('family')">
        <div class="module-card-icon">🏡</div>
        <div class="module-badge badge-family">${t('familySubtitle')}</div>
        <h3 class="module-card-title">${t('familyTitle')}</h3>
        <p class="module-card-desc">${t('familyDesc')}</p>
        <div class="module-card-footer">
          <span>${t('familyAction')}</span>
          <span class="arrow-indicator">➔</span>
        </div>
      </div>
    `;
  },

  updateMascotTip() {
    const speechEl = document.getElementById('mascot-speech-text');
    const nameEl = document.querySelector('.mascot-name');
    const avatarEl = document.querySelector('.mascot-avatar');
    const companion = (window.stateManager && stateManager.getCompanionInfo)
      ? stateManager.getCompanionInfo()
      : { icon: '🐦', name: 'Tito el Colibrí' };

    if (avatarEl) avatarEl.textContent = companion.icon;
    if (nameEl) nameEl.textContent = `${companion.icon} ${companion.name}`;
    if (!speechEl) return;

    const tips = [
      t('mascotTip1'),
      t('mascotTip2'),
      t('mascotTip3'),
      t('mascotTip4')
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    speechEl.textContent = randomTip;
  },

  updateView() {
    this.updateStaticLabels();
    this.updateMascotTip();
    if (this.currentView === 'welcome') {
      WelcomeModule.render();
    } else if (this.currentView === 'quests') {
      this.renderQuestsHub();
    } else {
      this.navigateTo(this.currentView);
    }
  },

  updateAutoReadButtonUI(enabled = audio.autoReadEnabled) {
    const autoReadBtn = document.getElementById('btn-toggle-autoread');
    if (autoReadBtn) {
      autoReadBtn.textContent = enabled ? t('autoReadOn') : t('autoReadOff');
      autoReadBtn.classList.toggle('active-toggle', enabled);
    }
  },

  updateStaticLabels() {
    this.updateAutoReadButtonUI();
    stateManager.updateHeaderUI();

    // Update segmented language buttons active class
    const esBtn = document.getElementById('lang-btn-es');
    const enBtn = document.getElementById('lang-btn-en');
    if (esBtn) esBtn.classList.toggle('active', currentLang === 'es');
    if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');

    // Update sound button UI
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.textContent = audio.soundEnabled ? t('soundFXOn') : t('soundFXOff');
    }

    const backBtn = document.getElementById('btn-back-menu');
    if (backBtn) backBtn.innerHTML = `<span>${t('backToMenu')}</span>`;

    const tabWelcome = document.getElementById('tab-label-welcome');
    const tabModules = document.getElementById('tab-label-modules');
    const tabLoteria = document.getElementById('tab-label-loteria');
    const tabFamily = document.getElementById('tab-label-family');

    if (tabWelcome) tabWelcome.textContent = t('tabWelcome');
    if (tabModules) tabModules.textContent = t('tabModules');
    if (tabLoteria) tabLoteria.textContent = t('tabLoteria');
    if (tabFamily) tabFamily.textContent = t('tabFamily');
  },

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
          console.log('AvanzaMath ServiceWorker registered successfully:', reg.scope);
        }).catch((err) => {
          console.log('AvanzaMath ServiceWorker registration failed:', err);
        });
      });
    }
  }
};

function updatePageLanguage() {
  App.updateView();
}

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
