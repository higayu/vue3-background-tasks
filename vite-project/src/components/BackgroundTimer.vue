<template>
  <div class="background-timer">
    <h3>バックグラウンドタイマー</h3>
    <div class="timer-info">
      <p>開始時刻: {{ startTime || '未開始' }}</p>
      <p>経過時間: {{ elapsedTime }}秒</p>
      <p>状態: {{ isRunning ? '実行中' : '停止中' }}</p>
    </div>
    <div class="timer-controls">
      <button @click="start" :disabled="isRunning" class="btn btn-start">
        開始
      </button>
      <button @click="stop" :disabled="!isRunning" class="btn btn-stop">
        停止
      </button>
      <button @click="reset" class="btn btn-reset">
        リセット
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundTimer',
  data() {
    return {
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
      intervalId: null
    }
  },
  methods: {
    start() {
      if (!this.isRunning) {
        this.isRunning = true
        this.startTime = new Date().toLocaleTimeString()
        this.intervalId = setInterval(() => {
          this.elapsedTime++
        }, 1000)
      }
    },
    stop() {
      if (this.isRunning) {
        this.isRunning = false
        if (this.intervalId) {
          clearInterval(this.intervalId)
          this.intervalId = null
        }
      }
    },
    reset() {
      this.stop()
      this.elapsedTime = 0
      this.startTime = null
    }
  },
  beforeUnmount() {
    this.stop()
  }
}
</script>

<style scoped>
.background-timer {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #dee2e6;
}

.timer-info {
  margin-bottom: 1rem;
}

.timer-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.timer-controls {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-start {
  background-color: #28a745;
  color: white;
}

.btn-start:hover:not(:disabled) {
  background-color: #218838;
}

.btn-stop {
  background-color: #dc3545;
  color: white;
}

.btn-stop:hover:not(:disabled) {
  background-color: #c82333;
}

.btn-reset {
  background-color: #6c757d;
  color: white;
}

.btn-reset:hover {
  background-color: #5a6268;
}
</style> 