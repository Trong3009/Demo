import React from 'react'
import { Container } from '@mui/material'
import AppBar from '../../components/AppBar'
import BoardsBar from './BoardsBar'
import BoardsContent from './BoardsContent'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{height:'100vh', backgroundColor:'primary.main'}} >
        <AppBar />
        <BoardsBar />
        <BoardsContent />
    </Container>
  )
}

export default Board