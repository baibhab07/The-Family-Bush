/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    margin: 'auto',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    marginRight: 10,
  },
  button: {
    marginLeft: 10,
  },
  list: {
    marginTop: 20,
  },
})

function TodoList() {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState([])

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const userId = localStorage.getItem('userId')
    const familyId = localStorage.getItem('familyId')
    axios
      .post('/api/todos', { title, userId, familyId })
      .then((response) => {
        console.log(response.data.message)
        setTitle('')
        getTodos()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getTodos = () => {
    axios
      .get('/api/todos')
      .then((response) => {
        setTodos(response.data.todos)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>Todo List</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            label='Title'
            variant='outlined'
            value={title}
            onChange={handleChange}
          />
          <Button className={classes.button} variant='contained' color='primary' type='submit'>
            Add
          </Button>
        </form>
        <List className={classes.list}>
          {todos.map((todo) => (
            <ListItem key={todo._id}>
              <ListItemText primary={todo.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
export default TodoList
