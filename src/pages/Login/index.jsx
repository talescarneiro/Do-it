import React from 'react'
import { Background, Container, Content, AnimationContainer } from './styles'
import Button from '../../components/Button'
import { Link, Redirect, useHistory } from 'react-router-dom'
import Input from '../../components/Input'
import { FiMail, FiLock } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Login = ({ authenticated, setAuthenticated }) => {
    const schema = yup.object().shape({
        email: yup.string().email('Email inválido').required("Campo obrigatório!"),
        password: yup.string().required('Campo obrigatório!').min(8, 'Mínimo de 8 dígitos'),
    })

    const history = useHistory()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        api.post("/user/login", data)
            .then(response => {
                const {token} = response.data
                localStorage.setItem("@Doit:token", token)
                setAuthenticated(true)
                return history.push("/dashboard")
            })
            .catch((_) => toast.error("Email ou senha inválidos"))
    }

    if(authenticated) {
        return <Redirect to="/dashboard" />
    }

  return (
    <Container>
        <Content>
            <AnimationContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <Input register={register} error={errors.email?.message} name="email" icon={FiMail} label="Email" placeholder="Seu melhor email"/>
                    <Input register={register} error={errors.password?.message} name="password" icon={FiLock} label="Senha" placeholder="Uma senha bem segura" type="password"/>
                <Button type="submit">Enviar</Button>
                <p>
                    Não tem uma conta? <Link to="/signup">Registre-se</Link>
                </p>
                </form>
            </AnimationContainer>
        </Content>
        <Background />
    </Container>
  )
}

export default Login