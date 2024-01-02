
import {
    Button, Typography,useColorScheme  } from '@mui/material'

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}
    
function App() {

  return (
    <>
    <ModeToggle></ModeToggle>
    <hr />
    <div>trongnguyenquy</div>
    <Typography variant="body2" color="text.secondary">sdasdasd</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
