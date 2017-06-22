/**
 * Created by liuzhe on 2017/6/10.
 */
import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import {Divider, Drawer, FlatButton, IconButton, IconMenu, Menu, MenuItem, Paper} from "material-ui";
import {ActionAccountBox, ActionHome} from "material-ui/svg-icons/index";
import * as firebase from "firebase";
import config from "../comm/config";
import CircularProgressSimple from "./progressLine";
// import * as firebaseui from "firebaseui";
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import TableExampleComplex from "../comm/userList";


// firebase.initializeApp(config);

// const Logged = (props) => (
//     <IconMenu
//         {...props}
//         iconButtonElement={
//             <IconButton><MoreVertIcon /></IconButton>
//         }
//         targetOrigin={{horizontal: 'right', vertical: 'top'}}
//         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//     >
//         <MenuItem primaryText="Refresh"/>
//         <MenuItem primaryText="Help"/>
//         <MenuItem primaryText="退出" onTouchTap={this.handleLogout}/>
//     </IconMenu>
// );
// Logged.muiName = 'IconMenu';

class Logged extends Component {

    static muiName = 'IconMenu';

    handleLogout = () => {
        console.log('开始退出');
        firebase.auth().signOut().catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        }).then(() => {
            console.log('退出完成');
        });

    };

    render() {
        return (
            <IconMenu
                {...this.props}
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="刷新"/>
                <MenuItem primaryText="帮助"/>
                <Divider />
                <MenuItem primaryText="退出" onTouchTap={this.handleLogout}/>
            </IconMenu>
        );
    }
}


class MyAppBar extends Component {
    state = {
        logged: false,
        open: false,
        isLoginning: false,
    };

    handleLogin = () => {
        console.log('开始登录');
        this.setState({isLoginning: true});
        console.log('isloginning?' + this.state.isLoginning);
        firebase.auth().signInAnonymously().catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
    };
    //     firebase.auth().signInAnonymously();
    //     // firebase ui似乎不能在react中使用，待研究
    //     // let ui = firebaseui.auth.Auth;
    //     // console.log(ui);
    //     // let uiConfig = {
    //     //     // Url to redirect to after a successful sign-in.
    //     //     'signInSuccessUrl': '/',
    //     //     'callbacks': {
    //     //         'signInSuccess': function(user, credential, redirectUrl) {
    //     //             if (window.opener) {
    //     //                 // The widget has been opened in a popup, so close the window
    //     //                 // and return false to not redirect the opener.
    //     //                 window.close();
    //     //                 return false;
    //     //             } else {
    //     //                 // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
    //     //                 return true;
    //     //             }
    //     //         }
    //     //     },
    //     //     'signInOptions': [
    //     //         // TODO(developer): Remove the providers you don't need for your app.
    //     //         {
    //     //             provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //     //             recaptchaParameters: {
    //     //                 size: 'normal'
    //     //             }
    //     //         }
    //     //     ],
    //     //     // Terms of service url.
    //     //     'tosUrl': 'https://www.google.com'
    //     // };
    //     // ui.start(document.getElementById('login'),uiConfig);
    // };

    componentDidMount() {
        if (firebase.auth().currentUser) {
            this.setState({logged: true});
        }
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({isLoginning: false});
            if (user) {
                console.log('用户登录了。。。');
                this.setState({logged: true});
            } else {
                console.log('用户退出了。。。');
                this.setState({logged: false});
            }
        });
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar
                    title="现金口贷管理平台"
                    iconElementLeft={
                        <IconButton onTouchTap={this.handleToggle}><NavigationMenu /></IconButton>
                    }
                    iconElementRight={this.state.logged ? <Logged /> :
                        <FlatButton label="登录" onTouchTap={this.handleLogin}/>}
                    // iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <Menu width={200}>
                        <MenuItem leftIcon={<ActionHome/>} onTouchTap={this.handleClose} style={style.menuitem}>首页</MenuItem>
                        <MenuItem leftIcon={<ActionAccountBox/>}
                                  rightIcon={<ArrowDropRight />}
                                  style={style.menuitem}
                                  menuItems={[
                                      <MenuItem primaryText="查看" leftIcon={<RemoveRedEye /> }/>,
                                      <MenuItem primaryText="分享" leftIcon={<PersonAdd />}/>,
                                      <MenuItem primaryText="链接" leftIcon={<ContentLink />}/>
                                  ]}
                        >
                            用户管理
                        </MenuItem>
                    </Menu>
                    <Menu>
                        <MenuItem primaryText="查看" leftIcon={<RemoveRedEye />} style={style.menuitem}/>
                        <MenuItem primaryText="分享" leftIcon={<PersonAdd />} style={style.menuitem}/>
                        <MenuItem primaryText="链接" leftIcon={<ContentLink />} style={style.menuitem}/>
                        <Divider />
                        <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} style={style.menuitem}/>
                        <MenuItem primaryText="下载" leftIcon={<Download />} style={style.menuitem}/>
                        <Divider />
                        <MenuItem primaryText="删除" leftIcon={<Delete />} style={style.menuitem}/>
                    </Menu>
                </Drawer>
                {this.state.isLoginning ? <CircularProgressSimple/> : <TableExampleComplex/>}
            </div>
        );
    }
}

const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
    menuitem:{
        textAlign:'left',
    }
};


export default MyAppBar;