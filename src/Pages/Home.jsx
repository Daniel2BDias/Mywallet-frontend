import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
import AuthContext from "../context/AuthContext.jsx";
import { authAPI } from "../api/auth/authAPI.js";
import { authVerification } from "../utils/authVerification.js";
import { calculateBalance } from "../utils/calculateBalance.js";
import Options from "../components/Buttons/transactionButtons/transactionOptions.jsx";
import TransactionButton from "../components/Buttons/transactionButtons/transactionButton.jsx";
import Reg from "../components/RegLogMessage.jsx";
import Balance from "../components/BalanceLog.jsx";
import Entries from "../components/Entries/EntriesLog.jsx";

const Home = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    authVerification(auth, navigate, setEntries);
  }, []);

  const balance = calculateBalance(entries);

  return (
    <HomePage>
      <Header>
        <p>Hi, {auth?.name}</p>
        <img
          alt="logout"
          src={logout}
          onClick={() => authAPI.logout(auth, setAuth, navigate)}
        />
      </Header>
      <Log>
        {entries.length === 0 ? (
          <Reg />
        ) : (
          <>
            <Entries entries={entries} />
            <Balance balance={balance} />
          </>
        )}
      </Log>
      <Options>
        <TransactionButton navigate={navigate} type={"income"} />
        <TransactionButton navigate={navigate} type={"expense"} />
      </Options>
    </HomePage>
  );
};

export default Home;

const Header = styled.div`
  height: 90px;
  width: 90%;
  max-width: 326px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: white;
    font-size: 26px;
    font-weight: 700;
  }

  img:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const HomePage = styled.div`
  height: 95vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ::-webkit-scrollbar {
     width: .2em;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #8C11BE;
    border-radius: 10px;
  }
`;

const Log = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-Y: scroll;
  height: 100%;
  width: 90%;
  max-width: 326px;
  padding: 15px 0;
  background-color: white;
  border-radius: 8px;
`;
