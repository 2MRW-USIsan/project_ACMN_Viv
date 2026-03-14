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
| [IMPLEMENT_BASIC_RULE.md](./IMPLEMENT_BASIC_RULE.md) | 基本実装ルール（命名規則・宣言・エクスポート・ループ回避） |
| [IMPLEMENT_COMPONENT_RULE.md](./IMPLEMENT_COMPONENT_RULE.md) | Component 実装ルール（Atomic Design 階層・MVVM 方針） |
| [IMPLEMENT_VIEWMODEL.md](./IMPLEMENT_VIEWMODEL.md) | ViewModel フック（`use{Page}ViewModel`）実装ルール |
| [IMPLEMENT_SERVICE.md](./IMPLEMENT_SERVICE.md) | Service フック（`use{Page}Service`）実装ルール |
| [IMPLEMENT_CONTROLLER_RULE.md](./IMPLEMENT_CONTROLLER_RULE.md) | Controller フック（`use{Page}Controller`）実装ルール |
| [IMPLEMENT_COMPOSER_RULE.md](./IMPLEMENT_COMPOSER_RULE.md) | Composer フック（`use{Page}Composer`）実装ルール |
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

