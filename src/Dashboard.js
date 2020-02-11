import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Dashboard extends Component{
    constructor(props){
        super(props);
        console.log('dash prop', this.props);
        this.state = {
            usercard: '',
            pin: '',
            money: '',
            moneyToDeposit: '',
            moneyToWithdraw: ''
        }
    }

    componentDidMount() {
        this.setState({
            usercard: this.props.user.data.user_card,
            pin: this.props.user.data.pin,
            money: this.props.user.data.money
        })
    }

    handleTransaction(transactionType){
        console.log('transactionType', transactionType, this.state);
        var apiBaseUrl = "http://localhost:4000/";
        var payload={
        "user_card":this.state.usercard
        }
        
        if(transactionType == 'withdraw'){
            if(this.state.moneyToWithdraw > 0){
                payload.money = this.state.moneyToWithdraw;
                axios.post(apiBaseUrl+'withdraw_money', payload)
                .then(res => {
                    if(res.data.code == 200){
                        alert(res.data.res);
                        this.setState({money: this.state.money-this.state.moneyToWithdraw});
                    }
                    else{
                        alert(res.data.res);
                    }
                })
                .catch(err => {
                    console.log('errer', err);
                })
            }
            else{
                alert('Please enter a number greater than zero');
            }
        }
        else{
            if(this.state.moneyToDeposit > 0){
                payload.money = this.state.moneyToDeposit;
                axios.post(apiBaseUrl+'deposit_money', payload)
                .then(res => {
                    console.log('got res', res);
                    if(res.data.code == 200){
                        alert(res.data.res);
                        this.setState(prevState => {
                            return {
                                money: prevState.money + parseInt(prevState.moneyToDeposit)
                            }
                        })
                        console.log('after dep', this.state);
                    }
                    else{
                        alert(res.data.res);
                    }
                })
                .catch(err => {
                    console.log('errer', err);
                })
            }
            else{
                alert('Please enter a number greater than zero');
            }
        }

        
    }

    render(){
        return(
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="ATM Dashbard" 
                    />
                    
                </MuiThemeProvider>
                <div>
                    <br/>
                    <br/>
                    User Card : {this.state.usercard}
                    <br/>
                    <br/>
                    Pin: {this.state.pin}
                    <br/>
                    <br/>
                    Money: {this.state.money} 
                    <br/>
                    <div>
                        <MuiThemeProvider>
                            <TextField hintText="Enter Money to Withdraw" floatingLabelText="Money" 
                            onChange = {(event,newValue) => this.setState({moneyToWithdraw:parseInt(newValue)})}/>
                        </MuiThemeProvider>
                        <button style={styleBtn} onClick={() => this.handleTransaction('withdraw')}>Withdraw Money</button>
                    </div>
                    
                    <br/>
                    <div>
                        <MuiThemeProvider>
                            <TextField hintText="Enter Money to Deposit" floatingLabelText="Money"
                            onChange = {(event,newValue) => this.setState({moneyToDeposit:parseInt(newValue)})}/>
                        </MuiThemeProvider>
                        <button style={styleBtn} onClick={() => this.handleTransaction('deposit')}>Deposit Money</button>
                    </div>
                </div>
            </div>
        )
    }
}

const styleBtn = {
        'width': '90px',
        'height': '30px',
        'background': '#010101',
        'border': '1px solid #fff',
        'cursor': 'pointer',
        'borderRadius': '2px',
        'color': '#fff',
        'fontFamily': "Arial, sans-serif",
        'fontSize': '10px',
        'fontWeight': '400',
        'padding': '6px',
        'marginTop': '10px',
        'marginRight': '10px',
}

export default Dashboard;
