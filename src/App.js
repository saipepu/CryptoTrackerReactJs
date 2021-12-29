import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coinspage from './Pages/Coinspage';
import { makeStyles } from '@material-ui/core';

const App = () => {

    const useStyle = makeStyles(() => ({
        App: {
            backgroundColor: "#14161a",
            color: "white",
            minHeight: "100vh",
        }
    }))
    const classes = useStyle();

    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className={classes.App}>
                <Header />
                <Route path="/" exact component={Homepage}/>
                <Route path="/coins/:id" exact component={Coinspage}/>
            </div>
        </BrowserRouter>
    )
}
export default App;