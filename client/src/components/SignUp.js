import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getSignUpTheme from './theme/getSignUpTheme';
import Logo from './Logo';
import LoadingScreen from './LoadingScreen';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from "@mui/material/InputAdornment";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp(props) {
  const [animationFinished, setIsAnimationFinished] = React.useState(false);

  const [mode, setMode] = React.useState('light');
  const [submitted, setSubmitted] = React.useState(false);
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);


  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Es wird eine valide Email-Adresse benötigt.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Das Passwort muss mindestens 8 Zeichen lang sein.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Bitte gib deinen Namen ein.');
      isValid = false;
    } else if (name.value.trim().split(" ").length < 2) {
      setNameError(true);
      setNameErrorMessage('Bitte gib deinen Vor- und Nachnamen ein.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (!validateInputs()) {
      event.preventDefault();
      return
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (submitted) {
      return
    }
    setSubmitted(true)

    fetch("/newregister/",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password'),
          //allowNiere: data.has('allowniere')
        })
      }).then((res) => {
        if (!res.ok) {
          throw Error()
        }
      })
      .then(function (res) {
        props.setRegisterFinishedText("Registrierung erfolgreich! !!!---!!!Wenn deine Registrierung von einem Admin genehmigt wurde, wirst du per Email benachrichtigt!")
      })
      .catch(function (res) {
        console.log(res)
        props.setRegisterFinishedText("Registrierung nicht erfolgreich! !!!---!!!Falls dieser Fehler mehrfach auftritt, wende dich bitte an it@gatrobe.de!")
      })
  };


  return (
    <ThemeProvider theme={SignUpTheme}>
      <CssBaseline enableColorScheme />
      {submitted ? <LoadingScreen /> : ""}
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: 'center',
            height: '100dvh',
            p: 2,
          }}
        >
          <Card className={animationFinished ? "cardAnimate" : "invisibleCard cardAnimate"} variant="outlined">
            <Logo logoAnimationFinishCallback={() => { setIsAnimationFinished(true) }} animationFinished={animationFinished} />
            <div
              className={animationFinished ? "textAnimate" : "invisibleText textAnimate"}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
              >
                Account-Registrierung
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="name">Vollständiger Name*</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Vorname Nachname"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email*</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="gatrobeuser@gmx.net"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={passwordError ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Passwort*</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? 'error' : 'primary'}
                    slotProps={{
                      input: {
                        endAdornment:
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                              style={{ border: "none", backgroundColor: "transparent" }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>

                      }
                    }}
                  />
                </FormControl>
                {/* <FormControlLabel
                  htmlFor="allowniere"
                  control={<Checkbox name="allowniere" color="primary" />}
                  label="Ich willige ein, der gatrobianischen IT-Abteilung meine Niere für die Anschaffung neuer Server zur Verfügung zu stellen."
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  Registrieren
                </Button>

              </Box>
            </div>

          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider >
  );
}
