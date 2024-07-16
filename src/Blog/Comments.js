import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../components/firebase';
import './Comments.css';
import Notification from '../components/Notification';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNowStrict  } from 'date-fns'; // Import from date-fns
import { vi } from 'date-fns/locale';
const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [authors, setAuthors] = useState({});
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editingReplyContent, setEditingReplyContent] = useState('');
  const [likedComments, setLikedComments] = useState({});
  const [likedReplies, setLikedReplies] = useState({});
  const [addingComment, setAddingComment] = useState(false);
  const [addingReply, setAddingReply] = useState(false);
  

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, 'comments'), where('postId', '==', postId));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
      const likedCommentsObj = {};
      commentsData.forEach(comment => {
        const user = auth.currentUser;
        if (user && comment.likesBy.includes(user.uid)) {
          likedCommentsObj[comment.id] = true;
        } else {
          likedCommentsObj[comment.id] = false;
        }
      });
      setLikedComments(likedCommentsObj);
      
      setLoading(false);
    };

    fetchComments();
  }, [postId]);
  
  useEffect(() => {
    const fetchAuthors = async () => {
      const authorIds = [...new Set(comments.map(comment => comment.userId))];
      const authors = {};

      for (const authorId of authorIds) {
        const userRef = doc(db, 'profiles', authorId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          authors[authorId] = userSnap.data();
        } else {
          console.log('No such user profile for userId:', authorId);
        }
      }

      setAuthors(authors);
    };

    fetchAuthors();
  }, [comments]);

  useEffect(() => {
    const fetchAllReplies = async () => {
      const repliesData = {};
      const likedRepliesObj = {};
  
      for (const comment of comments) {
        const repliesQuery = query(collection(db, 'comments', comment.id, 'replies'));
        const repliesSnapshot = await getDocs(repliesQuery);
        let replies = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Sắp xếp các phản hồi theo số lượt thích giảm dần
        replies = replies.sort((a, b) => b.likes - a.likes);
  
        repliesData[comment.id] = replies;
  
        replies.forEach(reply => {
          const user = auth.currentUser;
          if (user && reply.likesBy.includes(user.uid)) {
            likedRepliesObj[reply.id] = true;
          } else {
            likedRepliesObj[reply.id] = false;
          }
        });
      }
  
      setReplies(repliesData);
      setLikedReplies(likedRepliesObj);
    };
  
    if (comments.length > 0) {
      fetchAllReplies();
    }
  }, [comments]);

  const handleEditReply = (replyId, content) => {
    setEditingReplyId(replyId);
    setEditingReplyContent(content);
  };

  const handleSaveEditReply = async (commentId, replyId) => {
    try {
      const replyRef = doc(db, 'comments', commentId, 'replies', replyId);
      await updateDoc(replyRef, {
        content: editingReplyContent,
        edited: true, // Cập nhật trường edited
      });
      setEditingReplyId(null);
      setEditingReplyContent('');
  
      // Reload replies for the comment
      const repliesQuery = query(collection(db, 'comments', commentId, 'replies'));
      const repliesSnapshot = await getDocs(repliesQuery);
      setReplies(prevReplies => ({
        ...prevReplies,
        [commentId]: repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }));
      setNotificationMessage('Phản hồi đã được chỉnh sửa thành công.');
      setShowNotification(true);
    } catch (error) {
      console.error('Error updating reply:', error);
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      const replyRef = doc(db, 'comments', commentId, 'replies', replyId);
      await deleteDoc(replyRef);

      // Reload replies for the comment
      const repliesQuery = query(collection(db, 'comments', commentId, 'replies'));
      const repliesSnapshot = await getDocs(repliesQuery);
      setReplies(prevReplies => ({
        ...prevReplies,
        [commentId]: repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }));
      setNotificationMessage('Phản hồi đã được xóa thành công.');
      setShowNotification(true);
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
  
    if (user) {
      try {
        setAddingComment(true); // Bắt đầu loading
        await addDoc(collection(db, 'comments'), {
          postId,
          content: newComment,
          userId: user.uid,
          fullName: user.displayName || 'Người dùng ẩn danh',
          createdAt: serverTimestamp(),
          likes: 0, // Khởi tạo số lượt thích là 0
          likesBy: [], // Khởi tạo mảng likesBy rỗng
          edited: false, // Thêm trường edited
        });
        setNewComment('');
  
        // Reload comments
        const q = query(collection(db, 'comments'), where('postId', '==', postId));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      } catch (error) {
        console.error('Error adding comment:', error);
      } finally {
        setAddingComment(false); // Tắt loading
      }
    }
  };
  
  const handleAddReply = async (commentId, e) => {
    e.preventDefault();
    const user = auth.currentUser;
  
    if (user) {
      try {
        setAddingReply(true); // Bắt đầu loading
        const replyData = {
          content: newReply,
          userId: user.uid,
          fullName: user.displayName || 'Người dùng ẩn danh',
          createdAt: serverTimestamp(), // Lấy thời gian hiện tại của máy chủ
          likes: 0,
          likesBy: [],
          edited: false,
        };
        await addDoc(collection(db, 'comments', commentId, 'replies'), replyData);
        setNewReply('');
        setReplyingToCommentId(null);
        setShowNotification(true);
        setNotificationMessage('Phản hồi đã được thêm thành công.');
  
        // Reload replies for the comment
        const repliesQuery = query(collection(db, 'comments', commentId, 'replies'));
        const repliesSnapshot = await getDocs(repliesQuery);
        let replies = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Sắp xếp các phản hồi theo số lượt thích giảm dần
        replies = replies.sort((a, b) => b.likes - a.likes);
  
        setReplies(prevReplies => ({
          ...prevReplies,
          [commentId]: replies
        }));
      } catch (error) {
        console.error('Error adding reply:', error);
      } finally {
        setAddingReply(false); // Tắt loading
      }
    }
  };

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage('');
      }, 3000); // Thời gian hiển thị thông báo (3000ms = 3 giây)
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  const handleDeleteComment = async (commentId) => {
    try {
      // Xóa bình luận
      await deleteDoc(doc(db, 'comments', commentId));

      // Xóa tất cả phản hồi của bình luận này
      const repliesQuery = query(collection(db, 'comments', commentId, 'replies'));
      const repliesSnapshot = await getDocs(repliesQuery);
      repliesSnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Hiển thị thông báo
      setNotificationMessage('Bình luận và các phản hồi đã được xóa thành công.');
      setShowNotification(true);

      // Tải lại danh sách bình luận
      const q = query(collection(db, 'comments'), where('postId', '==', postId));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
  };

  const handleSaveEdit = async (commentId) => {
    try {
      const commentRef = doc(db, 'comments', commentId);
      await updateDoc(commentRef, {
        content: editingCommentContent,
        edited: true, // Cập nhật trường edited
      });
      setEditingCommentId(null);
      setEditingCommentContent('');
      // Reload comments
      const q = query(collection(db, 'comments'), where('postId', '==', postId));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
      setNotificationMessage('Bình luận đã được chỉnh sửa thành công.');
      setShowNotification(true);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return formatDistanceToNowStrict(new Date(timestamp.seconds * 1000), { addSuffix: true, locale: vi });
  };
  
  const toggleReplies = (commentId) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleLikeComment = async (commentId) => {
    try {
      const user = auth.currentUser;
      const commentRef = doc(db, 'comments', commentId);
      const commentSnap = await getDoc(commentRef);
      if (commentSnap.exists() && user) {
        const commentData = commentSnap.data();
        const currentLikes = commentData.likes || 0;
        const likesBy = commentData.likesBy || [];

        // Kiểm tra trạng thái liked của bình luận
        if (!likesBy.includes(user.uid)) {
          // Nếu chưa like, tăng số lượt thích và thêm userId vào mảng likesBy
          await updateDoc(commentRef, {
            likes: currentLikes + 1,
            likesBy: [...likesBy, user.uid],
          });
          setLikedComments(prev => ({
            ...prev,
            [commentId]: true,
          }));
        } else {
          // Nếu đã like, giảm số lượt thích và xóa userId khỏi mảng likesBy
          await updateDoc(commentRef, {
            likes: currentLikes - 1,
            likesBy: likesBy.filter(id => id !== user.uid),
          });
          setLikedComments(prev => ({
            ...prev,
            [commentId]: false,
          }));
        }

        // Reload comments
        const q = query(collection(db, 'comments'), where('postId', '==', postId));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleLikeReply = async (commentId, replyId) => {
    try {
      const user = auth.currentUser;
      const replyRef = doc(db, 'comments', commentId, 'replies', replyId);
      const replySnap = await getDoc(replyRef);
      if (replySnap.exists() && user) {
        const replyData = replySnap.data();
        const currentLikes = replyData.likes || 0;
        const likesBy = replyData.likesBy || [];

        // Kiểm tra trạng thái liked của phản hồi
        if (!likesBy.includes(user.uid)) {
          // Nếu chưa like, tăng số lượt thích và thêm userId vào mảng likesBy
          await updateDoc(replyRef, {
            likes: currentLikes + 1,
            likesBy: [...likesBy, user.uid],
          });
          setLikedReplies(prev => ({
            ...prev,
            [replyId]: true,
          }));
        } else {
          // Nếu đã like, giảm số lượt thích và xóa userId khỏi mảng likesBy
          await updateDoc(replyRef, {
            likes: currentLikes - 1,
            likesBy: likesBy.filter(id => id !== user.uid),
          });
          setLikedReplies(prev => ({
            ...prev,
            [replyId]: false,
          }));
        }

        // Reload replies for the comment
        const repliesQuery = query(collection(db, 'comments', commentId, 'replies'));
        const repliesSnapshot = await getDocs(repliesQuery);
        setReplies(prevReplies => ({
          ...prevReplies,
          [commentId]: repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        }));
      }
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  // Sắp xếp các bình luận theo số lượt thích
  const sortedComments = [...comments].sort((a, b) => b.likes - a.likes);

  return (
    <div className="comments-container">
      <h3>Bình luận</h3>
      {loading ? <section className="dots-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      </section> : (
        <>
        {!addingComment ? (
          <form onSubmit={handleAddComment} className="new-comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận của bạn..."
              required
            />
            <button className='submit-comment' type="submit">Gửi</button>
          </form>
        ) : (
            <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            </section>        
            )}
          <ul>
            {sortedComments.map(comment => (
              <li key={comment.id}>
                <div className="comment-header">
                  {authors[comment.userId] && authors[comment.userId].profilePictureUrl && (
                    <img src={authors[comment.userId].profilePictureUrl} alt="Avatar" className="author-avatar" />
                  )}
                  <div className="comment-details">
                    <p className='comment-user'><strong>{comment.fullName}</strong> 
                    <span className='Timestamp'>{formatTimestamp(comment.createdAt)}</span>
                    {comment.edited && <span className="edited-label">(đã chỉnh sửa)</span>}
                    </p>
                    {editingCommentId === comment.id ? (
                      <div>
                        <textarea
                          value={editingCommentContent}
                          onChange={(e) => setEditingCommentContent(e.target.value)}
                          required
                        />
                        <button className="edit-button" onClick={() => handleSaveEdit(comment.id)}>Lưu</button>
                        <button className="cancel-button" onClick={handleCancelEdit}>Hủy</button>
                      </div>
                    ) : (
                      <p className='comment-content'>{comment.content}</p>
                    )}
                    <div className='comment-icons'>
                    <button className={`comment-button-like ${likedComments[comment.id] ? 'liked' : ''}`} onClick={() => handleLikeComment(comment.id)}>
                    <FontAwesomeIcon  icon={faThumbsUp} /> {comment.likes}
                  </button>

                      <button className="comment-button-dislike"><i className="fas fa-thumbs-down"></i></button>
                      <button className="comment-button-reply" onClick={() => setReplyingToCommentId(comment.id)}>Trả lời</button>
                    </div>
                    <div className="actions">
                      {auth.currentUser && auth.currentUser.uid === comment.userId && (
                        <div className="dropdown">
                          <button className="dropdown-toggle">⋮</button>
                          <div className="dropdown-content">
                            <button onClick={() => handleEditComment(comment.id, comment.content)} className="edit-comment-button">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteComment(comment.id)} className="delete-comment-button">Xóa</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                                {replyingToCommentId === comment.id && (
                    addingReply ? (
                      <section className="dots-container">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      </section>
                    ) : (
                      <form onSubmit={(e) => handleAddReply(comment.id, e)} className="new-comment-form">
                        <textarea
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          placeholder="Viết phản hồi của bạn..."
                          required
                        />
                        <button className='submit-comment' type="submit">Gửi</button>
                      </form>
                    )
                  )}
                <ul className="replies-list">
                {replies[comment.id] && (
                expandedComments[comment.id] ? (
                replies[comment.id].map(reply => (
                <li key={reply.id}>
                        <div className="comment-header">
                          {authors[reply.userId] && authors[reply.userId].profilePictureUrl && (
                            <img src={authors[reply.userId].profilePictureUrl} alt="Avatar" className="author-avatar" />
                          )}
                          <div className="comment-details">
                            <p className='comment-user'><strong>{reply.fullName}</strong> 
                            <span className='Timestamp'>{formatTimestamp(reply.createdAt)}</span>
                            {reply.edited && <span className="edited-label">(đã chỉnh sửa)</span>}
                            </p>
                            {editingReplyId === reply.id ? (
                              <div>
                                <textarea
                                  value={editingReplyContent}
                                  onChange={(e) => setEditingReplyContent(e.target.value)}
                                  required
                                />
                                <button className="edit-button" onClick={() => handleSaveEditReply(comment.id, reply.id)}>Lưu</button>
                                <button className="cancel-button" onClick={() => { setEditingReplyId(null); setEditingReplyContent(''); }}>Hủy</button>
                              </div>
                            ) : (
                              <p className='comment-content'>{reply.content}</p>
                            )}
                            <div className='comment-icons'>
                            <button className={`comment-button-like ${likedReplies[reply.id] ? 'liked' : ''}`} onClick={() => handleLikeReply(comment.id, reply.id)}>
                            <FontAwesomeIcon icon={faThumbsUp} /> {reply.likes}
                          </button>
                              <button className="comment-button-dislike"><i className="fas fa-thumbs-down"></i></button>
                              <button className="comment-button-reply" onClick={() => setReplyingToCommentId(comment.id)}>Trả lời</button>
                            </div>
                            <div className="actions">
                              {auth.currentUser && auth.currentUser.uid === reply.userId && (
                                <div className="dropdown">
                                  <button className="dropdown-toggle">⋮</button>
                                  <div className="dropdown-content">
                                    <button onClick={() => handleEditReply(reply.id, reply.content)} className="edit-comment-button">Chỉnh sửa</button>
                                    <button onClick={() => handleDeleteReply(comment.id, reply.id)} className="delete-comment-button">Xóa</button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    replies[comment.id].slice(0, 0).map(reply => (
                      <li key={reply.id}>
                        <div className="comment-header">
                          {authors[reply.userId] && authors[reply.userId].profilePictureUrl && (
                            <img src={authors[reply.userId].profilePictureUrl} alt="Avatar" className="author-avatar" />
                          )}
                          <div className="comment-details">
                            <p className='comment-user'><strong>{reply.fullName}</strong> 
                            <span className='Timestamp'>{formatTimestamp(reply.createdAt)}</span>
                            {reply.edited && <span className="edited-label">(đã chỉnh sửa)</span>}

                            </p>
                            <p className='comment-content'>{reply.content}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  )
                )}
                {replies[comment.id] && replies[comment.id].length > 0 && (
                  <button className="toggle-replies-button" onClick={() => toggleReplies(comment.id)}>
                    {expandedComments[comment.id] ? 'Ẩn' : `${replies[comment.id].length} phản hồi`}
                  </button>
                )}
              </ul>
              </li>
            ))}
          </ul>
         
        </>
      )}
      {showNotification && <Notification message={notificationMessage} />}
    </div>
  );
};

export default Comments;
