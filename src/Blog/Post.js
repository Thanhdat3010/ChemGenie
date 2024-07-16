import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../components/firebase';
import Comments from './Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const user = auth.currentUser;
  const authenticatedUserId = user ? user.uid : null;
  
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const postData = docSnap.data();
        setPost(postData);
        setLikes(postData.likes || 0);
        setLiked(postData.likesBy && postData.likesBy.includes(authenticatedUserId));
        fetchAuthor(postData.userId); // Fetch author details
      } else {
        console.log('No such document!');
      }
    };

    const fetchAuthor = async (userId) => {
      const userRef = doc(db, 'profiles', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setAuthor(userSnap.data());
      } else {
        console.log('No such user profile!');
      }
    };

    fetchPost();
  }, [id, authenticatedUserId]);

  const handleLike = async () => {
    try {
      const postRef = doc(db, 'posts', id);
      let newLikes = likes;
      let newLiked = liked;

      if (liked) {
        await updateDoc(postRef, {
          likes: newLikes - 1,
          likesBy: arrayRemove(authenticatedUserId)
        });
        newLikes -= 1;
        newLiked = false;
      } else {
        await updateDoc(postRef, {
          likes: newLikes + 1,
          likesBy: arrayUnion(authenticatedUserId)
        });
        newLikes += 1;
        newLiked = true;
      }

      setLikes(newLikes);
      setLiked(newLiked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!post || !author) {
    return <div className="loader-container">
    <div className="wrapper-post">
    <div className="blue ball"></div>
    <div className="red ball"></div>
    <div className="yellow ball"></div>
    <div className="green ball"></div>
  </div>
  </div>
    
    ;
  }

  // Convert createdAt to a readable date string
  const createdAt = post.createdAt?.toDate().toLocaleString();

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        {author.profilePictureUrl && (
          <img src={author.profilePictureUrl} alt="Avatar" className="author-avatar" />
        )}
        Đăng bởi <strong>{post.fullName || 'Người dùng ẩn danh'}</strong> vào <time>{createdAt}</time>
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      {/* Thanh ngăn cách */}
      <hr className="separator" />
      
      {/* Phần thích bài viết và nút bình luận */}
      <div className="post-actions">
      <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
      <FontAwesomeIcon  icon={faThumbsUp} className="icon-like" /> Thích ({likes})
      </button>
        <button className="comment-button" onClick={toggleComments}>Bình luận</button>
      </div>
      
      {/* Thanh ngăn cách */}
      <hr className="separator" />
      
      {/* Phần bình luận */}
      {showComments && <Comments postId={id} />}
    </div>
  );
};

export default Post;