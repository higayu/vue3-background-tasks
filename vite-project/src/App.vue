<script setup>
import { useTaskStore } from './store'
import { onMounted, onUnmounted } from 'vue'

const taskStore = useTaskStore()

// コンポーネントがマウントされた時にストアを初期化
onMounted(() => {
  console.log('Vue 3 バックグラウンド処理学習アプリが起動しました')
})

// コンポーネントがアンマウントされる時にクリーンアップ
onUnmounted(() => {
  taskStore.stopGlobalTimer()
})
</script>

<template>
  <div id="app">
    <!-- 通知エリア -->
    <div class="notifications" v-if="taskStore.notificationCount > 0">
      <div 
        v-for="notification in taskStore.appState.notifications" 
        :key="notification.id"
        class="notification"
        :class="'notification-' + notification.type"
      >
        <span>{{ notification.message }}</span>
        <button @click="taskStore.removeNotification(notification.id)" class="close-btn">
          ×
        </button>
      </div>
    </div>

    <!-- メインコンテンツ -->
    <main>
      <router-view />
    </main>

    <!-- フッター -->
    <footer class="footer">
      <p>Vue 3 バックグラウンド処理学習プロジェクト</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

.notification {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.3s ease-out;
}

.notification-success {
  border-left: 4px solid #28a745;
}

.notification-error {
  border-left: 4px solid #dc3545;
}

.notification-info {
  border-left: 4px solid #17a2b8;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  margin-left: 0.5rem;
}

.close-btn:hover {
  color: #333;
}

.footer {
  background: #f8f9fa;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #dee2e6;
  margin-top: auto;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
