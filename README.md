# プロジェクト概要

このプロジェクトは、ユーザーが画像をテキストに変換したり、テキストから画像を生成したりすることができるNext.jsアプリケーションです。OpenAIのAPIを利用して、画像認識と画像生成の機能を提供します。

## 主な機能

- **画像からテキストへの変換**: ユーザーがカメラで撮影した画像やアップロードした画像をテキストに変換します。
- **テキストから画像への生成**: ユーザーが入力したテキストプロンプトに基づいて画像を生成します。

## 必要条件

- Node.js
- npm または yarn
- OpenAI APIキー

## インストールとセットアップ

1. **リポジトリをクローン**

   ```bash
   git clone <リポジトリのURL>
   cd <プロジェクトディレクトリ>
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   # または
   yarn install
   ```

3. **環境変数の設定**

   プロジェクトルートに `.env.local` ファイルを作成し、OpenAI APIキーを設定します。

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **開発サーバーを起動**

   ```bash
   npm run dev
   # または
   yarn dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認します。

## プロジェクト構成

- `src/app/image-to-text/page.tsx`: 画像をテキストに変換するページ
- `src/app/text-to-image/page.tsx`: テキストから画像を生成するページ
- `src/app/api/image-to-text/route.ts`: 画像をテキストに変換するAPIエンドポイント
- `src/app/api/text-to-image/route.ts`: テキストから画像を生成するAPIエンドポイント

## 注意事項

- OpenAI APIキーが必要です。`.env.local` ファイルにキーを設定してください。
- 開発環境での動作を確認するために、`npm run dev` または `yarn dev` を使用してください。

## デプロイ

このアプリケーションは、Vercelプラットフォームを使用して簡単にデプロイできます。詳細は、[Next.jsのデプロイに関するドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)を参照してください。

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。
