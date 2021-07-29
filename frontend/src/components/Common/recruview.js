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
            title: "",
            datepost: "",
            maxappli: "",
            maxposi: "",
            jobs: [],
            
        };
        this.onChange=this.onChange.bind(this);
        this.logout=this.logout.bind(this);
        this.onChanges=this.onChanges.bind(this);
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
          .post("http://localhost:4000/job/idse",{
            ids: this.state.userData.id
          })
          .then(resp=>{
             this.setState({
              jobs: resp.data,


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

  onChange(event,id){
     localStorage.setItem("jobid",id);
     this.props.history.push("/clickkarnepe");

  }
  onChanges(event,id){
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
         axios
          .post("http://localhost:4000/job/edit",{
            ids: id,
            maxappli: this.state.maxappli,
            maxposi: this.state.maxposi,
          })
          .then(resp=>{
             axios
          .post("http://localhost:4000/job/idse",{
            ids: this.state.userData.id
          })
          .then(resp=>{
             this.setState({
              jobs: resp.data,


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



            <div>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>datepost</TableCell>
                                            <TableCell>Maximum applicants</TableCell>
                                            <TableCell>Remaining positions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell><Button color="primary" onClick={e => this.onChange(e,user._id)}>{user.title}</Button></TableCell>
                                            <TableCell>{user.datepost}</TableCell>
                                            <TableCell><TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="maxappli"
                                                        label=" maxappli"
                                                        name="maxappli"
                                                        autoComplete="maxappli"
                                                        onChange={e =>this.onChanges(e,user._id)}
                                                        value={user.maxappli}
                                                      />





                                            </TableCell>
                                            <TableCell><TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="maxposi"
                                                        label=" maxposi"
                                                        name="maxposi"
                                                        autoComplete="maxposi"
                                                        onChange={e =>this.onChanges(e,user._id)}
                                                        value={user.maxposi}
                                                      /></TableCell>
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