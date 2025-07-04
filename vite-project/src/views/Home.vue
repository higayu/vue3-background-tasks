<template>
  <div class="home">
    <h1>Vue 3 バックグラウンド処理学習</h1>
    <p>このプロジェクトでは、Vue 3におけるバックグラウンド処理の基礎と応用を学習します。</p>
    
    <div class="features">
      <h2>学習内容</h2>
      <ul>
        <li>非同期処理（async/await）</li>
        <li>タイマー処理（setTimeout / setInterval）</li>
        <li>API 通信（axios）</li>
        <li>状態管理（Pinia）</li>
        <li>Web Worker（UIとは別スレッドで重い処理）</li>
      </ul>
    </div>

    <router-link to="/background-tasks" class="btn">
      バックグラウンド処理を試す
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #42b883;
  margin-bottom: 1rem;
}

.features {
  margin: 2rem 0;
  text-align: left;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.features li:before {
  content: "✅ ";
  margin-right: 0.5rem;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #369870;
}
</style> 