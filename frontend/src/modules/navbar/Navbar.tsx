import React, { useState, FC } from 'react';
import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { RootStore } from 'rootReducer';
import { setUser } from '../../redux/UserReducer';
import LoginDialog from './LoginDialog';
import { useNavbarStyles } from './styles/NavbarStyles';
import UserAvatar from '../userAvatar/UserAvatar';
import { resetFeatureState } from 'redux/FeatureReducer';

const Navbar: FC = () => {
  const { t } = useTranslation();
  const classes = useNavbarStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const loggedInUser = useSelector((state: RootStore) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = (): void => {
    fetch(process.env.REACT_APP_BACKEND_HOST + '/logout', {
      method: 'POST',
      credentials: 'include', // TODO - this should be dev only
    }).then(() => {
      dispatch(setUser(null));
      history.push('/');
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box className={classes.logoFlex}>
          <Button
            className={classes.logo}
            onClick={(): void => {
              history.push('/');
              dispatch(resetFeatureState());
            }}
          >
            {'XBDD'}
          </Button>
        </Box>
        <Box className={classes.login}>
          <Button
            className={classes.loginButton}
            color="secondary"
            onClick={(): void => {
              loggedInUser ? onLogout() : setOpenDialog(true);
            }}
          >
            {loggedInUser ? t('navbar.logout') : t('navbar.login')}
          </Button>
          <UserAvatar user={loggedInUser} />
        </Box>
      </Toolbar>
      <LoginDialog open={openDialog} onClose={(): void => setOpenDialog(false)} />
    </AppBar>
  );
};

export default React.memo(Navbar);
