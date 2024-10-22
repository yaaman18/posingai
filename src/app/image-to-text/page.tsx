'use client' // クライアントコンポーネントとして実行

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'react-camera-pro'

// メインコンポーネント
export default function ImageToText() {
  const camera = useRef<CameraType | null>(null) // カメラの参照を保持
  const [image, setImage] = useState<string | null>(null) // 撮影またはインポートした画像を保存
  const [loading, setLoading] = useState(false) // ローディング状態を管理
  const [result, setResult] = useState<string | null>(null) // APIからの結果を保存
  const [isClient, setIsClient] = useState(false) // クライアントサイド判定

  useEffect(() => {
    setIsClient(true) // クライアントサイドのみでカメラを表示
  }, [])

  // APIに画像を送信する関数
  const sendImageToAPI = async (imageData: string) => {
    setLoading(true) // ローディング開始
    try {
      const data = await fetchImageToText(imageData) // APIからの結果を取得
      setResult(data.result) // 結果を設定
    } catch (error) {
      console.error('APIへの画像送信エラー:', error) // エラーをコンソールに出力
    } finally {
      setLoading(false) // ローディング終了
    }
  }

  // APIから画像をテキストに変換する関数
  const fetchImageToText = async (imageData: string) => {
    const response = await fetch('/api/image-to-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }), // 画像データをJSON形式で送信
    })

    if (!response.ok) {
      throw new Error('ネットワーク応答が正常ではありません') // エラーハンドリング
    }

    return response.json() // JSON形式でデータを返す
  }

  // カメラで撮影した画像を処理する
  const handleTakePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto() // 写真を撮影
      const imageData = photo.toString().split(',')[1] // Base64形式に変換
      setImage(imageData) // 画像を設定
      sendImageToAPI(imageData) // APIに送信
    }
  }

  // ファイルインポート時の処理
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(',')[1] // Base64形式に変換
        if (base64data) {
          setImage(base64data) // 画像を設定
          sendImageToAPI(base64data) // APIに送信
        }
      }
      reader.readAsDataURL(file) // 画像を読み込む
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <h2 className='mb-4 text-xl font-bold'>撮影または画像をインポートして解析</h2>

      {/* クライアントサイドのみカメラを表示 */}
      {isClient && (
        <div className='relative w-full max-w-lg'>
          <div className='mb-4 h-auto w-full'>
            <Camera
              ref={camera}
              aspectRatio={16 / 9}
              facingMode='environment'
              errorMessages={{
                noCameraAccessible: 'カメラにアクセスできません。',
                permissionDenied: 'カメラの使用が許可されていません。',
                switchCamera: 'カメラの切り替えに失敗しました。',
                canvas: 'キャンバスのエラーが発生しました。',
              }}
            />
          </div>
          <button onClick={handleTakePhoto} className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
            写真を撮る
          </button>
        </div>
      )}

      {/* 画像インポート機能 */}
      <input type='file' accept='image/*' onChange={handleImageUpload} className='mt-4' />

      {loading && <p className='mt-4'>処理中...</p>} {/* ローディング中のメッセージ */}
      {image && (
        <div className='mt-4'>
          <Image
            src={`data:image/jpeg;base64,${image}`}
            alt='撮影またはインポートした写真'
            width={500}
            height={500}
            className='rounded'
          />
        </div>
      )}
      {result && <div className='mt-4 rounded bg-gray-100 p-4 shadow'>結果: {result}</div>} {/* APIからの結果を表示 */}
    </div>
  )
}
