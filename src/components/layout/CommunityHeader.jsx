import { Cpu, Server, Code, Users, AlertCircle } from 'lucide-react';

const ICON_MAP = { Cpu, Server, Code, Users, AlertCircle };

export default function CommunityHeader({ community, isJoined, onToggleJoin }) {
  if (!community) return null;

  const IconComponent = ICON_MAP[community.icon] ?? Users;

  return (
    <div className="p-4 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
            <IconComponent size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">{community.name}</h2>
            <p className="text-[10px] text-slate-400">{community.memberCount}人のメンバー</p>
          </div>
        </div>
        <button
          onClick={() => onToggleJoin(community.id)}
          className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
            isJoined
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              : 'bg-[#10B981] text-white hover:bg-[#059669]'
          }`}
        >
          {isJoined ? '参加中' : '参加する'}
        </button>
      </div>
      {community.description && (
        <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{community.description}</p>
      )}
    </div>
  );
}
