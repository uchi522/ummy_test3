export default function SidebarItem({ icon, label, badge, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
        isActive
          ? 'bg-[#10B981]/10 text-[#10B981] font-bold'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {icon}
      <span className="flex-1 text-left truncate">{label}</span>
      {badge != null && (
        <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded-full shrink-0">
          {badge}
        </span>
      )}
    </button>
  );
}
