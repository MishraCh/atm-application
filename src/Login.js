import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Dashboard from './Dashboard';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    usercard:'',
    pin:''
  }
 }

 handleClick(event){
    var apiBaseUrl = "http://localhost:4000/";
    var self = this;
    var payload={
    "user_card":this.state.usercard,
    "pin":this.state.pin
    }
    /*axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
        console.log(response);
        if(response.data.code == 200){
          console.log("Login successfull");
          var dashboardScreen=[];
          dashboardScreen.push(<Dashboard appContext={self.props.appContext} user={response.data}/>)
          if(self.props.appContext){
            self.props.appContext.setState({loginPage:[],dashboardScreen:dashboardScreen})
          }
          else{
            alert('Please Refresh Window');
          }
          
        }
        else{
          console.log(response.data.res);
          alert(response.data.res);
        }
    })
    .catch(function (error) {
        console.log(error);
    });*/
	if(payload.user_card == 12345678 && payload.pin == 1234){
		console.log("Login successfull");
          var dashboardScreen=[];
          dashboardScreen.push(<Dashboard appContext={self.props.appContext} user={payload}/>)
          if(self.props.appContext){
            self.props.appContext.setState({loginPage:[],dashboardScreen:dashboardScreen})
          }
          else{
            alert('Please Refresh Window');
          }	
	}
	else{
		alert('Wrong Credentials');	
	}
}

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your User Card Number"
             floatingLabelText="Usercard Number"
             onChange = {(event,newValue) => this.setState({usercard:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Pin"
               floatingLabelText="Pin"
               onChange = {(event,newValue) => this.setState({pin:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;
