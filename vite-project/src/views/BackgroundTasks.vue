<template>
  <div class="background-tasks">
    <h1>バックグラウンド処理の学習</h1>
    
    <!-- タイマー処理セクション -->
    <section class="task-section">
      <h2>⏰ タイマー処理</h2>
      <div class="timer-controls">
        <button @click="startTimer" :disabled="timerRunning" class="btn btn-primary">
          タイマー開始
        </button>
        <button @click="stopTimer" :disabled="!timerRunning" class="btn btn-secondary">
          タイマー停止
        </button>
      </div>
      <div class="timer-display">
        <p>経過時間: {{ timerCount }}秒</p>
        <p>状態: {{ timerRunning ? '実行中' : '停止中' }}</p>
      </div>
    </section>

    <!-- API通信セクション -->
    <section class="task-section">
      <h2>🌐 API通信</h2>
      <div class="api-controls">
        <button @click="fetchPosts" :disabled="loading" class="btn btn-primary">
          {{ loading ? '読み込み中...' : '投稿データを取得' }}
        </button>
      </div>
      <div v-if="posts.length > 0" class="posts-list">
        <h3>取得した投稿（最新5件）</h3>
        <div v-for="post in posts.slice(0, 5)" :key="post.id" class="post-item">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body.substring(0, 100) }}...</p>
        </div>
      </div>
      <div v-if="error" class="error">
        <p>エラー: {{ error }}</p>
      </div>
    </section>

    <!-- Web Workerセクション -->
    <section class="task-section">
      <h2>⚙️ Web Worker</h2>
      <div class="worker-controls">
        <input v-model="workerInput" type="number" placeholder="計算する数値" class="input">
        <button @click="startWorker" :disabled="workerRunning" class="btn btn-primary">
          {{ workerRunning ? '計算中...' : '重い計算を開始' }}
        </button>
      </div>
      <div v-if="workerResult" class="worker-result">
        <p>計算結果: {{ workerResult }}</p>
      </div>
    </section>

    <!-- ナビゲーション -->
    <div class="navigation">
      <router-link to="/" class="btn btn-secondary">
        ホームに戻る
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BackgroundTasks',
  data() {
    return {
      // タイマー関連
      timerCount: 0,
      timerRunning: false,
      timerInterval: null,
      
      // API通信関連
      posts: [],
      loading: false,
      error: null,
      
      // Web Worker関連
      workerInput: 1000,
      workerRunning: false,
      workerResult: null,
      worker: null
    }
  },
  methods: {
    // タイマー処理
    startTimer() {
      this.timerRunning = true
      this.timerInterval = setInterval(() => {
        this.timerCount++
      }, 1000)
    },
    
    stopTimer() {
      this.timerRunning = false
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
    },
    
    // API通信
    async fetchPosts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.posts = response.data
      } catch (err) {
        this.error = err.message
        console.error('API通信エラー:', err)
      } finally {
        this.loading = false
      }
    },
    
    // API通信（.then()を使った書き方）
    fetchPostsWithThen() {
      this.loading = true
      this.error = null
      
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          this.posts = response.data
        })
        .catch((err) => {
          this.error = err.message
          console.error('API通信エラー:', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    
    // ❌ 問題のある書き方（Promiseが既に実行されている）
    async fetchPostsWrong() {
      this.loading = true
      this.error = null
      
      // この時点でHTTPリクエストが開始される
      const response = axios.get('https://jsonplaceholder.typicode.com/posts')
      
      try {
        // responseは既にPromiseオブジェクト（実行中）
        const result = await response
        this.posts = result.data
      } catch (err) {
        this.error = err.message
        console.error('API通信エラー:', err)
      } finally {
        this.loading = false
      }
    },
    
    // ✅ 正しい書き方
    async fetchPostsCorrect() {
      this.loading = true
      this.error = null
      
      try {
        // awaitと一緒にaxios.get()を呼び出す
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.posts = response.data
      } catch (err) {
        this.error = err.message
        console.error('API通信エラー:', err)
      } finally {
        this.loading = false
      }
    },
    
    // Web Worker
    startWorker() {
      this.workerRunning = true
      this.workerResult = null
      
      // Web Workerを作成
      this.worker = new Worker('/worker.js')
      
      // メッセージを送信
      this.worker.postMessage(this.workerInput)
      
      // 結果を受け取る
      this.worker.onmessage = (e) => {
        this.workerResult = e.data
        this.workerRunning = false
        this.worker.terminate()
        this.worker = null
      }
      
      // エラーハンドリング
      this.worker.onerror = (e) => {
        console.error('Worker error:', e)
        this.workerRunning = false
        this.worker.terminate()
        this.worker = null
      }
    }
  },
  
  // コンポーネントが破棄される時にタイマーをクリーンアップ
  beforeUnmount() {
    this.stopTimer()
    if (this.worker) {
      this.worker.terminate()
    }
  }
}
</script>

<style scoped>
.background-tasks {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  text-align: center;
  margin-bottom: 2rem;
}

.task-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #42b883;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.timer-controls, .api-controls, .worker-controls {
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #369870;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 0.5rem;
  width: 150px;
}

.timer-display, .worker-result {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.posts-list {
  margin-top: 1rem;
}

.post-item {
  background: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.post-item h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.post-item p {
  margin: 0;
  color: #666;
}

.error {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}

.navigation {
  text-align: center;
  margin-top: 2rem;
}
</style> 