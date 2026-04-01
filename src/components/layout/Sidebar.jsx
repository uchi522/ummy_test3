import { Cpu, Server, Code, Users, AlertCircle, Plus, Bell, Search, User } from 'lucide-react';
import SidebarItem from './SidebarItem.jsx';

const ICON_MAP = { Cpu, Server, Code, Users, AlertCircle };

export default function Sidebar({ communities, selectedCommunityId, onSelectCommunity, onNewThread, currentUser }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex-col shrink-0 hidden lg:flex">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h1 className="font-black text-xl tracking-tighter text-[#10B981]">CorpBoard</h1>
        <Bell size={20} className="text-slate-400 cursor-pointer hover:text-slate-600" />
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1 overflow-hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="検索..."
            className="w-full bg-slate-100 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 transition-all"
          />
        </div>

        <button
          onClick={onNewThread}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-[#10B981] text-white hover:bg-[#059669] transition-all"
        >
          <Plus size={16} />
          新しいスレッド
        </button>

        <nav className="flex-1 overflow-y-auto space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">チャンネル</p>
          {communities.map(community => {
            const IconComponent = ICON_MAP[community.icon] ?? Users;
            return (
              <SidebarItem
                key={community.id}
                icon={<IconComponent size={16} />}
                label={community.name}
                badge={community.memberCount}
                isActive={selectedCommunityId === community.id}
                onClick={() => onSelectCommunity(community.id)}
              />
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
          <User size={20} />
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold truncate">{currentUser.name}</p>
          <p className="text-[10px] text-slate-400">@{currentUser.handle} ({currentUser.role})</p>
        </div>
      </div>
    </aside>
  );
}
