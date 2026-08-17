/**
 * AvanzaMath - Bilingual Localization Dictionary (i18n)
 * Supports instant English / Español switching with natural phrasing.
 */

const translations = {
  en: {
    // App Header & Global
    appName: "AvanzaMath",
    tagline: "Elementary Math Rooted in Hispanic Culture",
    ganasPoints: "Ganas Points",
    headerGanas: "Ganas",
    headerStreak: "d streak",
    soundFXOn: "🔊 FX: ON",
    soundFXOff: "🔇 FX: OFF",
    myProfile: "My Profile",
    streak: "Day Streak",
    langToggle: "🇲🇽 Español",
    audioRead: "Read Aloud",
    autoReadOn: "🗣️ Voice: ON",
    autoReadOff: "🗣️ Voice: OFF",
    soundFX: "Sound Effects",
    mascotName: "Tito the Hummingbird",
    backToMenu: "← Back to Modules",
    level: "Level",
    grade: "Grade",
    submit: "Check Answer",
    nextProblem: "Next Quest →",
    tryAgain: "Try Again!",
    hint: "Need a Hint?",
    excellent: "¡Excelente! Great job!",
    awesome: "¡Increíble! You did it!",
    keepGoing: "¡Casi! Count the items on the screen!",
    starsEarned: "+10 Ganas Stars!",

    // Navigation & Tabs
    tabWelcome: "Welcome",
    tabModules: "Math Quests",
    tabLoteria: "Math Bingo",
    tabFamily: "Family Portal",

    // Welcome Page Hero
    welcomeHeroBadge: "Learn Math with Pride & Culture",
    welcomeHeroTitle: "Welcome to AvanzaMath! ¡Bienvenidos!",
    welcomeHeroSubtitle: "Master addition, subtraction, multiplication, and division through fun, relatable neighborhood adventures—from baking conchas to market shopping and fiesta piñatas!",
    startQuestsCTA: "Start Math Quests",
    welcomeMascotGreet: "¡Hola! I'm your math companion. Let's learn together!",
    lessonsSectionTitle: "Quick Lessons & Topic Prep Guides",
    lessonsSectionSubtitle: "Review quick math tips and watch helpful Khan Academy video lessons before jumping into each quest!",
    quickTipLabel: "Quick Tip",
    playQuestButton: "Practice Quest",

    // Student Profile & Registration
    profileModalTitle: "🎒 Student Adventure Passport",
    profileChooseAvatar: "Choose Your Mascot Companion",
    avatarColibri: "Tito the Hummingbird (Grit & Energy)",
    avatarAxolote: "Sol the Axolotl (Creativity & Calm)",
    avatarMariposa: "Luna the Butterfly (Growth & Wonder)",
    avatarJaguar: "Pepe the Jaguar (Speed & Courage)",
    profileNameLabel: "Student Name or Math Alias:",
    randomNameBtn: "🎲 Random Name",
    passportCodeLabel: "Your 4-Word Adventure Code (Zero-Password):",
    passportDesc: "Share this code or QR with parents so they can view your Ganas stars on their phone without needing an account!",
    saveProfileBtn: "Save Passport ⭐",
    profileUpdatedToast: "Passport saved successfully! ⭐",

    // Welcome Lessons & Topics
    lessonFruitTitle: "Addition & Subtraction: Ten-Frames",
    lessonFruitDesc: "Learn how ten-frames turn counting into a visual game of grouping numbers up to 10 and 20.",
    lessonFruitTips: "Fill the 5-box row first. To add 4 + 3, place 4 mangos then 3 avocados. Count the filled boxes!",

    lessonPanaderiaTitle: "Multiplication: Arrays & Rows",
    lessonPanaderiaDesc: "Multiplication is repeated addition of equal groups organized in neat rows and columns.",
    lessonPanaderiaTips: "Count the rows, then count items in one row. 3 rows of 4 conchas = 3 × 4 = 12 conchas in total!",

    lessonMercadoTitle: "Money Math: Counting Bills & Change",
    lessonMercadoDesc: "Practice adding item prices and calculating how much change you receive when paying with larger bills.",
    lessonMercadoTips: "To find change: Change = Cash Paid − Total Cost. If you pay with $10 for a $7 grocery total: $10 − $7 = $3 change!",

    lessonPinataTitle: "Division: Equal & Fair Sharing",
    lessonPinataDesc: "Division means splitting a big group of treats equally among friends into separate party bags.",
    lessonPinataTips: "Think of multiplication backwards: 24 ÷ 4 = ? means 'What number × 4 = 24?' Answer is 6 candies per bag!",

    lessonLoteriaTitle: "Mental Math Speed: All 4 Operations",
    lessonLoteriaDesc: "Sharpen your fast mental math reflexes across +, −, ×, and ÷ to stamp your card and shout ¡BUENAS!",
    lessonLoteriaTips: "Listen carefully to the caller card. Look for patterns on your 4x4 card and place a bean on the matching number.",

    // Module Cards on Home
    fruitTitle: "Fruit Stand (El Puesto)",
    fruitSubtitle: "Grades K–1 • Addition & Subtraction",
    fruitDesc: "Count mangos, avocados, and fresh fruits on the 10-frame to solve fruit stand orders!",
    fruitAction: "Count fruits!",

    panaderiaTitle: "The Bakery (La Panadería)",
    panaderiaSubtitle: "Grades 2–3 • Multiplication Arrays",
    panaderiaDesc: "Bake fresh conchas and empanadas in rows and columns to master times tables!",
    panaderiaAction: "Bake conchas!",

    mercadoTitle: "Neighborhood Tiendita",
    mercadoSubtitle: "Grades 2–3 • Money & Making Change",
    mercadoDesc: "Count dollar bills and coins ($1, $5, $10, $20) to pay for groceries and give change!",
    mercadoAction: "Calculate change!",

    pinataTitle: "Fiesta Piñata",
    pinataSubtitle: "Grades 4–5 • Division & Fair Sharing",
    pinataDesc: "Break the piñata and divide the delicious candies equally into party favor bags!",
    pinataAction: "Divide treats!",

    loteriaTitle: "Math Bingo (Lotería)",
    loteriaSubtitle: "All Grades • Mental Math Speed Game",
    loteriaDesc: "Listen to the caller, stamp frijolitos on your card, and shout ¡BUENAS!",
    loteriaAction: "Shout Buenas!",

    familyTitle: "Family Portal",
    familySubtitle: "For Parents & Caregivers",
    familyDesc: "View progress in Spanish or English, share report cards on WhatsApp, and get fun dinner-table math retos.",
    familyAction: "View Progress",

    // Mascot Tips
    mascotTip1: "Hello friend! Ready to bake conchas and earn Ganas stars today?",
    mascotTip2: "Every quest you solve helps your mascot grow! ✨",
    mascotTip3: "In AvanzaMath, mistakes are just friendly steps on the road to mastery!",
    mascotTip4: "Did you know NASA astronaut Dr. Ellen Ochoa practiced math every day?",

    // Module 1: Fruit Stand
    fruitPromptAdd: "Don José needs your help! Put {a} {fruitA} and {b} {fruitB} on the counter. How many fruits in total?",
    fruitPromptSub: "There were {a} fresh {fruitA} on the stand. Customers bought {b}. How many are left?",
    tenFrameInstruction: "Tap the slots to place fruits on the counter:",
    clearFruits: "Clear Fruits",

    // Module 2: Panadería
    panaderiaPrompt: "Doña Elena is baking a fresh tray of pan dulce with {rows} rows and {cols} conchas in each row. How many conchas in total?",
    panaderiaEquation: "{rows} rows of {cols} conchas = {rows} × {cols}",
    bakingTrayTitle: "🥖 Baking Sheet (Charola)",
    arrayTag: "{rows} × {cols} Array",
    conchaFlavor: "Select Pan Dulce:",
    conchaPink: "Pink Concha",
    conchaChoc: "Chocolate Concha",
    conchaVanilla: "Vanilla Concha",

    // Module 3: Mercado
    mercadoPrompt: "Your grocery total at the tiendita is ${total}. You pay with a ${paid} bill. How much change should you get back?",
    itemCostPrompt: "You are buying: {items}. What is the total cost?",
    dragMoneyInstruction: "Drag bills and coins onto the cash register counter to pay:",
    tienditaHeader: "🏪 Neighborhood Tiendita",
    yourChange: "Your Change:",
    paidAmount: "Paid:",
    totalCost: "Total:",
    clearCash: "Clear",

    // Module 4: Piñata
    pinataPrompt: "The piñata broke open with {total} candies! Divide them equally among {friends} party favor bags (*bolsitas*). How many candies go in each bag?",
    pinataEquation: "{total} candies ÷ {friends} bags = {perBag} per bag",
    pinataLeftover: "Leftover candies:",
    partyBagLabel: "Party Bag",

    // Module 5: Lotería
    loteriaHeader: "Math Bingo (Lotería)",
    loteriaInstruction: "Solve the caller's math card and tap the matching number on your 4x4 card!",
    loteriaCaller: "📢 THE CALLER ANNOUNCES:",
    callerTag: "MATH CLUE CARD",
    yourBingoCard: "🫘 Your Bingo Card",
    nextCard: "⏭️ Next Card",
    shoutBuenas: "¡BUENAS! (Bingo)",
    newCard: "New Card",
    playAnother: "Play Another Card 🃏",
    keepPlaying: "Keep playing!",
    buenasWinTitle: "🎊 ¡¡BUENAS!! ¡¡BINGO!! 🎊",
    buenasWinSub: "You won +25 Ganas Stars! ⭐⭐⭐",
    buenasNeedMore: "Place at least 4 beans on your card to shout Buenas!",
    opAll: "✨ All 4 (+, −, ×, ÷)",
    opAdd: "➕ Addition (+)",
    opSub: "➖ Subtraction (−)",
    opMul: "✖️ Multiplication (×)",
    opDiv: "➗ Division (÷)",

    // Family Portal
    parentGreeting: "Welcome, Family!",
    parentExplanation: "AvanzaMath gives your child a joyful, culturally rooted math foundation without ads or paywalls.",
    linkedPassportLabel: "Connected Student Passport:",
    linkPassportBtn: "🔗 Connect Child's Passport",
    enterPassportPrompt: "Enter child's 4-word code (e.g., Colibri-Pan-Sol-24):",
    connectPassport: "Connect Passport",
    passportLinkedSuccess: "Student Passport linked successfully! ⭐",
    reportVerifiedBadge: "🛡️ Officially Verified Student Report",
    tamperedReportTitle: "⚠️ Unverified Progress Report",
    tamperedReportDesc: "This progress link has been altered or contains an invalid signature. Please ask your child to share their progress directly from the AvanzaMath app.",
    skillsMastered: "Skills Practiced This Week",
    questsCompletedStat: "Quests Solved",
    weeklyChallengeTitle: "Weekly Family Math Challenge (Reto en Familia)",
    weeklyChallengeDesc: "At the dinner table or supermarket, have your child count the change in your pocket or estimate the total cost of 4 bananas. Celebrate their effort!",
    shareWhatsApp: "Share Progress via WhatsApp 📲",
    printWorksheet: "Print Offline Practice Sheet 🖨️",
    studentProgressReport: "AvanzaMath Student Report for {name}: {stars} Ganas Stars earned across {quests} quests! ⭐"
  },

  es: {
    // App Header & Global
    appName: "AvanzaMath",
    tagline: "Matemáticas Primarias con Orgullo y Cultura",
    ganasPoints: "Puntos Ganas",
    headerGanas: "Ganas",
    headerStreak: "d racha",
    soundFXOn: "🔊 Sonido: ON",
    soundFXOff: "🔇 Sonido: OFF",
    myProfile: "Mi Perfil",
    streak: "Días de Racha",
    langToggle: "🇺🇸 English",
    audioRead: "Escuchar en Voz Alta",
    autoReadOn: "🗣️ Auto-Voz: ACTIVA",
    autoReadOff: "🗣️ Auto-Voz: DESACTIVADA",
    soundFX: "Efectos de Sonido",
    mascotName: "Tito el Colibrí",
    backToMenu: "← Volver a Módulos",
    level: "Nivel",
    grade: "Grado",
    submit: "Comprobar Respuesta",
    nextProblem: "Siguiente Misión →",
    tryAgain: "¡Intenta de Nuevo!",
    hint: "¿Necesitas Ayuda?",
    excellent: "¡Excelente! ¡Muy bien hecho!",
    awesome: "¡Increíble! ¡Lo lograste!",
    keepGoing: "¡Casi! Cuenta los objetos en la pantalla.",
    starsEarned: "¡+10 Estrellas Ganas!",

    // Navigation & Tabs
    tabWelcome: "Inicio",
    tabModules: "Misiones de Mate",
    tabLoteria: "Lotería Bingo",
    tabFamily: "Portal Familiar",

    // Welcome Page Hero
    welcomeHeroBadge: "Aprende Matemáticas con Orgullo y Cultura",
    welcomeHeroTitle: "¡Bienvenidos a AvanzaMath!",
    welcomeHeroSubtitle: "¡Domina sumas, restas, multiplicación y división a través de aventuras de nuestra comunidad: hornea pan dulce, compra en el mercado y reparte dulces de la piñata!",
    startQuestsCTA: "Empezar Misiones de Mate",
    welcomeMascotGreet: "¡Hola! Soy tu compañero de mate. ¡Vamos a aprender juntos!",
    lessonsSectionTitle: "Lecciones Rápidas y Guías de Preparación",
    lessonsSectionSubtitle: "Repasa consejos prácticos y mira videos explicativos de Khan Academy antes de entrar a cada misión.",
    quickTipLabel: "Consejo Rápido",
    playQuestButton: "Practicar Misión",

    // Student Profile & Registration
    profileModalTitle: "🎒 Pasaporte de Aventuras del Estudiante",
    profileChooseAvatar: "Elige tu Compañero de Mate",
    avatarColibri: "Tito el Colibrí (Perseverancia y Energía)",
    avatarAxolote: "Sol el Axolote (Creatividad y Calma)",
    avatarMariposa: "Luna la Mariposa (Crecimiento y Asombro)",
    avatarJaguar: "Pepe el Jaguar (Velocidad y Valentía)",
    profileNameLabel: "Nombre o Apodo de Superhéroe:",
    randomNameBtn: "🎲 Generar Apodo",
    passportCodeLabel: "Tu Código de 4 Palabras (Sin Contraseña):",
    passportDesc: "¡Comparte este código o código QR con tus papás para que vean tus estrellas Ganas en su teléfono sin registrarse!",
    saveProfileBtn: "Guardar Pasaporte ⭐",
    profileUpdatedToast: "¡Pasaporte guardado con éxito! ⭐",

    // Welcome Lessons & Topics
    lessonFruitTitle: "Sumas y Restas: Marco de Diez",
    lessonFruitDesc: "Aprende cómo el marco de 10 convierte el conteo en un juego visual para agrupar números hasta el 10 y 20.",
    lessonFruitTips: "Llena la fila de 5 primero. Para sumar 4 + 3, coloca 4 mangos y luego 3 aguacates. ¡Mira cuántas casillas se llenan!",

    lessonPanaderiaTitle: "Multiplicación: Arreglos y Filas",
    lessonPanaderiaDesc: "La multiplicación es sumar grupos iguales organizados en filas y columnas ordenadas.",
    lessonPanaderiaTips: "Cuenta las filas y luego cuántas conchas hay en cada fila: 3 filas con 4 conchas = 3 × 4 = 12 conchas en total.",

    lessonMercadoTitle: "Dinero: Billetes, Monedas y Cambio",
    lessonMercadoDesc: "Practica sumando precios y calculando cuánto cambio te deben devolver al pagar con billetes grandes.",
    lessonMercadoTips: "Para calcular el cambio: Cambio = Dinero Pagado − Costo Total. Si pagas con $10 por algo de $7: $10 − $7 = $3 de cambio.",

    lessonPinataTitle: "División: Reparto Justo y Equitativo",
    lessonPinataDesc: "Dividir significa repartir un grupo grande de dulces en partes iguales entre amigos en bolsitas de fiesta.",
    lessonPinataTips: "Piensa en la multiplicación al revés: 24 ÷ 4 = ? significa ¿Qué número × 4 = 24? ¡La respuesta es 6 dulces por bolsita!",

    lessonLoteriaTitle: "Rapidez Mental: Las 4 Operaciones",
    lessonLoteriaDesc: "Entrena tus reflejos mentales con sumas, restas, multiplicaciones y divisiones para cantar ¡BUENAS!",
    lessonLoteriaTips: "Escucha con atención la tarjeta del cantor. Busca el número en tu tabla de 4x4 y coloca un frijolito rápidamente.",

    // Module Cards on Home
    fruitTitle: "El Puesto de Frutas",
    fruitSubtitle: "Grados K–1 • Sumas y Restas",
    fruitDesc: "¡Cuenta mangos, aguacates y frutas frescas en el marco de 10 para completar los pedidos del puesto!",
    fruitAction: "¡A contar mangos!",

    panaderiaTitle: "La Panadería",
    panaderiaSubtitle: "Grados 2–3 • Arreglos de Multiplicación",
    panaderiaDesc: "¡Hornea conchas y empanadas en filas y columnas para dominar las tablas de multiplicar!",
    panaderiaAction: "¡Hornea conchas!",

    mercadoTitle: "El Mercado y Tiendita",
    mercadoSubtitle: "Grados 2–3 • Dinero y Cambio",
    mercadoDesc: "¡Cuenta billetes y monedas ($1, $5, $10, $20) para pagar las compras y dar el cambio correcto!",
    mercadoAction: "¡Calcula el cambio!",

    pinataTitle: "La Piñata de Fiesta",
    pinataSubtitle: "Grados 4–5 • División y Reparto Justo",
    pinataDesc: "¡Rompe la piñata y reparte los deliciosos dulces en partes iguales en las bolsitas de fiesta!",
    pinataAction: "¡Reparte los dulces!",

    loteriaTitle: "Lotería Matemática",
    loteriaSubtitle: "Todos los Grados • Rapidez Mental",
    loteriaDesc: "¡Escucha al cantor, pon los frijolitos en tu tarjeta de 4x4 y grita con orgullo ¡BUENAS!",
    loteriaAction: "¡Canta Buenas!",

    familyTitle: "El Portal Familiar",
    familySubtitle: "Para Madres, Padres y Familias",
    familyDesc: "Consulta el progreso en español, comparte tarjetas en WhatsApp y recibe retos divertidos en casa.",
    familyAction: "Ver Progreso",

    // Mascot Tips
    mascotTip1: "¡Hola amiguito! ¿Listo para hornear pan dulce y ganar estrellas de Ganas?",
    mascotTip2: "¡Cada problema que resuelves hace crecer a tu compañero! ✨",
    mascotTip3: "¡Recuerda que en AvanzaMath los errores solo son pasos para aprender!",
    mascotTip4: "¿Sabías que la astronauta Ellen Ochoa practicaba matemáticas todos los días?",

    // Module 1: Fruit Stand
    fruitPromptAdd: "¡Don José necesita tu ayuda! Coloca {a} {fruitA} y {b} {fruitB} en el mostrador. ¿Cuántas frutas hay en total?",
    fruitPromptSub: "Había {a} {fruitA} frescas en el puesto. Los clientes compraron {b}. ¿Cuántas quedan?",
    tenFrameInstruction: "Toca las casillas para colocar las frutas en el mostrador:",
    clearFruits: "Limpiar Frutas",

    // Module 2: Panadería
    panaderiaPrompt: "Doña Elena está horneando una charola de pan dulce con {rows} filas y {cols} conchas en cada fila. ¿Cuántas conchas hay en total?",
    panaderiaEquation: "{rows} filas de {cols} conchas = {rows} × {cols}",
    bakingTrayTitle: "🥖 Charola de Hornear",
    arrayTag: "Arreglo {rows} × {cols}",
    conchaFlavor: "Elige el Pan Dulce:",
    conchaPink: "Concha Rosa",
    conchaChoc: "Concha Chocolate",
    conchaVanilla: "Concha Vainilla",

    // Module 3: Mercado
    mercadoPrompt: "Tu cuenta en la tiendita es de ${total}. Pagas con un billete de ${paid}. ¿Cuánto cambio debes recibir?",
    itemCostPrompt: "Comprando: {items}. ¿Cuál es el costo total?",
    dragMoneyInstruction: "Arrastra los billetes y monedas al mostrador para pagar:",
    tienditaHeader: "🏪 La Tiendita de la Esquina",
    yourChange: "Tu Cambio:",
    paidAmount: "Pagado:",
    totalCost: "Total:",
    clearCash: "Borrar",

    // Module 4: Piñata
    pinataPrompt: "¡Se rompió la piñata con {total} dulces! Repártelos en partes iguales entre {friends} bolsitas de fiesta. ¿Cuántos dulces tocan por bolsita?",
    pinataEquation: "{total} dulces ÷ {friends} bolsitas = {perBag} por bolsita",
    pinataLeftover: "Dulces sobrantes:",
    partyBagLabel: "Bolsita",

    // Module 5: Lotería
    loteriaHeader: "¡Lotería Matemática!",
    loteriaInstruction: "¡Resuelve la tarjeta del cantor y toca el número correcto en tu tabla de 4x4!",
    loteriaCaller: "📢 EL CANTOR ANUNCIA:",
    callerTag: "TARJETA DE MATE",
    yourBingoCard: "🫘 Tu Tabla de Lotería",
    nextCard: "⏭️ Siguiente Carta",
    shoutBuenas: "¡BUENAS! (Lotería)",
    newCard: "Nueva Tabla",
    playAnother: "Jugar Otra Tabla 🃏",
    keepPlaying: "¡Sigue jugando!",
    buenasWinTitle: "🎊 ¡¡BUENAS!! ¡¡LOTERÍA!! 🎊",
    buenasWinSub: "¡Has ganado +25 Estrellas Ganas! ⭐⭐⭐",
    buenasNeedMore: "Coloca al menos 4 frijolitos en tu tabla para cantar ¡Buenas!",
    opAll: "✨ Las 4 (+, −, ×, ÷)",
    opAdd: "➕ Sumas (+)",
    opSub: "➖ Restas (−)",
    opMul: "✖️ Multiplicación (×)",
    opDiv: "➗ División (÷)",

    // Family Portal
    parentGreeting: "¡Bienvenida, Familia!",
    parentExplanation: "AvanzaMath brinda a sus hijos una base matemática alegre y cultural, 100% gratuita y sin anuncios.",
    linkedPassportLabel: "Pasaporte del Estudiante Conectado:",
    linkPassportBtn: "🔗 Conectar Pasaporte del Hijo/a",
    enterPassportPrompt: "Ingresa el código de 4 palabras (ej. Colibri-Pan-Sol-24):",
    connectPassport: "Conectar Pasaporte",
    passportLinkedSuccess: "¡Pasaporte del estudiante conectado con éxito! ⭐",
    reportVerifiedBadge: "🛡️ Reporte Oficial Verificado con Firma Digital",
    tamperedReportTitle: "⚠️ Reporte de Progreso No Verificado",
    tamperedReportDesc: "Este enlace de progreso ha sido modificado o contiene una firma digital no válida. Por favor pide a tu hijo/a que comparta el reporte directamente desde su aplicación AvanzaMath.",
    skillsMastered: "Habilidades Practicadas Esta Semana",
    questsCompletedStat: "Misiones Completadas",
    weeklyChallengeTitle: "Reto en Familia de la Semana",
    weeklyChallengeDesc: "En la mesa o en la tienda, pídale a su hijo/a contar las monedas del cambio o calcular el costo de 4 plátanos. ¡Celebremos su esfuerzo!",
    shareWhatsApp: "Compartir Progreso en WhatsApp 📲",
    printWorksheet: "Imprimir Hoja de Práctica 🖨️",
    studentProgressReport: "Reporte de AvanzaMath para {name}: ¡{stars} Estrellas Ganas logradas en {quests} misiones! ⭐"
  }
};

let currentLang = 'es'; // Default to Spanish for community resonance

function t(key, params = {}) {
  const langObj = translations[currentLang] || translations.en;
  let text = langObj[key] || translations.en[key] || key;
  for (const [paramKey, val] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), val);
  }
  return text;
}

function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('avanzamath_lang', lang);
    document.documentElement.lang = lang;
    updatePageLanguage();
  }
}

function toggleLanguage() {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
}

function initLanguage() {
  const saved = localStorage.getItem('avanzamath_lang');
  if (saved && translations[saved]) {
    currentLang = saved;
  }
  document.documentElement.lang = currentLang;
}
