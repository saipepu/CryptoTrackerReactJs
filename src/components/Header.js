import React from 'react'
import { AppBar, Container,Toolbar,Select,MenuItem,Typography,ThemeProvider, makeStyles, createTheme } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const useStyle = makeStyles(() => ({
    title:{
        flex: 1,
        color: "gold",
        fontFamily: "monospace",
        fontWeight: "bold",
        cursor: "pointer"
    }
}))

const Header = () => {
    const classes = useStyle();
    const history = useHistory();
    const { currency, setCurrency  } = CryptoState()

    console.log(currency)

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: "dark",
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography onClick={() => history.push("/")} className={classes.title}>Crypto Tracker</Typography>
                    <Select
                        variant="outlined"
                        style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"MMK"}>MMK</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header
