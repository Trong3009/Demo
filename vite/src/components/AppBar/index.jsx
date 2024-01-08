import ModeSelect from "../ModeSelect"
import { Box } from "@mui/material"

function AppBar
() {
  return (
    <Box sx={{
        backgroundColor:'primary.light',
        width:'100%',
        height:'56px',
        display:'flex',
        alignItems:'center'
      }}>
        <ModeSelect/>
      </Box>
  )
}

export default AppBar
