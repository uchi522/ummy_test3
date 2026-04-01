import { MessageSquare, ThumbsUp } from 'lucide-react';
import TagBadge from '../ui/TagBadge.jsx';
import { TAGS } from '../../data/mock.js';

const tagMap = Object.fromEntries(TAGS.map(t => [t.id, t]));

export default function ThreadListItem({ thread, isUpvoted, onUpvote, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-slate-50 cursor-pointer transition-all border-l-4 ${
        isSelected
          ? 'bg-[#10B981]/5 border-l-[#10B981]'
          : 'hover:bg-slate-50 border-l-transparent'
      }`}
    >
      <h3 className={`text-sm font-bold mb-1 leading-snug ${isSelected ? 'text-[#10B981]' : 'text-slate-800'}`}>
        {thread.title}
      </h3>
      <p className="text-xs text-slate-500 line-clamp-2 mb-2">{thread.preview}</p>

      {thread.tags && thread.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {thread.tags.slice(0, 3).map(tagId => tagMap[tagId] && (
            <TagBadge key={tagId} tag={tagMap[tagId]} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <span className="font-medium text-slate-500 truncate">{thread.author.name}</span>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={e => { e.stopPropagation(); onUpvote(thread.id); }}
            className={`flex items-center gap-1 transition-colors ${isUpvoted ? 'text-[#10B981]' : 'hover:text-slate-600'}`}
          >
            <ThumbsUp size={10} /> {thread.upvotes}
          </button>
          <span className="flex items-center gap-1">
            <MessageSquare size={10} /> {thread.replies}
          </span>
        </div>
      </div>
    </div>
  );
}
