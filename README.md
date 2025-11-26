# Chat App

## 概要
このアプリは、Firebaseを利用したチャットルームと、サイゼリヤメニューのガチャ機能を持つWebアプリです。

## 起動方法

1. 依存パッケージのインストール  
   ```sh
   npm install
   ```
2. 開発サーバーの起動  
   ```sh
   npm run dev
   ```
   ブラウザで `http://localhost:5173` などにアクセスしてください。

## ページ一覧

- `/page`  
  サイゼリヤメニューガチャ  
  - ジャンルや予算を指定してランダムにメニューを選べます。

- `/chat`  
  チャットルーム  
  - Googleアカウントでログインして利用できます。

- `/login`  
  ログイン/ログアウトページ  
  - Google認証によるログイン・ログアウトが可能です。

## 技術スタック

- React 18
- TypeScript
- Vite
- Firebase (Authentication, Firestore)
- Tailwind CSS

## 出典

- サイゼリヤメニュー: [https://github.com/ryohidaka/saizeriya-menus](https://github.com/ryohidaka/saizeriya-menus)

## ライセンス

MIT
