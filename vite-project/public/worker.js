// Web Worker for heavy calculations
self.addEventListener('message', (e) => {
  const input = e.data
  
  // 重い計算をシミュレート（実際のプロジェクトでは複雑な処理をここに書く）
  let result = 0
  
  // フィボナッチ数列の計算（重い処理の例）
  function fibonacci(n) {
    if (n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
  }
  
  // 指定された回数だけ計算を実行
  for (let i = 0; i < input; i++) {
    result += fibonacci(i % 20) // 20で割った余りを使用して計算量を制限
  }
  
  // 計算結果をメインスレッドに送信
  self.postMessage({
    input: input,
    result: result,
    timestamp: new Date().toISOString()
  })
})

// エラーハンドリング
self.addEventListener('error', (e) => {
  console.error('Worker error:', e)
  self.postMessage({
    error: e.message,
    timestamp: new Date().toISOString()
  })
}) 