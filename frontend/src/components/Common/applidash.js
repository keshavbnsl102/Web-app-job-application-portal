
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

import CatInput from '../Users/educationinstances'
import CatInpu from '../Users/skillinstances'

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
  }
});

class recruiter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: "",
      name: "",
      email: "",
      education: [{Institute:"", Startdate:"",Enddate:""}],
      skill: [{id:"",what:"" }],
      rating: "",
      color: "",
      user: "",
    };

    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
    this.addskill=this.addskill.bind(this);
    this.addCat=this.addCat.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
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
            userData: res.data,
          });
          axios
          .post("http://localhost:4000/appli/idse",{
            ids: this.state.userData.id
          })
          .then(resp=>{
             this.setState({
              name: resp.data.name,
              email: resp.data["email"],
              education: resp.data.education,
              skill: resp.data.skill,


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
        .post("http://localhost:4000/appli/edit",{
          ids: this.state.userData.id,
          name: this.state.name,
          skill: this.state.skill,
          education: this.state.education,
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
  handleSubmit = (e) => { e.preventDefault()}

  logout() {
    localStorage.removeItem("access-token");
    window.location.reload();
  }

  render() {
      const { classes }= this.props;
     let {education,skill} = this.state
     const styles = {
      errorColor: {
        color: this.state.color
      }
    };
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
              href="/applidash"
              className={classes.link}
            >
              Profile
            </Link>

            <Link
              variant="button"
              color="textPrimary"
              href="/applisearch"
              className={classes.link}
            >
              Search
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/users"
              className={classes.link}
            >
              View
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/myapplications"
              className={classes.link}
            >
              My applications
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
            Edit details
          </Button>
  
        
        
      
    </Container>
    </div>
    );
  }
}

export default withRouter(withStyles(styles)(recruiter));
