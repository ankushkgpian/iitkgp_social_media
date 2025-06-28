import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../utils/auth';

const API = process.env.REACT_APP_BACKEND_URL;

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const token = getToken();
  const user = getUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API}/api/comments/post/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComments(res.data);
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, token]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await axios.post(
        `${API}/api/comments/post/${postId}`,
        { content, anonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([res.data, ...comments]);
      setContent('');
      setAnonymous(false);
    } catch (err) {
      alert('Failed to post comment');
    }
  };

  const handleUpvote = async (commentId) => {
    try {
      const res = await axios.patch(
        `${API}/api/comments/${commentId}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments(prev =>
        prev.map(c => c._id === commentId ? { ...c, upvotes: res.data.upvotes } : c)
      );
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.delete(`${API}/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  return (
    <div className="mt-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gray-700">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h4>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xs text-blue-600 hover:underline"
        >
          {collapsed ? 'Show comments' : 'Hide comments'}
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading comments...</p>}

      {/* Comments */}
      {!collapsed && !loading && (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {comments.map((c) => (
            <div key={c._id} className="text-sm pl-2 border-l-2 border-gray-300">
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  {c.anonymous ? 'Anonymous' : c.author?.name}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpvote(c._id)}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    👍 {c.upvotes || 0}
                  </button>
                  {user && c.author?._id === user._id && (
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p>{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* New Comment Form */}
      <form onSubmit={handleComment} className="mt-3">
        <textarea
          className="w-full p-2 border rounded text-sm"
          rows="2"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between mt-1">
          <label className="text-sm">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="mr-1"
            />
            Comment anonymously
          </label>
          <button
            type="submit"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
