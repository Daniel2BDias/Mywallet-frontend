import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
import { CgAdd, CgRemove } from "react-icons/cg";
import Entry from "../components/Entry.jsx";
import AuthContext from "../context/AuthContext.jsx";

const Home = () => {
  const [entrys, setEntrys] = useState([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    authVerification(auth);
  }, []);

  async function authVerification(auth) {
    try {
      if (auth) {
        const promise = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions`,
          { headers: { authorization: `Bearer ${auth?.token}` } }
        );

        setEntrys(promise.data);
        return;
      }

      navigate("/");
    } catch (error) {}
  }

  let aux = 0;
  entrys?.forEach((e) => {
    e.transaction.type === "subtract"
      ? (aux -= Number(e.transaction.value))
      : (aux += Number(e.transaction.value))
});
  const saldo = aux.toFixed(2).replace(".", ",");
  const saldoProp = aux;

  return (
    <HomePage>
      <Header>
        <p data-test="user-name">Olá, {auth?.name}</p>
        <img
          data-test="logout"
          alt="logout"
          src={logout}
          onClick={() => {
            axios
              .post(`${import.meta.env.VITE_API_URL}/logout/`, {
                headers: { authorization: `Bearer ${auth?.token}` },
              })
              .then(() => {
                navigate("/");
                setAuth(null);
                localStorage.setItem("auth", null);
              })
              .catch((err) => alert("Erro"));
          }}
        />
      </Header>
      <Log>
        {entrys.length === 0 ? (
          <Reg>
            Não há registros de <br />
            entrada ou saída
          </Reg>
        ) : (
          <>
            <div>
              {entrys
                .map((e, i) => (
                  <Entry
                    key={i}
                    id={e._id}
                    setEntrys={setEntrys}
                    date={e.transaction.date}
                    title={e.transaction.description}
                    value={e.transaction.value}
                    type={e.transaction.type}
                  />
                ))
                .reverse()}
            </div>
            <Saldo color={saldoProp}>
              <span>Saldo</span>
              <p data-test="total-amount">{saldo}</p>
            </Saldo>
          </>
        )}
      </Log>
      <Options>
        <button
          data-test="new-income"
          onClick={() => navigate("/nova-transacao/entrada")}
        >
          <CgAdd className="add" />
          <p>
            Nova
            <br />
            Entrada
          </p>
        </button>
        <button
          data-test="new-expense"
          onClick={() => navigate("/nova-transacao/saida")}
        >
          <CgRemove className="remove" />
          <p>
            Nova <br />
            Saída
          </p>
        </button>
      </Options>
    </HomePage>
  );
};

export default Home;

const Header = styled.div`
  height: 90px;
  width: 326px;
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
`;

const Reg = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #868686;
  font-size: 20px;
  text-align: center;
`;

const Log = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 326px;
  padding: 15px 0;
  background-color: white;
  border-radius: 8px;

  div {
    width: 95%;
    background-color: white;
  }
`;

const Saldo = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px;

  span,
  p {
    background-color: white;
  }

  span {
    font-size: 17px;
    font-weight: 700;
  }

  p {
    color: ${(props) =>
      props.color > 0 ? "#03AC00" : props.color === 0 ? "000000" : "#C70000"};
  }
`;

const Options = styled.div`
  display: flex;

  button {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: justify;
    margin: 20px 9px 9px 9px;
    background-color: #a328d6;
    padding: 15px;
    border: none;
    border-radius: 5px;
    height: 114px;
    width: 155px;
    font-size: 17px;
    font-weight: 700;

    .add,
    .remove {
      font-size: 20px;
      text-align: left;
    }
  }

  p {
    background-color: #a328d6;
  }

  button:hover {
    cursor: pointer;
  }

  button:active {
    transform: scale(0.97);
  }
`;
