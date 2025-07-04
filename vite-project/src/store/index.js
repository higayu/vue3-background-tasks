import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    // タイマー関連の状態
    globalTimer: {
      isRunning: false,
      count: 0,
      startTime: null
    },
    
    // API通信関連の状態
    apiData: {
      posts: [],
      loading: false,
      error: null,
      lastFetched: null
    },
    
    // Web Worker関連の状態
    workerData: {
      isRunning: false,
      result: null,
      input: 1000
    },
    
    // アプリケーション全体の状態
    appState: {
      currentPage: 'home',
      notifications: []
    }
  }),
  
  getters: {
    // タイマーの経過時間を分:秒形式で取得
    formattedTimer: (state) => {
      const minutes = Math.floor(state.globalTimer.count / 60)
      const seconds = state.globalTimer.count % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    
    // 投稿データの件数
    postsCount: (state) => state.apiData.posts.length,
    
    // 最新の投稿（最新5件）
    latestPosts: (state) => state.apiData.posts.slice(0, 5),
    
    // 通知の件数
    notificationCount: (state) => state.appState.notifications.length
  },
  
  actions: {
    // タイマー関連のアクション
    startGlobalTimer() {
      this.globalTimer.isRunning = true
      this.globalTimer.startTime = new Date()
      
      // 1秒ごとにカウントアップ
      this.timerInterval = setInterval(() => {
        this.globalTimer.count++
      }, 1000)
    },
    
    stopGlobalTimer() {
      this.globalTimer.isRunning = false
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
    },
    
    resetGlobalTimer() {
      this.stopGlobalTimer()
      this.globalTimer.count = 0
      this.globalTimer.startTime = null
    },
    
    // API通信関連のアクション
    async fetchPosts() {
      this.apiData.loading = true
      this.apiData.error = null
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await response.json()
        
        this.apiData.posts = posts
        this.apiData.lastFetched = new Date()
        
        // 成功通知を追加
        this.addNotification('投稿データの取得に成功しました', 'success')
      } catch (error) {
        this.apiData.error = error.message
        this.addNotification('投稿データの取得に失敗しました', 'error')
      } finally {
        this.apiData.loading = false
      }
    },
    
    // Web Worker関連のアクション
    startWorker(input) {
      this.workerData.isRunning = true
      this.workerData.result = null
      this.workerData.input = input
      
      // Web Workerを作成
      const worker = new Worker('/worker.js')
      
      // メッセージを送信
      worker.postMessage(input)
      
      // 結果を受け取る
      worker.onmessage = (e) => {
        this.workerData.result = e.data
        this.workerData.isRunning = false
        this.addNotification('計算が完了しました', 'success')
        worker.terminate()
      }
      
      // エラーハンドリング
      worker.onerror = (e) => {
        console.error('Worker error:', e)
        this.workerData.isRunning = false
        this.addNotification('計算中にエラーが発生しました', 'error')
        worker.terminate()
      }
    },
    
    // 通知関連のアクション
    addNotification(message, type = 'info') {
      const notification = {
        id: Date.now(),
        message,
        type,
        timestamp: new Date()
      }
      
      this.appState.notifications.unshift(notification)
      
      // 5秒後に自動削除
      setTimeout(() => {
        this.removeNotification(notification.id)
      }, 5000)
    },
    
    removeNotification(id) {
      const index = this.appState.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.appState.notifications.splice(index, 1)
      }
    },
    
    // ページ遷移
    setCurrentPage(page) {
      this.appState.currentPage = page
    }
  }
}) 