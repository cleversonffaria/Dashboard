import React, { useRef, useEffect, useState } from "react";
import { message } from "antd";
// import { useSelector, useDispatch } from "react-redux";
import { Form } from "@unform/web";
//#region Imports Local
import api from "../../services/api";
import { login } from "../../services/auth";

import {
  Container,
  Card,
  Button,
  LabelInput,
  ContainerInput,
  Title,
  RecoverPassword,
} from "./styles";
//#endregion
import { validateInputLogin } from "../../util/validate";
// import { Creators as AuthActions } from "../../store/ducks/auth";

import Input from "../../components/Input";

function Login(props) {
  //#region Hooks and States
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  //#endregion

  //#region Function
  const handleSignIn = async (value, { reset }) => {
    try {
      formRef.current.setErrors({});
      validateInputLogin(value); //Verifica se o email e password não esta vazio e se o email e válido

      const response = await api.post("/login", value);
      login(response.data.token);
      props.history.push("/dashboard/home");
      reset(); // Reseta dados dos campos
    } catch (err) {
      formRef.current.setFieldError(err.type, err.messageErr);
      (!err.messageErr && message.error("Ocorreu algum erro ao logar!")) ||
        message.error(err.messageErr);
    }
  };
  //#endregion
  return (
    <Container>
      <Card>
        <Title>Login Painel</Title>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <ContainerInput>
            <LabelInput>Usuário</LabelInput>
            <Input name="email" placeholder="Digite seu email" />
          </ContainerInput>

          <ContainerInput>
            <LabelInput>Senha</LabelInput>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
            />
          </ContainerInput>

          <Button type="submit">Entrar</Button>
          <RecoverPassword to="/forgot">Esqueci a senha</RecoverPassword>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
