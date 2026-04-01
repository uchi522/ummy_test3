export const CURRENT_USER = {
  id: 'u1',
  name: '佐藤 健太',
  handle: 'sato_t',
  role: 'Engineer',
  department: 'R&D',
};

export const COMMUNITIES = [
  { id: 'general', name: '全社フィード',    icon: 'Users',       memberCount: 342, description: '全社向けのお知らせ・議論' },
  { id: 'ai',      name: 'AI・機械学習',   icon: 'Cpu',         memberCount: 87,  description: 'AI/MLに関する技術議論' },
  { id: 'infra',   name: 'インフラ・SRE',  icon: 'Server',      memberCount: 54,  description: 'インフラ・信頼性エンジニアリング' },
  { id: 'frontend',name: 'フロントエンド', icon: 'Code',        memberCount: 61,  description: 'フロントエンド技術全般' },
  { id: 'news',    name: '社内ニュース',   icon: 'AlertCircle', memberCount: 210, description: '社内からのアナウンス' },
];

export const TAGS = [
  { id: 'ai',         label: 'AI',          color: '#8B5CF6' },
  { id: 'security',   label: 'セキュリティ', color: '#EF4444' },
  { id: 'infra',      label: 'インフラ',    color: '#F59E0B' },
  { id: 'frontend',   label: 'フロント',    color: '#3B82F6' },
  { id: 'tool',       label: 'ツール',      color: '#10B981' },
  { id: 'discussion', label: '議論',        color: '#6366F1' },
  { id: 'incident',   label: 'インシデント', color: '#EF4444' },
];

export const DEPARTMENTS = [
  { id: 'rd',      label: 'R&D' },
  { id: 'infra',   label: 'インフラ' },
  { id: 'product', label: 'プロダクト' },
  { id: 'design',  label: 'デザイン' },
  { id: 'biz',     label: 'ビジネス' },
];

export const THREADS = [
  {
    id: 1,
    communityId: 'ai',
    title: 'CursorとCopilotを全社導入すべき理由とセキュリティ検証結果',
    author: { id: 'u1', name: '佐藤 健太', handle: 'sato_t' },
    date: '2024-05-20',
    upvotes: 42,
    replies: 24,
    preview: '現在の開発フローを抜本的に変えるチャンスだと思う。特にCursorのマルチファイル編集機能は、大規模プロジェクトでこそ真価を発揮します。',
    content: `## はじめに

現在の開発フローを抜本的に変えるチャンスだと考えています。特にCursorのマルチファイル編集機能は、大規模プロジェクトでこそ真価を発揮します。

## 検証結果のサマリー

1. **プロダクティビティの向上**: 平均35%の改善を確認
2. **セキュリティ**: プロンプトの学習除外設定を適用済み
3. **コスト**: エンジニア1人あたり月額$20の投資対効果

| ツール | 月額 | 主な機能 |
|---|---|---|
| Cursor | $20 | マルチファイル編集・AIチャット |
| GitHub Copilot | $19 | インライン補完・PR要約 |

## 結論

早急にR&D部門から先行導入し、段階的に全社展開することを提案します。`,
    outline: ['はじめに', '検証結果のサマリー', '結論'],
    tags: ['ai', 'tool', 'security'],
    departmentId: 'rd',
  },
  {
    id: 2,
    communityId: 'ai',
    title: 'Llama 3.1 405Bのローカル推論環境構築について',
    author: { id: 'u2', name: '田中 美咲', handle: 'tanaka_m' },
    date: '2024-05-21',
    upvotes: 18,
    replies: 12,
    preview: 'VRAMの要件が非常に厳しいですが、量子化モデルを使用することで現実的な構成が見えてきました。',
    content: `## 概要

Llama 3.1 405Bはオープンソース最大級のモデルですが、フルFP16での動作には約800GBのVRAMが必要です。

## 量子化による現実解

**Q4_K_M量子化**を使用することで、必要VRAMを約230GBまで削減できます。

\`\`\`bash
ollama pull llama3.1:405b-instruct-q4_K_M
\`\`\`

## 推奨ハードウェア構成

- GPU: H100 80GB × 3台（NVLink接続）
- RAM: 512GB以上
- Storage: NVMe 2TB以上`,
    outline: ['概要', '量子化による現実解', '推奨ハードウェア構成'],
    tags: ['ai', 'infra'],
    departmentId: 'rd',
  },
  {
    id: 3,
    communityId: 'infra',
    title: 'ap-northeast-1 におけるネットワーク遅延の調査報告',
    author: { id: 'u3', name: 'インフラ監視Bot', handle: 'infra_bot' },
    date: '2024-05-22',
    upvotes: 8,
    replies: 156,
    preview: '[RESOLVED] 14:30頃に発生したルーティングの問題は解決済みです。詳細な事後分析を共有します。',
    content: `## インシデント概要

**発生日時**: 2024-05-22 14:23 JST
**解決日時**: 2024-05-22 15:47 JST
**影響範囲**: ap-northeast-1 の一部AZ間通信

## 根本原因

BGPルーティングテーブルの誤った更新により、特定サブネット間のトラフィックが意図しないパスを経由していました。

## 再発防止策

- ルーティング変更の事前検証プロセスを強化
- 変更適用前のシャドウテスト導入`,
    outline: ['インシデント概要', '根本原因', '再発防止策'],
    tags: ['infra', 'incident'],
    departmentId: 'infra',
  },
  {
    id: 4,
    communityId: 'frontend',
    title: 'React 19の新機能まとめ: Server Components と use() フック',
    author: { id: 'u4', name: '山田 健', handle: 'yamada_k' },
    date: '2024-05-19',
    upvotes: 31,
    replies: 9,
    preview: 'React 19で正式リリースされたServer ComponentsとActions、use()フックの実践的な使い方をまとめました。',
    content: `## React 19 主要変更点

### Server Components（RSC）

Server Componentsはサーバー側でのみ実行されるコンポーネントです。

\`\`\`jsx
// app/posts/page.jsx (Server Component)
export default async function PostsPage() {
  const posts = await fetchPosts(); // 直接async/await可能
  return <PostList posts={posts} />;
}
\`\`\`

### use() フック

Promiseを直接コンポーネント内で使用できます。

\`\`\`jsx
import { use, Suspense } from 'react';

function Post({ postPromise }) {
  const post = use(postPromise); // Suspenseと組み合わせて使用
  return <h1>{post.title}</h1>;
}
\`\`\``,
    outline: ['React 19 主要変更点'],
    tags: ['frontend'],
    departmentId: 'product',
  },
  {
    id: 5,
    communityId: 'general',
    title: '2024年度 エンジニア勉強会の開催スケジュール発表',
    author: { id: 'u5', name: 'HR推進室', handle: 'hr_team' },
    date: '2024-05-18',
    upvotes: 55,
    replies: 7,
    preview: '今期の社内勉強会スケジュールを公開します。全エンジニア参加推奨です。ご都合のつかない方は録画を共有予定。',
    content: `## 勉強会スケジュール（2024年度Q2）

| 日程 | テーマ | 担当 |
|---|---|---|
| 6月5日(水) | LLMアプリ開発入門 | R&Dチーム |
| 6月19日(水) | Kubernetes実践 | インフラチーム |
| 7月3日(水) | デザインシステム構築 | デザインチーム |
| 7月17日(水) | セキュリティ基礎 | セキュリティチーム |

## 参加方法

社内Meetで開催します。カレンダー招待を各自で承認してください。`,
    outline: ['勉強会スケジュール（2024年度Q2）', '参加方法'],
    tags: ['discussion'],
    departmentId: 'biz',
  },
];

export const EXTRA_THREADS = [
  {
    id: 6,
    communityId: 'ai',
    title: 'OpenAI o3 vs Gemini 2.0 Flash: コーディングベンチマーク比較',
    author: { id: 'u1', name: '佐藤 健太', handle: 'sato_t' },
    date: '2024-05-17',
    upvotes: 27,
    replies: 14,
    preview: '最新のコーディングAIベンチマークをHumanEval、SWE-bench、LCBの3軸で比較しました。',
    content: '詳細コンテンツ読み込み中...',
    outline: [],
    tags: ['ai'],
    departmentId: 'rd',
  },
  {
    id: 7,
    communityId: 'infra',
    title: 'Terraform 1.8 の新機能: プロバイダー関数とスタックの実験的サポート',
    author: { id: 'u3', name: 'インフラ監視Bot', handle: 'infra_bot' },
    date: '2024-05-16',
    upvotes: 19,
    replies: 5,
    preview: 'Terraform 1.8でプロバイダー側でカスタム関数を定義できるようになりました。',
    content: '詳細コンテンツ読み込み中...',
    outline: [],
    tags: ['infra', 'tool'],
    departmentId: 'infra',
  },
  {
    id: 8,
    communityId: 'frontend',
    title: 'Tailwind CSS v4 アルファ版 移行ガイド',
    author: { id: 'u4', name: '山田 健', handle: 'yamada_k' },
    date: '2024-05-15',
    upvotes: 23,
    replies: 11,
    preview: 'v4ではVite統合が大幅に改善され、設定ファイルがゼロコンフィグに近づきました。',
    content: '詳細コンテンツ読み込み中...',
    outline: [],
    tags: ['frontend', 'tool'],
    departmentId: 'product',
  },
];

export const COMMENTS = [
  { id: 1,  threadId: 1, replyNo: 1, parentId: null, replyToNo: null, author: { id: 'u2', name: '鈴木 一郎' }, content: 'インフラ側のセキュリティポリシーとの整合性はどうなってますか？',                                   createdAt: '2時間前', upvotes: 3  },
  { id: 2,  threadId: 1, replyNo: 2, parentId: 1,    replyToNo: 1,    author: { id: 'u1', name: '佐藤 健太' }, content: 'セキュリティチームとは既に合意済みです。データが外部学習に使われない設定を強制します。',           createdAt: '1時間前', upvotes: 7  },
  { id: 3,  threadId: 1, replyNo: 3, parentId: 2,    replyToNo: 2,    author: { id: 'u2', name: '鈴木 一郎' }, content: '承知しました。具体的な設定マニュアルの共有をお願いします。',                                    createdAt: '30分前',  upvotes: 1  },
  { id: 4,  threadId: 1, replyNo: 4, parentId: null, replyToNo: null, author: { id: 'u3', name: '高橋 優子' }, content: '素晴らしい提案ですね！VS Codeからの移行コストが懸念でしたが、ほぼ同じ操作感なら問題なさそうです。', createdAt: '1時間前', upvotes: 12 },
  { id: 5,  threadId: 2, replyNo: 1, parentId: null, replyToNo: null, author: { id: 'u4', name: '山田 健' },   content: 'Q4量子化でどのくらい精度が落ちますか？実用に耐えますか？',                                      createdAt: '3時間前', upvotes: 5  },
  { id: 6,  threadId: 2, replyNo: 2, parentId: 5,    replyToNo: 1,    author: { id: 'u2', name: '田中 美咲' }, content: 'コーディングタスクでは約5-8%の性能低下が見られます。日常的な用途には十分実用的です。',             createdAt: '2時間前', upvotes: 9  },
  { id: 7,  threadId: 3, replyNo: 1, parentId: null, replyToNo: null, author: { id: 'u5', name: '伊藤 誠' },   content: '影響を受けたサービスのリストはどこで確認できますか？',                                           createdAt: '5時間前', upvotes: 2  },
  { id: 8,  threadId: 3, replyNo: 2, parentId: 7,    replyToNo: 1,    author: { id: 'u3', name: 'インフラBot' }, content: 'ステータスページ (status.internal) で確認できます。現在はすべてグリーンです。',                createdAt: '4時間前', upvotes: 4  },
];

export const TRENDING_TAGS = [
  { label: 'AI導入事例', count: 24 },
  { label: 'セキュリティ', count: 18 },
  { label: 'Kubernetes', count: 15 },
  { label: 'React 19',   count: 12 },
  { label: 'LLM',        count: 11 },
];

export const ACTIVE_DISCUSSIONS = [
  { threadId: 3, title: 'ap-northeast-1 ネットワーク遅延', replies: 156 },
  { threadId: 1, title: 'Cursor/Copilot全社導入',          replies: 24  },
  { threadId: 2, title: 'Llama 3.1 405B 環境構築',         replies: 12  },
];
