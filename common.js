/* 三個頁面共用的資料與工具（行程、航班、名店、購物、地圖座標） */
  /* ---------- 圖示 ---------- */
  var I = {
    plane: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.5 13.5v-2L13 7V3.5a1.5 1.5 0 0 0-3 0V7l-8.5 4.5v2L10 11v5l-2.5 2v1.5L11.5 18l4 1.5V18L13 16v-5z"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19V6M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="12" r="1.6"/></svg>',
    food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3v18M4.5 3v5a2.5 2.5 0 0 0 5 0V3M17 21V3c-2.5 1.5-3 5-3 8h3"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    castle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9l8-5 8 5M6 13l6-3 6 3M5 13h14M7 13v8h10v-8M10 21v-4h4v4"/></svg>',
    bridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 17h20M5 17V7M19 17V7M5 8c3 6 11 6 14 0M9 12.5V17M12 13.5V17M15 12.5V17"/></svg>',
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l6 8h-3.5l4.5 6H5l4.5-6H6z"/><path d="M12 17v4"/></svg>',
    gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 6c4 1 16 1 20 0M4 10h16M7 6.8V21M17 6.8V21"/></svg>',
    house: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-5h4v5"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20c0-9 6-15 15-15 0 9-6 15-15 15z"/><path d="M5 20l8-8"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.2"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="3" width="12" height="14" rx="3"/><path d="M6 11h12M9 21l1.5-4M15 21l-1.5-4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  /* ---------- 航班 ---------- */
  var FLIGHTS = [
    {
      code: "JX1834", icao: "SJX1834", dir: "去程", dateLabel: "11/27 週五", aircraft: "A321neo",
      from: { iata: "TPE", city: "台北桃園 T1", time: "08:30", tz: "台灣時間" },
      to:   { iata: "UKB", city: "神戶機場 T2", time: "11:45", tz: "日本時間" },
      dep: "2026-11-27T08:30:00+08:00", arr: "2026-11-27T11:45:00+09:00",
      note: "冬季班表 11/27 這天 08:30 起飛（部分資料寫 08:20），以登機證為準。"
    },
    {
      code: "JX307", icao: "SJX307", dir: "回程", dateLabel: "12/2 週三", aircraft: "A321neo",
      from: { iata: "UKB", city: "神戶機場 T2", time: "13:30", tz: "日本時間" },
      to:   { iata: "RMQ", city: "台中清泉崗", time: "16:00", tz: "台灣時間" },
      dep: "2026-12-02T13:30:00+09:00", arr: "2026-12-02T16:00:00+08:00",
      note: "目的地是 <b>台中</b>。建議 11:30 前到神戶機場 T2。"
    }
  ];

  /* ---------- 行程 ---------- */
  var HOTEL_Q = "相鉄フレッサイン 神戸三宮";
  var DAYS = [
    {
      date: "2026-11-27", md: "11/27", wd: "週五", title: "抵達神戶・電器購物・港口夜景", tags: ["電器購物", "港口夜景"],
      stops: [
        { icon: "plane", name: "神戶機場 第 2 航廈", ja: "神戸空港 第2ターミナル", hoursTxt: "JX1834 預計 11:45 抵達",
          note: "入境後走有屋頂的連絡通道約 3 分鐘到第 1 航廈的 Port Liner 站，搭到三宮約 18 分、¥340。", q: "神戸空港 第2ターミナル" },
        { icon: "bed", name: "飯店寄放行李", ja: "相鉄フレッサイン 神戸三宮", hoursTxt: "入住 15:00 起",
          note: "中午先在櫃台寄放行李，晚上回來再辦入住。", q: HOTEL_Q },
        { icon: "food", name: "三宮午餐", hoursTxt: "三宮站周邊", q: "三宮 ランチ" },
        { icon: "bag", name: "Kojima × Sofmap 神戶 Harborland 店", ja: "コジマ×ソフマップ 神戸ハーバーランド店",
          hours: ["10:00", "20:00"], hoursTxt: "約 10:00–20:00", pill: ["info", "時間依 umie 商場"],
          note: "在 <strong>umie NORTH MALL 6F</strong>，逛完直接接著逛 umie。退稅網友回報是 J-TaxRefund，手續費以收據為準。店家沒有另外公布時間，先用 umie 商場時間標示。JR 三ノ宮站到神戶站約 5 分，步行約 5 分。",
          q: "コジマ×ソフマップ 神戸ハーバーランド店" },
        { icon: "bag", name: "umie／MOSAIC", ja: "神戸ハーバーランドumie・モザイク", hours: ["10:00", "20:00"],
          hoursTxt: "商店 10:00–20:00・MOSAIC 餐廳 11:00–22:00", pill: ["ok", "當天有營業"],
          note: "MOSAIC 面向神戶港，傍晚看港塔和夜景。11 月底日落約 16:50。MOSAIC 大摩天輪約 10:00–22:00（依時期）。", q: "神戸ハーバーランドumie モザイク" },
        { icon: "train", travel: true, name: "回飯店", hoursTxt: "JR 神戶站 → 三ノ宮站", q: HOTEL_Q }
      ]
    },
    {
      date: "2026-11-28", md: "11/28", wd: "週六", title: "姬路城・明石海峽大橋", tags: ["城堡", "跨海大橋"],
      stops: [
        { icon: "castle", name: "姬路城", ja: "姫路城", hours: ["09:00", "17:00"], hoursTxt: "9:00–17:00（最後入城 16:00）", pill: ["ok", "當天有營業"],
          note: "18 歲以上非姬路市民 <strong>¥2,500</strong>，18 歲以下免費。可先在網路買數位票「しらさぎチケット」免排隊。JR 新快速 三ノ宮→姬路約 40 分。", q: "姫路城" },
        { icon: "food", name: "姬路午餐", hoursTxt: "姬路站周邊", q: "姫路駅 ランチ" },
        { icon: "bridge", name: "明石海峽大橋／舞子海上步道", ja: "舞子海上プロムナード（舞子公園）", hours: ["09:00", "18:00"],
          hoursTxt: "9:00–18:00（最後入館 17:30）", pill: ["warn", "當天人多"],
          note: "10–3 月每月第 2 個週一休館，11/28 週六正常開。<strong>11/28、29 有「明石海峽大橋海上步行」活動</strong>（已截止報名），橋の科学館一帶會比較擠。JR 舞子站／山陽舞子公園站步行約 5 分；在步道上看夕陽剛好。",
          q: "舞子海上プロムナード" },
        { icon: "train", travel: true, name: "回三宮", hoursTxt: "JR 舞子站 → 三ノ宮站", q: HOTEL_Q }
      ]
    },
    {
      date: "2026-11-29", md: "11/29", wd: "週日", title: "千里中央・美國村・心齋橋・電電街", tags: ["大阪街頭", "購物"],
      stops: [
        { icon: "tree", name: "千里中央公園 南廣場", ja: "千里中央公園 南広場", hoursTxt: "公園全天開放",
          note: "北大阪急行「千里中央站」往東步行約 15 分。園內 1OOORE SCENES 有義大利餐廳 SEN℃（週末 10:30–22:00）。如果是去參加活動，以主辦單位公告的時間為準。",
          q: "千里中央公園" },
        { icon: "bag", name: "美國村", ja: "アメリカ村", hours: ["11:00", "20:00"], hoursTxt: "多數店家約 11:00–20:00",
          note: "以三角公園（御津公園）為中心，古著店最集中。地鐵心齋橋站步行約 5 分。", q: "アメリカ村 三角公園" },
        { icon: "pin", name: "心齋橋／道頓堀", ja: "心斎橋筋商店街・道頓堀", hoursTxt: "各店不同，道頓堀餐廳營業到深夜",
          note: "Glico 跑跑人看板在道頓堀橋旁。", q: "道頓堀 グリコサイン" },
        { icon: "bag", name: "日本橋電電街", ja: "日本橋でんでんタウン", hours: ["11:00", "20:00"], hoursTxt: "各店不同，多數約 20:00–21:00 打烊", pill: ["warn", "晚上會關"],
          note: "排在晚上，建議 <strong>19:00 前</strong>到。例如駿河屋 日本橋でんでんタウン店 12:00–21:00。地鐵日本橋站 5 號出口或南海難波站步行約 5 分。", q: "日本橋でんでんタウン" },
        { icon: "train", travel: true, name: "回神戶", hoursTxt: "阪神 大阪難波站 → 神戶三宮站（直達）", q: HOTEL_Q }
      ]
    },
    {
      date: "2026-11-30", md: "11/30", wd: "週一", title: "京都：金閣寺・貴船・minä perhonen", tags: ["寺院", "山景", "設計品牌"],
      stops: [
        { icon: "castle", name: "金閣寺", ja: "鹿苑寺（金閣寺）", hours: ["09:00", "17:00"], hoursTxt: "9:00–17:00・全年無休", pill: ["ok", "當天有營業"],
          note: "大人 ¥500，門票是一張御守。金閣寺和貴船一西一北距離不近，建議 9:00 一開門就到。", q: "金閣寺" },
        { icon: "gate", name: "貴船神社", ja: "貴船神社", hours: ["06:00", "20:00"], hoursTxt: "6:00–20:00（授與所 9:00–17:00）", pill: ["ok", "當天有營業"],
          note: "11/30 是開到 20:00 的最後一天，12/1 起改 18:00。紅葉點燈 11/7–11/24，這次<strong>已經結束</strong>。叡山電車「貴船口」轉京都巴士 33 號「貴船」，下車步行約 5 分。山裡比市區冷，多帶一件外套。",
          q: "貴船神社 本宮" },
        { icon: "pin", name: "京都市區", hoursTxt: "自由安排", q: "四条河原町" },
        { icon: "bag", name: "minä perhonen 京都店", ja: "ミナ ペルホネン 京都・寿ビルディング", hours: ["11:00", "19:00"],
          hoursTxt: "平日 11:00–19:00（週四公休）", pill: ["ok", "週一有營業"],
          note: "<strong>19:00 打烊</strong>，貴船回來別拖太晚。1F 是主店，同棟 3F neutraali／materiaali、4F piece、5F galleria nolla，營業時間相同。京都河原町站步行約 5 分。",
          q: "minä perhonen kyoto 寿ビルディング" },
        { icon: "train", travel: true, name: "回神戶", hoursTxt: "阪急 京都河原町站 →（十三轉車）→ 神戶三宮站", q: HOTEL_Q }
      ]
    },
    {
      date: "2026-12-01", md: "12/1", wd: "週二", title: "北野異人館・布引香草園纜車", tags: ["神戶山手散步", "纜車"],
      stops: [
        { icon: "house", name: "北野異人館（風見雞之館）", ja: "神戸北野異人館 風見鶏の館", hours: ["09:00", "17:00"],
          hoursTxt: "9:00–17:00（最後入館 16:45）", pill: ["ok", "當天有營業"],
          note: "每月第 3 個週二休館，12/1 是第 1 個週二，正常開。門票 ¥500，和萌黃之館聯票 ¥800。", q: "風見鶏の館" },
        { icon: "leaf", name: "神戶布引香草園／纜車", ja: "神戸布引ハーブ園／ロープウェイ", hours: ["09:30", "17:15"],
          hoursTxt: "9:30–17:15（纜車上山末班 16:45）", pill: ["warn", "平日較早關"],
          note: "11/7–12/28 是「神戶聖誕市集」期間，週一到週四沒有夜間營業，<strong>下午 16:45 前要上山</strong>。這段期間票價是聖誕特別價。纜車站在新神戶站步行約 5 分。", q: "神戸布引ロープウェイ ハーブ園山麓駅" },
        { icon: "pin", name: "神戶市區自由活動", hoursTxt: "自由安排", q: "三宮センター街" },
        { icon: "bed", travel: true, name: "回飯店", hoursTxt: "最後一晚", q: HOTEL_Q }
      ]
    },
    {
      date: "2026-12-02", md: "12/2", wd: "週三", title: "退房・神戶機場・回台灣", tags: ["預留報到時間"],
      stops: [
        { icon: "bed", name: "飯店退房", ja: "相鉄フレッサイン 神戸三宮", hoursTxt: "11:00 前退房",
          note: "建議 10:30 左右出發去機場。", q: HOTEL_Q },
        { icon: "train", name: "Port Liner 三宮 → 神戶機場", ja: "ポートライナー 三宮駅", hoursTxt: "約 18 分・¥340",
          note: "上車前確認是往「神戸空港」的車。機場站在第 1 航廈，下車走連絡通道約 3 分到第 2 航廈。", q: "ポートライナー 三宮駅" },
        { icon: "plane", name: "神戶機場 T2・JX307", ja: "神戸空港 第2ターミナル", hoursTxt: "13:30 起飛 → 台中 16:00", pill: ["warn", "飛台中"],
          note: "國際線建議 <strong>11:30 前</strong>到機場辦報到。", q: "神戸空港 第2ターミナル" }
      ]
    }
  ];

  /* ---------- 地圖座標（行程點） ---------- */
  var STOP_LL = {
    "d1-0": [34.6328, 135.2238], "d1-2": [34.6946, 135.1953], "d1-3": [34.6808, 135.1830], "d1-4": [34.6790, 135.1852],
    "d2-0": [34.8394, 134.6939], "d2-1": [34.8267, 134.6904], "d2-2": [34.6278, 135.0343],
    "d3-0": [34.8110, 135.5062], "d3-1": [34.6721, 135.4983], "d3-2": [34.6687, 135.5013], "d3-3": [34.6597, 135.5063],
    "d4-0": [35.0394, 135.7292], "d4-1": [35.1219, 135.7628], "d4-3": [35.0029, 135.7690],
    "d5-0": [34.7016, 135.1907], "d5-1": [34.7068, 135.1952], "d5-2": [34.6925, 135.1935],
    "d6-1": [34.6936, 135.1961], "d6-2": [34.6328, 135.2238]
  };
  var STOP_ADDR = { "d4-3": "京都府京都市下京区市之町251-2" };
  var HOTEL = { name: "相鐵 FRESA INN 神戶三宮", ll: [34.6967, 135.1990], addr: "兵庫県神戸市中央区旭通5丁目2-3" };

  /* ---------- 附近食べログ名店（不吃牛、每人 ¥5,000 內） ---------- */
  /* closed：公休的星期（0=日 … 6=六） */
  var FOOD = [
    { id: "kichibe", name: "かつ丼 吉兵衛 三宮本店", area: "三宮", genre: "豬排丼",
      eat: "招牌玉子とじかつ丼（豬肉），另有蝦排丼", budget: "約 ¥1,000", hours: "10:30–19:30", closed: [], closedTxt: "不定休",
      note: "センタープラザ西館 B1，只有吧台，翻桌很快。菜單也有牛排丼，點餐時避開。",
      addr: "兵庫県神戸市中央区三宮町2丁目11", ll: [34.6921, 135.1913], days: ["d1", "d5"] },
    { id: "shikasai", name: "施家菜", area: "三宮・北野坂下", genre: "廣東・香港料理",
      eat: "午餐套餐（前菜四品＋主菜），港式海鮮炒麵", budget: "午餐約 ¥2,000（晚餐 ¥10,000 起，超出預算）",
      hours: "午餐 11:45–14:30（週末 11:30 起）", closed: [2], closedTxt: "週二",
      note: "只推薦午餐。部分菜色用神戶牛，點套餐時先講不吃牛。",
      addr: "兵庫県神戸市中央区下山手通3-11-17", ll: [34.6941, 135.1867], days: ["d1", "d5"] },
    { id: "toko", name: "東光", area: "元町", genre: "中華料理・餃子", badge: "食べログ 中国料理百名店 2023",
      eat: "餃子、町中華定食", budget: "午餐 ¥1,000–1,999・晚餐店家標示 ¥3,000–3,999",
      hours: "11:30–14:30、17:00–20:30", closed: [3], closedTxt: "週三",
      note: "JR 元町站南口對面 2F。晚餐口碑實際花費偏高，想守住 ¥5,000 選午餐最穩。只收現金。",
      addr: "兵庫県神戸市中央区元町通1-13-11", ll: [34.6894, 135.1869], days: ["d1", "d5"],
      tabelog: "https://tabelog.com/hyogo/A2801/A280102/28001055/" },
    { id: "roshoki", name: "南京町 老祥記", area: "元町・南京町", genre: "豬肉包（豚まん）",
      eat: "豚まん一個 ¥120，三個起點", budget: "¥1,000 內", hours: "10:00–18:30（賣完為止）", closed: [1], closedTxt: "週一",
      note: "南京町最長的排隊名物。本店改建中、先在臨時店面營業，預計 2026 年 11 月前後完工，去之前查一下現在在哪個店面。",
      addr: "兵庫県神戸市中央区元町通2-1-14", ll: [34.6882, 135.1879], days: ["d1", "d5"] },

    { id: "yamayoshi", name: "炭焼あなご やま義", area: "姬路站前", genre: "星鰻（穴子）料理",
      eat: "あなごめし、蒸・燒・佃煮三吃定食", budget: "白燒單點 ¥1,600、便當 ¥2,500", hours: "11:00–20:00（L.O. 19:30）", closed: [], closedTxt: "無休",
      note: "JR 姬路站北口、お溝筋商店街一進去。週末開店前就排隊，11:00 前到或下午 2 點後再來。",
      addr: "兵庫県姫路市駅前町301", ll: [34.8283, 134.6899], days: ["d2"] },
    { id: "totoro", name: "立ち喰い寿司 魚路", area: "姬路站高架下", genre: "立食壽司",
      eat: "招牌一本穴子、特上握壽司套餐 ¥2,090", budget: "¥1,000–3,000", hours: "營業時間出發前確認", closed: [], closedTxt: "未查到", unverified: true,
      note: "在 JR 姬路站直通的ビエラ姫路，一貫 ¥120 起，開店前 30 分～1 小時就開始排。",
      addr: "兵庫県姫路市南駅前町127-1", ll: [34.8262, 134.6906], days: ["d2"] },
    { id: "takoiso", name: "たこ磯", area: "明石・魚の棚（舞子往西 2 站）", genre: "明石燒（玉子燒）",
      eat: "玉子燒 15 個 ¥800、穴子入り ¥950", budget: "¥1,000 內", hours: "10:00–19:00", closed: [], closedTxt: "無休",
      note: "魚の棚商店街裡。JR 舞子到明石約 5 分，去大橋前後順路。",
      addr: "兵庫県明石市本町1丁目1-11", ll: [34.6474, 134.9937], days: ["d2"] },
    { id: "yokoi", name: "よこ井", area: "明石・魚の棚", genre: "明石燒（玉子燒）",
      eat: "明石燒 10 個 ¥500，沾冰涼昆布高湯的老吃法", budget: "¥1,000 內", hours: "10:00–17:00", closed: [4], closedTxt: "週四",
      note: "17:00 就關，要排在看大橋之前。",
      addr: "兵庫県明石市本町1丁目1-13", ll: [34.6476, 134.9941], days: ["d2"] },

    { id: "kogaryu", name: "大阪アメリカ村 甲賀流 本店", area: "美國村・三角公園前", genre: "章魚燒", badge: "米其林指南介紹過",
      eat: "ソースマヨ 10 個約 ¥600，買了在對面三角公園吃", budget: "¥1,000 內", hours: "11:00–20:00", closed: [], closedTxt: "1/1–1/2 休",
      addr: "大阪府大阪市中央区西心斎橋2-18-4", ll: [34.6719, 135.4985], days: ["d3"] },
    { id: "mizuno", name: "お好み焼 美津の", area: "道頓堀", genre: "大阪燒", badge: "米其林必比登推介",
      eat: "山芋燒（山芋 100% 麵糊，豬肉＋海鮮）、豚玉", budget: "¥2,000–2,999", hours: "11:00–22:00（L.O. 21:00）", closed: [4], closedTxt: "週四（部分資料寫無休）",
      note: "有牛筋（すじ）口味要避開；「美津の焼」加了特製絞肉，不確定是什麼肉，保險點山芋燒或豚玉。常大排隊。",
      addr: "大阪府大阪市中央区道頓堀1-4-15", ll: [34.6688, 135.5029], days: ["d3"] },
    { id: "okaru", name: "おかる", area: "千日前（電電街旁）", genre: "大阪燒",
      eat: "豬肉大阪燒，老闆娘會用美乃滋在上面畫圖", budget: "晚餐 ¥2,000–2,999・午餐 ¥1,000–1,999",
      hours: "12:00–15:00、17:00–22:00", closed: [4], closedTxt: "週四、第 3 個週三",
      note: "逛完電電街走過去約 10 分，晚餐剛好。",
      addr: "大阪府大阪市中央区千日前1-9-19", ll: [34.6662, 135.5047], days: ["d3"] },

    { id: "toyouke", name: "とようけ茶屋", area: "北野天滿宮前（金閣寺南邊約 2 km）", genre: "豆腐・湯葉",
      eat: "生ゆば丼、とようけ丼、奴膳 ¥1,540", budget: "¥1,000–2,000", hours: "11:00–15:00", closed: [4], closedTxt: "週四，另每月 2 次不定休",
      note: "開店就排隊。金閣寺看完搭公車或計程車約 10 分過來吃午餐；15:00 就收。",
      addr: "京都府京都市上京区紙屋川町822", ll: [35.0285, 135.7348], days: ["d4"] },
    { id: "toriijaya", name: "鳥居茶屋", area: "貴船", genre: "和食定食",
      eat: "松花堂、定食", budget: "約 ¥2,000", hours: "營業時間出發前確認（冬天可能較早收）", closed: [], closedTxt: "未查到", unverified: true,
      note: "貴船多半是川床懷石（¥8,000 起，超出預算），這家是少數平價的。",
      ll: [35.1214, 135.7631], days: ["d4"] },
    { id: "kibuneclub", name: "貴船倶楽部", area: "貴船", genre: "咖啡・輕食",
      eat: "京都湯葉飯、抹茶聖代、紅豆湯", budget: "¥2,000 內", hours: "營業時間出發前確認", closed: [], closedTxt: "未查到", unverified: true,
      note: "參拜完休息喝杯熱的。",
      ll: [35.1196, 135.7638], days: ["d4"] },
    { id: "kaneyo", name: "京極かねよ", area: "河原町（minä perhonen 走路約 10 分）", genre: "鰻魚",
      eat: "名物きんし丼：鰻魚飯上蓋一整片京風玉子燒", budget: "¥3,000–3,999", hours: "11:30–15:30、17:00–20:30", closed: [3], closedTxt: "週三、週二晚上",
      note: "逛完 minä perhonen 吃晚餐，吃完從京都河原町搭阪急回神戶。",
      addr: "京都府京都市中京区松ヶ枝町456", ll: [35.0069, 135.7682], days: ["d4"] },

    { id: "freundlieb", name: "カフェ フロインドリーブ 本店", area: "新神戶（北野與布引之間）", genre: "麵包・咖啡（教堂改建）",
      eat: "三明治、德國麵包、聖誕史多倫", budget: "¥1,000–3,000", hours: "10:00–18:00（咖啡 L.O. 17:30）", closed: [3], closedTxt: "週三",
      note: "老教堂改建，2F 是咖啡廳。招牌之一是烤牛肉三明治，請點別的口味。11 月起有賣聖誕史多倫。",
      addr: "兵庫県神戸市中央区生田町4-6-15", ll: [34.7027, 135.1958], days: ["d5"] }
  ];
  var FOOD_NOTE = {
    d2: "晚餐回三宮的話，可以參考 11/27 那天列的三宮・元町名店。",
    d5: "北野和新神戶在三宮北邊，三宮・元町的店也走得到。"
  };
  var DAY_COLORS = ["#c4382e", "#c26a00", "#2b7549", "#285f93", "#7a4bb0", "#4d5a68"];

  /* ---------- 工具 ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function mapUrl(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function zoned(tz) {
    var parts = {};
    new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    return { date: parts.year + "-" + parts.month + "-" + parts.day, hh: parts.hour, mm: parts.minute, mins: (+parts.hour) * 60 + (+parts.minute) };
  }
  function toMins(t) { var a = t.split(":"); return (+a[0]) * 60 + (+a[1]); }
  function dayDiff(a, b) { return Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 86400000); }
  function dur(ms) {
    var m = Math.max(0, Math.round(ms / 60000)), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
    if (d > 0) return d + " 天 " + h + " 小時";
    if (h > 0) return h + " 小時 " + mm + " 分";
    return mm + " 分";
  }


  /* ---------- 附近名店 ---------- */
  var WD = ["日", "一", "二", "三", "四", "五", "六"];
  function weekdayOf(dateStr) { return new Date(dateStr + "T03:00:00Z").getUTCDay(); } /* 03:00Z = 日本中午 */
  function tabelogUrl(r) { return r.tabelog || "https://www.google.com/search?q=" + encodeURIComponent(r.name + " 食べログ"); }
  function foodMapUrl(r) { return mapUrl(r.name + " " + (r.addr || r.area)); }
  function foodPill(r, dateStr) {
    var wd = weekdayOf(dateStr);
    if (r.closed.indexOf(wd) >= 0) return '<span class="pill warn">這天週' + WD[wd] + '公休</span>';
    if (r.unverified) return '<span class="pill info">時間待確認</span>';
    return '<span class="pill ok">週' + WD[wd] + '有營業</span>';
  }
  function foodHtml(d, id) {
    var list = FOOD.filter(function (r) { return r.days.indexOf(id) >= 0; });
    if (!list.length) return "";
    return '<div class="food">' +
      '<div class="food-head"><h4>附近的食べログ名店</h4><a class="btn small" href="map.html#' + id + '">在地圖上看這天</a></div>' +
      '<p class="food-sub">已排除以牛肉為主的店，每人預算都在 ¥5,000 內。' + (FOOD_NOTE[id] || "") + '</p>' +
      '<div class="rgrid">' + list.map(function (r) {
        return '<article class="rcard">' +
          '<div class="rtop"><h5 lang="ja">' + esc(r.name) + '</h5>' + foodPill(r, d.date) + '</div>' +
          '<div class="rarea">' + esc(r.area) + '</div>' +
          '<div class="rgenre"><strong>' + esc(r.genre) + '</strong>' + (r.badge ? ' <span class="badge">' + esc(r.badge) + '</span>' : "") + '</div>' +
          '<div class="rmeta">' +
            '<div><span class="k">吃什麼</span>' + esc(r.eat) + '</div>' +
            '<div><span class="k">預算</span>' + esc(r.budget) + '</div>' +
            '<div><span class="k">營業</span>' + esc(r.hours) + '</div>' +
            '<div><span class="k">公休</span>' + esc(r.closedTxt) + '</div>' +
          '</div>' +
          (r.note ? '<p class="rnote">' + esc(r.note) + '</p>' : "") +
          '<div class="rlinks"><a href="' + foodMapUrl(r) + '">Google 地圖 ↗</a><a href="' + tabelogUrl(r) + '">食べログ ↗</a></div>' +
        '</article>';
      }).join("") + '</div></div>';
  }


/* ---------- 飯店周邊購物 ---------- */
/* open：營業時間 [開, 關]；"24h" = 24 小時；null = 未查到。ll 為大約位置，地圖頁會再用地址校正 */
var SHOP_CATS = {
  super:  { label: "超市",       mk: "超", color: "#2b7549" },
  drug:   { label: "藥妝",       mk: "藥", color: "#7a4bb0" },
  donki:  { label: "唐吉訶德",   mk: "唐", color: "#c26a00" },
  muji:   { label: "無印良品",   mk: "無", color: "#7d1d1d" },
  loft:   { label: "LoFt",       mk: "Lo", color: "#9a7b00" },
  gu:     { label: "GU",         mk: "GU", color: "#1f3f8f" },
  uniqlo: { label: "UNIQLO",     mk: "U",  color: "#c4382e" },
  coins3: { label: "3COINS",     mk: "3",  color: "#2f7480" }
};
var SHOPS = [
  { id: "kohyo", cat: "super", name: "KOHYO 三宮店", where: "ミント神戸 B1，和車站直通", hours: "7:00–23:00", open: ["07:00", "23:00"],
    tip: "生鮮、熟食便當齊全，早上 7 點就開，晚上回飯店前買宵夜也方便。", addr: "兵庫県神戸市中央区雲井通7-1-1", ll: [34.6941, 135.1960] },
  { id: "daiei", cat: "super", name: "ダイエー 神戸三宮店", where: "JR 三ノ宮站東口步行約 1 分（同棟 2–9F 是三宮 OPA2）", hours: "9:00–23:00", open: ["09:00", "23:00"],
    tip: "大型超市，零食、餅乾伴手禮、飲料一次買齊。", addr: "兵庫県神戸市中央区雲井通6-1-15", ll: [34.6936, 135.1983] },
  { id: "oasis", cat: "super", name: "阪急オアシス 神戸旭通店", where: "旭通（和飯店同一區），地下鐵三宮站改札旁有入口", hours: "10:00–22:00（地下鐵側熟食麵包區平日 8:00 開）", open: ["10:00", "22:00"],
    tip: "走精緻路線的超市，熟食和麵包好買。", ll: null },
  { id: "kokumin",  cat: "drug", name: "KoKuMiN JR三宮駅東口店", where: "JR 三ノ宮站東口", hours: "8:00–22:00", open: ["08:00", "22:00"],
    tip: "藥妝、日用品，出站就到。", ll: [34.6948, 135.1966] },
  { id: "sundrug",  cat: "drug", name: "サンドラッグ 三宮旭通店", where: "旭通（和飯店同一區）", hours: "9:00–22:00", open: ["09:00", "22:00"],
    tip: "藥妝、日用品。", ll: null },
  { id: "donki", tax: "J-TaxRefund・官方公告申請免手續費（機場領現金另收）",  cat: "donki", name: "ドン・キホーテ 三宮店", where: "下山手通，JR 三ノ宮站步行約 5 分", hours: "24 小時", open: "24h",
    tip: "藥妝、零食、伴手禮最齊，24 小時營業，最後一晚補貨首選。", addr: "兵庫県神戸市中央区下山手通2-12-3", ll: [34.6957, 135.1913] },
  { id: "donki-opa", tax: "J-TaxRefund・官方公告申請免手續費（機場領現金另收）",  cat: "donki", name: "ドン・キホーテ 三宮オーパ センター街店", where: "三宮 OPA B1（三宮センター街）", hours: "10:00–21:00", open: ["10:00", "21:00"],
    tip: "主打美妝保養、彩妝、隱形眼鏡，適合專門買美妝。", addr: "兵庫県神戸市中央区三宮町1-5-26", ll: [34.6919, 135.1928] },
  { id: "muji-hankyu", cat: "muji", name: "無印良品 神戸阪急", where: "神戸阪急 新館 5F・6F", hours: "10:00–20:00", open: ["10:00", "20:00"],
    tip: "LoFt 就在同一棟 4F，一次逛完。", addr: "兵庫県神戸市中央区小野柄通8-1-8", ll: [34.6929, 135.1966] },
  { id: "mujicom", cat: "muji", name: "MUJIcom さんちか", where: "地下街さんちか 6 番街（各線三宮站直通）", hours: "10:00–20:00", open: ["10:00", "20:00"],
    tip: "小型店，食品和旅行小物為主。每月第 3 個週三公休，12 月無休。", addr: "兵庫県神戸市中央区三宮町1-10-1", ll: [34.6930, 135.1945] },
  { id: "muji-bal", cat: "muji", name: "無印良品 神戸BAL", where: "神戸BAL，三宮站往元町方向約 500 m", hours: "11:00–20:00", open: ["11:00", "20:00"],
    tip: "2024 年改裝重開的大店。", ll: null },
  { id: "loft", tax: "網友回報用 JPrefund，結帳時再確認", cat: "loft", name: "神戸ロフト", where: "神戸阪急 新館 4F", hours: "10:00–20:00", open: ["10:00", "20:00"],
    tip: "文具、美妝雜貨、季節小物；樓上 5F・6F 就是無印良品。", ll: [34.6932, 135.1970] },
  { id: "gu", tax: "J-TaxRefund（非官方整理）・網友回報手續費約 1%",  cat: "gu", name: "GU 三宮オーパ店", where: "三宮 OPA，阪神神戸三宮站 A6 出口步行約 1 分", hours: "依三宮 OPA（約 11:00–21:00，各店不同）", open: null,
    tip: "營業時間沒查到店家自己的公告，出發前看一下 GU 官網。", ll: [34.6921, 135.1925] },
  { id: "uniqlo", tax: "J-TaxRefund（非官方整理），結帳時再確認", cat: "uniqlo", name: "ユニクロ 神戸三宮店", where: "三宮センター街東口 Style Plaza 1–5F", hours: "營業時間出發前查官網", open: null,
    tip: "兵庫縣最大的 UNIQLO，有 UTme! 客製 T 恤和神戶聯名商品。", addr: "兵庫県神戸市中央区三宮町1-7-5", ll: [34.6926, 135.1938] },
  { id: "3coins", tax: "JPrefund（網路整理），以收據為準", cat: "coins3", name: "3COINS 神戸店", where: "三宮本通商店街（生田ロードとトアロード之間）グレース神戸ビル 1F，旧居留地・大丸前站步行約 2 分", hours: "10:00–20:00", open: ["10:00", "20:00"],
    tip: "收納、廚房小物、旅行用品多是 ¥300 起。可刷卡、Alipay、WeChat Pay。同店同日未稅滿 ¥5,000 才能退稅，¥300 的東西要買十幾樣。第一天去的 umie NORTH MALL 2F 也有一家 3COINS+plus（網路整理）。", addr: "兵庫県神戸市中央区三宮町2-10-7", ll: [34.6910, 135.1918] }
];

/* 共用：距離與營業狀態 */
function distKm(a, b) {
  var R = 6371, toR = Math.PI / 180, dLat = (b[0] - a[0]) * toR, dLng = (b[1] - a[1]) * toR;
  var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * toR) * Math.cos(b[0] * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.asin(Math.sqrt(h));
}
function openState(open, mins) {
  if (open === "24h") return { cls: "live-open", txt: "24 小時營業" };
  if (!open) return null;
  var o = toMins(open[0]), c = toMins(open[1]);
  if (mins < o) return { cls: "live-soon", txt: open[0] + " 開門" };
  if (mins < c) return { cls: "live-open", txt: "營業中 · 到 " + open[1] };
  return { cls: "live-closed", txt: "已打烊 · 明天 " + open[0] + " 開" };
}

/* ---------- 退稅業者（2026/11 新制） ---------- */
/* kobeCash：神戶機場的 Cash Japan 機台能不能領（官網只列 Global Blue、J&J、JPrefund） */
var TAX_OPS = {
  jtax:   { name: "J-TaxRefund", co: "J&J Tax Free（JTB × JCB）", kobeCash: true,
            url: "https://j-taxrefund.com/", go: "前往 J-TaxRefund 登錄", how: "網站，不用 App；有中文",
            reg: "掃收據 QR Code 進網頁登錄，不用 App。購買隔天起 180 天內完成；在日本買過東西才能做護照驗證",
            to: "信用卡、簽帳卡、Alipay、WeChat Pay、銀行轉帳（¥100,000 以上，美元匯出）、機場現金（要先在帳號選現金）",
            stores: "唐吉訶德（官方）；BicCamera、Kojima、Sofmap、松本清、Cocokara、UNIQLO、GU（媒體或網友整理）",
            fee: "官方沒公布費率；唐吉訶德官方說免手續費；網友回報松本清 0.33%、GU 約 1%",
            speed: "幾週到約 2 個月" },
  jpref:  { name: "JPrefund", co: "Smart Technologies & Resources（SmartDetax）", kobeCash: true,
            url: "https://jprefund.com/", go: "前往 JPrefund 登錄", how: "網站，不用 App（Google 搜不太到）",
            reg: "jprefund.com 網頁登錄：掃 QR Code、輸入 20 碼交易碼，或輸入日期加金額。購買日起 200 天內",
            to: "信用卡、Alipay+、WeChat Pay、銀行轉帳、機場現金",
            stores: "3COINS、JR 東日本、AEON Mall、BOOKOFF、PARCO、HANDS；LoFt（網友回報）",
            fee: "扣資料處理費和匯款費，各店自訂，登錄後看得到；網友回報 3COINS 約 ¥300",
            speed: "看店家，可能出境後超過 1 個月" },
  gb:     { name: "Global Blue", co: "Global Blue TFS Japan", kobeCash: true,
            url: "https://www.globalblue.com/en/shoppers/how-to-shop-tax-free/guides/japan/japan-tax-free-shopping-2026", go: "Global Blue 日本退稅說明", how: "App「Global Blue – Shop Tax Free」",
            reg: "店家給的 email 或 QR Code，用 App 或網頁；退款方式可之後再補",
            to: "信用卡等非現金、市區或機場領現金",
            stores: "阪急・阪神百貨、Yodobashi、京王、西武・SOGO（官方）；高島屋（網友回報）",
            fee: "沒有統一費率，印在退稅單上；高島屋扣稅額的 23%（約未稅價 2.3%）",
            speed: "通常 3–5 天", extra: "Yodobashi 梅田、京都等 11 店可在市區先領現金" },
  pie:    { name: "PIE VAT", co: "Pie Systems Japan", kobeCash: false,
            url: "https://pievat.com/tourists/japan", go: "PIE VAT 說明・下載 App", how: "App「PIE VAT」，要當天在店裡辦",
            reg: "一定要當天在店裡用 App（或網頁）掃 QR、輸入 6 碼完成，離開店就不能補",
            to: "信用卡、銀行、PayPal、WeChat Pay（依地區）",
            stores: "三井 Outlet Park、LaLaport、SHIBUYA109、東急 Plaza；Montbell（網友回報）",
            fee: "未稅價 1.5–3.0% 服務費，再加 0.28–0.32% 提領費",
            speed: "在 App 按提領後最多 15 個工作天" },
  ocean:  { name: "Ocean Tax Refund", co: "Ocean", kobeCash: false,
            url: "https://ocean.inc/service", go: "Ocean 官網", how: "掃收據 QR，用網頁或 LINE 小程式",
            reg: "不用 App：網頁、LINE 小程式（台灣）或微信小程式",
            to: "依退款方式",
            stores: "山田電機、Animate（官方）；西友、Trial（媒體）",
            fee: "購買金額 1.55%，再加依退款方式的處理費",
            speed: "未公布", extra: "曾有台灣旅客反映退到台灣帳戶被跨國匯款費吃掉，Ocean 已公告道歉並說會改善" }
};
/* 依店名推測業者（網路整理，以收據為準） */
var TAX_GUESS = [
  [/無印|muji/i, ""],   /* 無印良品沒公開，在百貨裡也不要猜成百貨的業者 */
  [/ドン・?キホーテ|ドンキ|donki|唐吉訶德|mega ?ドン/i, "jtax"], [/ビック|bic ?camera/i, "jtax"], [/コジマ|kojima/i, "jtax"],
  [/ソフマップ|sofmap/i, "jtax"], [/マツモトキヨシ|マツキヨ|松本清/i, "jtax"], [/ココカラ|cocokara/i, "jtax"],
  [/ユニクロ|uniqlo/i, "jtax"], [/(^|[\s　])GU([\s　]|$)|ジーユー/i, "jtax"],
  [/3 ?coins|スリーコインズ/i, "jpref"], [/イオン|aeon/i, "jpref"], [/ブックオフ|book ?off/i, "jpref"], [/パルコ|parco/i, "jpref"],
  [/ハンズ|hands/i, "jpref"], [/ロフト|loft/i, "jpref"],
  [/阪急|阪神|ヨドバシ|yodobashi|京王|西武|そごう|sogo|高島屋/i, "gb"],
  [/モンベル|mont-?bell|三井アウトレット|ららぽーと|lalaport|shibuya ?109|渋谷109|東急プラザ/i, "pie"],
  [/ヤマダ|labi|山田電機|アニメイト|animate|西友|seiyu|トライアル/i, "ocean"]
];
function guessTaxOp(name) {
  for (var i = 0; i < TAX_GUESS.length; i++) if (TAX_GUESS[i][0].test(name || "")) return TAX_GUESS[i][1];
  return "";
}
/* Cash Japan 標準服務費：退款額的 10%（估算，實際可能有每筆最低／最高、以 ¥50 為單位） */
var CASH_JAPAN_URL = "https://www.cashjapan.com/ja/get-your-refund/";
function cashFee(refund) { return Math.round(refund * 0.1); }
