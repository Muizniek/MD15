import React, { useState } from 'react';
import { useQuery, useMutation} from 'react-query';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { queryClient } from '../main';

export type User = {
  id?: number;
  name: string;
  age: number;
  country: string;
  hobby: string;
  image: string;
};

const getUsers = async (): Promise<User[]> => {
  const response = await axios.get('http://localhost:3001/users');
  return response.data;
};

const updateUser = async (userId: number, userData: User) => {
  await axios.put(`http://localhost:3001/update/${userId}`, userData);
};

const createUser = async (userData: User) => {
  await axios.post('http://localhost:3001/create', userData);
};

const deleteUser = async (userId: number) => {
  await axios.delete(`http://localhost:3001/delete/${userId}`);
};

const Home: React.FC = () => {

  const { data: users = [], refetch } = useQuery('users', getUsers);

  const mutation = useMutation(
    (userData: User) => {
      if (selectedUserId) {
        return updateUser(selectedUserId, userData);
      } else {
        return createUser(userData);
      }
    },
    {
      onSuccess: () => {
        refetch();
        resetForm();
      },
    }
  );

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [country, setCountry] = useState<string>('');
  const [hobby, setHobby] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const resetForm = () => {
    setName('');
    setAge(0);
    setCountry('');
    setHobby('');
    setImage('');
    setSelectedUserId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      name,
      age,
      country,
      hobby,
      image,
    });
  };

  const handleEdit = (user: User) => {
    setSelectedUserId(user.id || null);
    setName(user.name);
    setAge(user.age);
    setCountry(user.country);
    setHobby(user.hobby);
    setImage(user.image);
  };

  const handleDelete = (userId: number) => {
    deleteUser(userId).then(() => {
      console.log('User deleted!');
      queryClient.invalidateQueries('users');
    });
  };


  return (
    <>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Age:</label>
        <input
          type="number"
          required
          value={age}
          onChange={(event) => setAge(Number(event.target.value))}
        />
        <label>Country:</label>
        <input
          type="text"
          required
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <label>Hobby:</label>
        <input
          type="text"
          required
          value={hobby}
          onChange={(event) => setHobby(event.target.value)}
        />
        <label>Image URL:</label>
        <input
          type="text"
          required
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="text-img">
                <NavLink to={`/user/${user.id}`}><img src={user.image} alt={`Image for ${user.name}`} /></NavLink>
                <h3>Name: {user.name}</h3>
            </div>
            <div className='edit-delete-buttons'>
              <button className='edit' onClick={() => handleEdit(user)}>Edit</button>
              <button className='delete' onClick={() => handleDelete(user.id || 0)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      </>
  );
};

export default Home;
