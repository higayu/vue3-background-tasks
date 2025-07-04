
# Vue 3 学習用プロジェクト設計資料（バックグラウンド処理編）

## 🎯 目的

Vue 3 における「バックグラウンド処理」の基礎と応用を学習するプロジェクト。

---

## 📁 プロジェクト概要

- プロジェクト名: `vue3-background-tasks`
- フレームワーク: Vue 3（Vue CLI または Vite）
- 主な学習テーマ:
  - 非同期処理（async/await）
  - タイマー処理（setTimeout / setInterval）
  - API 通信（axios）
  - 状態管理（Vuex or Pinia）
  - Web Worker（UIとは別スレッドで重い処理）

---

## 🏗️ プロジェクト作成手順（Vue CLI 使用）

```bash
vue create vue3-background-tasks
```

### オプション選択

- 手動で機能を選択（Manually select features）
  - ✅ Babel  
  - ✅ Router
  - ✅ Vuex または Pinia
  - ✅ Linter（任意）
- Vue バージョン: Vue 3
- ルーターのモード: history モード

---

## 📦 おすすめパッケージ

```bash
npm install axios
npm install pinia
```

---

## 📂 ディレクトリ構成（例）

```
src/
├── components/
│   └── BackgroundTimer.vue
├── views/
│   ├── Home.vue
│   └── BackgroundTasks.vue
├── store/
│   └── index.js または pinia用store
├── App.vue
├── main.js
```

---

## 💡 実装アイデア

### BackgroundTasks.vue

- `setInterval` による定期的な処理
- axios で外部 API 通信
- Web Worker によるバックグラウンド計算
- 「ローディング中」「完了」などの状態管理

### サンプルコード：axios + async/await

```js
import axios from 'axios';

export default {
  async created() {
    this.loading = true;
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      this.posts = res.data;
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      posts: [],
      loading: false
    };
  }
}
```

---

## 🛠 Web Worker サンプル

### public/worker.js

```js
self.addEventListener('message', (e) => {
  const result = e.data * 2;
  self.postMessage(result);
});
```

### Vue コンポーネント内

```js
const worker = new Worker('/worker.js');
worker.postMessage(1000);
worker.onmessage = (e) => {
  console.log('計算結果:', e.data);
};
```

---

## ✅ 学習のチェックリスト

- [ ] 非同期処理の理解（async/await, Promise）
- [ ] タイマー処理（setTimeout / setInterval）
- [ ] axios を使った API 通信
- [ ] 状態管理（Pinia / Vuex）
- [ ] Web Worker を使った重い処理の非同期化
