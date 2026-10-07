// data-game.js - ゲーム要素の定義
window.GAME_DATA = {
  // ===== 称号 =====
  titles: [
    { id:'beginner',  name:'🎓 ビギナー',        desc:'初めて1問解く',              rank:1, exp:50 },
    { id:'learner',   name:'📖 学習者',          desc:'50問解く',                  rank:1, exp:100 },
    { id:'effort',    name:'📚 努力家',          desc:'200問解く',                 rank:2, exp:300 },
    { id:'smart',     name:'🧠 秀才',            desc:'500問解く',                 rank:2, exp:500 },
    { id:'sage',      name:'👑 賢者',            desc:'1000問解く',                rank:3, exp:1000 },
    { id:'streak3',   name:'🔥 三日坊主卒業',     desc:'3日連続ログイン',            rank:1, exp:50 },
    { id:'streak7',   name:'💪 継続の達人',       desc:'7日連続ログイン',            rank:2, exp:100 },
    { id:'streak30',  name:'🏃 マラソンランナー', desc:'30日連続ログイン',           rank:3, exp:500 },
    { id:'speed',     name:'⚡ 電光石火',         desc:'1日で50問解く',             rank:2, exp:200 },
    { id:'accuracy',  name:'🎯 正解の達人',       desc:'正答率80%以上（100問以上）', rank:2, exp:300 },
    { id:'perfect',   name:'🎖️ パーフェクト',     desc:'正答率90%以上（100問以上）', rank:3, exp:500 },
    { id:'material',  name:'📑 資料マスター',     desc:'資料問題を全問正解',         rank:3, exp:300 },
    { id:'allfield',  name:'🏆 全分野制覇',       desc:'全8分野で正答率80%以上',     rank:3, exp:500 },
    { id:'charisma',  name:'🌟 カリスマ',         desc:'レベル50到達',              rank:3, exp:300 },
    { id:'legend',    name:'🐲 伝説の存在',       desc:'レベル100到達',             rank:4, exp:1000 }
  ],

  // ===== バッジ =====
  badges: [
    { id:'start',     name:'🌱 はじまりのバッジ', desc:'初ログイン',                exp:20 },
    { id:'week',      name:'📅 1週間のバッジ',    desc:'7日連続ログイン',           exp:100 },
    { id:'month',     name:'🗓️ 1ヶ月のバッジ',    desc:'30日連続ログイン',          exp:300 },
    { id:'100q',      name:'💯 100問のバッジ',    desc:'100問解く',                exp:100 },
    { id:'accuracy',  name:'🎯 的中率のバッジ',    desc:'10問連続正解',             exp:150 },
    { id:'passion',   name:'🔥 情熱のバッジ',      desc:'1日30問解く',              exp:200 },
    { id:'night',     name:'🌙 夜型のバッジ',      desc:'深夜0〜5時に解く',          exp:50 },
    { id:'morning',   name:'☀️ 朝型のバッジ',      desc:'朝5〜8時に解く',           exp:50 },
    { id:'material',  name:'📚 資料好きのバッジ',  desc:'資料問題50問解く',          exp:200 },
    { id:'allfield',  name:'🧩 全分野のバッジ',    desc:'全8分野を1問以上解く',      exp:100 },
    { id:'review',    name:'🎖️ 復習の達人',        desc:'間違い問題を全て正解にする', exp:300 },
    { id:'perfect',   name:'🏅 完璧主義のバッジ',  desc:'1セット全問正解',           exp:200 },
    { id:'complete',  name:'⭐ コンプリート',      desc:'全問を1回以上解く',         exp:500 },
    { id:'master',    name:'🌟 マスター',          desc:'全問を3回以上解く',         exp:1000 }
  ],

  // ===== レベル =====
  levelExp: 100,
  levelGrowth: 1.2,

  // ===== EXP獲得ルール =====
  expRules: {
    solve: 5,
    correct: 10,
    dailyLogin: 20,
    streakBonus: 10,
    maxStreakBonus: 100,
    materialBonus: 15,
    perfect10: 50,
    comeBack: 50
  },

  // ===== キャラクター =====
  characters: [
    { level:1,   stage:'🥚', name:'たまご',       desc:'まだ眠っている…' },
    { level:10,  stage:'🐣', name:'ヒヨコ',       desc:'殻を破った！' },
    { level:30,  stage:'🐥', name:'若鳥',         desc:'元気に羽ばたく' },
    { level:50,  stage:'🦅', name:'成鳥',         desc:'大空を舞う' },
    { level:80,  stage:'🐲', name:'伝説の鳥',     desc:'伝説の存在へ' },
    { level:100, stage:'🦄', name:'幻獣',         desc:'究極の存在' }
  ]
};