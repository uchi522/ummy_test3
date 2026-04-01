import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export default function CommentBlock({ comment, allComments, depth = 0, onReply }) {
  const children = allComments.filter(c => c.parentId === comment.id);
  const indentClass = depth > 0 ? (depth >= 5 ? 'ml-4' : 'ml-8') : '';

  return (
    <div className={`mt-4 ${depth > 0 ? `${indentClass} border-l-2 border-slate-200 pl-4` : ''}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
          {comment.author.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-bold text-slate-800">{comment.author.name}</span>
            <span className="text-xs text-slate-400">{comment.createdAt}</span>
            <span className="text-[10px] text-slate-300 font-mono">#{comment.replyNo}</span>
          </div>

          {comment.replyToNo && (
            <div className="text-xs text-[#10B981] bg-[#10B981]/5 border-l-2 border-[#10B981] px-2 py-1 mb-2 rounded-r">
              &gt;&gt;{comment.replyToNo} への返信
            </div>
          )}

          <div className="text-sm text-slate-600 prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {comment.content}
            </ReactMarkdown>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => onReply && onReply(comment.replyNo)}
              className="text-xs text-[#10B981] font-medium hover:underline"
            >
              返信する
            </button>
            <button className="text-xs text-slate-400 hover:text-slate-600">
              👍 {comment.upvotes}
            </button>
          </div>
        </div>
      </div>

      {children.map(child => (
        <CommentBlock
          key={child.id}
          comment={child}
          allComments={allComments}
          depth={depth + 1}
          onReply={onReply}
        />
      ))}
    </div>
  );
}
