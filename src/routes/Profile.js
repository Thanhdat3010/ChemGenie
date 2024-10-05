import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../components/firebase'; 
import BackgroundContext from '../components/BackgroundContext';
import UserProfile from './UserProfile';
import { debounce } from 'lodash';
import "./Profile.css";
import MyPost from '../Blog/MyPost';
import { AiOutlineMenu } from 'react-icons/ai'; // For sidebar toggle icon

const Profile = () => {
  const navigate = useNavigate;
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
  const [newFriendRequestsCount, setNewFriendRequestsCount] = useState(0);
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Thông báo');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);

        // Kiểm tra Local Storage trước khi gọi Firebase
        const localData = localStorage.getItem(`userProfile_${user.uid}`);
        if (localData) {
          const userData = JSON.parse(localData);
          setUsername(userData.username || '');
          setBio(userData.bio || '');
          setProfilePictureUrl(userData.profilePictureUrl || '');
          setBackground(userData.profilePictureUrl || '');
          setFriends(userData.friends || []);
          setFriendRequests(userData.friendRequestsReceived || []);
          setSentRequests(userData.friendRequestsSent || []);
          setNewFriendRequestsCount(userData.friendRequestsReceived?.length || 0);
          await fetchFriendsData(userData.friends || []);
          await fetchRequestsData(userData.friendRequestsReceived || []);
          return; // Dừng lại nếu đã lấy dữ liệu từ Local Storage
        }

        // Chỉ gọi Firestore nếu không có dữ liệu trong Local Storage
        const userDoc = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // Lưu dữ liệu vào Local Storage
          localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(userData));
          setUsername(userData.username || '');
          setBio(userData.bio || '');
          setProfilePictureUrl(userData.profilePictureUrl || '');
          setBackground(userData.profilePictureUrl || '');
          setFriends(userData.friends || []);
          setFriendRequests(userData.friendRequestsReceived || []);
          setSentRequests(userData.friendRequestsSent || []);
          setNewFriendRequestsCount(userData.friendRequestsReceived?.length || 0);
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
        // Chỉ ghi vào Firestore nếu có thay đổi
        const localData = localStorage.getItem(`userProfile_${user.uid}`);
        const localUserData = localData ? JSON.parse(localData) : {};

        // So sánh dữ liệu cũ và mới
        if (JSON.stringify(localUserData) !== JSON.stringify(userData)) {
          await setDoc(userDoc, userData, { merge: true });
          // Cập nhật Local Storage sau khi ghi vào Firestore
          localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(userData));
        }
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
    <div className="profilePage">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="sidebarToggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <AiOutlineMenu size={24} />
        </button>
        <div className="tabs">
          <button onClick={() => setActiveTab('Thông báo')} className={activeTab === 'Thông báo' ? 'active' : ''}>Thông báo {newFriendRequestsCount > 0 && `(${newFriendRequestsCount})`}</button>
          <button onClick={() => setActiveTab('Friendlist')} className={activeTab === 'Friendlist' ? 'active' : ''}>Danh sách bạn bè</button>
          <button onClick={() => setActiveTab('Lịch sử bài học')} className={activeTab === 'Lịch sử bài học' ? 'active' : ''}>Lịch sử bài học</button>
          <button onClick={() => setActiveTab('Bộ câu hỏi')} className={activeTab === 'Bộ câu hỏi' ? 'active' : ''}>Bộ câu hỏi</button>
          <button onClick={() => setActiveTab('Flashcard')} className={activeTab === 'Flashcard' ? 'active' : ''}>Flashcard</button>
        </div>
        <div className="tabContent">
          {activeTab === 'Thông báo' && (
                    <div className="friendRequests">
                    {friendRequests.map(userId => (
                      <div key={userId} className="friendRequest">
                        <div className="friendRequest-content">
                        <img src={requestData[userId]?.profilePictureUrl || '/default-profile.png'} alt="avatar" className="friend-avatar" />
                        <p>{requestData[userId]?.username}</p>
                        </div>
                        <div className="friendRequest-accept">
                        <button className="friendRequest-btn-accept" onClick={() => acceptFriendRequest(userId)}>Chấp nhận</button>
                        <button className="friendRequest-btn-accept" onClick={() => cancelFriendRequest(userId)}>Từ chối</button>
                        </div>
                      </div>
                    ))}
                  </div>
          )}
          {activeTab === 'Friendlist' && (
        <div className="friends">
          {friends.map(userId => (
            <div key={userId} className="friend">
               <img src={friendData[userId]?.profilePictureUrl || '/default-profile.png'} alt="avatar" className="friend-avatar" />
              <p>{friendData[userId]?.username}</p>
            </div>
          ))}
        </div>
          )}
          {activeTab === 'Lịch sử bài học' && <div>Lịch sử bài học content</div>}
          {activeTab === 'Bộ câu hỏi' && 
          <div>
          <Link className='Profile-link' to="/CustomQuiz">
            Bộ câu hỏi của bạn
          </Link>
          </div>}
          {activeTab === 'Flashcard' && (
            <div>
              <Link to="/flashcard-storage" className="Profile-link">
                Kho Flashcard
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="profile-content col-12 col-md-9">
      <div className="profile-search-friend ">
      <h2 className="profile-addfriend">Kết nối bạn bè</h2>
      <input
          type="text"
          placeholder="Tìm kiếm bạn bè..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        <div className="searchResults">
          {searchResults.map(user => (
            <div key={user.id} className="searchResult mb-3" onClick={() => setSelectedUser(user.id)}>
            <div className="name-search-friend">
            <img className="friend-avatar mr-2" src={user.profilePictureUrl || '/default-profile.png'} alt="avatar" />
              <p className="info-friend m-0">{user.username}</p>
            </div>
              <button className="profile-send"
                    onClick={() =>
                      sentRequests.includes(user.id)
                        ? cancelFriendRequest(user.id)
                        : sendFriendRequest(user.id)
                    }
                  >
                    {sentRequests.includes(user.id) ? 'Hủy kết bạn' : 'Kết bạn'}
                  </button>
            </div>
          ))}
        </div>

        <div className="profileEdit">
        <h2 className="profile-addfriend">Hồ sơ cá nhân</h2>
          <label className="Label-avatar" htmlFor="profilePicture">
            <img
              src={profilePictureUrl || '/default-profile.png'}
              alt="Upload Avatar"
              className="profilePicture"
            />
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) convertToBase64(e.target.files[0]);
              }}
              style={{ display: 'none' }}
            />
          </label>
          <input
            type="text"
            placeholder="Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Tiểu sử"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button className="profile-btn" onClick={() => saveUserData({
            username,
            email,
            bio,
            profilePictureUrl,
            friends,
            friendRequestsReceived: friendRequests,
            friendRequestsSent: sentRequests
          })}>
            Lưu cập nhật
          </button>
        </div>

        <MyPost />
      </div>
    </div>
  );
};

export default Profile;