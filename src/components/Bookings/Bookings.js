import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext)
    const [ bookings , setBookings] = useState([])
     useEffect(() =>{
         fetch('http://localhost:4000/bookings?email='+loggedInUser.email , {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'  ,
                 authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
         })
         .then(res => res.json())
         .then(data =>{
             setBookings(data)
         })
     } , [])
     console.log(bookings);
    return (
        <div>
            <h3> {bookings.length}</h3>
        {
            bookings.map(book => <li> name : {book.name} from : {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} to : {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
        }
        </div>
    );
};

export default Bookings;