/**
 * AvanzaMath - State Management & Storage
 * Manages player profile, points, streaks, badges, and progress.
 */

class StateManager {
  constructor() {
    this.avatars = {
      colibri: { icon: '🐦', nameEs: 'Tito el Colibrí', nameEn: 'Tito the Hummingbird' },
      axolote: { icon: '🦎', nameEs: 'Sol el Axolote', nameEn: 'Sol the Axolotl' },
      mariposa: { icon: '🦋', nameEs: 'Luna la Mariposa', nameEn: 'Luna the Butterfly' },
      jaguar: { icon: '🐆', nameEs: 'Pepe el Jaguar', nameEn: 'Pepe the Jaguar' }
    };

    this.state = {
      points: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      profile: {
        name: "Mateo",
        avatarKey: "colibri",
        avatarIcon: "🐦",
        passportCode: this.generatePassportCode()
      },
      modules: {
        fruitStand: { completed: 0, score: 0 },
        panaderia: { completed: 0, score: 0 },
        mercado: { completed: 0, score: 0 },
        pinata: { completed: 0, score: 0 },
        loteria: { wins: 0, games: 0 }
      },
      unlockedBadges: ['bienvenida']
    };

    this.loadState();
    this.checkDailyStreak();
  }

  generatePassportCode() {
    const animals = [
      'Colibri', 'Axolote', 'Jaguar', 'Aguila', 'Mariposa', 'Quetzal',
      'Ocelote', 'Venado', 'Lobo', 'Cenzontle', 'Armadillo', 'Tortuga',
      'Flamenco', 'Tucan', 'Coyote', 'Iguana'
    ];
    const items = [
      'Concha', 'Mango', 'Pinata', 'Cacao', 'Guayaba', 'Aguacate',
      'Canela', 'Churro', 'Papaya', 'Nopal', 'Elote', 'Horchata',
      'Vainilla', 'Sol', 'Luna', 'Estrella'
    ];
    const virtues = [
      'Ganas', 'Sabio', 'Fuerte', 'Rapido', 'Alegre', 'Valiente',
      'Tenaz', 'Brillante', 'Noble', 'Justo', 'Audaz', 'Feliz',
      'Activo', 'Sereno', 'Genio', 'Luz'
    ];

    // Cryptographically secure random selection
    let randArray = new Uint32Array(4);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(randArray);
    } else {
      randArray = [
        Math.floor(Math.random() * 1000000),
        Math.floor(Math.random() * 1000000),
        Math.floor(Math.random() * 1000000),
        Math.floor(Math.random() * 1000000)
      ];
    }

    const a = animals[randArray[0] % animals.length];
    const b = items[randArray[1] % items.length];
    const c = virtues[randArray[2] % virtues.length];
    const num = (randArray[3] % 9000) + 1000; // 4-digit secure number 1000-9999

    return `${a}-${b}-${c}-${num}`;
  }

  loadState() {
    try {
      const saved = localStorage.getItem('avanzamath_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
        if (!this.state.profile || !this.state.profile.passportCode) {
          this.state.profile = {
            name: "Mateo",
            avatarKey: "colibri",
            avatarIcon: "🐦",
            passportCode: this.generatePassportCode()
          };
        }
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
  }

  saveState() {
    try {
      localStorage.setItem('avanzamath_state', JSON.stringify(this.state));
      this.updateHeaderUI();
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  updateProfile(name, avatarKey) {
    const avatarData = this.avatars[avatarKey] || this.avatars.colibri;
    this.state.profile.name = name.trim() || 'Estudiante';
    this.state.profile.avatarKey = avatarKey;
    this.state.profile.avatarIcon = avatarData.icon;
    this.saveState();
  }

  checkDailyStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.state.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (this.state.lastActiveDate === yesterday) {
        this.state.streak += 1;
      } else if (this.state.lastActiveDate < yesterday) {
        this.state.streak = 1;
      }
      this.state.lastActiveDate = today;
      this.saveState();
    }
  }

  addPoints(amount = 10, moduleId = null) {
    this.state.points += amount;
    if (moduleId && this.state.modules[moduleId]) {
      this.state.modules[moduleId].completed += 1;
      this.state.modules[moduleId].score += amount;
    }
    this.saveState();
    return this.state.points;
  }

  getTotalQuests() {
    let total = 0;
    for (const key in this.state.modules) {
      total += this.state.modules[key].completed || this.state.modules[key].wins || 0;
    }
    return total;
  }

  updateHeaderUI() {
    // Points / Ganas Stars
    const pointsEl = document.getElementById('header-points');
    const pointsLabelEl = document.getElementById('header-points-text');
    if (pointsEl) pointsEl.textContent = `${this.state.points}`;
    if (pointsLabelEl) pointsLabelEl.textContent = t('headerGanas');

    // Streak
    const streakEl = document.getElementById('header-streak');
    const streakLabelEl = document.getElementById('header-streak-text');
    if (streakEl) streakEl.textContent = `${this.state.streak}`;
    if (streakLabelEl) streakLabelEl.textContent = t('headerStreak');

    // Profile Chip
    const profileChipAvatar = document.getElementById('header-profile-avatar');
    const profileChipName = document.getElementById('header-profile-name');
    if (profileChipAvatar && this.state.profile) {
      profileChipAvatar.textContent = this.state.profile.avatarIcon || '🐦';
    }
    if (profileChipName && this.state.profile) {
      profileChipName.textContent = this.state.profile.name || 'Mateo';
    }
  }
}

const stateManager = new StateManager();
