// game.js - ゲームロジック
(function() {
  const GAME_KEY = 'cc_gameData';
  const TITLE_KEY = 'cc_titles';
  const BADGE_KEY = 'cc_badges';
  const EXP_LOG_KEY = 'cc_expLog';

  // ===== ゲームデータの読み込み =====
  function loadGameData() {
    try {
      const data = JSON.parse(localStorage.getItem(GAME_KEY) || 'null');
      if (data) return data;
    } catch {}
    return {
      level: 1,
      exp: 0,
      totalExp: 0,
      characterName: 'ぴよすけ',
      characterStage: '🥚',
      nameSet: false,
      createdAt: new Date().toDateString(),
      lastLoginDate: null,
      loginStreak: 0,
      maxLoginStreak: 0,
      totalPoints: 0
    };
  }

  function saveGameData(data) {
    localStorage.setItem(GAME_KEY, JSON.stringify(data));
  }

  // ===== EXP内訳ログ =====
  function loadExpLog() {
    try { return JSON.parse(localStorage.getItem(EXP_LOG_KEY) || '{}'); }
    catch { return {}; }
  }
  function addExpLog(reason, amount) {
    const log = loadExpLog();
    log[reason] = (log[reason] || 0) + amount;
    localStorage.setItem(EXP_LOG_KEY, JSON.stringify(log));
  }
  function getExpLog() { return loadExpLog(); }

  // ===== レベル計算 =====
  function calcLevel(totalExp) {
    let level = 1;
    let accumulated = 0;
    let required = window.GAME_DATA.levelExp;
    while (totalExp >= accumulated + required && level < 100) {
      accumulated += required;
      level++;
      required = Math.floor(window.GAME_DATA.levelExp * Math.pow(window.GAME_DATA.levelGrowth, level - 1));
    }
    return { level, currentExp: totalExp - accumulated, required };
  }

  // ===== EXP加算 =====
  function addExp(amount, reason) {
    const data = loadGameData();
    data.totalExp += amount;
    data.exp += amount;
    const { level, currentExp, required } = calcLevel(data.totalExp);
    const oldLevel = data.level;
    data.level = level;

    const chars = window.GAME_DATA.characters;
    for (let i = chars.length - 1; i >= 0; i--) {
      if (level >= chars[i].level) {
        data.characterStage = chars[i].stage;
        break;
      }
    }
    saveGameData(data);
    if (reason) addExpLog(reason, amount);
    return { oldLevel, newLevel: level, leveledUp: level > oldLevel, currentExp, required };
  }

  // ===== デイリーログイン =====
  function checkDailyLogin() {
    const data = loadGameData();
    const today = new Date().toDateString();
    if (data.lastLoginDate === today) return { isNew: false, streak: data.loginStreak };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isConsecutive = data.lastLoginDate === yesterday.toDateString();

    if (isConsecutive) data.loginStreak++;
    else data.loginStreak = 1;
    if (data.loginStreak > data.maxLoginStreak) data.maxLoginStreak = data.loginStreak;
    data.lastLoginDate = today;

    const bonus = Math.min(
      window.GAME_DATA.expRules.streakBonus * data.loginStreak,
      window.GAME_DATA.expRules.maxStreakBonus
    );
    const total = window.GAME_DATA.expRules.dailyLogin + bonus;
    data.totalExp += total;
    data.exp += total;
    saveGameData(data);
    addExpLog('dailyLogin', window.GAME_DATA.expRules.dailyLogin);
    if (bonus > 0) addExpLog('streakBonus', bonus);
    return { isNew: true, streak: data.loginStreak, bonus, dailyExp: window.GAME_DATA.expRules.dailyLogin };
  }

  // ===== 称号の判定 =====
  function checkTitles() {
    const qHistory = JSON.parse(localStorage.getItem('cc_qHistory') || '{}');
    const gameData = loadGameData();

    const totalSolved = Object.values(qHistory).reduce((s, h) => s + (h.total || 0), 0);
    const totalCorrect = Object.values(qHistory).reduce((s, h) => s + (h.correct || 0), 0);
    const accuracy = totalSolved > 0 ? (totalCorrect / totalSolved) * 100 : 0;

    const owned = JSON.parse(localStorage.getItem(TITLE_KEY) || '[]');
    const newlyEarned = [];

    window.GAME_DATA.titles.forEach(t => {
      if (owned.includes(t.id)) return;
      let earned = false;
      switch (t.id) {
        case 'beginner':  earned = totalSolved >= 1; break;
        case 'learner':   earned = totalSolved >= 50; break;
        case 'effort':    earned = totalSolved >= 200; break;
        case 'smart':     earned = totalSolved >= 500; break;
        case 'sage':      earned = totalSolved >= 1000; break;
        case 'streak3':   earned = gameData.maxLoginStreak >= 3; break;
        case 'streak7':   earned = gameData.maxLoginStreak >= 7; break;
        case 'streak30':  earned = gameData.maxLoginStreak >= 30; break;
        case 'accuracy':  earned = totalSolved >= 100 && accuracy >= 80; break;
        case 'perfect':   earned = totalSolved >= 100 && accuracy >= 90; break;
        case 'charisma':  earned = gameData.level >= 50; break;
        case 'legend':    earned = gameData.level >= 100; break;
      }
      if (earned) { owned.push(t.id); newlyEarned.push(t); }
    });

    localStorage.setItem(TITLE_KEY, JSON.stringify(owned));
    return newlyEarned;
  }

  // ===== バッジの判定 =====
  function checkBadges() {
    const qHistory = JSON.parse(localStorage.getItem('cc_qHistory') || '{}');
    const gameData = loadGameData();
    const owned = JSON.parse(localStorage.getItem(BADGE_KEY) || '[]');
    const newlyEarned = [];

    const totalSolved = Object.values(qHistory).reduce((s, h) => s + (h.total || 0), 0);
    const solvedFields = new Set();
    Object.keys(qHistory).forEach(gid => solvedFields.add(gid.split('_')[0]));

    window.GAME_DATA.badges.forEach(b => {
      if (owned.includes(b.id)) return;
      let earned = false;
      switch (b.id) {
        case 'start':     earned = totalSolved >= 1; break;
        case 'week':      earned = gameData.maxLoginStreak >= 7; break;
        case 'month':     earned = gameData.maxLoginStreak >= 30; break;
        case '100q':      earned = totalSolved >= 100; break;
        case 'allfield':  earned = solvedFields.size >= 8; break;
      }
      if (earned) { owned.push(b.id); newlyEarned.push(b); }
    });

    localStorage.setItem(BADGE_KEY, JSON.stringify(owned));
    return newlyEarned;
  }

  // ===== 合格予測 =====
  function calcPassPrediction() {
    const qHistory = JSON.parse(localStorage.getItem('cc_qHistory') || '{}');
    const gameData = loadGameData();
    const totalQuestions = window.TOTAL_QUESTIONS || 500;

    let totalSolved = 0, totalCorrect = 0;
    Object.values(qHistory).forEach(h => {
      totalSolved += h.total || 0;
      totalCorrect += h.correct || 0;
    });
    const overallAccuracy = totalSolved > 0 ? (totalCorrect / totalSolved) * 100 : 0;
    const coverage = Math.min(100, (Object.keys(qHistory).length / totalQuestions) * 100);

    const recent = Object.entries(qHistory)
      .filter(([_, h]) => h.lastDate)
      .sort((a, b) => new Date(b[1].lastDate) - new Date(a[1].lastDate))
      .slice(0, 10);
    const recentCorrect = recent.reduce((s, [_, h]) => s + (h.correct || 0), 0);
    const recentTotal = recent.reduce((s, [_, h]) => s + (h.total || 0), 0);
    const recentAccuracy = recentTotal > 0 ? (recentCorrect / recentTotal) * 100 : overallAccuracy;

    const streakBonus = Math.min(100, gameData.loginStreak * 10);

    const prediction =
      overallAccuracy * 0.4 +
      recentAccuracy * 0.3 +
      coverage * 0.2 +
      streakBonus * 0.1;

    return {
      score: Math.round(prediction),
      overallAccuracy: Math.round(overallAccuracy),
      recentAccuracy: Math.round(recentAccuracy),
      coverage: Math.round(coverage),
      streakBonus: Math.round(streakBonus),
      totalSolved, totalCorrect
    };
  }

  // ===== キャラクター名の設定 =====
  function setCharacterName(name) {
    const data = loadGameData();
    data.characterName = name || 'ぴよすけ';
    data.nameSet = true;
    saveGameData(data);
    return data.characterName;
  }

  function isFirstLaunch() {
    const data = loadGameData();
    return !data.nameSet;
  }

  // ===== グローバル公開 =====
  window.gameAddExp = addExp;
  window.gameCheckDailyLogin = checkDailyLogin;
  window.gameCheckTitles = checkTitles;
  window.gameCheckBadges = checkBadges;
  window.gameLoad = loadGameData;
  window.gameSave = saveGameData;
  window.gameCalcLevel = calcLevel;
  window.gameCalcPassPrediction = calcPassPrediction;
  window.gameSetCharacterName = setCharacterName;
  window.gameIsFirstLaunch = isFirstLaunch;
  window.gameGetExpLog = getExpLog;
})();