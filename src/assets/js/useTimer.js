import { ref } from 'vue'

/**
 * タイマー機能を提供するカスタムフック
 * @param {number} initialTime - 初期時間（秒）
 * @param {Function} onTimeUp - タイムアップ時のコールバック関数
 */
export const useTimer = (initialTime, onTimeUp) => {
  // タイマー関連の状態管理
  const timeLimit = ref(initialTime)    // 制限時間
  const remainingTime = ref(initialTime) // 残り時間
  const timerInterval = ref(null)        // setIntervalのID管理用

  /**
   * タイマーを開始する
   * 1秒ごとに残り時間を減らし、0になったら停止してコールバックを実行
   */
  const startTimer = () => {
    remainingTime.value = timeLimit.value
    clearInterval(timerInterval.value)
    timerInterval.value = setInterval(() => {
      remainingTime.value--
      if (remainingTime.value <= 0) {
        stopTimer()
        onTimeUp()
      }
    }, 1000)
  }

  /**
   * タイマーを停止する
   * setIntervalをクリアする
   */
  const stopTimer = () => {
    clearInterval(timerInterval.value)
  }

  /**
   * タイマーをリセットする
   * タイマーを停止し、残り時間を初期値に戻す
   */
  const resetTimer = () => {
    stopTimer()
    remainingTime.value = timeLimit.value
  }

  // 外部から利用する値とメソッドを返す
  return {
    remainingTime,  // 現在の残り時間
    startTimer,     // タイマー開始
    stopTimer,      // タイマー停止
    resetTimer      // タイマーリセット
  }
}