# playwright-lecture

Playwrightのテスト作成方法を学ぶための教材プロジェクトです。実際に動作するデモWebサイトと、様々なテストパターンを含む包括的なテストスイートを提供します。

## 📋 プロジェクト概要

このプロジェクトには以下が含まれています：

- **デモWebサイト** - 様々なUI要素を含むインタラクティブなページ
- **サンプルテスト** - Playwrightの主要機能を実演する30以上のテストケース
- **自動サーバー起動** - テスト実行時に自動でWebサーバーが起動

## 🚀 セットアップ

### 前提条件

- Node.js (v16以上推奨)
- pnpm (v10.24.0)

### インストール

```bash
# 依存関係をインストール
pnpm install

# Playwrightブラウザをインストール
pnpm exec playwright install
```

## 💻 使い方

### テストの実行

```bash
# 全テストを実行（ヘッドレスモード）
pnpm test

# UIモードで実行（推奨 - 初学者向け）
pnpm test:ui

# ブラウザを表示して実行
pnpm test:headed

# デバッグモードで実行
pnpm test:debug
```

### ブラウザ別の実行

```bash
# Chromiumのみ
pnpm test:chromium

# Firefoxのみ
pnpm test:firefox

# WebKit（Safari）のみ
pnpm test:webkit
```

### 特定のテストを実行

```bash
# 特定のファイルを実行
pnpm test tests/example.spec.ts

# パターンマッチで実行
pnpm test -g "フォーム"
```

### その他のコマンド

```bash
# テストレポートを表示
pnpm report

# コードジェネレーターを起動
pnpm codegen

# デモサイトを手動で起動
pnpm serve
```

## 📁 プロジェクト構造

```
playwright-lecture/
├── public/                 # デモWebサイト
│   ├── index.html         # メインページ（7つのテストセクション）
│   └── about.html         # Aboutページ（ナビゲーション用）
├── tests/                 # テストファイル
│   └── example.spec.ts    # サンプルテスト集
├── playwright.config.ts   # Playwright設定
├── package.json           # 依存関係とスクリプト
└── README.md             # このファイル
```

## 🎯 デモサイトの機能

`public/index.html`には以下の7つのセクションがあります：

1. **ボタンとクリックイベント**
   - シングルクリック、ダブルクリック
   - 無効化されたボタンの状態確認

2. **フォーム入力**
   - テキスト入力、メールアドレス、数値
   - セレクトボックス、チェックボックス
   - テキストエリア、フォーム送信

3. **リンクとナビゲーション**
   - 内部リンク、外部リンク
   - アンカーリンク

4. **動的コンテンツ**
   - リストアイテムの追加・削除
   - 動的なカウント表示

5. **テーブルデータ**
   - 複数行のテーブル
   - セルの内容検証

6. **モーダルダイアログ**
   - モーダルの開閉

7. **待機とタイミング**
   - 非同期処理（3秒遅延）
   - ボタンの無効化/有効化

## 📝 テスト内容

`tests/example.spec.ts`には以下のテストグループが含まれています：

- **基本的なナビゲーション** - ページタイトル、見出しの確認
- **ボタンとクリックイベント** - クリック操作、状態確認
- **フォーム入力** - 各種入力要素のテスト
- **リンクとナビゲーション** - ページ遷移のテスト
- **動的コンテンツ** - DOM操作のテスト
- **テーブルデータ** - テーブル要素の検証
- **モーダルダイアログ** - モーダルの操作
- **待機とタイミング** - 非同期処理の待機
- **様々なロケーター戦略** - 要素選択方法のデモ

## 🎓 学習ポイント

このプロジェクトで学べる内容：

### 基本操作
- `page.goto()` - ページ遷移
- `page.click()` - クリック操作
- `page.fill()` - テキスト入力
- `page.selectOption()` - セレクトボックスの選択
- `page.check()` / `page.uncheck()` - チェックボックスの操作

### 要素の選択（ロケーター）
- ID、クラス、CSS セレクター
- `page.locator()` - 汎用的な要素選択
- `page.getByRole()` - アクセシビリティロールでの選択
- `page.getByPlaceholder()` - プレースホルダーでの選択
- `page.getByText()` - テキストコンテンツでの選択

### アサーション（検証）
- `expect(page).toHaveTitle()` - タイトル確認
- `expect(element).toBeVisible()` - 表示確認
- `expect(element).toHaveText()` - テキスト確認
- `expect(element).toHaveValue()` - 入力値確認
- `expect(element).toBeChecked()` - チェック状態確認
- `expect(element).toBeDisabled()` - 無効化状態確認

### 高度な機能
- `test.describe()` - テストのグループ化
- `context.waitForEvent('page')` - 新しいタブの待機
- タイムアウトの設定
- 複数ブラウザでのテスト

## 🔧 設定

### playwright.config.ts

- **ベースURL**: http://localhost:8080
- **ブラウザ**: Chromium, Firefox, WebKit
- **レポーター**: HTML
- **並列実行**: 有効
- **Webサーバー**: 自動起動（http-server）

## 📚 参考資料

- [Playwright公式ドキュメント](https://playwright.dev/)
- [Playwright日本語ドキュメント](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 📄 ライセンス

MIT

## 🤝 貢献

このプロジェクトは教材として作成されています。改善提案やバグ報告は歓迎します。
