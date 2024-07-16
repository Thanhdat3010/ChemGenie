import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage, auth } from '../components/firebase';
import { ref, deleteObject } from 'firebase/storage';
import './MyPost.css';
import EditPost from './EditPost'; // Import thành phần EditPost
import { Link, useNavigate } from 'react-router-dom';

const MyPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // State cho bài viết đang chỉnh sửa
  const [dropdownOpen, setDropdownOpen] = useState(null); // State cho dropdown
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
  const postsPerPage = 2; // Số bài viết trên mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      const user = auth.currentUser;
      if (user) {
        const userPostsCollection = collection(db, 'posts');
        const q = query(userPostsCollection, where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const userPostsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserPosts(userPostsData);
        setLoading(false);
      } else {
        console.log('No user is logged in.');
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDeletePost = async (postId, imageUrl) => {
    try {
      if (!confirmDelete) {
        setConfirmDelete(true);
        setPostIdToDelete(postId);
      } else {
        // Xóa tất cả các comments và replies liên quan đến bài viết
        const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));
        const commentsSnapshot = await getDocs(commentsQuery);

        const deletePromises = commentsSnapshot.docs.map(async (commentDoc) => {
          const commentId = commentDoc.id;

          // Xóa tất cả các phản hồi của bình luận
          const repliesQuery = query(collection(db, 'comments', commentId, 'replies'));
          const repliesSnapshot = await getDocs(repliesQuery);

          const deleteReplyPromises = repliesSnapshot.docs.map((replyDoc) =>
            deleteDoc(doc(db, 'comments', commentId, 'replies', replyDoc.id))
          );
          await Promise.all(deleteReplyPromises);

          // Xóa bình luận
          await deleteDoc(doc(db, 'comments', commentId));
        });

        await Promise.all(deletePromises);

        // Xóa bài viết
        await deleteDoc(doc(db, 'posts', postId));

        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }

        setUserPosts(userPosts.filter(post => post.id !== postId));
        setConfirmDelete(false);
        setPostIdToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      const postDoc = doc(db, 'posts', updatedPost.id);
      await updateDoc(postDoc, updatedPost);
      setUserPosts(userPosts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const toggleDropdown = (postId) => {
    setDropdownOpen(dropdownOpen === postId ? null : postId);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(userPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePagination = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="blog-container-mypost">
      <h1>Bài viết của tôi</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : editingPost ? (
        <EditPost post={editingPost} onUpdatePost={handleUpdatePost} onCancel={() => setEditingPost(null)} />
      ) : (
        <div className="card-grid-mypost">
          {currentPosts.map(post => (
            <div className="card-mypost" key={post.id}>
              <Link className='card-link-mypost' to={`/post/${post.id}`} key={post.id}>
                <img src={post.imageUrl} alt={`Cover for ${post.title}`} />
              </Link>
              <div className="card-content-mypost">
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </div>
              <div className="card-menu-mypost">
                <button onClick={() => toggleDropdown(post.id)} className="menu-button-mypost">⋮</button>
                {dropdownOpen === post.id && (
                  <div className="dropdown-mypost">
                    <button onClick={() => handleEditPost(post)} className="dropdown-item-mypost">Sửa</button>
                    <button onClick={() => handleDeletePost(post.id, post.imageUrl)} className="dropdown-item-mypost">Xóa</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        {generatePagination().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && paginate(page)}
            className={`page-number ${currentPage === page ? 'active' : ''}`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
      </div>
      {confirmDelete && (
        <div className="confirm-delete-mypost">
          <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
          <div className="confirm-buttons-mypost">
            <button onClick={() => handleDeletePost(postIdToDelete)} className="confirm-delete-button-mypost">Xác nhận</button>
            <button onClick={() => setConfirmDelete(false)} className="cancel-delete-button-mypost">Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPost;
