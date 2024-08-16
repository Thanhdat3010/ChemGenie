import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../components/firebase'; 
import BackgroundContext from '../components/BackgroundContext';
import UserProfile from './UserProfile';
import { debounce } from 'lodash';
import "./Profile.css"; // Đảm bảo đường dẫn đến file CSS là chính xác
import logo from "../assets/logo.png";
import MyPost from '../Blog/MyPost';

const EditProfile = () => (
  <div>
    <h2 className="sm-profile">Chỉnh sửa hồ sơ</h2>
    {/* Nội dung cho chỉnh sửa hồ sơ */}
  </div>
);

const Notifications = () => (
  <div>
    <h2 className="sm-profile">Lời mời kết bạn</h2>
    {/* Nội dung cho thông báo */}
  </div>
);

const LessonHistory = () => (
  <div>
    <h2 className="sm-profile">Lịch sử bài học</h2>
    {/* Nội dung cho lịch sử bài học */}
  </div>
);

const PostList = () => (
  <div>
    <h2 className="sm-profile">Danh sách bài viết</h2>
    {/* Nội dung cho danh sách bài viết */}
  </div>
);

const QuestionBank = () => (
  <div>
    <h2 className="sm-profile">Bộ câu hỏi</h2>
    {/* Nội dung cho bộ câu hỏi */}
  </div>
);

const Profile = () => {
  const { background, setBackground } = useContext(BackgroundContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendData, setFriendData] = useState({});
  const [requestData, setRequestData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);

        const userDoc = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username || '');
          setBio(userData.bio || '');
          setProfilePictureUrl(userData.profilePictureUrl || '');
          setBackground(userData.profilePictureUrl || '');
          setFriends(userData.friends || []);
          setFriendRequests(userData.friendRequestsReceived || []);
          setSentRequests(userData.friendRequestsSent || []);
          await fetchFriendsData(userData.friends || []);
          await fetchRequestsData(userData.friendRequestsReceived || []);
        }
      }
    };

    fetchUserData();
  }, [setBackground]);

  const fetchFriendsData = async (friends) => {
    const friendsData = {};
    for (let friendId of friends) {
      const friendDoc = await getDoc(doc(db, 'profiles', friendId));
      if (friendDoc.exists()) {
        friendsData[friendId] = friendDoc.data();
      }
    }
    setFriendData(friendsData);
  };

  const fetchRequestsData = async (requests) => {
    const requestsData = {};
    for (let requestId of requests) {
      const requestDoc = await getDoc(doc(db, 'profiles', requestId));
      if (requestDoc.exists()) {
        requestsData[requestId] = requestDoc.data();
      }
    }
    setRequestData(requestsData);
  };

  const saveUserData = async (userData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'profiles', user.uid);
        await setDoc(userDoc, userData, { merge: true });
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Url = reader.result;
      setProfilePictureUrl(base64Url);
      setBackground(base64Url);
      saveUserData({
        username,
        email,
        bio,
        profilePictureUrl: base64Url,
        friends,
        friendRequestsReceived: friendRequests,
        friendRequestsSent: sentRequests
      });
    };
    reader.onerror = (error) => console.error('Error: ', error);
  };

  const handleSearch = async (term) => {
    if (!term) {
      setSearchResults([]);
      return;
    }
    const usersRef = collection(db, 'profiles');
    const q = query(usersRef, where('username', '>=', term), where('username', '<=', term + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSearchResults(users);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const sendFriendRequest = async (userId) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserDoc = doc(db, 'profiles', currentUser.uid);
      const userDoc = doc(db, 'profiles', userId);
      await updateDoc(currentUserDoc, {
        friendRequestsSent: arrayUnion(userId),
      });
      await updateDoc(userDoc, {
        friendRequestsReceived: arrayUnion(currentUser.uid),
      });
      setSentRequests([...sentRequests, userId]);
    }
  };

  const cancelFriendRequest = async (userId) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserDoc = doc(db, 'profiles', currentUser.uid);
      const userDoc = doc(db, 'profiles', userId);
      await updateDoc(currentUserDoc, {
        friendRequestsSent: arrayRemove(userId),
      });
      await updateDoc(userDoc, {
        friendRequestsReceived: arrayRemove(currentUser.uid),
      });
      setSentRequests(sentRequests.filter(id => id !== userId));
    }
  };

  const acceptFriendRequest = async (userId) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserDoc = doc(db, 'profiles', currentUser.uid);
      const userDoc = doc(db, 'profiles', userId);
      await updateDoc(currentUserDoc, {
        friends: arrayUnion(userId),
        friendRequestsReceived: arrayRemove(userId),
      });
      await updateDoc(userDoc, {
        friends: arrayUnion(currentUser.uid),
        friendRequestsSent: arrayRemove(currentUser.uid),
      });
      setFriends([...friends, userId]);
      setFriendRequests(friendRequests.filter(id => id !== userId));
      await fetchFriendsData([...friends, userId]);
      await fetchRequestsData(friendRequests.filter(id => id !== userId));
    }
  };

  if (selectedUser) {
    return <UserProfile userId={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="container-fluid">
      <div className="profile-row">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="text-center py-4">
            <img src={logo} alt="Logo" width="90" />
          </div>
          <div className="ps-4 pe-4">
            <ul className="list-unstyled">
              <li className="py-2">
                <i className="bx bx-user me-2"></i>
                <Link to="/edit-profile" className="text-decoration-none">Chỉnh sửa hồ sơ</Link>
              </li>
              <li className="py-2">
                <i className="bx bx-bell me-2"></i>
                <Link to="/notifications" className="text-decoration-none">Thông báo</Link>
              </li>
              <li className="py-2">
                <i className="bx bx-history me-2"></i>
                <Link to="/lesson-history" className="text-decoration-none">Lịch sử bài học</Link>
              </li>
              <li className="py-2">
                <i className="bx bx-file me-2"></i>
                <Link to="/posts" className="text-decoration-none">Danh sách bài viết</Link>
              </li>
              <li className="py-2">
                <i className="bx bx-question-mark me-2"></i>
                <Link to="/question-bank" className="text-decoration-none">Bộ câu hỏi</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="main-content col-md-9">
          <Routes>
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/lesson-history" element={<LessonHistory />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/question-bank" element={<QuestionBank />} />
            <Route path="/" element={
              <div className="profile-content">
                <h1>Hồ sơ của {username}</h1>
                <div className="profile-header">
                  <div className="profile-picture">
                    <img src={profilePictureUrl || "default-profile.png"} alt="Profile" />
                  </div>
                  <div className="profile-details">
                    <h2>{username}</h2>
                    <p>{bio}</p>
                  </div>
                </div>

                <div className="search-box">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bạn bè..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                  />
                  <ul className="search-results list-unstyled">
                    {searchResults.map((user) => (
                      <li key={user.id}>
                        <div className="user-info">
                          <img src={user.profilePictureUrl || "default-profile.png"} alt="User" />
                          <span>{user.username}</span>
                        </div>
                        <button onClick={() => sendFriendRequest(user.id)}>Gửi yêu cầu kết bạn</button>
                        <button onClick={() => cancelFriendRequest(user.id)}>Hủy yêu cầu</button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="friend-list">
                  <h2>Bạn bè</h2>
                  <ul className="list-unstyled">
                    {friends.map((friendId) => (
                      <li key={friendId}>
                        <div className="friend-info">
                          <img src={friendData[friendId]?.profilePictureUrl || "default-profile.png"} alt="Friend" />
                          <span>{friendData[friendId]?.username}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="request-list">
                  <h2>Yêu cầu kết bạn</h2>
                  <ul className="list-unstyled">
                    {friendRequests.map((requestId) => (
                      <li key={requestId}>
                        <div className="request-info">
                          <img src={requestData[requestId]?.profilePictureUrl || "default-profile.png"} alt="Request" />
                          <span>{requestData[requestId]?.username}</span>
                          <button onClick={() => acceptFriendRequest(requestId)}>Chấp nhận</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
