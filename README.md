# AI Dev Portfolio

Claude API・Claude Code を活用したAIツール・エージェント開発のポートフォリオサイト。

🔗 **Live:** https://watanabenoboru.github.io/portfolio/

## 制作実績
1. **AIニュース要約ツール** — Claude をブラウザ上で起動し、ニュース記事を要約・ランキング化
2. **Claude Code スキル開発** — 独自スキル・サブエージェントを設計し開発作業を自動化
3. **ドキュメント改善パイプライン** — Analyzer→Builder→Reviewer の3段階でドキュメントを分析・改善・評価する Web アプリ

## 技術スタック
- 静的サイト（HTML / CSS / Vanilla JS）— 依存ライブラリなし
- ダークテーマ＋オレンジ・ゴールドのアクセント
- スクロールリビール（IntersectionObserver）/ 画像ライトボックス / レスポンシブ対応
- GitHub Pages でホスティング

## 開発
```bash
# ローカルで確認
python3 -m http.server 8000
# → http://localhost:8000
```

## 構成
```
.
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/            # 制作実績のスクリーンショット
└── README.md
```
