import { ref, watch, nextTick } from 'vue'
import { questions } from '@js/questions.js'
import { useTimer } from './useTimer'

export const useTypingGame = () => {
  // 状態管理
  const startFlg = ref(false)
  const current_question = ref('')
  const typeBox = ref('')
  const current_question_counts = ref(0)
  const question_counts = ref(0)
  
  // タイマー関連の機能をインポート
  const { 
    remainingTime, 
    startTimer, 
    stopTimer, 
    resetTimer 
  } = useTimer(60, () => gameOver())

  // ゲージのスタイル計算
  const styleObject = () => {
    const width = 20 * current_question_counts.value + "%"
    const color = current_question_counts.value >= 5 ? "#03a9f4" : "orange"
    return {
      'width': width,
      'background-color': color
    }
  }

  // ゲームの初期化
  const initialize = () => {
    current_question.value = questions[0]
    question_counts.value = questions.length
    resetGameState()
  }

  // ゲーム状態のリセット
  const resetGameState = () => {
    typeBox.value = ""
    current_question_counts.value = 0
    startFlg.value = false
    resetTimer()
  }

  // ゲームオーバー処理
  const gameOver = () => {
    startFlg.value = false
    alert('時間切れです!')
  }

  // ゲームクリア処理
  const handleGameClear = () => {
    stopTimer()
    alert(`クリア！ 残り時間: ${remainingTime.value}秒`)
  }

  // 問題の更新処理
  const updateQuestion = () => {
    questions.splice(0, 1)
    current_question.value = questions[0]
    typeBox.value = ""
    current_question_counts.value++

    if (current_question_counts.value === question_counts.value) {
      handleGameClear()
    }
  }

  // ゲーム開始処理
  const gameStart = () => {
    startFlg.value = true
    startTimer()
    nextTick(() => {
      document.getElementById('typeForm').focus()
    })
  }

  // タイピング入力の監視
  watch(typeBox, (newValue) => {
    if (newValue === current_question.value) {
      updateQuestion()
    }
  })

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
