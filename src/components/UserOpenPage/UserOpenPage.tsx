import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import {User as UserType} from '../Home'

const UserOpenPage = () => {
    const {id} =useParams()
    const [user, setUser] = useState<UserType | undefined>()
    
useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`).then(({data}) => {
        setUser(data)
    })
},[])

if (!user) {
    return null;
}

    return ( 
        <div className="user-open-page">
            <h1>{user.name}</h1>
            <img src={user.image} alt="wef"/>
            <h3>From: {user.country}</h3>
            <h3>Age: {user.age}</h3>
            <h3>Hobby: {user.hobby}</h3>
        </div>
     );
}
 
export default UserOpenPage;