import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../components/firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditPost.css';

const EditPost = ({ post, onUpdatePost, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [summary, setSummary] = useState(post.summary);
  const [content, setContent] = useState(post.content);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [uploading, setUploading] = useState(false);

  const quillRef = useRef(null);

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

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const items = clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleImageUpload(file);
        return;
      }
    }
  };

  const handleImageUpload = async (imageFile) => {
    if (!imageFile) return;

    const imageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    const range = quillRef.current.getEditor().getSelection(true);

    quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl('');
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let uploadedImageUrl = imageUrl;

    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      uploadedImageUrl = await getDownloadURL(imageRef);
    }

    const updatedPost = {
      ...post,
      title,
      summary,
      content,
      imageUrl: uploadedImageUrl,
    };

    onUpdatePost(updatedPost);
    setUploading(false);
  };

  return (
    <div className="editpost-container">
      <h2>Sửa Bài Viết</h2>
      <form className="editpost-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={50}
        />
        <input
          type="text"
          placeholder="Tóm tắt"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          maxLength={100}
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
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={{ ...modules, clipboard: { matchVisual: false } }}
          formats={formats}
          placeholder="Nội dung"
          onPaste={handlePaste}
          required
        />
        <button className='edit-submit' type="submit" disabled={uploading}>
          {uploading ? 'Đang tải lên...' : 'Cập nhật bài viết'}
        </button>
        <button className='edit-cancel' type="button" onClick={onCancel}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default EditPost;