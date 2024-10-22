/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

// メインコンポーネント
export default function TextToImage() {
  const [prompt, setPrompt] = useState<string>(""); // ユーザー入力のプロンプトを保存
  const [image, setImage] = useState<string | null>(null); // 生成された画像を保存
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態を管理

  // 画像を生成する関数
  const generateImage = async () => {
    setLoading(true); // ローディング開始
    try {
      const response = await fetch('/api/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }), // プロンプトをAPIに送信
      });

      const data = await response.json(); // APIからのデータを取得
      setImage(data.image); // 生成された画像を設定
    } catch (error) {
      console.error("Error generating image:", error); // エラーをコンソールに出力
    }
    setLoading(false); // ローディング終了
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">プロンプトから画像を生成</h2>

      {/* ユーザーがプロンプトを入力するテキストエリア */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="ここにテキストを入力してください"
        className="w-full max-w-lg p-2 border border-gray-300 rounded mb-4"
        rows={4}
      />

      {/* 画像生成ボタン */}
      <button
        onClick={generateImage}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        画像を生成
      </button>

      {loading && <p className="mt-4">画像を生成中...</p>} {/* ローディング中のメッセージ */}
      {image && <div className="mt-4"><img src={image} alt="生成された画像" /> width={500} height={500}</div>} {/* 生成された画像を表示 */}
    </div>
  );
}
