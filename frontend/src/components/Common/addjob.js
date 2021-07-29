
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
      title: "",
      typeofjob: "",
      maxappli: "",
      maxposi: "",
      salary: "",
      deadlineday: "",
      deadlinetime: "",
      skill: [{
          id: "",
          what: "",
     }],
      error: "",
      color: "",
      duration: "",
    };

    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addskill=this.addskill.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const jwt = localStorage.getItem("access-token");

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

        })
        .catch(err => {
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
    const job={ title: this.state.title,
      typeofjob: this.state.typeofjob,
      idofrecruiter: this.state.userData.id,
      salary: this.state.salary,
      deadlineday: this.state.deadlineday,
      deadlinetime: this.state.deadlinetime,
      maxappli: this.state.maxappli,
      maxposi: this.state.maxposi,
      skill: this.state.skill,
      duration: this.state.duration,
      nameofrecruiter: this.state.userData.name,
    };
     
     if (
       job["idofrecruiter"] !== "" && job["title"] !== "" 
      && job["typeofjob"]!=="" && job["salary"]!=="" &&job["deadlineday"]!=="" &&job["deadlinetime"]!==""
      && job["maxappli"]!=="" && job["maxposi"]!==""&&job["duration"]!==""
    ) {
      // console.log("***");
      axios
        .post("http://localhost:4000/job/add", job)
        .then(res => {
          this.setState({
            error: "Success",
            color: "green",
            title: "",
            typeofjob: "",
            salary: "",
            deadlineday: "",
            deadlinetime: "",
            maxposi: "",
            maxappli: "",
            duration: "",
          });
            })
        .catch(err => {
         
          this.setState({
            error: "Sorry, Couldn't register",
            color: "red",
            title: "",
            typeofjob: "",
            salary: "",
            deadlineday: "",
            deadlinetime: "",
            maxposi: "",
            maxappli: "",
            duration: "",
          });
        });
      }
    else
    {
      this.setState({
            error: "Enter all the details",
            color: "red",
            title: "",
            typeofjob: "",
            salary: "",
            deadlineday: "",
            deadlinetime: "",
            maxposi: "",
            maxappli: "",
            duration: "",
                  });
    }


     

  }
  addskill = (e) => {
    this.setState((prevState) => ({
      skill: [...prevState.skill, {id:"", what:""}],
    }));
  }
   handleSubmit = (e) => { e.preventDefault() }
  handleChange = (e) => {



     if(["id", "what"].includes(e.target.className))
    {
      let skill = [...this.state.skill]
      skill[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ skill }, () => console.log(this.state.skill))
    }
    else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  
  }

  logout() {
    localStorage.removeItem("access-token");
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    let {skill} = this.state
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
            Job portal App
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
     
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Create Job
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="title"
                name="title"
                autoComplete="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="typeofjob"
                label="type of job"
                name="typeofjob"
                autoComplete="typeofjob"
                onChange={this.onChange}
                value={this.state.typeofjob}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="maxappli"
                label="Maximum applications"
                id="maxappli"
                autoComplete="maxappli"
                onChange={this.onChange}
                value={this.state.maxappli}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="maxposi"
                label="Maximum positions"
                id="maxposi"
                autoComplete="maxposi"
                onChange={this.onChange}
                value={this.state.maxposi}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="salary"
                label="Salary"
                id="salary"
                autoComplete="salary"
                onChange={this.onChange}
                value={this.state.salary}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="deadlinetime"
                label="Deadline time"
                id="deadlinetime"
                autoComplete="deadlinetime"
                onChange={this.onChange}
                value={this.state.deadlinetime}
              />
            </Grid>
             <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="deadlineday"
                label="Deadline day"
                id="deadlineday"
                autoComplete="deadlineday"
                onChange={this.onChange}
                value={this.state.deadlineday}
              />
            </Grid>
                       
          </Grid>
          </form>
          
            <br />

            <FormControl component="fieldset">
          <FormLabel component="legend">select duration of job</FormLabel>
          <RadioGroup name="duration" value={this.state.duration} onChange={this.onChange}>
           <FormControlLabel value="0" control={<Radio />} label="0" />
           <FormControlLabel value="1" control={<Radio />} label="1" />
           <FormControlLabel value="2" control={<Radio />} label="2" />
           <FormControlLabel value="3" control={<Radio />} label="3" />
           <FormControlLabel value="4" control={<Radio />} label="4" />
           <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
            </FormControl>
          
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
            Create job
          </Button>
          
          <Grid container>
                <Grid item>
                  <p style={styles.errorColor}>{this.state.error}</p>
                </Grid>
              </Grid>
        
      </div>
      
    </Container>
  </Container>
  </div>


    );
  }
}

export default withRouter(withStyles(styles)(recruiter));
