# project_ACMN_Viv

## 設計実装方針

本プロジェクトは AI プロンプト用「Bloc」設定データを GUI で組み立て、YAML 形式でエクスポートするフルスタックアプリケーションです。
フロントエンドは Next.js App Router をベースとした SPA、バックエンドは同一プロジェクト内の Next.js API Routes で提供します。

---

## ドキュメント一覧

### アーキテクチャ・ガイドライン

| ドキュメント | 概要 |
|---|---|
| [ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md) | アーキテクチャ・ディレクトリ構成・状態管理・コンポーネント設計・型設計 |
| [GUIDELINES.md](./docs/architecture/GUIDELINES.md) | コーディング規約・設計ガイドライン全般 |

### 実装ルール

| ドキュメント | 概要 |
|---|---|
| [BASIC_RULE.md](./docs/IMPLEMENT_RULE/BASIC_RULE.md) | 基本実装ルール（命名規則・宣言・エクスポート・ループ回避） |
| [COMPONENTS_RULE.md](./docs/IMPLEMENT_RULE/COMPONENTS_RULE.md) | Component 実装ルール（Atomic Design 階層・MVVM 方針） |
| [BACKEND_RULE.md](./docs/IMPLEMENT_RULE/BACKEND_RULE.md) | バックエンド実装ルール（`business/`・`app/api/`・Prisma 移行方針） |
| [THEME_RULE.md](./docs/IMPLEMENT_RULE/THEME_RULE.md) | MUI テーマ実装ルール |

### フック実装ルール

| ドキュメント | 概要 |
|---|---|
| [VIEWMODEL_RULE.md](./docs/IMPLEMENT_RULE/HOOKS_RULE/VIEWMODEL_RULE.md) | ViewModel 層フック実装ルール（`use{Page}ViewModel`・`use{Page}Composer`・Properties・Handlers） |
| [CONTROLLER_RULE.md](./docs/IMPLEMENT_RULE/HOOKS_RULE/CONTROLLER_RULE.md) | Controller 層フック実装ルール（`use{Page}Controller`・Initialize・Effects） |
| [CONTEXT_RULE.md](./docs/IMPLEMENT_RULE/HOOKS_RULE/STATE/CONTEXT_RULE.md) | Context フック実装ルール（`use{Page}Context`）|
| [SERVICE_RULE.md](./docs/IMPLEMENT_RULE/HOOKS_RULE/STATE/SERVICE_RULE.md) | Service フック実装ルール（`use{Page}Service`）・API Service 関数（`services/`）・Zod バリデーション |
| [FETCH_REDUCER_RULE.md](./docs/IMPLEMENT_RULE/HOOKS_RULE/STATE/FETCH_REDUCER_RULE.md) | FetchReducer フック実装ルール（`use{Page}FetchReducer`） |
| [STATE_REDUCER_RULE.md](./docs/IMPLEMENT_RULE/HOOKS_RULE/STATE/STATE_REDUCER_RULE.md) | StateReducer フック実装ルール（`use{Page}StateReducer`・`{Page}Contexts` 型定義） |

### テンプレート

| ドキュメント | 概要 |
|---|---|
| [SCREEN_REQUEST_TEMPLATE.md](./docs/templates/SCREEN_REQUEST_TEMPLATE.md) | 画面実装依頼書テンプレート（依頼側が記述） |
| [SCREEN_REPORT_TEMPLATE.md](./docs/templates/SCREEN_REPORT_TEMPLATE.md) | 画面成果物仕様書テンプレート（AI が出力する報告書） |

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

