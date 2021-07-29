import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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

class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userdata: "",
            applications: [],
            jobid: "",
            
        };
        
        this.logout=this.logout.bind(this);
        this.display=this.display.bind(this);
        this.displays=this.displays.bind(this);
        this.cancelClick=this.cancelClick.bind(this);
        this.shortClick=this.shortClick.bind(this);
        this.applyClick=this.applyClick.bind(this);
    }
     
    componentDidMount() {
        const jwt = localStorage.getItem("access-token");
        const jobids=localStorage.getItem("jobid");

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
            jobid: jobids,
          });

          axios
          .post("http://localhost:4000/myapplis/idse",{
            ids: this.state.jobid,
          })
          .then(resp=>{
             this.setState({
              applications: resp.data,


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
    
    cancelClick(user){
          console.log("jayz");
         const jobids=localStorage.getItem("jobid");

          axios
          .post("http://localhost:4000/myapplis/delete",{
            ids: user.jobid,
            idss: user.applicantid,
          })
          .then(resp=>{
            console.log("APProval");
            axios
          .post("http://localhost:4000/myapplis/idse",{
            ids: this.state.jobid,
          })
          .then(resp=>{
             this.setState({
              applications: resp.data,


             });
          })
          .catch(err=>{
            console.log("now");
          });


            
          })
          .catch(err=>{
            console.log("now");
          });

    }

    
     shortClick(user)
     {
       console.log("jayz");
         const jobids=localStorage.getItem("jobid");

          axios
          .post("http://localhost:4000/myapplis/short",{
            ids: user.jobid,
            idss: user.applicantid,
          })
          .then(resp=>{
            console.log("APProval");
            axios
          .post("http://localhost:4000/myapplis/idse",{
            ids: this.state.jobid,
          })
          .then(resp=>{
             this.setState({
              applications: resp.data,


             });
          })
          .catch(err=>{
            console.log("now");
          });


            
          })
          .catch(err=>{
            console.log("now");
          });

     }

     applyClick(user)
     {
          console.log("jayz");
         const jobids=localStorage.getItem("jobid");

          axios
          .post("http://localhost:4000/myapplis/accept",{
            ids: user.jobid,
            idss: user.applicantid,
          })
          .then(resp=>{
            console.log("APProval");
            axios
          .post("http://localhost:4000/myapplis/idse",{
            ids: this.state.jobid,
          })
          .then(resp=>{
             this.setState({
              applications: resp.data,


             });
          })
          .catch(err=>{
            console.log("now");
          });


            
          })
          .catch(err=>{
            console.log("now");
          });


     }


     display(user){

        if(user.status!=="cancelled")
          {  
            return (<button variant="success" onClick={() => this.cancelClick(user)}>Reject</button>)
                  
          }
     }

    displays(user){

         if(user.status==="Applied for further processing")
          {  
            return (<button variant="success" onClick={() => this.shortClick(user)}>Shortlist</button>)
                  
          }
          else if(user.status==="shortlisted")
          {
            return (<button variant="success" onClick={() => this.applyClick(user)}>Accept</button>)
          }

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



            <div>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>NAME OF APPLICANT</TableCell>
                                            <TableCell>DATE</TableCell>
                                            <TableCell>SOP</TableCell>
                                            <TableCell>STATUS</TableCell>
                                            <TableCell>Shortlist/Accept</TableCell>
                                            <TableCell>Reject??</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.date}</TableCell>
                                            <TableCell>{user.sop}</TableCell>
                                            <TableCell>{user.status}</TableCell>
                                            <TableCell>{this.displays(user)}</TableCell>
                                            <TableCell>{this.display(user)}</TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(UsersList));