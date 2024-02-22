import React from 'react'
import { Box,Button,ListItemIcon,ListItemText,Menu,MenuItem, Typography,Divider } from '@mui/material'
import { ContentCopy, ExpandMore, Cloud } from '@mui/icons-material'

function Recent() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null    )
    }
  return (
    <Box>
        <Button
        id="basic-button-recent"
        aria-controls={open ? 'basic-menu-recent' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMore />}
      >
        Recent
      </Button>
      <Menu
        id="basic-menu-recenr"
        aria-labelledby="basic-button-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <ContentCopy fontSize='small' />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant='body2'>
                ádasd
            </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
                <ContentCopy fontSize='small' />
            </ListItemIcon>
            <ListItemText>Patse</ListItemText>
            <Typography variant='body2'>
                đâsdas
            </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
                <ContentCopy fontSize='small' />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant='body2'>
                đâsd
            </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Recent