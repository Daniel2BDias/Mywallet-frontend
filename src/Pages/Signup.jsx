import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPass, setConfirm ] = useState("");

    const [ body, setBody ] = useState({});
    
    
    function signup (e) {
        e.preventDefault();
        if(password !== confirmPass){return alert("As senhas são diferentes")};
        
        const promise = axios.post(`${process.env.REACT_APP_API_URI}/cadastro`, body);
        promise.then(() => navigate("/"));
        promise.catch((err) => alert(`${err.response.data}`), setName(""), setEmail(""), setPassword(""), setConfirm(""));
    };

    const navigate = useNavigate();
    return (
        <SignPage>
        <h1>MyWallet</h1>
        <Form onSubmit={signup}>
            <input data-test="name" type="text" name="name" placeholder="Nome de Usuário" value={name} onChange={e => {setName(e.target.value); setBody({ ...body, [e.target.name]: e.target.value })}} required></input>
            <input data-test="email" type="email" name="email" placeholder="E-Mail" value={email} onChange={e => {setEmail(e.target.value); setBody({ ...body, [e.target.name]: e.target.value })}} required></input>
            <input data-test="password" type="password" name="password" placeholder="Senha" value={password} onChange={e => {setPassword(e.target.value); setBody({ ...body, [e.target.name]: e.target.value })}} required></input>
            <input data-test="conf-password" type="password" placeholder="Confirme sua senha" value={confirmPass} onChange={e => setConfirm(e.target.value)} required></input>
            <button data-test="sign-up-submit" type="submit">Cadastrar</button>
        </Form>
        <p onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</p>
        
    </SignPage>
    );
};

export default Signup;

const SignPage = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center:
align-items: center;

h1 {
    font-family: 'Saira Stencil One', cursive;
    height: 20vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 32px;
    color: white;
    margin-bottom: 10px;
}

p {
    color: white;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

p:hover {
    cursor: pointer;
}

button {
    height: 50px;
    width: 326px;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0;
}

button:hover {
    cursor: pointer;
}

button:active {
    transform: scale(0.95);
}
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
        padding: 10px;
        margin: 10px 0;
        border: none;
        border-radius: 5px;
        width: 326px;
        height: 50px;
        font-size: 20px;
        box-sizing: border-box;
    }

    input::placeholder {
        color: #000000;
        font-size: 20px;
    }
`