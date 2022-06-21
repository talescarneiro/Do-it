import React from 'react'
import { Background, Container, Content, AnimationContainer } from './styles'
import Button from '../../components/Button'
import { Link, useHistory, Redirect } from 'react-router-dom'
import Input from '../../components/Input'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Signup = ({ authenticated }) => {
    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatório!').required("Campo obrigatório!"),
        email: yup.string().email('Email inválido').required("Campo obrigatório!"),
        password: yup.string().required('Campo obrigatório!').required("Campo obrigatório!").min(8, 'Mínimo de 8 dígitos'),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "Senhas não combinam").required("Campo obrigatório!")
    })

    const history = useHistory()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = ({name, email, password}) => {
        const user = {name, email, password}
        api.post("/user/register", user)
            .then((_) => {
                toast.success('Sucesso ao criar a conta!')
                return history.push("/login")
            })
            .catch((_) => {
                toast.error("Erro ao criar a conta, tente outro e-mail!")
            })
    }

    if(authenticated) {
        return <Redirect to="/dashboard" />
    }

  return (
    <Container>
        <Background />
        <Content>
            <AnimationContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Cadastro</h1>
                    <Input register={register} error={errors.name?.message} name="name" icon={FiUser} label="Nome" placeholder="Seu nome"/>
                    <Input register={register} error={errors.email?.message} name="email" icon={FiMail} label="Email" placeholder="Seu melhor email"/>
                    <Input register={register} error={errors.password?.message} name="password" icon={FiLock} label="Senha" placeholder="Uma senha bem segura" type="password"/>
                    <Input register={register} error={errors.confirmPassword?.message} name="confirmPassword" icon={FiLock} label="Confirmação da senha" placeholder="Confirmação da senha" type="password"/>
                <Button type="submit">Enviar</Button>
                <p>
                    Já tem uma conta? Faça seu <Link to="/login">Login</Link>
                </p>
                </form>
            </AnimationContainer>
        </Content>
    </Container>
  )
}

export default Signup