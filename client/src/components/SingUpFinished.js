import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getSignUpTheme from './theme/getSignUpTheme';
import Logo from './Logo';

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

export default function SignUpFinished() {
    const animationFinished = true
    const [mode, setMode] = React.useState('light');
    const SignUpTheme = createTheme(getSignUpTheme(mode));
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

    return (
        <ThemeProvider theme={SignUpTheme}>
            <CssBaseline enableColorScheme />

            <SignUpContainer direction="column" justifyContent="space-between">
                <Stack
                    sx={{
                        justifyContent: 'center',
                        height: '100dvh',
                        p: 2,
                    }}
                >
                    <Card variant="outlined">
                        <Logo logoAnimationFinishCallback={() => {}} animationFinished={animationFinished} />
                        <div
                            className={animationFinished ? "textAnimate" : "invisibleText textAnimate"}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
                            >
                                Registrierung erfolgreich!
                            </Typography>
                            <Typography
                                sx={{ width: '100%', textAlign: 'center' }}
                            >
                                Wenn deine Registrierung von einem Admin genehmigt wurde, wirst du per Email benachrichtigt!
                            </Typography>
                        </div>

                    </Card>
                </Stack>
            </SignUpContainer>
        </ThemeProvider >
    );
}
