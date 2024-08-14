import React, { useState, useEffect } from 'react';
import { Layout, Menu, Progress, Tooltip } from 'antd';
import { BookOutlined, QuestionCircleOutlined, FireOutlined} from '@ant-design/icons';
import Chapter1cauhoi from '../Chaper/Chapter1cauhoi';
import Chapter2cauhoi from '../Chapter2/Chapter2cauhoi';
import './Onthi.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../components/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
const { Sider, Content } = Layout;

const Onthi = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userEmail = user.email || 'defaultUser';

  const [selectedChapter, setSelectedChapter] = useState(1);
  const [chapterCompletion, setChapterCompletion] = useState(null);
  const chapterCompletionDocRef = doc(db, 'users', userEmail, 'chapterCompletion', 'data');

  useEffect(() => {
    const fetchChapterCompletion = async () => {
      const docSnap = await getDoc(chapterCompletionDocRef);
      if (docSnap.exists()) {
        setChapterCompletion(docSnap.data());
      } else {
        const defaultCompletion = { 1: false, 4: false };
        setChapterCompletion(defaultCompletion);
      }
    };
  
    fetchChapterCompletion();
  }, [chapterCompletionDocRef]);

  const saveChapterCompletion = async (completion) => {
    await setDoc(chapterCompletionDocRef, completion);
  };

  useEffect(() => {
    if (chapterCompletion) {
      saveChapterCompletion(chapterCompletion);
    }
  }, [chapterCompletion]);

  const handleMenuClick = (chapterNumber) => {
    setSelectedChapter(chapterNumber);
  };

  const handleChapterCompletion = (chapterNumber) => {
    const updatedCompletion = { ...chapterCompletion, [chapterNumber]: true };
    setChapterCompletion(updatedCompletion);
  };

  const handleChapterReset = (chapterNumber) => {
    const updatedCompletion = { ...chapterCompletion, [chapterNumber]: false };
    setChapterCompletion(updatedCompletion);
  };

  const calculateProgress = () => {
    if (!chapterCompletion) {
      return 0;
    }
    const completedChapters = Object.values(chapterCompletion).filter(completed => completed).length;
    const totalChapters = Object.keys(chapterCompletion).length;
    return (completedChapters / totalChapters) * 100;
  };
  return (
    <Layout>
      <Navbar />
      <Layout className='onthi-layout'>
        <Sider
          width={200}
          style={{ background: 'lightgray' }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          
        <Menu mode="inline" defaultSelectedKeys={['1']} selectedKeys={[String(selectedChapter)]} style={{ height: '100%', borderRight: 0 }}>
        <div className="onthi-manage"><p className="onthi-manage-name">Quản lý</p></div>
  <Menu.SubMenu key="sub1" icon={<BookOutlined />} title="Chương 1">
    <Menu.Item key="1" icon={<BookOutlined />} onClick={() => handleMenuClick(1)}>
      <Tooltip title="Ôn tập">
        <span>Ôn tập</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="2" icon={<QuestionCircleOutlined />} onClick={() => handleMenuClick(2)}>
      <Tooltip title="Questions">
        <span>Questions</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="3" icon={<FireOutlined />} onClick={() => handleMenuClick(3)}>
      <Tooltip title="Luyện đề">
        <span>Luyện đề</span>
      </Tooltip>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.SubMenu key="sub2" icon={<BookOutlined />} title="Chương 2">
    <Menu.Item key="4" icon={<BookOutlined />} onClick={() => handleMenuClick(4)}>
      <Tooltip title="Ôn tập">
        <span>Ôn tập</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="5" icon={<QuestionCircleOutlined />} onClick={() => handleMenuClick(5)}>
      <Tooltip title="Questions">
        <span>Questions</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="6" icon={<FireOutlined />} onClick={() => handleMenuClick(6)}>
      <Tooltip title="Luyện đề">
        <span>Luyện đề</span>
      </Tooltip>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.SubMenu key="sub3" icon={<BookOutlined />} title="Chương 3">
    <Menu.Item key="7" icon={<BookOutlined />} onClick={() => handleMenuClick(7)}>
      <Tooltip title="Ôn tập">
        <span>Ôn tập</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="8" icon={<QuestionCircleOutlined />} onClick={() => handleMenuClick(8)}>
      <Tooltip title="Questions">
        <span>Questions</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="9" icon={<FireOutlined />} onClick={() => handleMenuClick(9)}>
      <Tooltip title="Luyện đề">
        <span>Luyện đề</span>
      </Tooltip>
    </Menu.Item>
  </Menu.SubMenu>
</Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ padding: '24px 0', minHeight: 280 }}>
            <div className='onthi-progress-bar'>
              <Progress percent={calculateProgress()} status="active" />
            </div>
            <div className='onthi-content-wrapper'>
              {selectedChapter === 1 && <Chapter1cauhoi onCompletion={() => handleChapterCompletion(1)} onReset={() => handleChapterReset(1)} />}
              {selectedChapter === 4 && <Chapter2cauhoi onCompletion={() => handleChapterCompletion(4)} onReset={() => handleChapterReset(4)} />}

              {/* Add more chapters here */}
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Onthi;