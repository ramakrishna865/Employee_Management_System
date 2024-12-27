import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
// import Forgot from './Components/Forgot/Forgot'
// import LoginForm from './Components/LoginForm/LoginForm'

// function App() {

//   return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<LoginForm/>}/>
//     //     <Route path="/Components/Forgot/Forgot" element={<Forgot/>}/>
//     //     <Route path="/login" element={<LoginForm />} />
//     //   </Routes>
//     // </Router>
//     <LoginForm/>
//   );
// }

export default App
