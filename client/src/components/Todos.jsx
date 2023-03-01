import React, { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material'
import { EditIcon, DeleteIcon } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}))

function TodoList() {
  const classes = useStyles()
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')
  const [editing, setEditing] = useState(false)
  const [id, setId] = useState('')

  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const todos = await res.json()
      setTodos(todos)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!task) return

    if (editing) {
      fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTodos(todos.map((todo) => (todo._id === id ? { ...data } : todo)))
          setTask('')
          setEditing(false)
        })
        .catch((err) => console.error(err))
    } else {
      fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      })
    }

    const handleEdit = async (todo) => {
      setTask(todo.task)
      setEditing(true)
      // eslint-disable-next-line no-underscore-dangle
      setId(todo._id)
    }

    const handleDelete = async (id) => {
      fetch('http://localhost:3000/todo/${id}', {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          setTodos(todos.filter((todo) => todo._id !== id))
        })
        .catch((err) => console.error(err))
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                id='task'
                label='Task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button variant='contained' color='primary' type='submit'>
                {editing ? 'Update' : 'Add'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo._id}>
                    <TableCell component='th' scope='row'>
                      {todo.task}
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton aria-label='edit' onClick={() => handleEdit(todo)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label='delete' onClick={() => handleDelete(todo._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    )

  }
export default TodoList
