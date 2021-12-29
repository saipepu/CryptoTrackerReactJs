import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import axios from 'axios'
import { CryptoState } from '../CryptoContext'
import { Paper, TableBody, TableRow, TableCell, Table, LinearProgress, createTheme, ThemeProvider, Container, Typography, TextField, TableContainer, makeStyles} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { TableHead } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { numberWithCommas } from './Banner/Carousel'


const CoinTable = () => {
    const [ coins, setCoins ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ search, setSearch ] = useState("")
    const [ page, setPage ] = useState(1)
    const history = useHistory();

    const useStyles = makeStyles(() => ({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "monospace",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            }
        },
    }))
    
    const classes = useStyles();

    const { currency,symbol } = CryptoState();

    const fetchCoins = async() => {
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false);
    }
    console.log(coins)

    useEffect(() => {
        fetchCoins();
    },[currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    })

    const handleSearch = () => {
        console.log(search)
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
        )
    }
    console.log(handleSearch())

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center"}}>
                <Typography
                variant="h4"
                style={{ margin: 18, fontFamily: "monospace"}}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                label="Search For a Crypto Currency.."
                variant="outlined"
                style={{ marginButton: 20, width: "100%"}}
                onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper}>
                        {
                            loading ? (
                                <LinearProgress style={{ backgroundColor: "gold"}}/>
                            ): (
                                <Table>
                                        <TableHead style={{ backgroundColor: "gold"}}>
                                             <TableRow>
                                                 {["Coin","Price","24h Chnage","Market Cap"].map((head) => (
                                                     <TableCell
                                                        style={{
                                                            color: "black",
                                                            fontWeight: "700",
                                                            fontFamily: "monospace",
                                                        }}
                                                        key={head}
                                                        align={head === "Coin" ? "" : "right"}
                                                    >
                                                        {head}
                                                    </TableCell>
                                                 ))}
                                             </TableRow>
                                        </TableHead>        
                                        <TableBody>
                                            {handleSearch()
                                            .slice((page-1) * 10, (page-1) * 10 + 10)
                                            .map((row)=>{
                                                const profit = row.price_change_percentage_24h > 0;
                                                console.log(row)
                                                return(
                                                    <TableRow
                                                    onClick={() => history.push(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}
                                                    >
                                                        <TableCell component="th" scope="row"
                                                            styles={{
                                                                display: "flex",
                                                                gap: 15,
                                                            }}
                                                        >
                                                            <img
                                                                src={row?.image}
                                                                alt={row.name}
                                                                height="50"
                                                                style={{ marginBottom: 10}}
                                                            />
                                                            <div
                                                                style={{ display: "flex", flexDirection: "column"}}
                                                            >
                                                                <span
                                                                    style={{
                                                                        textTransform: "uppercase",
                                                                        fontSize: 22,
                                                                    }}
                                                                >
                                                                    {row.symbol}
                                                                </span>
                                                                <span style={{ color: "darkgrey"}}>{row.name}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(row.current_price.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            style={{
                                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {profit && "+"}
                                                            {row.price_change_percentage_24h.toFixed(2)}%
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(
                                                                row.market_cap.toString().slice(0, -6)
                                                            )}
                                                            M
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                </Table>
                            )}
                </TableContainer>
                {/* Comes from @material-ui/lab */}
                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination}}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                ></Pagination>
            </Container>
        </ThemeProvider>

    )
}

export default CoinTable