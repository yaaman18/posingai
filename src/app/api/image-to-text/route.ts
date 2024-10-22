import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// 環境変数からAPIキーを取得
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please add it to the .env.local file.')
}
const openai = new OpenAI({ apiKey })

// 画像をBase64形式に変換してAPIに送信する関数
export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json()

    // OpenAI APIにリクエストを送信
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'What is this image?' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageData}` } },
          ],
        },
      ],
      max_tokens: 300,
    })

    // 解析結果を取得して返す
    const result = response.choices[0].message.content
    return NextResponse.json({ result })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json({ error: 'Image processing failed' }, { status: 500 })
  }
}
