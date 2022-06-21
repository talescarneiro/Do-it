import React from 'react'
import { Container, Content } from './styles'
import Button from '../../components/Button'
import { Redirect, useHistory } from 'react-router-dom'

const Home = ({ authenticated }) => {
  const history = useHistory()
  const handleNavigation = (patch) => {
    return history.push(patch)
  }

  if(authenticated) {
    return <Redirect to="/dashboard" />
}

  return (
    <Container>
      <Content>
        <h1>do<span>.</span>it</h1>
        <span>Organize-se de forma fácil e efetiva</span>

        <div>
          <Button onClick={() => handleNavigation('/signup')} whiteSchema>Cadastre-se</Button>
          <Button onClick={() => handleNavigation('/login')}>Login</Button>
        </div>
      </Content>
    </Container>
  )
}

export default Home