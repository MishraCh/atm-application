import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      usercard:'',
      pin:''
    }
  }

  handleClick(event){
    var apiBaseUrl = "http://localhost:4000/";
    console.log("values",this.state.usercard,this.state.pin);
    var self = this;
    var payload={
      "user_card":this.state.usercard,
      "pin":this.state.pin
    }
    fetch(apiBaseUrl+'create_user/'+payload.user_card+'/'+payload.pin ,{
      method: 'POST'
    })
    .then(res => {return res.json()})
   .then(function (response) {
     console.log('create user res', response);
     if(response.data.code == 200){
       console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this} appContext={self.props.appContext}/>);
       var loginmessage = "Registered Successfully - Please Login now";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
     }
     else{
       alert(response.data.res);
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your new User Card Number"
             floatingLabelText="New User Card Number"
             onChange = {(event,newValue) => this.setState({usercard:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your new Pin"
             floatingLabelText="New Pin"
             onChange = {(event,newValue) => this.setState({pin:newValue})}
             />
           <br/>
           <RaisedButton label="Create Account" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;