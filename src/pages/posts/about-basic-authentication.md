---
layout: ../../layouts/PostLayout.astro
title: VercelとNext.jsでbasic認証を設定する
date: 2023-02-05
description: static-authとsafe-compareを使用してbasic認証を設定します。
tags: ["vercel", "Next.js", "basic認証"]
---

- [はじめに](#はじめに)
- [必要パッケージをインストールする](#必要パッケージをインストールする)
- [プロジェクトルートに app.js を用意する](#プロジェクトルートにappjsを用意する)
- [vercel.json に builds と routes を追加する](#verceljsonにbuildsとroutesを追加する)
- [package.json に vercel-build コマンドを追加する](#packagejsonにvercel-buildコマンドを追加する)

# はじめに

Vercel と GitHub を連携しているので、Vercel コマンドのインストールは必要ないです。  
連携していない方はインストールしてください。

# 必要パッケージをインストールする

```sh
$ npm i static-auth safe-compare
```

# プロジェクトルートに app.js を用意する

プロジェクトルートに`app.js`を追加する。
認証後`/out`配下をデプロイするようにする。  
`.env`に`USERNAME`と`PASSWORD`を必要に応じて設定する。  
`USERNAME`と`PASSWORD`の初期値は`admin`に設定されています。

```js
const protect = require("static-auth");
const safeCompare = require("safe-compare");

const app = protect(
  "/",
  (username, password) =>
    safeCompare(username, process.env.USERNAME || "admin") &&
    safeCompare(password, process.env.PASSWORD || "admin"),
  {
    directory: `${__dirname}/out`,
    onAuthFailed: (res) => {
      res.end("Authentication failed");
    },
  }
);

module.exports = app;
```

# vercel.json に builds と routes を追加する

```json
{
  "builds": [{ "src": "app.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/.*", "dest": "app.js" }]
}
```

# package.json に vercel-build コマンドを追加する

Vercel でデプロイ時に`vercel-build`を実行し`/out`ファイルを生成してくれます。

```json
"scripts": {
  "build": "next build && next export",
  "vercel-build": "npm run build"
},
```
