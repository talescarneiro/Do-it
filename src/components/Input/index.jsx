import React from 'react'
import { Container, InputContainer } from './styles'

const Input = ({ label, register, name, error = "", icon: Icon, ...rest }) => {
  return (
    <Container>
        <div>
            {label} {!!error && <span> - {error}</span>}
        </div>

        <InputContainer isErrored={!!error}>
            {Icon && <Icon />}
            <input {...register(name)} {...rest} />
        </InputContainer>
    </Container>
  )
}

export default Input