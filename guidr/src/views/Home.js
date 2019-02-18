import React from 'react';
import TripGrid from '../components/HomeComp/TripGrid';
import Search from '../components/Search';

class Home extends React.Component {
  /* Ensure user is signed in by checking token, alternate route if denied */
  authenticate = () => {
    const token = localStorage.getItem('jwtToken');

    if(token) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/access-denied');
    }
  }

  componentDidMount(){
    this.authenticate();
  }

  render() {
    return(
      <div className='home'>
        <Search />
        <TripGrid />
      </div>
    );
  }
}

export default Home;