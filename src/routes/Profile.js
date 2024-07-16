import React, { useContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../components/firebase'; 
import BackgroundContext from '../components/BackgroundContext';
import UserProfile from './UserProfile';
import { debounce } from 'lodash';
import "./Profile.css";
import MyPost from '../Blog/MyPost';

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
      const currentUserDoc = doc(db, 'profiles', currentUser.uid); //của mình
      const userDoc = doc(db, 'profiles', userId); // của người nhận
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
      <div className="userProfileContainer">
        <label htmlFor="fileInput" className="fileInputLabel">
          <img src={background || profilePictureUrl} alt="Profile" />
          <input
            id="fileInput"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              convertToBase64(file);
            }}
            className="fileInput"
          />
        </label>

        <h2>Thông tin tài khoản</h2>
        <div>
          <label>Tên người dùng:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              saveUserData({ username: e.target.value, email, bio, profilePictureUrl, friends, friendRequestsReceived: friendRequests, friendRequestsSent: sentRequests });
            }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            readOnly
          />
        </div>
        <div>
          <label>Giới thiệu:</label>
          <textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              saveUserData({ username, email, bio: e.target.value, profilePictureUrl, friends, friendRequestsReceived: friendRequests, friendRequestsSent: sentRequests });
            }}
          />
        </div>
        <MyPost />
      </div>

      <div className="sidebar">
        <h2>Tìm kiếm người dùng</h2>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm người dùng"
          />
          <div className="searchResults">
            {searchResults.map(user => (
              <div key={user.id} className="searchResultItem">
                <div onClick={() => setSelectedUser(user.id)} className='searchResultItem1'>
                  <img src={user.profilePictureUrl} alt="Profile" />
                  <p>{user.username}</p>
                </div>
                {!friends.includes(user.id) && !sentRequests.includes(user.id) && (
                  <button onClick={() => sendFriendRequest(user.id)}>Kết bạn</button>
                )}
                {sentRequests.includes(user.id) && (
                  <button onClick={() => cancelFriendRequest(user.id)}>Hủy lời mời</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <h2>Danh sách bạn bè</h2>
        <div className="friendsList">
          {friends.map(friendId => (
            <div key={friendId} className="friendItem" onClick={() => setSelectedUser(friendId)}>
              <img src={friendData[friendId]?.profilePictureUrl} alt="Profile"/>
              <p>{friendData[friendId]?.username}</p>
            </div>
          ))}
        </div>

        <h2>Lời mời kết bạn</h2>
        <div className="friendRequests">
          {friendRequests.map(requestId => (
            <div key={requestId} className="friendRequestItem" >
              <div onClick={() => setSelectedUser(requestId)} className='friendRequestItem1'>
                <img src={requestData[requestId]?.profilePictureUrl} alt="Profile" />
                <p>{requestData[requestId]?.username}</p>
              </div>
              <button onClick={() => acceptFriendRequest(requestId)}>Chấp nhận</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;