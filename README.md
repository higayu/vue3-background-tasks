# Vue 3 バックグラウンド処理学習プロジェクト

Vue 3における「バックグラウンド処理」の基礎と応用を学習するプロジェクトです。

## 🎯 学習目標

- 非同期処理（async/await）
- タイマー処理（setTimeout / setInterval）
- API 通信（axios）
- 状態管理（Pinia）
- Web Worker（UIとは別スレッドで重い処理）

## 📁 プロジェクト構成

```
_Background_Study/
├── vite-project/          # フロントエンド（Vue 3 + Vite）
│   ├── src/
│   │   ├── components/    # Vueコンポーネント
│   │   ├── views/         # ページコンポーネント
│   │   ├── store/         # Piniaストア
│   │   └── router/        # Vue Router設定
│   └── public/
│       └── worker.js      # Web Worker
└── backend-server/        # バックエンド（Express.js）
    └── index.js           # APIサーバー
```

## 🚀 セットアップと実行

### 1. 依存関係のインストール

#### フロントエンド
```bash
cd vite-project
npm install
```

#### バックエンド
```bash
cd backend-server
npm install
```

### 2. 開発サーバーの起動

#### バックエンドサーバー（ポート3001）
```bash
cd backend-server
npm run dev
```

#### フロントエンドサーバー（ポート5173）
```bash
cd vite-project
npm run dev
```

### 3. ブラウザでアクセス

- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:3001

## 📚 学習コンテンツ

### 1. ホームページ
- プロジェクトの概要と学習内容の説明
- バックグラウンド処理ページへのナビゲーション

### 2. バックグラウンド処理ページ
- **タイマー処理**: setIntervalを使用した定期的な処理
- **API通信**: axiosを使用した外部APIとの通信
- **Web Worker**: 重い処理の非同期実行

### 3. 状態管理（Pinia）
- アプリケーション全体の状態管理
- 通知システム
- グローバルタイマー

## 🔧 技術スタック

### フロントエンド
- **Vue 3**: 最新のVue.jsフレームワーク
- **Vite**: 高速なビルドツール
- **Vue Router**: ページ間ナビゲーション
- **Pinia**: 状態管理ライブラリ
- **Axios**: HTTP通信ライブラリ

### バックエンド
- **Express.js**: Node.js Webフレームワーク
- **CORS**: クロスオリジンリクエスト対応

## 📖 API エンドポイント

### バックエンドサーバー（http://localhost:3001）

- `GET /` - API情報
- `GET /api/health` - サーバー状態確認
- `GET /api/posts` - 投稿データ取得
- `GET /api/posts/:id` - 特定の投稿取得
- `GET /api/slow` - 重い処理のシミュレート
- `POST /api/posts` - 新しい投稿作成

## 🎓 学習のポイント

### 非同期処理
- `async/await`を使用したAPI通信
- Promiseベースの処理
- エラーハンドリング

### タイマー処理
- `setInterval`による定期的な処理
- `setTimeout`による遅延処理
- コンポーネントのライフサイクルでのクリーンアップ

### 状態管理
- Piniaストアの設計
- リアクティブな状態管理
- アクションとゲッターの活用

### Web Worker
- メインスレッドをブロックしない重い処理
- ワーカースレッドでの計算
- メッセージングによる通信

## 🛠️ 開発ツール

- **Vue DevTools**: Vue.js開発者ツール
- **ブラウザ開発者ツール**: ネットワーク、コンソール、パフォーマンス
- **Node.js**: バックエンド実行環境

## 📝 次のステップ

1. 各機能を実際に試してみる
2. コードを理解し、カスタマイズする
3. 新しい機能を追加する
4. パフォーマンスの最適化を学ぶ

## 🤝 貢献

このプロジェクトは学習目的で作成されています。改善提案やバグ報告は歓迎します。

---

**Happy Learning! 🎉**
