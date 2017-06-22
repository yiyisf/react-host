/**
 * Created by liuzhe on 2017/6/11.
 */
import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import * as firebase from 'firebase';
import config from "./config";
import {FlatButton} from "material-ui";

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];

firebase.initializeApp(config);
const db = firebase.database();
const dbRef = db.ref().child('comm/banks');

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class CityTableExampleComplex extends Component {
    state = {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '300px',
        banks: [],
        hasdata: false,
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    componentDidMount() {
        dbRef.on('value', snapshot => {
            if (snapshot.numChildren() > 0) {
                let tempbanks= [];
                Object.entries(snapshot.val()).forEach((row)=>{
                    // tempbanks.add(row[1]);
                    console.log(row[1]);
                    tempbanks.push(row[1]);
                });
                this.setState({
                    hasdata:true,
                    banks: tempbanks
                });
                //
                console.log(tableData);
                console.log(this.state.banks);
            }


            // let banks = {};
            //
            // banks = new Map();

        });
    }

    render() {
        return (
            <div>
                <Table
                    // height={this.state.height}
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="4" tooltip="支持银行列表" style={{textAlign: 'center'}}>
                                支持银行列表
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="序号">序号</TableHeaderColumn>
                            <TableHeaderColumn tooltip="银行名称">银行名称</TableHeaderColumn>
                            <TableHeaderColumn tooltip="logo地址">logo</TableHeaderColumn>
                            <TableHeaderColumn tooltip="记录操作">操作</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.hasdata
                        ?
                            this.state.banks.map((row, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>
                                        <img src={row.logo} width={50} height={50}/>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <FlatButton label="查看"/>
                                        <br />
                                        <FlatButton label="修改" primary={true} />
                                        <br />
                                        <FlatButton label="删除" secondary={true} />
                                    </TableRowColumn>
                                </TableRow>
                            ))
                        :
                            <TableRow>
                                <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                                    正在加载数据...
                                </TableRowColumn>
                            </TableRow>
                        }
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                        <TableRow>
                            <TableRowColumn>ID</TableRowColumn>
                            <TableRowColumn>姓名</TableRowColumn>
                            <TableRowColumn>状态</TableRowColumn>
                            <TableRowColumn></TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                                底部说明
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

                <div style={styles.propContainer}>
                    <h3>Table Properties</h3>
                    <TextField
                        floatingLabelText="Table Body Height"
                        defaultValue={this.state.height}
                        onChange={this.handleChange}
                    />
                    <Toggle
                        name="fixedHeader"
                        label="Fixed Header"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.fixedHeader}
                    />
                    <Toggle
                        name="fixedFooter"
                        label="Fixed Footer"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.fixedFooter}
                    />
                    <Toggle
                        name="selectable"
                        label="Selectable"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.selectable}
                    />
                    <Toggle
                        name="multiSelectable"
                        label="Multi-Selectable"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.multiSelectable}
                    />
                    <Toggle
                        name="enableSelectAll"
                        label="Enable Select All"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.enableSelectAll}
                    />
                    <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
                    <Toggle
                        name="deselectOnClickaway"
                        label="Deselect On Clickaway"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.deselectOnClickaway}
                    />
                    <Toggle
                        name="stripedRows"
                        label="Stripe Rows"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.stripedRows}
                    />
                    <Toggle
                        name="showRowHover"
                        label="Show Row Hover"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.showRowHover}
                    />
                    <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
                    <Toggle
                        name="showCheckboxes"
                        label="Show Checkboxes"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.showCheckboxes}
                    />
                </div>
            </div>
        );
    }
}