import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import ToolBar from "@material-ui/core/ToolBar";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
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

  class recruiter extends Component   {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      error: "",
      color: "",
      bio: "",
      Contact: "",
      types: "recruiter",

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
  }

  onChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.setState({
      types: "recruiter",
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
        .post("http://localhost:4000/recruiter/register", appli)
        .then(res => {
           console.log("success");
          this.setState({
            error: "Success",
            color: "green",
            email: "",
            password: "",
            name: "",
            bio: "",
            contact: "",
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
        bio: "",
        contact: ""
      });
    }


     

  }
  

  render(){
    const { classes }= this.props;
     let {education, skill} = this.state
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

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Contact"
                label="Contact"
                type="Contact"
                id="Contact"
                autoComplete="Contact"
                onChange={this.onChange}
                value={this.state.Contact}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="bio"
                label="bio"
                type="bio"
                id="bio"
                autoComplete="bio"
                onChange={this.onChange}
                value={this.state.bio}
              />
            </Grid>
                       
          </Grid>

          
            <br />
         

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="red"
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
        </form>
      </div>
      
    </Container>
  </Container>
  );
}
}
export default withStyles(useStyles)(recruiter);