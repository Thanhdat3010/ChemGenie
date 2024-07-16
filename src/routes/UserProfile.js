import React, { useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../components/firebase';
import BackgroundContext from '../components/BackgroundContext';
import "./UserProfile.css";
import MyPost from '../Blog/MyPost';
import UserPosts from '../Blog/UserPosts';
const UserProfile = ({ userId, onBack }) => {
  const { background, setBackground } = useContext(BackgroundContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendData, setFriendData] = useState({});
  const [requestData, setRequestData] = useState({});
  const [isFriend, setIsFriend] = useState(false); // Trạng thái kiểm tra quan hệ bạn bè
  const [dropdownVisible, setDropdownVisible] = useState(false); // Trạng thái hiển thị dropdown

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = doc(db, 'profiles', userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUsername(userData.username || '');
        setBio(userData.bio || '');
        setProfilePictureUrl(userData.profilePictureUrl || '');
        setBackground(userData.profilePictureUrl || '');
        setFriends(userData.friends || []);
        setFriendRequests(userData.friendRequestsReceived || []);
        await fetchFriendsData(userData.friends || []);
        await fetchRequestsData(userData.friendRequestsReceived || []);
      }
    };

    fetchUserData();
  }, [userId, setBackground]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser && friends.includes(currentUser.uid)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [friends]);

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

  const sendFriendRequest = async () => {
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
    }
  };

  const unfriend = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserDoc = doc(db, 'profiles', currentUser.uid);
      const userDoc = doc(db, 'profiles', userId);
      await updateDoc(currentUserDoc, {
        friends: arrayRemove(userId),
      });
      await updateDoc(userDoc, {
        friends: arrayRemove(currentUser.uid),
      });
      setFriends(friends.filter(id => id !== userId));
      setIsFriend(false);
      setDropdownVisible(false); // Ẩn dropdown sau khi chọn
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const addToFavorites = () => {
    // Thêm logic để thêm vào yêu thích ở đây
    console.log('Đã thêm vào yêu thích');
    setDropdownVisible(false); // Ẩn dropdown sau khi chọn
  };

  return (
    <div className="profilePage">
      <div className="userProfileContainer">
        <label htmlFor="fileInput" className="fileInputLabel">
          <img src={background || profilePictureUrl} alt="Profile" />
        </label>
        <h2>Thông tin tài khoản</h2>
        {isFriend ? (
          <div className="dropdownContainer">
            <button onClick={toggleDropdown} className="friendButton">Bạn bè</button>
            {dropdownVisible && (
              <div className="dropdownMenu">
                <button onClick={addToFavorites}>Yêu thích</button>
                <button onClick={unfriend}>Hủy kết bạn</button>
              </div>
            )}
          </div>
        ) : (
          <div className="dropdownContainer">
          <button onClick={sendFriendRequest} className="friendButton">Gửi yêu cầu kết bạn</button>
          </div>
        )}
        <div>
          <label>Tên người dùng:</label>
          <input type="text" value={username} readOnly />
        </div>
        <div>
          <label>Giới thiệu:</label>
          <textarea value={bio} readOnly />
        </div>
        <div className="userPostsContainer">
        <UserPosts userId={userId} />
        </div>
        <button onClick={onBack} className='backButton'>Quay lại</button>
      </div>

      <div className="sidebar">
        <h2>Danh sách bạn bè</h2>
        <div className="friendsList">
          {friends.map(friendId => (
            <div key={friendId} className="friendItem">
              <img src={friendData[friendId]?.profilePictureUrl} alt="Profile" />
              <p>{friendData[friendId]?.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;