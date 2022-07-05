import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DayBlock from './DayBlock/DayBlock';
import { Calendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import WeekView from './WeekView/WeekView';
import DayView from './DayView/DayView';
import MonthView from './MonthView/MonthView';
import { useDispatch, useSelector } from 'react-redux';
import EditForm from './EditForm/EditForm';
import './Styles.css'

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useDispatch();
    const selected = useSelector((state) => state.pageReducer.page);
    const selectedDay = useSelector((state) => new Date(state.pageReducer.selectedDay));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    };
    //change base on page selected
    const handleClick = (page) => {
      dispatch({
        type: "Page",
        payload: page
        })
    }
    
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Day', 'Week', 'Month', 'New Bill'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </div>
  );

  const handleDayChange = (date) => {
    dispatch({
      type: "SelectedDay",
      payload: date.toISOString()
    })
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Financial Planner
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc((100% - ${drawerWidth}px)/2)` } }}
      >
              <Toolbar />
              {selected === "Day" && (
                <>
                  <DayBlock blockType="title">
                  {selectedDay.toDateString()}
                  </DayBlock>
                  <DayView selectedDay={selectedDay}/>
                </>
              )}
              {selected === "Week" && (
                  <>
                      <WeekView />
                  </>
        )}
        {selected === "Month" && (
          <>
            <MonthView selected={selectedDay} />
          </>
        )}

        {selected === "New Bill" && (
          <>
          <EditForm />
          </>
        )}
          </Box>
          <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc((100% - ${drawerWidth}px)/2)` } }}
          >
              <Toolbar />
              <Calendar value={selectedDay} onChange={handleDayChange}/>
              </Box>
    </Box>
  );
}



export default ResponsiveDrawer;
