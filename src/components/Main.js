import React, { Component } from 'react';
import axios from 'axios'
import SendMail from './sendMail'



class Main extends Component {

    state = {
        source: "",
        destination: "",
        time: "",
        email: "",
        travelingTime: "",
        timeToLeave: " ",
        reminder: ""

    }
    

    handleSubmit = (e) => {

        e.preventDefault();

        const config = { 
            headers : {
            "Access-Control-Allow-Origin" : "*, http://localhost:3000",
            "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
            'Access-Control-Allow-Methods': 'GET'
          },
          proxy: {
            host: 'localhost',
            port: 3000
          }
        }
        console.log(this.state);
        axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.source}&destinations=${this.state.destination}&key=AIzaSyAW8v9wOOvEviACg4YbowQEQn0SLplfOJM`, 
          config)
        .then((data) => {
            
            console.log(data);
            this.setState({travelingTime: data.data.rows[0].elements[0].duration.value})
            console.log(data.data.rows[0].elements[0].duration.text);

        let userHours = parseInt(this.state.time.slice(0,2) );
        let userMinutes = parseInt( this.state.time.slice(3,5) );

        let totalSec= userHours*60*60 + userMinutes*60 - this.state.travelingTime;
        this.setState({timeToLeave: totalSec});

        let reminder = SendMail(this.state) // function to schedule email at a particular Time
        const msg = <div className="container">
                        <div className="row justify-content-center">
                            <h1>Reminder is Set</h1>
                        </div>
                        </div>
        if(reminder){
            this.setState({reminder: msg})
        }


        })
        .catch((err) => console.log(err));

      
     }

    render() {

        

        return (
            <div>
                <div className="container">
                <div className="row justify-content-center">
                    <h1>Time to Leave !!</h1>
                </div>
                </div>

                <div>

                </div>

                <div className="d-flex justify-content-center" >
               
                <form >
      
            <div className='row'>
        <label>
                Source: 
                <input
                name="source"
                type="source"
                value={this.state.source}
                onChange={e => this.setState({source: (e.target.value)})}
                required />
      </label>
      </div>
      <div className='row'>
      <label>
                Destination: 
                <input
                name="destination"
                type="destination"
                value={this.state.destination}
                onChange={e => this.setState({destination: e.target.value})}
                required />
      </label>
      </div>

      <div className='row'>
      <label>
                Time: 
                <input
                name="time"
                type="time"
                value={this.state.time}
                onChange={e => this.setState({time: (e.target.value)})}
                required />
      </label>
      </div>

      <div className='row'>
      <label>
                Email: 
                <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}
                required />
      </label>
            </div>
    

      <button  onClick={this.handleSubmit}>Submit</button>
    </form>
    
    </div>
    {this.state.reminder}
    
            </div>
        );
    }
}

export default Main;