import React,{ Component } from 'react';
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
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
//import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar"
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class signin extends Component {

      constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      types: "",
      error: "",
      color: "",
      };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      appli["email"] !== "" && appli["password"] !== "" && appli["types"]=== "applicant"
    ) {
      // console.log("***");
      axios
        .post("http://localhost:4000/appli/login", appli)
        .then(res => {
            if(res.data.data==="wrong")
            {  this.setState({
                   error: "wrong creds",
                    color: "red",
                    email: "",
                     password: "",
                     types: "",
              });

            }
            else 
            {
                 console.log("success");
                this.setState({
                   error: "Success",
                    color: "green",
                    email: "",
                     password: "",
              });
                localStorage.setItem("access-token", res.data);
                    this.props.history.push("/applidash");
            }
        })
        .catch(err => {
         
          this.setState({
            color: "red",
            error: "Error: Couldn't login",
            email: this.state.email,
            password: "",
            types: this.state.types
          });
        });
      }
      else if(appli["email"] !== "" && appli["password"] !== "" && appli["types"]=== "recruiter")
      {
         axios
            .post("http://localhost:4000/recruiter/login", appli)
            .then(res => {
                if(res.data.data==="wrong")
               {
                this.setState({
                   error: "wrong credentials",
                    color: "red",
                    email: "",
                     password: "",
                     types: "",
              });
              }
             else 
             {
                
                console.log("success");
              this.setState({
                error: "Success",
                color: "green",
                email: "",
                password: "",
              });
              localStorage.setItem("access-token", res.data);
                    this.props.history.push("/recrudash");


             }
                })
            .catch(err => {
             
              this.setState({
                color: "red",
                error: "Error: Couldn't login",
                email: this.state.email,
                password: "",
                types: this.state.types,
              });
            });


      }
    else
    {
      this.setState({
        email: this.state.email,
        password: "",
        error: "enter all particulars!",
        types: this.state.types,
        color: "red",
      });
    }


     

  }




     render(){
        const { classes } = this.props;
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
            <Button onClick={event => (window.location.href = "/registerappli")}>
             Sign up as applicant
            </Button>
            <Button onClick={event => (window.location.href = "/registerrecruiter")}>
             Sign up as recruiter
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
          Sign in
        </Typography>
        <form onSubmit={this.onSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
            value={this.state.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
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

          <FormControl component="fieldset">
          <FormLabel component="legend">select type of user</FormLabel>
          <RadioGroup aria-label="type of user" name="types" value={this.state.types} onChange={this.onChange}>
           <FormControlLabel value="applicant" control={<Radio />} label="Applicant" />
           <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
            </RadioGroup>
            </FormControl>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          
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
export default withStyles(useStyles)(signin);