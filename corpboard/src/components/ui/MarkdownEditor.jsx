import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export default function MarkdownEditor({ value, onChange, placeholder }) {
  const [tab, setTab] = useState('edit');

  return (
    <div className="border border-[#1E293B]/20 rounded-lg overflow-hidden">
      <div className="flex border-b border-[#1E293B]/20 bg-slate-50">
        <button
          type="button"
          onClick={() => setTab('edit')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'edit'
              ? 'bg-[#10B981] text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          編集
        </button>
        <button
          type="button"
          onClick={() => setTab('preview')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'preview'
              ? 'bg-[#10B981] text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          プレビュー
        </button>
      </div>
      {tab === 'edit' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 min-h-[200px] text-sm font-mono resize-y focus:outline-none bg-white"
        />
      ) : (
        <div className="p-4 min-h-[200px] prose prose-slate max-w-none text-sm bg-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {value || '*プレビューする内容がありません*'}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
