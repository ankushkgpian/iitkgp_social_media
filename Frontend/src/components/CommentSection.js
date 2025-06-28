import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../utils/auth';

const API = process.env.REACT_APP_BACKEND_URL;

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const user = getUser();

  const token = getToken();

  useEffect(() => {
    axios.get(`${API}/api/comments/${postId}`), {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComments(res.data))
    .catch(err => console.error('Error loading comments:', err));
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await axios.post(
        axios.post(`${API}/api/comments/${postId}`, { content, anonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, res.data]);
      setContent('');
      setAnonymous(false);
    } catch (err) {
      alert('Failed to post comment');
    }
  };

  return (
    <div className="mt-2">
      {comments.map(c => (
        <div key={c._id} className="text-sm mb-1 pl-2 border-l-2 border-gray-300">
          <p className="font-medium">{c.anonymous ? 'Anonymous' : c.author?.name}</p>
          <p>{c.content}</p>
        </div>
      ))}

      <form onSubmit={handleComment} className="mt-2">
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
          <button type="submit" className="text-blue-600 text-sm font-medium">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
