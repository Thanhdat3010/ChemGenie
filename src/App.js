import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import Trangchu from "./routes/Trangchu";
import Lythuyet from "./routes/Lythuyet";
import Onthi from "./routes/Onthi";
import Login from "./components/Login";
import Tainguyen from "./routes/Tainguyen";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react'
import Chapter1 from "./Chaper/Chapter1";
import Profile from "./routes/Profile";
import FLashcard from "./routes/Flashcard";
import Chapter2 from "./Chapter2/Chapter2";
import Chapter3 from "./Chapter3/Chapter3";
import Chapter4 from "./Chapter4/Chapter4";
import Chapter5 from "./Chapter5/Chapter5";
import Chapter6 from "./Chapter6/Chapter6";
import Post from "./Blog/Post";
import NewPost from "./Blog/NewPost";
import MyPost from "./Blog/MyPost";
import CreateQuiz from "./CreateQuiz/CreateQuiz";
import CustomQuiz from "./CreateQuiz/CustomQuiz";
import EditQuiz from "./CreateQuiz/EditQuiz";
import { BackgroundProvider } from "./components/BackgroundContext";
import Room from "./CreateQuiz/Room";
import QuizRoom from "./CreateQuiz/QuizRoom";
import WaitingRoom from "./CreateQuiz/WaitingRoom";
import SolverForm from "./CreateQuiz/SolverForm";
import AnalyzeResults from "./CreateQuiz/AnalyzeResults";
import RecommendExercises from "./CreateQuiz/RecommendExercises";
import StorytellingAI from "./CreateQuiz/StorytellingAI";
import ExperimentProposal from "./CreateQuiz/ExperimentProposal";
import Chatbot from "./routes/Chatbot";
function App() {
  useEffect(() => {
    // Tìm nạp email và mã thông báo của người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem('user'))
  
    // Nếu token/email không tồn tại, đánh dấu người dùng là đã đăng xuất
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  
    // Nếu token tồn tại, hãy xác minh nó với máy chủ xác thực để xem nó có hợp lệ không
    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('success' === r.message)
        setEmail(user.email || '')
      })
  }, [])
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <BackgroundProvider>
    <div className="App">
    <Routes>
    <Route path='/login' element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}/>
    <Route path='/' element={<Trangchu />}/>
    <Route path='/Profile' element={<Profile />}/>
    <Route path='/Flashcard' element={<FLashcard />}/>
    <Route path='/CreateQuiz' element={<CreateQuiz/>}/>
    <Route path='/SolverForm' element={<SolverForm/>}/>
    <Route path='/AnalyzeResults' element={<AnalyzeResults/>}/>
    <Route path='/RecommendExercises' element={<RecommendExercises/>}/>
    <Route path='/StorytellingAI' element={<StorytellingAI/>}/>
    <Route path='/ExperimentProposal' element={<ExperimentProposal/>}/>
    <Route path='/CustomQuiz' element={<CustomQuiz/>}/>
    <Route path='/Room' element={<Room/>}/>
    <Route path="/waiting-room/:id" element={<WaitingRoom/>} />
    <Route path="/quiz-room/:roomId" element={<QuizRoom/>} />
    <Route path="/edit-quiz/:quizId" element={<EditQuiz/>} />
    <Route path='/Chapter1' element={<Chapter1 />}/>
    <Route path='/Chapter2' element={<Chapter2 />}/>
    <Route path='/Chapter3' element={<Chapter3 />}/>
    <Route path='/Chapter4' element={<Chapter4/>}/>
    <Route path='/Chapter5' element={<Chapter5/>}/>
    <Route path='/Chapter6' element={<Chapter6/>}/>
    <Route path='/Chatbot' element={<Chatbot/>}/>
    <Route path='/Tainguyen' element={<Tainguyen />}/>
    <Route path='/Lythuyet' element={<Lythuyet/>}/>    
    <Route path='/Onthi' element={<Onthi/>}/>
    <Route path="/post/:id" element={<Post />} />
    <Route path="/new-post" element={<NewPost />} />
    <Route path="/my-post" element={<MyPost />} />
    </Routes>
  </div>
  </BackgroundProvider>

  );
}

export default App;
