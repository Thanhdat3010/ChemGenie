import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../components/firebase';
import './UserPosts.css';
import { Link } from 'react-router-dom';

const UserPosts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userPostsCollection = collection(db, 'posts');
      const q = query(userPostsCollection, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const userPostsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserPosts(userPostsData);
      setLoading(false);
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="user-posts-container">
      <h1>Bài viết của người dùng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="card-grid-user-posts">
          {userPosts.map(post => (
            <div className="card-user-post" key={post.id}>
              <Link className='card-link-user-post' to={`/post/${post.id}`}>
                <img src={post.imageUrl} alt={`Cover for ${post.title}`} />
              </Link>
              <div className="card-content-user-post">
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;