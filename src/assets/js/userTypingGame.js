import {nextTick, ref, watch} from 'vue'
import { questions } from './questions'
export function useTypingGame() {

  // 状態管理
  const startFlg = ref(false)
  const current_question = ref('')
  const typeBox = ref('')
  const current_question_counts = ref(0)
  const question_counts = ref(0)

  // タイマー関連
  const timeLimit = ref(60)
  const remainingTime = ref(timeLimit.value)
  const timerInterval = ref(null)

  // タイマーを開始する関数
  const startTimer = () => {
    remainingTime.value = timeLimit.value
    clearInterval(timerInterval.value)
    timerInterval.value = setInterval(() => {
      remainingTime.value--;
      if(remainingTime.value <= 0) {
        gameOver()
      }
    }, 1000);
  }

  const gameOver = () => {
    clearInterval(timerInterval.value)  // Cancel the existing timer
    startFlg.value = false;
    alert('時間切れです!')
  }

  const gameStart = () => {
    startFlg.value = true;
    startTimer();
    nextTick(() => {
      document.getElementById('typeForm').focus();
    })
  }

  // 初期化
  const initialize = () => {
    current_question.value = questions[0]
    question_counts.value = questions.length
  }

  const styleObject = () => {
    const width = 20 * current_question_counts.value + "%";
    const color = (() => {
      if (current_question_counts.value >= 5) {
        return "#03a9f4";
      } else {
        return "orange";
      }
    })();
    return {
      'width': width,
      'background-color': color
    }
  }

  // 入力値の判定
  watch(typeBox, (newValue) => {
    if (newValue === current_question.value) {
      questions.splice(0, 1); // 配列の0番目を1つ削除
      current_question.value = questions[0]; // 再定義
      typeBox.value = "";
      current_question_counts.value++;

      // 全問題クリア時の処理
      if (current_question_counts.value === question_counts.value) {
        clearInterval(timerInterval.value);
        alert(`クリア！ 残り時間: ${remainingTime.value}秒`)
      }
    }
  });

  return {
    // 状態
    startFlg,
    current_question,
    typeBox,
    current_question_counts,
    question_counts,
    remainingTime,
    
    // メソッド
    styleObject,
    gameStart,
    initialize
  }
}
