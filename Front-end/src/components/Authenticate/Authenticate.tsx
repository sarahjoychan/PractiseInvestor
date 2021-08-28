import { useState, ChangeEvent } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Container} from '@material-ui/core';
import {
  LockOutlined as LockOutlinedIcon, 
  Visibility, 
  VisibilityOff} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { register, login } from '../../actions/authenticate';

interface DefaultFormI {
  userName: string,
  password: string,
  confirmPassword: string,
}

const Authenticate = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<string>('password');
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [form, setForm] = useState<DefaultFormI>({
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const history: any = useHistory();

  const handleShowPassword = () => {
    setShowPassword((previousShowPassword) => (previousShowPassword === 'password' ? 'text' : 'password'));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isRegister) {
      // dispatch an action to signup
      if (form.userName && form.password && form.confirmPassword) {
        if (form.password === form.confirmPassword) dispatch(register(form, history)); 
        else {
          setForm(current => ({...current, password: '', confirmPassword: ''}));
          alert(`Passwords don't match, try again`);
        }
      } else alert(`Please fill out all fields`);
      
    } else {
      if (form.userName && form.password) /* dspatch an action to sign-in */ dispatch(login(form, history));
      else alert(`Please fill out all fields`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchIsRegister = () => {
    setIsRegister(!isRegister);
    setShowPassword('password');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword}
            id="password"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword === 'password' ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isRegister && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword}
            id="confirmPassword"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword === 'password' ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={switchIsRegister}>
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Authenticate;