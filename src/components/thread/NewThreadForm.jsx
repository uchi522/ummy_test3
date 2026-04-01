import { useState } from 'react';
import { X } from 'lucide-react';
import MarkdownEditor from '../ui/MarkdownEditor.jsx';
import TagBadge from '../ui/TagBadge.jsx';

export default function NewThreadForm({ availableTags, availableDepartments, availableCommunities, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !selectedCommunity) return;
    onSubmit({ title, content, communityId: selectedCommunity, departmentId: selectedDept, tags: selectedTags });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      <header className="px-8 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-black text-slate-800">新しいスレッドを作成</h2>
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
          <X size={20} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 p-8 max-w-3xl mx-auto w-full space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">タイトル <span className="text-red-400">*</span></label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="スレッドのタイトルを入力..."
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#10B981]/50 focus:ring-2 focus:ring-[#10B981]/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">本文</label>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="内容をMarkdownで入力..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">コミュニティ <span className="text-red-400">*</span></label>
            <select
              value={selectedCommunity}
              onChange={e => setSelectedCommunity(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#10B981]/50 transition-all bg-white"
            >
              <option value="">選択してください</option>
              {availableCommunities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">部門</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#10B981]/50 transition-all bg-white"
            >
              <option value="">選択してください</option>
              {availableDepartments.map(d => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">タグ（複数選択可）</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`transition-all rounded ${selectedTags.includes(tag.id) ? 'ring-2 ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
                style={{ '--tw-ring-color': tag.color }}
              >
                <TagBadge tag={tag} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={!title.trim() || !selectedCommunity}
            className="px-6 py-2.5 bg-[#10B981] text-white text-sm font-bold rounded-lg hover:bg-[#059669] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            投稿する
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200 transition-all"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
