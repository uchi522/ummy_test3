import { useState, useRef } from 'react';
import { Share2, Bookmark, Send, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import CommentBlock from './CommentBlock.jsx';

export default function ThreadDetail({ thread, allComments, onBack, onAddComment }) {
  const [replyText, setReplyText] = useState('');
  const textareaRef = useRef(null);

  const threadComments = allComments.filter(c => c.threadId === thread.id);
  const rootComments = threadComments.filter(c => c.parentId === null);

  const handleReply = (replyNo) => {
    setReplyText(`>>${replyNo} `);
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    const text = replyText.trim();
    if (!text) return;
    onAddComment(thread.id, text);
    setReplyText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors shrink-0 lg:hidden"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] font-black shrink-0">
            {thread.author.name[0]}
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-black text-slate-800 leading-tight truncate">{thread.title}</h2>
            <p className="text-xs text-slate-400">投稿者: {thread.author.name} • {thread.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><Share2 size={18} /></button>
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><Bookmark size={18} /></button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scroll pb-28 px-8 py-6 max-w-4xl mx-auto w-full">
          <article className="prose prose-slate max-w-none mb-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {thread.content}
            </ReactMarkdown>
          </article>

          <div className="h-px bg-slate-100 mb-10" />

          <section>
            <h3 className="font-black text-base mb-6 flex items-center gap-2 text-slate-800">
              議論スレッド
              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-normal">
                {threadComments.length} 件
              </span>
            </h3>
            {rootComments.length === 0 ? (
              <p className="text-sm text-slate-400">まだコメントはありません。最初のコメントを投稿しましょう。</p>
            ) : (
              rootComments.map(comment => (
                <CommentBlock
                  key={comment.id}
                  comment={comment}
                  allComments={threadComments}
                  onReply={handleReply}
                />
              ))
            )}
          </section>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 rounded-xl border border-slate-200 p-2 focus-within:border-[#10B981]/50 transition-all">
          <textarea
            ref={textareaRef}
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="返信する... (>>番号 で返信先を指定、Cmd+Enterで送信)"
            className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none max-h-32 focus:outline-none"
            rows={1}
          />
          <button
            onClick={handleSubmit}
            disabled={!replyText.trim()}
            className="p-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-sm shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
