import React from 'react';
import TripCard from './TripCard';

import { connect } from 'react-redux';

const TripGrid = props =>{
    return(
      <div>
      {  props.trips.map(item => <TripCard name={item.name}
                                                desc={item.description}
                                                dur={item.duration}
                                                img={item.img} />)  }
      </div>
    );
}

const mstp = state => {
  return {
    trips: state.appReducer.trips
  }
}

export default connect(mstp, {})(TripGrid);
