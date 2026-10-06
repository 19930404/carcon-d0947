// data-progress.js - 進捗管理マスター
window.PROGRESS_MASTER = {
  // 分野ID → カテゴリ名（表示用）
  fieldNames: {
    'f01': '社会・経済・キャリア形成支援',
    'f02': 'キャリアコンサルティングの役割',
    'f03': 'キャリア理論',
    'f04': 'カウンセリング理論',
    'f05': '職業能力開発',
    'f06': '企業におけるキャリア形成支援',
    'f07': '労働市場',
    'f08': '労働政策・法令・社会保障',
    'f09': 'その他（学校教育・メンタルヘルス・技能など）'
  },

  // 元の f: フィールド → 分野ID のマッピング
  fieldMapping: {
    '社会及び経済の動向並びにキャリア形成支援の必要性の理解': 'f01',
    'キャリアコンサルティングの役割の理解': 'f02',
    'キャリアに関する理論': 'f03',
    'カウンセリングに関する理論': 'f04',
    '職業能力開発（リカレント教育を含む）の知識': 'f05',
    '企業におけるキャリア形成支援の知識': 'f06',
    '労働市場の知識': 'f07',
    '労働政策及び労働関係法令並びに社会保障制度の知識': 'f08'
    // 上記以外は f09 に自動分類
  },

  // 資料問題編のカテゴリ定義
  shiryoCategories: [
    { id:'shiryo_01', name:'労働経済の分析', rank:'S' },
    { id:'shiryo_02', name:'能力開発基本調査', rank:'S' },
    { id:'shiryo_03', name:'キャリアコンサルタント倫理綱領', rank:'S' },
    { id:'shiryo_04', name:'第12次職業能力開発基本計画', rank:'S' },
    { id:'shiryo_05', name:'セルフ・キャリアドック', rank:'A' },
    { id:'shiryo_06', name:'インターンシップ', rank:'A' },
    { id:'shiryo_07', name:'治療と仕事の両立支援', rank:'A' },
    { id:'shiryo_08', name:'労働力調査', rank:'A' },
    { id:'shiryo_09', name:'キャリア教育答申', rank:'A' },
    { id:'shiryo_10', name:'学び・学び直しガイドライン', rank:'A' },
    { id:'shiryo_11', name:'年次経済財政報告', rank:'A' },
    { id:'shiryo_12', name:'男女共同参画白書', rank:'A' },
    { id:'shiryo_13', name:'働く環境の変化に対応', rank:'B' },
    { id:'shiryo_14', name:'職場復帰支援の手引き', rank:'B' },
    { id:'shiryo_15', name:'睡眠ガイド2023', rank:'B' },
    { id:'shiryo_16', name:'経済社会情勢とキャリアコンサル', rank:'B' },
    { id:'shiryo_17', name:'副業・兼業ガイドライン', rank:'B' },
    { id:'shiryo_18', name:'キャリア・パスポート', rank:'B' },
    { id:'shiryo_19', name:'学校基本統計', rank:'B' },
    { id:'shiryo_20', name:'外国人雇用状況', rank:'B' },
    { id:'shiryo_21', name:'その他重点資料', rank:'B' }
  ],

  // 番外編のカテゴリ定義
  extraCategories: [
    { id:'extra_01', name:'キャリア理論', rank:'番外編' },
    { id:'extra_02', name:'カウンセリング理論', rank:'番外編' },
    { id:'extra_03', name:'発達理論', rank:'番外編' },
    { id:'extra_04', name:'転機の理論', rank:'番外編' },
    { id:'extra_05', name:'制度・支援', rank:'番外編' },
    { id:'extra_06', name:'法令・倫理', rank:'番外編' }
  ]
};