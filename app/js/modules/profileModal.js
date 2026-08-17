/**
 * Student Profile & Avatar Registration Modal
 * Zero-PII onboarding and profile editor with avatar companion selection and 4-word passport pairing code.
 */

const ProfileModal = {
  selectedAvatar: 'colibri',

  randomNames: [
    'Mateo Campeón', 'Sofia Estrella', 'Leo Rápido', 'Valeria Sabia',
    'Santiago Valiente', 'Camila Alegre', 'Diego Brillante', 'Elena Genio',
    'Lucas Explorador', 'Isabella Fuerza'
  ],

  open() {
    let modalRoot = document.getElementById('profile-modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'profile-modal-root';
      document.body.appendChild(modalRoot);
    }

    this.selectedAvatar = stateManager.state.profile.avatarKey || 'colibri';
    const profile = stateManager.state.profile;

    modalRoot.innerHTML = `
      <div class="modal-backdrop animate-fade-in" id="profile-backdrop" onclick="ProfileModal.handleBackdropClick(event)">
        <div class="modal-dialog animate-pop" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
          <div class="modal-header">
            <h3 class="modal-title" id="profile-modal-title">${t('profileModalTitle')}</h3>
            <button class="btn-modal-close" onclick="ProfileModal.close()" aria-label="Cerrar">✕</button>
          </div>

          <div class="modal-body">
            <!-- 1. Avatar Selector -->
            <label class="modal-section-label">${t('profileChooseAvatar')}:</label>
            <div class="avatar-selection-grid">
              <div class="avatar-card-option ${this.selectedAvatar === 'colibri' ? 'selected' : ''}" 
                   onclick="ProfileModal.selectAvatar('colibri', this)">
                <div class="avatar-icon-large">🐦</div>
                <div class="avatar-meta">
                  <strong>Tito el Colibrí</strong>
                  <span class="avatar-trait">${t('avatarColibri').split('(')[1]?.replace(')', '') || 'Ganas'}</span>
                </div>
              </div>

              <div class="avatar-card-option ${this.selectedAvatar === 'axolote' ? 'selected' : ''}" 
                   onclick="ProfileModal.selectAvatar('axolote', this)">
                <div class="avatar-icon-large">🦎</div>
                <div class="avatar-meta">
                  <strong>Sol el Axolote</strong>
                  <span class="avatar-trait">${t('avatarAxolote').split('(')[1]?.replace(')', '') || 'Creatividad'}</span>
                </div>
              </div>

              <div class="avatar-card-option ${this.selectedAvatar === 'mariposa' ? 'selected' : ''}" 
                   onclick="ProfileModal.selectAvatar('mariposa', this)">
                <div class="avatar-icon-large">🦋</div>
                <div class="avatar-meta">
                  <strong>Luna la Mariposa</strong>
                  <span class="avatar-trait">${t('avatarMariposa').split('(')[1]?.replace(')', '') || 'Crecimiento'}</span>
                </div>
              </div>

              <div class="avatar-card-option ${this.selectedAvatar === 'jaguar' ? 'selected' : ''}" 
                   onclick="ProfileModal.selectAvatar('jaguar', this)">
                <div class="avatar-icon-large">🐆</div>
                <div class="avatar-meta">
                  <strong>Pepe el Jaguar</strong>
                  <span class="avatar-trait">${t('avatarJaguar').split('(')[1]?.replace(')', '') || 'Valentía'}</span>
                </div>
              </div>
            </div>

            <!-- 2. Student Name / Alias -->
            <div class="form-group mt-3">
              <label class="modal-section-label" for="student-name-input">${t('profileNameLabel')}</label>
              <div class="input-action-row">
                <input type="text" id="student-name-input" class="form-input" maxlength="24" 
                       value="${profile.name || 'Mateo'}" placeholder="Escribe tu nombre">
                <button class="btn btn-secondary btn-sm" onclick="ProfileModal.generateRandomName()">
                  ${t('randomNameBtn')}
                </button>
              </div>
            </div>

            <!-- 3. 4-Word Magic Passport Code & QR -->
            <div class="passport-code-card mt-3">
              <div class="passport-header">
                <span>🔐 ${t('passportCodeLabel')}</span>
              </div>
              <div class="passport-code-badge">${profile.passportCode}</div>
              <p class="passport-desc">${t('passportDesc')}</p>
              
              <!-- Visual QR Code Stamp -->
              <div class="passport-qr-box">
                <div class="qr-stamp-visual">
                  <div class="qr-pattern">
                    <span>🔲</span><span>⬛</span><span>🔲</span>
                    <span>⬛</span><span>${profile.avatarIcon || '🐦'}</span><span>⬛</span>
                    <span>🔲</span><span>⬛</span><span>🔲</span>
                  </div>
                  <div class="qr-label">AvanzaMath Passport QR</div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary btn-block" onclick="ProfileModal.save()">
              ${t('saveProfileBtn')}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  selectAvatar(key, el) {
    audio.playPop();
    this.selectedAvatar = key;
    document.querySelectorAll('.avatar-card-option').forEach(card => card.classList.remove('selected'));
    if (el) el.classList.add('selected');
  },

  generateRandomName() {
    audio.playPop();
    const input = document.getElementById('student-name-input');
    if (!input) return;
    const name = this.randomNames[Math.floor(Math.random() * this.randomNames.length)];
    input.value = name;
  },

  handleBackdropClick(event) {
    if (event.target.id === 'profile-backdrop') {
      this.close();
    }
  },

  close() {
    const modalRoot = document.getElementById('profile-modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
  },

  save() {
    const input = document.getElementById('student-name-input');
    const name = (input && input.value) ? input.value : 'Estudiante';

    stateManager.updateProfile(name, this.selectedAvatar);
    stateManager.updateHeaderUI();
    audio.playSuccess();
    this.close();

    // Refresh views to show updated mascot
    if (App.currentView === 'welcome') {
      WelcomeModule.render();
    }
    App.updateMascotTip();
  }
};
