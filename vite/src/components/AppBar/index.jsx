import ModeSelect from "../ModeSelect"
import { Badge, Box,Button,SvgIcon, TextField, Tooltip, Typography } from "@mui/material"
import { Apps, HelpOutline, NotificationsNone } from "@mui/icons-material"
import { ReactComponent as ReactIcon } from "~/assets/react.svg"
import Wordspaces from "~/pages/Auth/Menus/Wordspaces"
import Recent from "~/pages/Auth/Menus/Recent"
import Starred from "~/pages/Auth/Menus/Starred"
import Templates from "~/pages/Auth/Menus/Templetes"
import Profile from "~/pages/Auth/Menus/Profile"

function AppBar
() {
  return (
    <Box px={2} sx={{
        backgroundColor: '#fff',
        width:'100%',
        height:'56px',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Apps sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={ReactIcon} inheritViewBox />
            <Typography variant="span" sx={{ fontSize: '1.2rem',fontWeight: 'bold' }}>React</Typography>
          </Box>
          <Wordspaces />
          <Recent />
          <Starred />
          <Templates/>
          <Button variant="outlined">Create</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField id="outlined-search" label="search..." type="search" size="small"></TextField>
          <ModeSelect/>
          <Tooltip title="Notification">
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNone />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutline sx={{ cursor: 'pointer' }} />
          </Tooltip>
          <Profile></Profile>
        </Box>
    </Box>
  )
}

export default AppBar
