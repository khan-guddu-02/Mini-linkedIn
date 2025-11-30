import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const u = await axios.get(`http://localhost:5000/api/auth/${id}`);
        setUser(u.data);

        const p = await axios.get(`http://localhost:5000/api/posts/user/${id}`);
        setPosts(p.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    loadProfile();
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>

      <h4>Posts</h4>
      {posts.length > 0 ? (
        posts.map((p) => (
          <div key={p._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <p>{p.content}</p>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default Profile;