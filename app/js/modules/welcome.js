/**
 * Module 0: Welcome & Lesson Prep Hub (Página de Bienvenida y Lecciones Rápidas)
 * Renders the home landing page with warm cultural welcome, quick tips, and curated video links.
 */

const WelcomeModule = {
  lessons: [
    {
      id: 'fruitStand',
      icon: '🍎',
      grade: 'K–1',
      badgeClass: 'badge-k1',
      titleKey: 'lessonFruitTitle',
      descKey: 'lessonFruitDesc',
      tipsKey: 'lessonFruitTips',
      videoTitle: 'Khan Academy • Ten-Frames & Addition',
      videoUrlEs: 'https://es.khanacademy.org/math/early-math/cc-early-math-add-sub-100',
      videoUrlEn: 'https://www.youtube.com/watch?v=p5pke_gA_c0',
      videoSource: 'Khan Academy / Math Antics'
    },
    {
      id: 'panaderia',
      icon: '🥖',
      grade: 'Grades 2–3',
      badgeClass: 'badge-23',
      titleKey: 'lessonPanaderiaTitle',
      descKey: 'lessonPanaderiaDesc',
      tipsKey: 'lessonPanaderiaTips',
      videoTitle: 'Khan Academy • Multiplication with Arrays',
      videoUrlEs: 'https://es.khanacademy.org/math/cc-third-grade-math/intro-to-multiplication',
      videoUrlEn: 'https://www.youtube.com/watch?v=mvOkMYCygps',
      videoSource: 'Khan Academy / Smile and Learn'
    },
    {
      id: 'mercado',
      icon: '🛒',
      grade: 'Grades 2–3',
      badgeClass: 'badge-23',
      titleKey: 'lessonMercadoTitle',
      descKey: 'lessonMercadoDesc',
      tipsKey: 'lessonMercadoTips',
      videoTitle: 'Math Antics • Counting Money & Making Change',
      videoUrlEs: 'https://es.khanacademy.org/math/cc-2nd-grade-math/cc-2nd-measurement-data#cc-2nd-money',
      videoUrlEn: 'https://www.youtube.com/watch?v=rvvF0yY_D3c',
      videoSource: 'Math Antics / Khan Academy'
    },
    {
      id: 'pinata',
      icon: '🪅',
      grade: 'Grades 4–5',
      badgeClass: 'badge-45',
      titleKey: 'lessonPinataTitle',
      descKey: 'lessonPinataDesc',
      tipsKey: 'lessonPinataTips',
      videoTitle: 'Khan Academy • Intro to Division & Equal Sharing',
      videoUrlEs: 'https://es.khanacademy.org/math/cc-third-grade-math/intro-to-division',
      videoUrlEn: 'https://www.youtube.com/watch?v=KGMf314LUc0',
      videoSource: 'Khan Academy / Math Antics'
    },
    {
      id: 'loteria',
      icon: '🃏',
      grade: 'All Grades',
      badgeClass: 'badge-game',
      titleKey: 'lessonLoteriaTitle',
      descKey: 'lessonLoteriaDesc',
      tipsKey: 'lessonLoteriaTips',
      videoTitle: 'Math Antics • Mental Math Strategies for +, −, ×, ÷',
      videoUrlEs: 'https://es.khanacademy.org/math/arithmetic',
      videoUrlEn: 'https://www.youtube.com/watch?v=F_fP45zQ9dY',
      videoSource: 'Math Antics / Khan Academy'
    }
  ],

  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('welcome-view');
    if (!container) return;

    container.innerHTML = `
      <!-- Welcome Hero Banner -->
      <section class="welcome-hero-card animate-fade-in">
        <div class="welcome-hero-content">
          <div class="welcome-hero-badge">🌟 ${t('welcomeHeroBadge')}</div>
          <h2 class="welcome-hero-title">${t('welcomeHeroTitle')}</h2>
          <p class="welcome-hero-subtitle">${t('welcomeHeroSubtitle')}</p>
          
          <div class="welcome-hero-actions">
            <button class="btn btn-primary btn-hero-cta" onclick="App.navigateTo('quests')">
              🎯 ${t('startQuestsCTA')} ➔
            </button>
            <button class="btn btn-secondary" onclick="App.navigateTo('loteria')">
              🃏 ${t('tabLoteria')} ➔
            </button>
          </div>
        </div>

        <div class="welcome-hero-visual">
          <div class="welcome-mascot-circle animate-float">
            <span>🐦</span>
          </div>
          <div class="welcome-mascot-bubble">
            ${t('welcomeMascotGreet')}
          </div>
        </div>
      </section>

      <!-- Quick Lessons & Topic Prep Section -->
      <section class="welcome-lessons-section">
        <div class="section-heading-bar">
          <div>
            <h3 class="section-title">📚 ${t('lessonsSectionTitle')}</h3>
            <p class="section-subtitle">${t('lessonsSectionSubtitle')}</p>
          </div>
        </div>

        <div class="lessons-grid">
          ${this.lessons.map((lesson, idx) => `
            <div class="lesson-card animate-pop" style="animation-delay: ${idx * 60}ms">
              <div class="lesson-card-header">
                <div class="lesson-icon-box">${lesson.icon}</div>
                <div>
                  <span class="module-badge ${lesson.badgeClass}">${lesson.grade}</span>
                  <h4 class="lesson-title">${t(lesson.titleKey)}</h4>
                </div>
              </div>

              <p class="lesson-desc">${t(lesson.descKey)}</p>

              <!-- Quick Math Tip Box -->
              <div class="lesson-tip-box">
                <div class="tip-badge">💡 ${t('quickTipLabel')}</div>
                <p class="tip-text">${t(lesson.tipsKey)}</p>
              </div>

              <!-- Curated Video Link -->
              <div class="lesson-video-link-box">
                <a href="${currentLang === 'es' ? lesson.videoUrlEs : lesson.videoUrlEn}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="video-link-pill">
                  <span class="play-icon">▶️</span>
                  <div class="video-info">
                    <span class="video-name">${lesson.videoTitle}</span>
                    <span class="video-provider">${lesson.videoSource}</span>
                  </div>
                  <span class="external-icon">↗</span>
                </a>
              </div>

              <!-- Launch Quest CTA -->
              <button class="btn btn-outline btn-sm btn-block mt-2" onclick="App.navigateTo('${lesson.id}')">
                ${t('playQuestButton')} ➔
              </button>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
};
