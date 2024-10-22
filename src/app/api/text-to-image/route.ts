import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please add it to the .env.local file.')
}

const openai = new OpenAI({ apiKey })

// テキストプロンプトから画像を生成するAPI
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json() // リクエストからプロンプトを取得

    // OpenAI APIで画像生成
    const response = await openai.images.generate({
      prompt, // ユーザーからのプロンプト
      n: 1, // 生成する画像の数
      size: '1024x1024', // 画像のサイズ
    })

    const imageUrl = response.data[0].url // 生成された画像のURL

    return NextResponse.json({ image: imageUrl }) // 画像のURLを返す
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
  }
}
