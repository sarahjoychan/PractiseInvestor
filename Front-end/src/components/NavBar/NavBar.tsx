import React, { useState, useEffect, MouseEvent, KeyboardEvent } from 'react';
// import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import {
  AppBar, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Menu, 
  MenuItem, 
  Toolbar, 
  Typography
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  MoreVert as MoreIcon,
  LocalActivity as LocalActivityIcon,
  Store as StoreIcon,
  Dashboard as DashboardIcon,
  Equalizer as EqualizerIcon,
  Announcement as AnnouncementIcon
} from '@material-ui/icons';

import useStyles from './styles';
import { EReduxActionTypes } from '../../constants/actionTypes';
// import { JwtTokenI } from '../../interfaces/JwtToken';
// import { HeaderHomeI } from '../../interfaces/HeaderHome';

interface Props {
  title: string;
  toggleComponent: (str: string) => void; 
}

const NavBar = ({title, toggleComponent}: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLElement | null>(null);
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('home') || "{}"));
  
  const dispatch = useDispatch();
  const location = useLocation();
  const history: any = useHistory();

  const signOut = () => {
    dispatch({ type: EReduxActionTypes.LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    // const token: any = user?.token;
    // if (user.token) {
    //   const decodedToken = decode<JwtTokenI>(token);
    //   if (decodedToken.expiresIn * 1000 < new Date().getTime()) signOut();
    // }

    setUser(JSON.parse(localStorage.getItem('home') || "{}"));
  }, [location]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawerKey = (anchor: string, open: boolean) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const toggleDrawerClick = (anchor: string, open: boolean) => (event: MouseEvent) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: string) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawerClick(anchor, false)}
      onKeyDown={toggleDrawerKey(anchor, false)}
    >
      <List>
        <ListItem button key={'Dashboard'} onClick={() => toggleComponent('Dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
        <ListItem button key={'Order'} onClick={() => toggleComponent('Order')}>
          <ListItemIcon><StoreIcon /></ListItemIcon>
          <ListItemText primary={'Order'} />
        </ListItem>
        <ListItem button key={'Past Activities'} onClick={() => toggleComponent('Past Activities')}>
          <ListItemIcon><LocalActivityIcon /></ListItemIcon>
          <ListItemText primary={'Past Activities'} />
        </ListItem>

      </List>
      <Divider />
      <List>
          <ListItem button key={'Ranking'} onClick={() => toggleComponent('Ranking')}>
            <ListItemIcon><EqualizerIcon /></ListItemIcon>
            <ListItemText primary={'Ranking'} />
          </ListItem>
          <ListItem button key={'News'} onClick={() => toggleComponent('News')}>
            <ListItemIcon><AnnouncementIcon /></ListItemIcon>
            <ListItemText primary={'News'} />
          </ListItem>
      </List>
    </div>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={signOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <>
              <MenuIcon
                onClick={toggleDrawerClick('left', true)}
              />
              <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawerClick('left', false)}>
                {list('left')}
              </Drawer>
            </>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.grow} />
          <Typography className={classes.title} variant="h6" noWrap>
            { user.userName }
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default NavBar;
