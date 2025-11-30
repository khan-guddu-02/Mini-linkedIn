import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');

  const loadPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data);
  };

  const handlePost = async () => {
    await axios.post('http://localhost:5000/api/posts', { token, content });
    setContent('');
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      {token && (
        <>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
          <button onClick={handlePost}>Post</button>
        </>
      )}
      <hr />
      {posts.map(p => (
        <div key={p._id}>
          <p>{p.content}</p>
          <small>By {p.author.name} at {new Date(p.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Feed;