import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
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

class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            sortedUsers: [],
             sortTitle:true,
             userData: "",
             search: "",
             jobs: [],
             sortedjobs:[],
             sortSalary: true,
             sop: "",
             status: "apply",
             education: [{Institute:"", Startdate:"",Enddate:""}],
             skill: [{id:"",what:"" }],
             name: "",
             email: "",
             typeofjobvalue: "",
             durationvalue: "",
             salarymin: "",
             salarymax: "",


         };
        this.salaryrenderIcon = this.salaryrenderIcon.bind(this);
        this.titlerenderIcon = this.titlerenderIcon.bind(this);
        this.titlesortChange = this.titlesortChange.bind(this);
        this.logout=this.logout.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.salarysortChange=this.salarysortChange.bind(this);
        //this.apply=this.apply.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.display=this.display.bind(this);
        this.typeofjobvalues=this.typeofjobvalues.bind(this);
        this.salaryvalues=this.salaryvalues.bind(this);
        this.durationvalues=this.durationvalues.bind(this);
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

    salarysortChange(){
/**
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.jobs;
        //var flag = this.state.sortName;
        if(this.state.sortSalary)
        {
            array.sort(function(a, b) {
            if(a.salary != undefined && b.salary != undefined){
                return a.salary - b.salary
            }
            else{
                return 1;
            }
          });
        }
        else
        {
            array.sort(function(a, b) {
            if(a.salary != undefined && b.salary != undefined){
                return b.salary - a.salary
            }
            else{
                return 1;
            }
          });   
        }
        this.setState({
            jobs:array,
            sortSalary:!this.state.sortSalary,
        })
    }

    titlesortChange(){
/**
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.jobs;
        //var flag = this.state.sortName;
        if(this.state.sortTitle)
        {
        array.sort(function(a, b) {
            if(a.duration != undefined && b.duration != undefined){
                return a.duration - b.duration
            }
            else{
                return 1;
            }
          });
       }
       else
       {
        array.sort(function(a, b) {
            if(a.duration != undefined && b.duration != undefined){
                return b.duration - a.duration
            }
            else{
                return 1;
            }
          });


       }
        this.setState({
            jobs:array,
            sortTitle:!this.state.sortTitle,
        })
    }

    salaryrenderIcon(){
        if(this.state.sortSalary){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    titlerenderIcon(){
      if(this.state.sortTitle){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }

    }
    logout() {
    localStorage.removeItem("access-token");
    window.location.reload();
      }


      onSubmit(event){

        event.preventDefault();
        console.log(this.state.durationvalue);
        var a=parseInt(this.state.durationvalue);
        console.log("fattu");
        console.log(a);
        var c=parseInt(this.state.salarymin);
        var d=parseInt(this.state.salarymax);
        console.log("mannn");
        console.log(c);
        console.log(d);

    axios
      .post("http://localhost:4000/job/search", {
        search: this.state.search
      })
      .then(resp => {
        
        this.setState({
          jobs: resp.data
        });
        var respi=this.state.jobs;
        var b=this.state.typeofjobvalue;
        console.log("papappa");
        console.log(b);
        if(this.state.typeofjobvalue!=="none" && this.state.typeofjobvalue!=="")
        {   alert("papap");
            respi=respi.filter(function(jobi){
                return jobi.typeofjob===b
            });
        }
        
        if(this.state.durationvalue!==0)
        { 
           var a=parseInt(this.state.durationvalue);
            respi=respi.filter(function(jobi){
                return jobi.duration<a
            });
            console.log(respi);
        }
        if(c!==NaN&&d!==NaN)
        {
            respi=respi.filter(function(jobi){
               return jobi.salary>=c&&jobi.salary<=d
            });
        }

        this.setState({
          jobs: respi,
        });

      })
      .catch(err => {
        console.log(err);
      });
      }

      handleClick(job){

    /* call prompt() with custom message to get user input from alert-like dialog */
    const enteredName = prompt('Please enter SOP');

    /* update state of this component with data provided by user. store data
       in 'enteredName' state field. calling setState triggers a render of
       this component meaning the enteredName value will be visible via the
       updated render() function below */
    this.setState({ sop : enteredName });

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
             axios
      .post("http://localhost:4000/myapplis/add", {
        applicantid: this.state.userData.id,
        jobid: job._id,
        sop: enteredName,
        name: this.state.name,
        email: this.state.email,
        education: this.state.education,
        skill: this.state.skill,
        nameofrecruiter: job.nameofrecruiter,
        title: job.title,
        salary: job.salary,
      })
      .then(res => {
        axios
          .post("http://localhost:4000/job/search", {
            search: this.state.search
          })
          .then(resp => {
            this.setState({
               jobs: resp.data
            });

            axios
          .post("http://localhost:4000/job/addappli", {
            jobid: job._id,
            noofappli: job.noofappli,
            applicants: job.applicants,
            applicantids: this.state.userData.id,
          })
          .then(resp => {
            this.setState({
                search: this.state.search
            })
            axios
          .post("http://localhost:4000/job/search", {
            search: this.state.search
          })
          .then(resp => {
            //alert("Applied succesfully");
            this.setState({
               jobs: resp.data
            });
        })
          .catch(err =>{
             console.log(err);
          });
          })
          .catch(err => {
            console.log(err);
          });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
          })
          .catch(err=>{
            console.log("now");
          });

    

}

     
  // apply(event, id, quantityRemaining) {
  //   console.log("ordering");

  //   const entered = this.state[id];

  //   if (isNaN(entered)) {
  //     alert("Please enter a number.");
  //     return;
  //   }

  //   if (entered == undefined || entered <= 0) {
  //     alert("Enter a positive quantity");
  //     return;
  //   }

  //   if (entered > quantityRemaining) {
  //     alert("Your required quantity should be less than remaining quantity.");
  //     return;
  //   }

  //   axios
  //     .post("http://localhost:4000/myapplis/add", {
  //       applicantid: this.state.userData.id,
  //       jobid: id,
  //       sop: this.state.sop,
  //     })
  //     .then(res => {
  //       axios
  //         .post("http://localhost:4000/products/search", {
  //           search: this.state.search
  //         })
  //         .then(resp => {
  //           alert("Bought succesfully");
  //           // console.log("data", resp.data);
  //           // console.log("id", this.state.userData.id);
  //           this.setState({
  //             products: resp.data
  //           });
  //           console.log(this.state);
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
       typeofjobvalues(event){
             
             const {name,value}= event.target;
           this.setState({
               [name]: value,
           });
       }
       salaryvalues(event){
          const {name,value}= event.target;
          console.log(event.target.value);
            this.setState({
                [name]:value,
            });
       }
       durationvalues(event){
            console.log(event.target.value);
            const {name,value}= event.target;
           this.setState({
               [name]: value,
           });

           console.log("foff");
           console.log(this.state.durationvalue);
           console.log("mud");
       }


     display(user){

        var f=0;
        for(let i=0;i<user.applicants.length;i++)
        {
            if(user.applicants[i]===this.state.userData.id)
            {
                f=1;
            }

        }


        if(f===1)
        {
            return (<Button variant="success">Applied</Button>)
        }
        else if(user.noofappli>=user.maxappli|| user.noofposi>=user.maxposi)
        {    return(<Button variant="outline-warning">Full</Button>)}
          else
          {return(<button onClick={() => this.handleClick(user)}>Apply</button>)}
     }


    render() {

           const options = [
  {
    label: "less than one",
    value: "1",
  },
  {
    label: "less than 2",
    value: "2",
  },
  {
    label: "less than 3",
    value: "3",
  },
  {
    label: "less than 4",
    value: "4",
  },
  {
    label: "less than 5",
    value: "5",
  },
  {
    label: "less than 6",
    value: "6",
  },
  {
    label: "less than 7",
    value: "7",
  },

];




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


            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                         <input
                            type="text"
                            className="form-control"
                            name="search"
                            placeholder="Search job"
                            onChange={this.onChange}
                            value={this.state.search}
                          />
                     </List>
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onSubmit}
                      >
                        Search
                      </Button>
                    </Grid>
                </Grid>
                <div>
                <p>Filter by type of job</p>
                 <FormControl className={classes.formControl}>
           <NativeSelect id="lang"  value={this.state.typeofjobvalue} onChange={this.typeofjobvalues} name="typeofjobvalue">
              <option value="full">Full Time</option>
              <option value="part">Part Time</option>
              <option value="wfh">Work From home</option>
              <option value="none">None</option>
           </NativeSelect>
           </FormControl>
           <p></p>
           <p>{this.state.value}</p>
            </div>
            <div>
                <p>Filter by Duration</p>
                <FormControl className={classes.formControl}>
                
           <NativeSelect id="lang" value={this.state.durationvalue} onChange={this.durationvalues} name="durationvalue">
             {options.map((option)=>(<option value={option.value}>{option.label}</option>
             )) }

           </NativeSelect>
           </FormControl>
           <p></p>
           <p>{this.state.value}</p>
            </div>
                <Grid container>
                    <Grid item xs={5} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Filter by Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" value={this.state.salarymin} onChange={this.salaryvalues} name="salarymin"    />
                                    <TextField id="standard-basic"  label="Enter Max" value={this.state.salarymax} onChange={this.salaryvalues}  name="salarymax" />
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Status</TableCell>
                                            <TableCell> <Button onClick={this.titlesortChange}>{this.titlerenderIcon()}</Button>Duration</TableCell>
                                             <TableCell><Button onClick={this.salarysortChange}>{this.salaryrenderIcon()}</Button>Salary</TableCell>
                                             <TableCell>Title</TableCell>
                                            <TableCell>typeofjob</TableCell>
                                            <TableCell>idofrecruiter</TableCell>
                                            <TableCell>remaining applicants</TableCell>
                                            <TableCell>remaining positions</TableCell>
                                            <TableCell>date of posting</TableCell>
                                            <TableCell>Deadline day</TableCell>
                                            <TableCell>Deadline time</TableCell>
                                            <TableCell>Rating</TableCell>

                                            

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((user,ind) => (
                                        <TableRow key={ind}>
                                             <TableCell>{this.display(user)}</TableCell>
                                            <TableCell>{user.duration}</TableCell>
                                            <TableCell>{user.salary}</TableCell>
                                            <TableCell>{user.title}</TableCell>
                                            <TableCell>{user.typeofjob}</TableCell>
                                            <TableCell>{user.idofrecruiter}</TableCell>
                                            <TableCell>{user.maxappli}</TableCell>
                                            <TableCell>{user.maxposi}</TableCell>
                                            <TableCell>{user.datepost}</TableCell>
                                            <TableCell>{user.deadlineday}</TableCell>
                                            <TableCell>{user.deadlinetime}</TableCell>
                                            <TableCell>{user.rating}</TableCell>
                                            
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