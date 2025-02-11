import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";
import Logo from "./Logo";
import LoadingScreen from "./LoadingScreen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FormHelperText, Grid2, MenuItem, Select } from "@mui/material";


const studyPrograms = [
  "Maschinenbau",
  "Produktion und Logistik",
  "Biomedizintechnik",
  "Mechatronik und Robotik",
  "Elektrotechnik",
  "Energietechnik",
  "Nachhaltige Ingenieurwissenschaft",
  "Metalltechnik",
  "Mechatronik",
  "Optische Technologien",
  "Nanotechnologie",
  "Wirtschaftsingenieurwesen",
  "Sonstige",
];
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignUp(props) {
  const [animationFinished, setIsAnimationFinished] = React.useState(false);

  const [mode, setMode] = React.useState("light");
  const [submitted, setSubmitted] = React.useState(false);
  const SignUpTheme = createTheme(getSignUpTheme(mode));

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const [studiengang, setStudiengang] = React.useState("");
  const [studiengangErrorMessage, setStudiengangErrorMessage] = React.useState("");
  const [studiengangError, setStudiengangError] = React.useState("");

  const [dateError, setDateError] = React.useState(false);
  const [dateErrorMessage, setDateErrorMessage] = React.useState("");

  const [streetError, setStreetError] = React.useState(false);
  const [streetErrorMessage, setStreetErrorMessage] = React.useState("");

  const [postnumberError, setPostnumberError] = React.useState(false);
  const [postnumberErrorMessage, setPostnumberErrorMessage] = React.useState("");

  const [cityError, setCityError] = React.useState(false);
  const [cityErrorMessage, setCityErrorMessage] = React.useState("");

  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState("");

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
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");
    const date = document.getElementById("birthdate");

    const street = document.getElementById("address");
    const postnumber = document.getElementById("postnumber");
    const city = document.getElementById("city");
    const phoneNumber = document.getElementById("tel");

    let isValid = true;
    // check email
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Es wird eine valide Email-Adresse benötigt.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // check password
    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Das Passwort muss mindestens 8 Zeichen lang sein."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    // check name
    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Bitte gib deinen Namen ein.");
      isValid = false;
    } else if (name.value.trim().split(" ").length < 2) {
      setNameError(true);
      setNameErrorMessage("Bitte gib deinen Vor- und Nachnamen ein.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }


    // check studiengang
    if(studiengang === ""){
      isValid = false;
      setStudiengangError(true);
      setStudiengangErrorMessage("Bitte wähle deinen Studiengang aus.")
    } else {
      setStudiengangError(false);
      setStudiengangErrorMessage("");
    }

    // check birthdate
    if (!date.value) {
      setDateError(true);
      setDateErrorMessage("Bitte gib dein Geburtsdatum ein.");
      isValid = false;
    } else {
      setDateError(false);
      setDateErrorMessage("");
    }

    // check street
    if (!street.value) {
      setStreetError(true);
      setStreetErrorMessage("Bitte gib deine Straße und Hausnummer ein.");
      isValid = false;
    } else {
      setStreetError(false);
      setStreetErrorMessage("");
    }

    // check postnumber
    if (!postnumber.value) {
      setPostnumberError(true);
      setPostnumberErrorMessage("Bitte gib deine Postleitzahl ein.");
      isValid = false;
    } else {
      setPostnumberError(false);
      setPostnumberErrorMessage("");
    }
    // check city
    if (!city.value) {
      setCityError(true);
      setCityErrorMessage("Bitte gib deine Stadt ein.");
      isValid = false;
    } else {
      setCityError(false);
      setCityErrorMessage("");
    }

    // check phoneNumber with regex
    if (!phoneNumber.value || !/^\+?[0-9]{1,3} ?[0-9]{1,14}$/.test(phoneNumber.value)) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage("Bitte gib eine valide Telefonnummer ein.");
      isValid = false;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (!validateInputs()) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (submitted) {
      return;
    }
    setSubmitted(true);

    fetch("/newregister/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        birthdate: data.get("birthdate"),
        studyProgram: studiengang,
        address: data.get("address"),
        postnumber: data.get("postnumber"),
        city: data.get("city"),
        tel: data.get("tel"),
        //allowNiere: data.has('allowniere')
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
      })
      .then(function (res) {
        props.setRegisterFinishedText(
          "Registrierung erfolgreich! !!!---!!!Wenn deine Registrierung von einem Admin genehmigt wurde, wirst du per Email benachrichtigt!"
        );
      })
      .catch(function (res) {
        console.log(res);
        props.setRegisterFinishedText(
          "Registrierung nicht erfolgreich! !!!---!!!Falls dieser Fehler mehrfach auftritt, wende dich bitte an it@gatrobe.de!"
        );
      });
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <CssBaseline enableColorScheme />
      {submitted ? <LoadingScreen /> : ""}
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: "center",
            height: "100dvh",
            p: 2,
            marginTop: "5vh",
            marginBottom: "5vh",

          }}
        >
          <Card
            className={
              animationFinished ? "cardAnimate" : "invisibleCard cardAnimate"
            }
            variant="outlined"
          >
            <Logo
              logoAnimationFinishCallback={() => {
                setIsAnimationFinished(true);
              }}
              animationFinished={animationFinished}
            />
            <div
              className={
                animationFinished ? "textAnimate" : "invisibleText textAnimate"
              }
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  width: "100%",
                  fontSize: "clamp(2rem, 10vw, 2.15rem)",
                  textAlign: "center",
                }}
              >
                Account-Registrierung
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                    color={nameError ? "error" : "primary"}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="email">{"Email(nicht LUH)*"}</FormLabel>
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
                    color={passwordError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="birthdate">Geburtsdatum*</FormLabel>
                  <TextField
                    type="date"
                    autoComplete="birthdate"
                    name="birthdate"
                    required
                    fullWidth
                    id="birthdate"
                    placeholder="dd.mm.yyyy"
                    error={dateError}
                    helperText={dateErrorMessage}
                    color={dateError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="studyProgram">Studiengang*</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="studyProgram"
                    value={studiengang}
                    label="Age"
                    onChange={(e)=>{ setStudiengang(e.target.value)}}

                  >
                    {studyPrograms.map((program) => {return <MenuItem key={program} value={program}>{program}</MenuItem>})}

                  </Select>
                  {studiengangError ? <FormHelperText style={{"color": "hsl(0, 90%, 30%)"}}>{studiengangErrorMessage}</FormHelperText> : ""}

                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="address">Straße & Hausnummer</FormLabel>
                  <TextField
                    autoComplete="address"
                    name="address"
                    required
                    fullWidth
                    id="address"
                    placeholder=""
                    error={streetError}
                    helperText={streetErrorMessage}
                    color={streetError ? "error" : "primary"}
                  />
                </FormControl>
                <Grid2 item="true" container spacing={1} justify="center">
                  <Grid2 size="grow">
                    <FormControl>
                      <FormLabel htmlFor="postnumber">Postleitzahl</FormLabel>
                      <TextField
                        autoComplete="address"
                        name="postnumber"
                        required
                        fullWidth
                        id="postnumber"
                        placeholder=""
                        error={postnumberError}
                        helperText={postnumberErrorMessage}
                        color={postnumberError ? "error" : "primary"}
                      />
                    </FormControl>
                  </Grid2>
                  <Grid2>
                    <FormControl>
                      <FormLabel htmlFor="city">Stadt</FormLabel>
                      <TextField
                        autoComplete="address"
                        name="city"
                        required
                        fullWidth
                        id="city"
                        placeholder=""
                        error={cityError}
                        helperText={cityErrorMessage}
                        color={cityError ? "error" : "primary"}
                      />
                    </FormControl>
                  </Grid2>
                </Grid2>
                <FormControl>
                  <FormLabel htmlFor="tel">{"Telefonnummer"}</FormLabel>
                  <TextField
                    required
                    fullWidth
                    type="tel"
                    id="tel"
                    placeholder="+49 179 2380576"
                    name="tel"
                    autoComplete="tel"
                    variant="outlined"
                    error={phoneNumberError}
                    helperText={phoneNumberErrorMessage}
                    color={phoneNumberError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Passwort*</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? "error" : "primary"}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
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
    </ThemeProvider>
  );
}
