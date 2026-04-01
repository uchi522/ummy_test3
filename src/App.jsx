import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import {
  COMMUNITIES, TAGS, DEPARTMENTS, COMMENTS, CURRENT_USER, EXTRA_THREADS
} from './data/mock.js';
import { useThreads } from './hooks/useThreads.js';
import Header from './components/layout/Header.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import CommunityHeader from './components/layout/CommunityHeader.jsx';
import ThreadListItem from './components/thread/ThreadListItem.jsx';
import ThreadDetail from './components/thread/ThreadDetail.jsx';
import NewThreadForm from './components/thread/NewThreadForm.jsx';

export default function App() {
  const [selectedCommunityId, setSelectedCommunityId] = useState('ai');
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [currentView, setCurrentView] = useState('feed');
  const [sortOrder, setSortOrder] = useState('trend');
  const [upvotedIds, setUpvotedIds] = useState(new Set());
  const [joinedCommunityIds, setJoinedCommunityIds] = useState(new Set());
  const [allComments, setAllComments] = useState(COMMENTS);
  const [extraLoaded, setExtraLoaded] = useState(false);

  const { threads, setThreads } = useThreads(null);

  const displayedThreads = [...threads, ...(extraLoaded ? EXTRA_THREADS : [])]
    .filter(t => !selectedCommunityId || t.communityId === selectedCommunityId)
    .sort((a, b) =>
      sortOrder === 'trend'
        ? b.upvotes - a.upvotes
        : new Date(b.date) - new Date(a.date)
    );

  const selectedThread = threads.find(t => t.id === selectedThreadId)
    ?? EXTRA_THREADS.find(t => t.id === selectedThreadId);

  const selectedCommunity = COMMUNITIES.find(c => c.id === selectedCommunityId);

  const handleSelectCommunity = (id) => {
    setSelectedCommunityId(id);
    setSelectedThreadId(null);
    setCurrentView('feed');
  };

  const handleSelectThread = (threadId) => {
    setSelectedThreadId(threadId);
    setCurrentView('detail');
  };

  const handleUpvote = (threadId) => {
    const wasUpvoted = upvotedIds.has(threadId);
    setUpvotedIds(prev => {
      const next = new Set(prev);
      wasUpvoted ? next.delete(threadId) : next.add(threadId);
      return next;
    });
    setThreads(prev => prev.map(t =>
      t.id === threadId ? { ...t, upvotes: t.upvotes + (wasUpvoted ? -1 : 1) } : t
    ));
  };

  const handleToggleJoin = (communityId) => {
    setJoinedCommunityIds(prev => {
      const next = new Set(prev);
      next.has(communityId) ? next.delete(communityId) : next.add(communityId);
      return next;
    });
  };

  const handleAddComment = (threadId, text) => {
    const match = text.match(/^>>(\d+)\s?/);
    const replyToNo = match ? parseInt(match[1]) : null;
    const threadComments = allComments.filter(c => c.threadId === threadId);
    const parent = replyToNo ? threadComments.find(c => c.replyNo === replyToNo) : null;
    const nextReplyNo = threadComments.length > 0
      ? Math.max(...threadComments.map(c => c.replyNo)) + 1
      : 1;

    const newComment = {
      id: Date.now(),
      threadId,
      replyNo: nextReplyNo,
      parentId: parent?.id ?? null,
      replyToNo,
      author: { id: CURRENT_USER.id, name: CURRENT_USER.name },
      content: text.replace(/^>>\d+\s?/, ''),
      createdAt: '今',
      upvotes: 0,
    };
    setAllComments(prev => [...prev, newComment]);
    setThreads(prev => prev.map(t =>
      t.id === threadId ? { ...t, replies: t.replies + 1 } : t
    ));
  };

  const handleSubmitThread = ({ title, content, communityId, departmentId, tags }) => {
    const newThread = {
      id: Date.now(),
      communityId,
      title,
      author: { id: CURRENT_USER.id, name: CURRENT_USER.name, handle: CURRENT_USER.handle },
      date: new Date().toISOString().split('T')[0],
      upvotes: 0,
      replies: 0,
      preview: content.replace(/[#*`]/g, '').slice(0, 100),
      content,
      outline: [],
      tags,
      departmentId,
    };
    setThreads(prev => [newThread, ...prev]);
    setSelectedCommunityId(communityId);
    setCurrentView('feed');
  };

  const hasMoreThreads = !extraLoaded && EXTRA_THREADS.some(
    t => !selectedCommunityId || t.communityId === selectedCommunityId
  );

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8fafc] overflow-hidden font-sans text-[#1E293B]">
      <Header currentUser={CURRENT_USER} />

      <div className="flex flex-1 overflow-hidden max-w-[1600px] w-full mx-auto">
        <Sidebar
          communities={COMMUNITIES}
          selectedCommunityId={selectedCommunityId}
          onSelectCommunity={handleSelectCommunity}
          onNewThread={() => setCurrentView('create')}
          currentUser={CURRENT_USER}
        />

        <div className="flex flex-1 overflow-hidden">
          {currentView !== 'create' && (
            <main className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
              <CommunityHeader
                community={selectedCommunity}
                isJoined={joinedCommunityIds.has(selectedCommunityId)}
                onToggleJoin={handleToggleJoin}
              />

              <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSortOrder('trend')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    sortOrder === 'trend' ? 'bg-[#10B981] text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  トレンド
                </button>
                <button
                  onClick={() => setSortOrder('newest')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    sortOrder === 'newest' ? 'bg-[#10B981] text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  新着順
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scroll">
                {displayedThreads.length === 0 ? (
                  <p className="p-6 text-xs text-slate-400 text-center">スレッドがありません</p>
                ) : (
                  displayedThreads.map(thread => (
                    <ThreadListItem
                      key={thread.id}
                      thread={thread}
                      isSelected={selectedThreadId === thread.id}
                      isUpvoted={upvotedIds.has(thread.id)}
                      onUpvote={handleUpvote}
                      onClick={() => handleSelectThread(thread.id)}
                    />
                  ))
                )}
                {hasMoreThreads && (
                  <button
                    onClick={() => setExtraLoaded(true)}
                    className="w-full py-3 text-xs text-[#10B981] font-bold hover:bg-[#10B981]/5 transition-colors"
                  >
                    さらに読み込む
                  </button>
                )}
              </div>
            </main>
          )}

          <section className="flex-1 bg-white overflow-hidden">
            {currentView === 'feed' && (
              <div className="flex flex-col items-center justify-center h-full text-slate-300">
                <MessageSquare size={56} className="mb-4 opacity-30" />
                <p className="text-sm">スレッドを選択してください</p>
              </div>
            )}
            {currentView === 'detail' && selectedThread && (
              <ThreadDetail
                thread={selectedThread}
                allComments={allComments}
                onBack={() => setCurrentView('feed')}
                onAddComment={handleAddComment}
              />
            )}
            {currentView === 'create' && (
              <NewThreadForm
                availableTags={TAGS}
                availableDepartments={DEPARTMENTS}
                availableCommunities={COMMUNITIES}
                onSubmit={handleSubmitThread}
                onCancel={() => setCurrentView('feed')}
              />
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
