import { Bell, Search } from 'lucide-react';

export default function Header({ currentUser }) {
  return (
    <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
      <h1 className="font-black text-xl tracking-tighter text-[#10B981]">CorpBoard</h1>
      <div className="flex items-center gap-3">
        <Search size={20} className="text-slate-400" />
        <Bell size={20} className="text-slate-400" />
        <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] font-bold text-sm">
          {currentUser.name[0]}
        </div>
      </div>
    </header>
  );
}
