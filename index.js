// クイズ内容（全問題）
const quiz = [
  {
    question: '蔵之介の血液型は？',
    answers: ['A', 'B', 'AB', 'O'],
    correct: 'A'
  },
  {
    question: '蔵之介の身長は？',
    answers: ['176cm', '177cm', '178cm', '179cm'],
    correct: '177cm'
  },
  {
    question: '蔵之介のピアスの数は？',
    answers: ['3つ', '4つ', '5つ', '6つ'],
    correct: '5つ'
  },
  {
    question: '蔵之介の妹の名前は？',
    answers: ['裕実', '沙良', '志帆', '美紀'],
    correct: '志帆'
  },
  {
    question: '清嗣の血液型は？',
    answers: ['A', 'B', 'AB', 'O'],
    correct: 'O'
  },
  {
    question: '清嗣の身長は？',
    answers: ['168cm', '169cm', '170cm', '171cm'],
    correct: '170cm'
  },
  {
    question: '清嗣のピアスの数は？',
    answers: ['1つ', '2つ', '3つ', '4つ'],
    correct: '2つ'
  },
  {
    question: '清嗣の姉の名前は？',
    answers: ['純', '凛', '楓', '翠'],
    correct: '純'
  },
  {
    question: '隊長の血液型は？',
    answers: ['A', 'B', 'AB', 'O'],
    correct: 'A'
  },
  {
    question: '隊長の身長は？',
    answers: ['167cm', '168cm', '169cm', '170cm'],
    correct: '169cm'
  },
  {
    question: '隊長のポジションは？',
    answers: ['ガンナー', 'スナイパー', 'アタッカー', 'オペレーター'],
    correct: 'アタッカー'
  },
  {
    question: '網走の血液型は？',
    answers: ['A', 'B', 'AB', 'O'],
    correct: 'A'
  },
  {
    question: '網走の身長は？',
    answers: ['178cm', '179cm', '180cm', '181cm'],
    correct: '180cm'
  },
  {
    question: '網走の使用武器は？',
    answers: ['スコーピオン', '弧月', 'レイガスト', 'アイビス'],
    correct: '弧月'
  },
  {
    question: '網走の姉の名前は？',
    answers: ['涼', '華', '雪', '泉'],
    correct: '泉'
  },
  {
    question: '大谷の血液型は？',
    answers: ['A', 'B', 'AB', 'O'],
    correct: 'A'
  },
  {
    question: '大谷の身長は？',
    answers: ['164cm', '165cm', '166cm', '167cm'],
    correct: '164cm'
  },
  {
    question: '大谷の年齢は？',
    answers: ['14歳', '15歳', '16歳', '17歳'],
    correct: '16歳'
  },
 // {
 //   question: '大谷の姉の名前は？',
 //   answers: ['', '', '', ''],
 //   correct: ''
 // },
  {
    question: '大谷が一番なついているのは？',
    answers: ['隊長', '網走', '清嗣', '蔵之介'],
    correct: '蔵之介'
  },
  {
    question: '清嗣と蔵之介は何年何組？',
    answers: ['2-A', '2-C', '2-B', '2-E'],
    correct: '2-E'
  },
  {
    question: '隊長がどこかに行くと必ずみんなに買ってくれるお土産は？',
    answers: ['謎のキーホルダー', 'おやつ', 'Tシャツ', 'ポストカード'],
    correct: 'おやつ'
  }
];

// クイズ選定・管理用
let selectedQuiz = [];
let quizLength = 0;
let quizIndex = 0;
let score = 0;

// DOM要素取得
const $buttons = document.getElementsByTagName('button');
const buttonLength = 4;
const nextButton = document.getElementById('next');
const resultElement = document.getElementById('result');
const questionElement = document.getElementById('js-question');
const retryButton = document.getElementById('retry');

// シャッフル関数
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// クイズの表示
const setupQuiz = () => {
  questionElement.textContent = selectedQuiz[quizIndex].question;
  for (let i = 0; i < buttonLength; i++) {
    $buttons[i].textContent = selectedQuiz[quizIndex].answers[i];
    $buttons[i].disabled = false;
  }
  resultElement.textContent = '';
  nextButton.style.display = 'none';
  retryButton.style.display = 'none';
};

// 回答ボタンクリック処理
const clickHandler = (e) => {
  for (let i = 0; i < buttonLength; i++) {
    $buttons[i].disabled = true;
  }

  if (selectedQuiz[quizIndex].correct === e.target.textContent) {
    resultElement.textContent = '正解！';
    score++;
  } else {
    resultElement.textContent = `不正解！正解は ${selectedQuiz[quizIndex].correct} でした！`;
  }

  nextButton.style.display = 'inline-block';
};

// 回答ボタンにイベント登録
for (let i = 0; i < buttonLength; i++) {
  $buttons[i].addEventListener('click', clickHandler);
}

// 「次へ」ボタン処理
nextButton.addEventListener('click', () => {
  quizIndex++;
  if (quizIndex < quizLength) {
    setupQuiz();
  } else {
    questionElement.textContent = '終了！';
    resultElement.textContent = `正解数は ${quizLength} 問中 ${score} 問でした！`;
    nextButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
  }
});

// 「もう一度やってみる」ボタン処理
retryButton.addEventListener('click', () => {
  quizIndex = 0;
  score = 0;
  shuffle(quiz);
  selectedQuiz = quiz.slice(0, 10);
  quizLength = selectedQuiz.length;
  setupQuiz();
});

// 初期表示
shuffle(quiz);
selectedQuiz = quiz.slice(0, 10);
quizLength = selectedQuiz.length;
setupQuiz();
