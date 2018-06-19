import React, { Component } from 'react';
import './App.css';
import Title from './scripts/titleStuff/title'
import PlaylistBtn from './scripts/createplaylist/createplaylistbtn'
import Filterpl from './scripts/titleStuff/filterpl'
import Playlist from './scripts/homepage/playlist'
import { Button } from 'reactstrap';
import { fetchAPI, getToken, saveUser} from './scripts/utils/api'
import LoggedOut from './scripts/homepage/loggedOut'
import Dashboard from './scripts/homepage/dashboard'


class App extends Component {
  state = {
    loggedOut: false,
    userData: {
      user:{
        name: "",
        image: "",
        email: ""
      }
    },
    playlists: null,
    tracklist: []
  }
  componentDidMount(){
    //checking to see if the token is in session storage. If it is not then the user must be logged out
    if (!getToken()) {
      this.setState({loggedOut: true})
    }else{
      //in the utils folder the fetchAPI() is just sorting the fetch call.
      fetchAPI('me')
      .then(data => {
        const userData = {
          user: {
            name: data.display_name,
            image: data.images[0].url,
            email: data.email
          }
        }
        this.setState({
          userData
        });
        return saveUser(userData.user)
      })
      fetchAPI('me/playlists')
        .then(playlists => this.setState({playlists}))
    }
  }


  render() {

    let content = <LoggedOut/>

//if the user isn't logged out
    if (!this.state.loggedOut) {
      content = <Dashboard user={this.state.userData.user} playlists={this.state.playlists}/>
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
