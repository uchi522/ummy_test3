import { TrendingUp, MessageSquare } from 'lucide-react';
import { ACTIVE_DISCUSSIONS } from '../../data/mock.js';

export default function RightPanel({ trendingTags }) {
  return (
    <aside className="w-56 bg-white border-l border-slate-200 p-5 hidden xl:flex flex-col gap-6 shrink-0 overflow-y-auto">
      <section>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <TrendingUp size={11} /> トレンド
        </p>
        <ul className="space-y-2">
          {trendingTags.map((tag, i) => (
            <li key={i} className="flex items-center justify-between text-xs cursor-pointer group">
              <span className="text-slate-700 group-hover:text-[#10B981] transition-colors font-medium">
                #{tag.label}
              </span>
              <span className="text-slate-400">{tag.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <MessageSquare size={11} /> アクティブな議論
        </p>
        <ul className="space-y-3">
          {ACTIVE_DISCUSSIONS.map(item => (
            <li key={item.threadId} className="text-xs cursor-pointer group">
              <p className="text-slate-700 group-hover:text-[#10B981] transition-colors font-medium leading-snug line-clamp-2">
                {item.title}
              </p>
              <p className="text-slate-400 mt-0.5 flex items-center gap-1">
                <MessageSquare size={9} /> {item.replies} 件
              </p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
