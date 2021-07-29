import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar"
import CatInput from '../Users/educationinstances'
import CatInpu from '../Users/skillinstances'
//import CatInputs from '../Users/CatInputs'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  class applicant extends React.Component   {
    constructor(props)
     {  super(props);
      this.state = {
      email: "",
      password: "",
      error: "",
      color: "",
      name: "",
      date: "",
      noofratings: "",
      rating: "",
      education: [{Institute:"", Startdate:"",Enddate:""}],
      skill: [{id:"",what:"" }],
      cats: [{name:"", age:""}],
      types: "applicant",
      

    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
    this.addskill=this.addskill.bind(this);
    this.addCat=this.addCat.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
    

  onChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

  }
  onSubmit(event){
    event.preventDefault();
    const appli=this.state;
     
     if (
      appli["email"] !== "" && appli["password"] !== "" && appli["name"] !== ""
    ) {
      // console.log("***");
      axios
        .post("http://localhost:4000/appli/register", appli)
        .then(res => {
          this.setState({
            error: "Success",
            color: "green",
            email: "",
            password: "",
            name: "",
          });
            })
        .catch(err => {
         
          this.setState({
            color: "red",
            error: "Error: Couldn't register",
            email: this.state.email,
            password: "",
            name: this.state.name,
          });
        });
      }
    else
    {
      this.setState({
        email: this.state.email,
        password: "",
        error: "enter all particulars!",
        name: this.state.name,
        color: "red",
        education: ""
      });
    }


     

  }
  addCat = (e) => {
    this.setState((prevState) => ({
      education: [...prevState.education, {name:"", age:""}],
    }));
  }
  addskill = (e) => {
    this.setState((prevState) => ({
      skill: [...prevState.skill, {id:"", what:""}],
    }));
  }

  handleChange = (e) => {



      if (["Institute", "Startdate","Enddate"].includes(e.target.className) ) {
      let education = [...this.state.education]
      education[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ education }, () => console.log(this.state.education))
    }
    else if(["id", "what"].includes(e.target.className))
    {
      let skill = [...this.state.skill]
      skill[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ skill }, () => console.log(this.state.skill))
    }
    else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  
  }
  handleSubmit = (e) => { e.preventDefault() }

  render(){
    const { classes }= this.props;
     let {education,skill} = this.state
     const styles = {
      errorColor: {
        color: this.state.color
      }
    };
  return (

    <Container>
     <Container >
        <AppBar position="static">
          <ToolBar>
            <Button onClick={event => (window.location.href = "/login")}>
            LogIn
            </Button>
          </ToolBar>
        </AppBar>
     </Container>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Name"
                label=" Name"
                name="name"
                autoComplete="name"
                onChange={this.onChange}
                value={this.state.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </Grid>
                       
          </Grid>
          </form>
          
            <br />
          <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        
        <button onClick={this.addCat}>Add new education instance</button>
        <CatInput education={education} />
            <br />
      </form>
       <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        
        <button onClick={this.addskill}>Add new skill</button>
        <CatInpu skill={skill} />
            <br />
      </form>

      

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={this.onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Grid container>
                <Grid item>
                  <p style={styles.errorColor}>{this.state.error}</p>
                </Grid>
              </Grid>
        
      </div>
      
    </Container>
  </Container>
  );
}
}
export default withStyles(useStyles)(applicant);