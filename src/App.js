import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './component/layout/Layout';
import { Login } from './pages/login/Login';
import { Mypage } from './pages/mypage/Mypage';
import { SearchHome } from './pages/searchHome/SearchHome';
import { Signup } from './pages/signup/Signup';
import { Search } from './pages/localnews/Search';
import { Localinfo } from './pages/localnews/Localinfo';
import { SearchMap } from './pages/searchHome/SearchMap';



const App = () => {
    return (
            <Routes basename={process.env.PUBLIC_URL}>
                <Route path="/" element={<Layout />} >
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="mypage" element={<Mypage />} />
                  <Route path="searchhome" element={<SearchHome />} />
                    <Route path="searchhome/searchmap" element={<SearchMap />}/>
                  <Route path="signup" element={<Signup />} />
                  <Route path="localnews" element={<Search />} />
                  <Route path="localinfo" element={<Localinfo />} />
                </Route>
            </Routes> 
            
    );
}

export default App;