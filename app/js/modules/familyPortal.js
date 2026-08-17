/**
 * Module 6: El Portal Familiar (Family & Caregiver Portal)
 * Bilingual dashboard, Base64URL HMAC-SHA256 Signed Progress Tokens, WhatsApp report cards, and printable worksheets.
 */

const HMAC_SECRET_SALT = 'AvanzaMath_HMAC_Key_2026_EduEquity_Salt';

const CryptoReport = {
  base64UrlEncode(str) {
    const b64 = btoa(unescape(encodeURIComponent(str)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },

  base64UrlDecode(str) {
    let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) {
      b64 += '=';
    }
    return decodeURIComponent(escape(atob(b64)));
  },

  async getHmacKey() {
    const encoder = new TextEncoder();
    return await crypto.subtle.importKey(
      'raw',
      encoder.encode(HMAC_SECRET_SALT),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
  },

  async signPayload(payload) {
    try {
      // Ultra-compact pipe-delimited format: name|code|avatar|ganas|quests
      const compactStr = [
        payload.studentName || 'Estudiante',
        payload.passportCode || 'Colibri-Pan-Sol-24',
        payload.avatarIcon || '🐦',
        payload.ganas || 0,
        payload.quests || 0
      ].join('|');

      const encoder = new TextEncoder();
      const key = await this.getHmacKey();
      const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(compactStr));
      const sigHex = Array.from(new Uint8Array(sigBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 16); // 64-bit cryptographic truncation (16 hex chars)

      const b64Url = this.base64UrlEncode(compactStr);
      return `${b64Url}.${sigHex}`;
    } catch (e) {
      console.warn('Crypto signing error:', e);
      return null;
    }
  },

  async verifyToken(token) {
    try {
      if (!token || typeof token !== 'string' || !token.includes('.')) return { valid: false };
      const parts = token.trim().split('.');
      if (parts.length !== 2) return { valid: false };

      const [b64Url, expectedSig] = parts;
      const decodedStr = this.base64UrlDecode(b64Url);
      const encoder = new TextEncoder();
      const key = await this.getHmacKey();
      const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(decodedStr));
      const fullSigHex = Array.from(new Uint8Array(sigBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      const shortSigHex = fullSigHex.slice(0, 16);

      // 1. Compact pipe-delimited format
      if (decodedStr.includes('|')) {
        const segs = decodedStr.split('|');
        if (segs.length >= 5) {
          const isMatch = (expectedSig.toLowerCase() === shortSigHex.toLowerCase()) ||
                          (expectedSig.toLowerCase() === fullSigHex.toLowerCase());
          if (isMatch) {
            return {
              valid: true,
              payload: {
                studentName: segs[0],
                passportCode: segs[1],
                avatarIcon: segs[2],
                ganas: parseInt(segs[3], 10) || 0,
                quests: parseInt(segs[4], 10) || 0
              }
            };
          }
        }
      }

      // 2. Legacy JSON format fallback
      if (expectedSig.toLowerCase() === fullSigHex.toLowerCase() || expectedSig.toLowerCase() === shortSigHex.toLowerCase()) {
        const json = JSON.parse(decodedStr);
        return { valid: true, payload: json };
      }

      return { valid: false };
    } catch (e) {
      console.warn('Crypto verify error:', e);
      return { valid: false };
    }
  }
};

const FamilyPortalModule = {
  verificationStatus: null, // null | 'verified' | 'tampered'

  async init() {
    await this.checkUrlParams();
    this.render();
  },

  async checkUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const reportToken = params.get('report');

      if (reportToken) {
        const result = await CryptoReport.verifyToken(reportToken);
        if (result.valid && result.payload) {
          const p = result.payload;
          stateManager.state.profile.name = p.studentName || 'Estudiante';
          stateManager.state.profile.passportCode = p.passportCode || 'Colibri-Pan-Sol-24';
          stateManager.state.points = p.ganas || 0;
          if (p.avatarIcon) stateManager.state.profile.avatarIcon = p.avatarIcon;
          this.verificationStatus = 'verified';
          stateManager.saveState();
        } else {
          this.verificationStatus = 'tampered';
        }
        return;
      }

      // Legacy parameter fallback
      const passportCode = params.get('passport');
      const studentName = params.get('student');
      const ganas = params.get('ganas');

      let stateChanged = false;
      if (passportCode) {
        stateManager.state.profile.passportCode = passportCode;
        stateChanged = true;
      }
      if (studentName) {
        stateManager.state.profile.name = studentName;
        stateChanged = true;
      }
      if (ganas !== null && !isNaN(parseInt(ganas, 10))) {
        stateManager.state.points = parseInt(ganas, 10);
        stateChanged = true;
      }
      if (stateChanged) {
        stateManager.saveState();
      }
    } catch (e) {
      console.warn('URL param parsing error:', e);
    }
  },

  connectPassportCode() {
    const input = document.getElementById('family-passport-input');
    if (!input || !input.value.trim()) return;

    const code = input.value.trim();
    stateManager.state.profile.passportCode = code;
    this.verificationStatus = null;
    audio.playSuccess();
    stateManager.saveState();
    this.render();
  },

  render() {
    const container = document.getElementById('module-workspace');
    if (!container) return;

    const stats = stateManager.state.modules;
    const points = stateManager.state.points;
    const streak = stateManager.state.streak;
    const totalQuests = stateManager.getTotalQuests();
    const profile = stateManager.state.profile || { name: 'Mateo', avatarIcon: '🐦', passportCode: 'Colibri-Pan-Sol-24' };

    container.innerHTML = `
      <div class="quest-card animate-fade-in">
        <div class="quest-header">
          <div class="quest-tag">🏡 ${t('familyTitle')}</div>
        </div>

        <div class="family-welcome-banner">
          <div class="family-welcome-icon">👨‍👩‍👧‍👦</div>
          <div>
            <h3 style="margin-top:0;">${t('parentGreeting')}</h3>
            <p style="margin-bottom:0; font-size: 0.92rem;">${t('parentExplanation')}</p>
          </div>
        </div>

        <!-- Tampering Alert if HMAC Signature Failed -->
        ${this.verificationStatus === 'tampered' ? `
          <div class="tamper-alert-card animate-shake" role="alert">
            <div class="tamper-alert-icon">⚠️</div>
            <div class="tamper-alert-body">
              <h4 class="tamper-alert-title">${t('tamperedReportTitle')}</h4>
              <p class="tamper-alert-text">${t('tamperedReportDesc')}</p>
            </div>
          </div>
        ` : ''}

        <!-- Verified Digital Signature Badge if Signature Passed -->
        ${this.verificationStatus === 'verified' ? `
          <div class="verified-badge-chip animate-pop">
            <span>🛡️</span>
            <span>${t('reportVerifiedBadge')}</span>
          </div>
        ` : ''}

        <!-- 1. Connected Student Passport & Pairing Box -->
        <div class="family-passport-sync-box">
          <div class="passport-info-row">
            <div>
              <span class="sync-label">${t('linkedPassportLabel')}</span>
              <strong class="sync-name">${profile.avatarIcon || '🐦'} ${profile.name || 'Mateo'}</strong>
              <span class="sync-code">(${profile.passportCode})</span>
            </div>
          </div>

          <div class="passport-connect-input-zone mt-2">
            <label for="family-passport-input" class="passport-prompt-label">
              ${t('enterPassportPrompt')}
            </label>
            <div class="input-action-row mt-1">
              <input type="text" id="family-passport-input" class="form-input" 
                     placeholder="ej. Colibri-Pan-Sol-24" value="${profile.passportCode}">
              <button class="btn btn-primary btn-sm" onclick="FamilyPortalModule.connectPassportCode()">
                ${t('connectPassport')}
              </button>
            </div>
            <p style="font-size: 0.76rem; color: #78350F; margin-top: 6px; margin-bottom: 0;">
              💡 ${currentLang === 'es' 
                ? 'Pide a tu hijo/a tocar su avatar en la esquina superior para ver su código de 4 palabras o escanear su pasaporte QR.' 
                : 'Ask your child to tap their avatar in the top corner to see their 4-word code or show their passport QR.'}
            </p>
          </div>
        </div>

        <!-- 2. Student Progress Overview -->
        <div class="family-stats-grid">
          <div class="family-stat-card">
            <div class="stat-number">${points} ⭐</div>
            <div class="stat-label">${t('ganasPoints')}</div>
          </div>
          <div class="family-stat-card">
            <div class="stat-number">${streak} 🔥</div>
            <div class="stat-label">${t('streak')}</div>
          </div>
          <div class="family-stat-card">
            <div class="stat-number">${totalQuests} 🎯</div>
            <div class="stat-label">${t('questsCompletedStat')}</div>
          </div>
        </div>

        <!-- 3. Mastery Bars -->
        <div class="mastery-section">
          <h4>📊 ${t('skillsMastered')} (${profile.name || 'Estudiante'})</h4>

          <div class="mastery-item">
            <div class="mastery-header">
              <span>🍎 ${t('fruitTitle')}</span>
              <strong>${stats.fruitStand.completed} ${currentLang === 'es' ? 'misiones' : 'quests'}</strong>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill fill-terracotta" style="width: ${Math.min(100, stats.fruitStand.completed * 20)}%"></div>
            </div>
          </div>

          <div class="mastery-item">
            <div class="mastery-header">
              <span>🥖 ${t('panaderiaTitle')}</span>
              <strong>${stats.panaderia.completed} ${currentLang === 'es' ? 'misiones' : 'quests'}</strong>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill fill-gold" style="width: ${Math.min(100, stats.panaderia.completed * 20)}%"></div>
            </div>
          </div>

          <div class="mastery-item">
            <div class="mastery-header">
              <span>🛒 ${t('mercadoTitle')}</span>
              <strong>${stats.mercado.completed} ${currentLang === 'es' ? 'misiones' : 'quests'}</strong>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill fill-jade" style="width: ${Math.min(100, stats.mercado.completed * 20)}%"></div>
            </div>
          </div>

          <div class="mastery-item">
            <div class="mastery-header">
              <span>🪅 ${t('pinataTitle')}</span>
              <strong>${stats.pinata.completed} ${currentLang === 'es' ? 'misiones' : 'quests'}</strong>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill fill-indigo" style="width: ${Math.min(100, stats.pinata.completed * 20)}%"></div>
            </div>
          </div>
        </div>

        <!-- 4. Weekly Family Challenge (Reto en Familia) -->
        <div class="family-challenge-card">
          <div class="challenge-tag">🌟 ${t('weeklyChallengeTitle')}</div>
          <p>${t('weeklyChallengeDesc')}</p>
        </div>

        <!-- 5. Action Buttons -->
        <div class="family-actions-row">
          <button class="btn btn-whatsapp" onclick="FamilyPortalModule.shareViaWhatsApp()">
            ${t('shareWhatsApp')}
          </button>
          <button class="btn btn-outline" onclick="FamilyPortalModule.generatePrintableWorksheet()">
            ${t('printWorksheet')}
          </button>
        </div>
      </div>
    `;
  },

  async shareViaWhatsApp() {
    const profile = stateManager.state.profile || { name: 'Mateo', passportCode: 'Colibri-Pan-Sol-24' };
    const points = stateManager.state.points;
    const quests = stateManager.getTotalQuests();

    const payload = {
      studentName: profile.name,
      passportCode: profile.passportCode,
      avatarIcon: profile.avatarIcon || '🐦',
      ganas: points,
      quests: quests,
      ts: Date.now()
    };

    const signedToken = await CryptoReport.signPayload(payload);
    
    // Construct clean URL
    const baseUrl = (window.location.origin && window.location.origin !== 'null')
      ? `${window.location.origin}${window.location.pathname}`
      : `${window.location.href.split('?')[0]}`;

    const portalUrl = signedToken 
      ? `${baseUrl}?report=${signedToken}`
      : `${baseUrl}?passport=${encodeURIComponent(profile.passportCode)}&student=${encodeURIComponent(profile.name)}&ganas=${points}`;

    const text = currentLang === 'es'
      ? `🌟 ¡Mi hijo/a ${profile.name} está aprendiendo matemáticas con AvanzaMath! Ya logró ${points} Estrellas Ganas ⭐ y completó ${quests} misiones prácticas. Pasaporte: ${profile.passportCode}. Ver reporte verificado: ${portalUrl}`
      : `🌟 My child ${profile.name} is practicing elementary math with AvanzaMath! They earned ${points} Ganas Stars ⭐ across ${quests} quests! Passport: ${profile.passportCode}. View verified report: ${portalUrl}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  },

  generatePrintableWorksheet() {
    window.print();
  }
};
