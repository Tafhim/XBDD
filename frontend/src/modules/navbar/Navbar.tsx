import React, { useState, FC, ChangeEvent, KeyboardEvent } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, TextField, Avatar, Box, Theme, WithStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from 'rootReducer';
import navbarStyles from './styles/NavbarStyles';
import { setUser } from '../../xbddReducer';

const theme: Theme = createMuiTheme({
  palette: {
    primary: { main: '#457B9D' },
  },
});

type Props = WithStyles<typeof navbarStyles>;

const Navbar: FC<Props> = props => {
  const { classes } = props;
  const [loginInput, setLoginInput] = useState('');
  const loggedInUser = useSelector((state: RootStore) => state.app.user);

  const dispatch = useDispatch();
  const login = (): void => dispatch(setUser(loginInput)) && setLoginInput('');
  const logout = (): void => {
    dispatch(setUser(null));
  };

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" className={classes.appBarBorder}>
        <Toolbar>
          <Box className={classes.xbddLogoFlex}>
            <Button href="/" className={classes.xbddLogo}>
              XBDD
            </Button>
          </Box>
          <Box className={classes.xbddLogin}>
            {!loggedInUser && (
              <TextField
                label="User Name"
                margin="dense"
                variant="outlined"
                value={loginInput}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setLoginInput(event.target.value)}
                InputProps={{ style: { color: 'white' } }}
                onKeyPress={(event: KeyboardEvent<HTMLDivElement>): void => {
                  event.key === 'Enter' && login();
                }}
              />
            )}
            <Button color="inherit" onClick={(): void => (loggedInUser ? logout() : login())}>
              {loggedInUser ? 'Logout' : 'Login'}
            </Button>
            <Avatar>{loggedInUser}</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
};

export default withStyles(navbarStyles)(React.memo(Navbar));
