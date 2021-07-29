
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";



const styles = theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
});

class recruiter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: "",
      name: "",
      email: "",
      bio: "",
      contact: "",
      color: "",
      error: "",
    };

    this.logout = this.logout.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);

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
      appli["email"] !== "" && appli["name"] !== "" 
    ) {
      // console.log("***");
      axios
        .post("http://localhost:4000/recruiter/edit",{
          ids: this.state.userData.id,
          name: this.state.name,
          bio: this.state.bio,
          contact: this.state.contact,
          email: this.state.email,
        })
        .then(res => {
          this.setState({
            error: "Success",
            color: "green",
          });
            })
        .catch(err => {
         
          this.setState({
            color: "red",
            error: "Error: Couldn't register",
            email: this.state.email,
            name: this.state.name,
          });
        });
      }
    else
    {
      this.setState({
        email: this.state.email,
        error: "enter all particulars!",
        name: this.state.name,
        color: "red",
      
      });
    }

}


  componentDidMount() {
    const jwt = localStorage.getItem("access-token");

    console.log("jwt", jwt);

    if (!jwt) {
      this.props.history.push("/login");
    } else {
      axios
        .get("http://localhost:4000/auth", {
          headers: { authorization: `Bearer: ${jwt}` }
        })
        .then(res => {
          this.setState({
            userData: res.data
          });

          axios
          .post("http://localhost:4000/recruiter/idse",{
            ids: this.state.userData.id
          })
          .then(resp=>{
             this.setState({
              name: resp.data.name,
              email: resp.data["email"],
              bio: resp.data.bio,
              contact: resp.data.contact,


             });
          })
          .catch(err=>{
            console.log("now");
          });

        })
        .catch(err => {
          console.log("now");
          // console.log(this.state.userData);
          console.log(err);
          localStorage.removeItem("access-token");
          this.props.history.push("/login");
        });
    }
  }

  logout() {
    localStorage.removeItem("access-token");
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Job Portal App
          </Typography>
          <nav>
             <Link
              variant="button"
              color="textPrimary"
              href="/recrudash"
              className={classes.link}
            >
              Profile
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/addjob"
              className={classes.link}
            >
              Add
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/recruview"
              className={classes.link}
            >
              View
            </Link>
           
          </nav>
          <Button
            href="#"
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={this.logout}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
       

      <Container>
     

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
                id="bio"
                label="bio"
                name="bio"
                autoComplete="bio"
                onChange={this.onChange}
                value={this.state.bio}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="contact"
                name="contact"
                autoComplete="contact"
                onChange={this.onChange}
                value={this.state.contact}
              />
            </Grid>
                       
          </Grid>
          </form>
          
           
       <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={this.onSubmit}
          >
            Edit details
          </Button>
  
        
        
      
    </Container>
      





      </div>
    );
  }
}

export default withRouter(withStyles(styles)(recruiter));
