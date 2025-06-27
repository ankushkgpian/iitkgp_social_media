import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const token = getToken();
  const user = getUser();

  useEffect(() => {
    if (!token) return navigate('/login');

    axios.get('http://localhost:5000/api/feed', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPosts(res.data))
    .catch(() => navigate('/login'));
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/feed',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([res.data, ...posts]);
      setContent('');
    } catch (err) {
      alert('Failed to post');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
        <button onClick={handleLogout} className="text-red-600 underline">Logout</button>
      </div>

      <form onSubmit={handlePost} className="mb-6">
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Post
        </button>
      </form>

      {posts.map(post => (
        <div key={post._id} className="mb-4 p-4 border rounded shadow">
          <p className="font-semibold">{post.author.name}</p>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
