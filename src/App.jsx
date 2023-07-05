import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Transaction from "./Pages/Transaction.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles/GlobalStyles.js";
import ResetStyle from "./GlobalStyles/ResetStyles.js";
import { AuthProvider } from "./context/AuthContext.jsx";


function App() {
  return (
    <div className="App">
      <ResetStyle/>
      <GlobalStyles/>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Cadastro" element={<Signup/>}></Route>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/nova-transacao/:tipo" element={<Transaction/>}></Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
     
    </div>
  );
}

export default App;
