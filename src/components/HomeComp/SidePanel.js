import React from 'react';
import Search from '../Search';

import { connect } from 'react-redux';
import { filterTrips, getTrips } from '../../actions';

const SidePanel = props => {
  /* Filters to Be Mapped to Buttons */
  const filters = ['Clear', 'Alphabetical', 'Duration', 'Date', ];
  /* Search Bar to be rendered */
  const searchbar = props.users ? <Search users /> : <Search />

  /* Handle Filter Selection, Sort based on Case */
  const filterHandler = e => {
    e.preventDefault();

    const type = e.target.innerText.toLowerCase();
    let trips = [ ...props.trips ];

    switch(type) {
      /* Return to default order */
      case 'clear':
        return props.getTrips(true);

      /* Sort By Duration - Longest First */
      case 'duration':
        trips.sort((a,b) => {
          const c = a[type].split(' ')[0];
          const d = b[type].split(' ')[0];
        return d - c;
        });
        break;

      /* Sort Alphabetically */
      case 'alphabetical':
      console.log('trips')
        trips = trips.sort((a,b) => {
          return ('' + a.title).localeCompare(b.title);
        })

        console.log(trips)
        break;

      /* Sort By Date - Newest First */
      case 'date':
        trips.sort((a,b) => {
          /* Check for Date Field */ 
          if(a.date === null) {
            return -1;
          } else if (b.date === null) {
            return 1;
          }

          /* Create Arrays of Date Numbers [Day, Month, Year] */
          let dateArr1 = a.date.split('/');
          let dateArr2 = b.date.split('/');

          dateArr1 = dateArr1.map(date => Number(date))
          dateArr2 = dateArr2.map(date => Number(date))

          console.log('DATE',dateArr1)

          /* Year and Month Match - Check Day */
          if(dateArr1[2] === dateArr2[2] && dateArr1[1] === dateArr2[1]) {
            return dateArr1[0] - dateArr2[0];
          } 
           /* Year - Check Month */
          else if(dateArr1[2] === dateArr2[2]) {
            return dateArr1[1] - dateArr2[1];
          } 
           /* Check Year */
          else {
            return dateArr1[2] - dateArr2[2];
          }
        })
        break;

      default:
        return;
    }

    /* If new order matches old order, reverse  */
    props.trips[0] === trips[0] ? props.filterTrips(trips.reverse()) : props.filterTrips(trips);
  }
  

  return(
    <div className='side-panel'>
      <div className='side-panel__title'>
        <h1>Side Panel</h1>
      </div>

      {searchbar}

      <div className='side-panel__btn--container'>
        {/* Create Filter Buttons */}
        { !props.users ? filters.map(item => <button key={Math.random()}
                                                     onClick={filterHandler}
                                                     className='side-panel__btn'> {item} </button>)
                            : null       
        }
      </div>
    </div>
  );
}

const mstp = state => {
  return {
    trips: state.appReducer.trips
  }
}

export default connect(mstp, { filterTrips, getTrips })(SidePanel);
