import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, InputContainer, TasksContainer } from './styles'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import {FiEdit2} from 'react-icons/fi'
import Card from '../../components/Card'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Dashboard = ({ authenticated }) => {
  const [tasks, setTasks] = useState([])
  const [token] = useState(localStorage.getItem("@Doit:token")) || ""
  const {register, handleSubmit} = useForm()
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const loadTasks = () => {
    api.get('/task', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        completed: false
      }
    })
    .then(response => {
      const apiTasks = response.data.data.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }))
      setTasks(apiTasks)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const onSubmit = ({ task }) => {
    if(!task) {
      return toast.error("Complete o campo para enviar uma tarefa")
    }

    api.post("/task", {
      description: task,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      toast.success("Tarefa adicionada com sucesso!")
      loadTasks()
    })
  }

  const handleCompleted = (id) => {
    const newTasks = tasks.filter(task => task._id !== id)

    api.put(`/task/${id}`, {completed: true}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      toast.info("Tarefa concluída!")
      setTasks(newTasks)
    })
  }

  if(!authenticated) {
    return <Redirect to="/login" />
  }


  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>{today.toDateString()}</time>
        <section>
          <Input icon={FiEdit2} placeholder="Nova tarefa" register={register} name="task" error=""/>
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks.map(task => <Card key={task._id} title={task.description} date={task.createdAt} onClick={() => handleCompleted(task._id)} />)}
      </TasksContainer>
    </Container>
  )
}

export default Dashboard