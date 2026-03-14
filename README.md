# project_ACMN_Viv

## 設計実装方針

本プロジェクトは AI プロンプト用「Bloc」設定データを GUI で組み立て、YAML 形式でエクスポートするフルスタックアプリケーションです。
フロントエンドは Next.js App Router をベースとした SPA、バックエンドは同一プロジェクト内の Next.js API Routes で提供します。

---

## ドキュメント一覧

| ドキュメント | 概要 |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | アーキテクチャ・ディレクトリ構成・状態管理・コンポーネント設計・型設計 |
| [GUIDELINES.md](./GUIDELINES.md) | コーディング規約・設計ガイドライン全般 |
| [IMPLEMENT_VIEWMODEL.md](./IMPLEMENT_VIEWMODEL.md) | ViewModel フック（`use{Page}ViewModel`）実装ルール |
| [IMPLEMENT_SERVICE.md](./IMPLEMENT_SERVICE.md) | Service フック（`use{Page}Service`）実装ルール |
| [IMPLEMENT_CONTROLLER_RULE.md](./IMPLEMENT_CONTROLLER_RULE.md) | Controller フック（`use{Page}Controller`）実装ルール |
| [IMPLEMENT_REDUCER_RULE.md](./IMPLEMENT_REDUCER_RULE.md) | `useReducer` カスタムフック実装ルール |
| [SCREEN_REQUEST_TEMPLATE.md](./SCREEN_REQUEST_TEMPLATE.md) | 画面実装依頼書テンプレート（依頼側が記述） |
| [SCREEN_REPORT_TEMPLATE.md](./SCREEN_REPORT_TEMPLATE.md) | 画面成果物仕様書テンプレート（AI が出力する報告書） |

---

## 技術スタック

### フロントエンド

| 区分 | 技術 |
|---|---|
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript 5（`strict: true`） |
| UI ライブラリ | MUI（Material UI）v7 |
| スタイリング | Emotion（CSS-in-JS） |
| 状態管理 | React `useReducer` + カスタムフック（MVVM パターン） |
| YAML 出力 | `yaml` パッケージ |
| Lint | ESLint 9（`eslint-config-next`） |
| コンパイラ | React 19 Compiler |

### バックエンド

| 区分 | 技術 |
|---|---|
| API 定義 | Swagger（OpenAPI 3.0） |
| ORM | Prisma |
| データベース | SQLite3 |
| ランタイム | Next.js API Routes（App Router） |

---

## ディレクトリ構成

### フロントエンド

```
applictaion/src/
├── app/                              # Next.js App Router エントリポイント
│   ├── editor/
│   │   └── page.tsx                 # /editor 画面（Bloc リストエディタ）
│   ├── viewer/
│   │   └── page.tsx                 # /viewer 画面（オーダービュー）
│   ├── layout.tsx                   # ルートレイアウト（ThemeRegistry を適用）
│   └── page.tsx                     # ルートページ（ホーム）
│
├── components/                      # Atomic Design に基づく UI コンポーネント
│   ├── atoms/                       # 最小単位の UI 要素（MUI ラッパー）
│   ├── molecules/                   # Atoms を組み合わせた中粒度コンポーネント
│   │   ├── orders/
│   │   ├── panel/
│   │   ├── select/
│   │   └── switch/
│   ├── organisms/                   # 複雑なビジネスロジックを持つコンポーネント
│   │   ├── bloc/
│   │   ├── editor/
│   │   ├── orders/
│   │   ├── select/
│   │   ├── switch/
│   │   └── viewer/
│   └── providers/                   # アプリ全体に横断するプロバイダー
│       ├── EmotionRegistry.tsx
│       └── ThemeRegistry.tsx
│
├── hooks/                           # 状態管理・データ変換カスタムフック（MVVM）
│   ├── editor/                      # /editor 画面関連フック
│   │   ├── viewModel/               # ViewModel 層
│   │   ├── controller/              # Controller 層（副作用管理）
│   │   ├── service/                 # Service 層（API 呼び出し）
│   │   └── reducer/                 # Reducer 層（状態管理）
│   └── viewer/                      # /viewer 画面関連フック
│       ├── viewModel/               # ViewModel 層
│       ├── controller/              # Controller 層（副作用管理）
│       ├── service/                 # Service 層（API 呼び出し）
│       └── reducer/                 # Reducer 層（状態管理）
│
├── types/                           # TypeScript 型定義
│   ├── editor/                      # /editor 画面関連の型
│   └── viewer/                      # /viewer 画面関連の型
│
├── utils/                           # ユーティリティ関数（純粋関数）
│
├── services/                        # クライアントサイド API 呼び出し関数
│
└── theme/
    └── theme.ts                     # MUI テーマ設定
```

### バックエンド

```
applictaion/
├── prisma/
│   └── schema.prisma                # Prisma スキーマ定義（SQLite3）
│
└── src/
    ├── app/
    │   └── api/                     # Next.js API Routes（REST エンドポイント）
    │       └── {resource}/
    │           ├── route.ts         # GET（一覧）/ POST（作成）
    │           └── [id]/
    │               └── route.ts     # GET（詳細）/ PUT（更新）/ DELETE（削除）
    │
    ├── business/                    # ビジネスロジック（サービス層）
    │   └── {resource}.ts
    │
    ├── lib/
    │   └── prisma.ts                # Prisma クライアントのシングルトン
    │
    └── swagger/
        └── swagger.ts               # Swagger（OpenAPI）定義・設定
```