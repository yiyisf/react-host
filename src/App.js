/**
 * Created by liuzhe on 2017/6/10.
 */
import React, {Component} from "react";
import FlatButton from "material-ui/FlatButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MyAppBar from "./components/header";
import {lightBaseTheme} from "material-ui/styles/index";
import {Router, Route} from "react-router";

const styles = {
    container: {
        textAlign: 'center',
    },
    bottom:{
        position:'absolute',
        bottom:0,
        // width: 100%,
    }
};

const muiTheme = getMuiTheme(lightBaseTheme);

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
        };
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router>
                    <Route  path="/" component={MyAppBar}/>
                </Router>
            </MuiThemeProvider>
        );

        const standardActions = (
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleRequestClose}
            />
        );
    }
}

export default App;