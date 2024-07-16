import React, { useState, useEffect } from 'react';
import { Layout, Menu, Progress, Tooltip } from 'antd';
import { BookOutlined, PlusOutlined, QuestionCircleOutlined, FireOutlined, UsergroupAddOutlined, RobotOutlined, TeamOutlined, ExperimentOutlined } from '@ant-design/icons';
import Chapter1cauhoi from '../Chaper/Chapter1cauhoi';
import Chapter2cauhoi from '../Chapter2/Chapter2cauhoi';
import './Onthi.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../components/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import CreateQuiz from '../CreateQuiz/CreateQuiz';
import CustomQuiz from '../CreateQuiz/CustomQuiz';
import Room from '../CreateQuiz/Room';
import SolverForm from '../CreateQuiz/SolverForm';
import AnalyzeResults from '../CreateQuiz/AnalyzeResults';
import RecommendExercises from '../CreateQuiz/RecommendExercises';
import StorytellingAI from '../CreateQuiz/StorytellingAI';
import ExperimentProposal from '../CreateQuiz/ExperimentProposal';
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
  <Menu.SubMenu key="sub1" icon={<BookOutlined />} title="Chapter 1">
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
  <Menu.SubMenu key="sub2" icon={<BookOutlined />} title="Chapter 2">
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
  <Menu.SubMenu key="sub3" icon={<BookOutlined />} title="Chapter 3">
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
  <Menu.SubMenu key="sub4" icon={<RobotOutlined />} title="Học với AI">
    <Menu.Item key="create" icon={<PlusOutlined />} onClick={() => handleMenuClick('create')}>
      <Tooltip title="Tạo câu hỏi với AI">
        <span>AI tạo đề</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="Custom" icon={<UsergroupAddOutlined />} onClick={() => handleMenuClick('Custom')}>
      <Tooltip title="Bộ câu hỏi của bạn">
        <span>Bộ câu hỏi</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="SolverForm" icon={<RobotOutlined />} onClick={() => handleMenuClick('SolverForm')}>
      <Tooltip title="AI giải bài">
        <span>AI giải bài</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="AnalyzeResults" icon={<TeamOutlined />} onClick={() => handleMenuClick('AnalyzeResults')}>
      <Tooltip title="AI đánh giá năng lực">
        <span>AI đánh giá</span>
      </Tooltip>
    </Menu.Item>
    <Menu.Item key="RecommendExercises" icon={<FireOutlined />} onClick={() => handleMenuClick('RecommendExercises')}>
      <Tooltip title="AI tạo bài tập theo năng lực">
        <span>AI tạo bài tập</span>
      </Tooltip>
    </Menu.Item>
    {/* <Menu.Item key="StorytellingAI" icon={<FireOutlined />} onClick={() => handleMenuClick('StorytellingAI')}>
      <Tooltip title="Tạo câu chuyện liên quan đến AI theo chủ đề">
        <span>AI tạo câu chuyện</span>
      </Tooltip>
    </Menu.Item> */}
    <Menu.Item key="ExperimentProposal" icon={<ExperimentOutlined />} onClick={() => handleMenuClick('ExperimentProposal')}>
      <Tooltip title="Tạo thí nghiệm theo chủ đề bằng AI">
        <span>AI thí nghiệm</span>
      </Tooltip>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.Item key="Room" icon={<UsergroupAddOutlined />} onClick={() => handleMenuClick('Room')}>
    <Tooltip title="Phòng">
      <span>Phòng</span>
    </Tooltip>
  </Menu.Item>
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
              {selectedChapter === 'create' && <CreateQuiz/>}
              {selectedChapter === 'Custom' && <CustomQuiz/>}
              {selectedChapter === 'SolverForm' && <SolverForm/>}
              {selectedChapter === 'Room' && <Room/>}
              {selectedChapter === 'AnalyzeResults' && <AnalyzeResults/>}
              {selectedChapter === 'RecommendExercises' && <RecommendExercises/>}
              {selectedChapter === 'StorytellingAI' && <StorytellingAI/>}
              {selectedChapter === 'ExperimentProposal' && <ExperimentProposal/>}

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