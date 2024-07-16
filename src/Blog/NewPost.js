import React, { useState, useRef, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../components/firebase';
import { doc,getDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './NewPost.css';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState(''); // State for fullName

  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const quillRef = useRef(null); // Tham chiếu đến React Quill

  const navigate = useNavigate();
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'list', 'bullet',
    'bold', 'italic', 'underline',
    'link', 'image'
  ];
  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileDoc = doc(db, 'profiles', user.uid);
        const profileSnap = await getDoc(profileDoc);
        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          setProfilePictureUrl(profileData.profilePictureUrl || '');
          setFullName(profileData.username || '');
        }
      }
    };

    fetchProfileData();
  }, []);
  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const items = clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleImageUpload(file);
        return; // Thêm return để ngăn chặn việc thực hiện các xử lý khác sau khi xử lý ảnh
      }
    }
  };

  const handleImageUpload = async (imageFile) => {
    if (!imageFile) return;

    const imageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Lấy range của selection hiện tại trong ReactQuill
    const range = quillRef.current.getEditor().getSelection(true);

    // Chèn hình ảnh vào vị trí của selection
    quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(''); // Xóa URL nếu người dùng chọn ảnh từ máy
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImageFile(null); // Xóa file ảnh nếu người dùng nhập URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      setUploading(true);
      let uploadedImageUrl = '';

      if (imageFile) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        uploadedImageUrl = await getDownloadURL(imageRef);
      } else if (imageUrl) {
        uploadedImageUrl = imageUrl;
      }

      try {
        const docRef = await addDoc(collection(db, 'posts'), {
          title,
          summary,
          content,
          imageUrl: uploadedImageUrl,
          userId: user.uid, // Thêm userId để liên kết bài viết với người dùng
          email: user.email,
          fullName: fullName  || 'Người dùng ẩn danh',
          createdAt: new Date(),
          featured: false,
        });

        console.log("Document written with ID: ", docRef.id);
        navigate('/Tainguyen');
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="newpost-container">
      <h2>Đăng Bài Mới</h2>
      <form className="newpost-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={50} // Giới hạn tối đa 100 ký tự
        />
        <input
          type="text"
          placeholder="Tóm tắt"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          maxLength={100} // Giới hạn tối đa 100 ký tự
        />
        <input
          type="text"
          placeholder="URL ảnh (tùy chọn)"
          value={imageUrl}
          onChange={handleImageUrlChange}
          disabled={!!imageFile}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!!imageUrl}
        />
        <ReactQuill
          ref={quillRef} // Đặt tham chiếu vào React Quill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={{ ...modules, clipboard: { matchVisual: false } }}
          formats={formats}
          placeholder="Nội dung"
          onPaste={handlePaste}
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Đang tải lên...' : 'Đăng bài'}
        </button>
      </form>
    </div>
  );
};

export default NewPost;