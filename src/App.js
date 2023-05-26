import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import UpdateUser from "./pages/UpdateUser";
import RecentMessage from "./pages/RecentMessage";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUsername } from './Reducer/UserNameReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios({
      url:"http://localhost:3000/api/token/verify",
      method:"get",
      withCredentials:true
    })
    .then((response) => {
      dispatch(setUsername(response.data.userdata.username));
    })
    .catch(() => {
      dispatch(setUsername(""));
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/travel" element={<Travel />} />
        <Route path="/registerupdate" element={<UpdateUser />} />
        <Route path="/recentmessage" element={<RecentMessage />} />
      </Routes>
    </div>
  );
};

export default App;
