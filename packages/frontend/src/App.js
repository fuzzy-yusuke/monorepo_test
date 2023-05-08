import { useState } from 'react';
import './App.css';

function User({ name }) {
  return <li style={{ padding: '8px'}}>{name}</li>
}

const getUsers = async() => {
  const response = await fetch('http://localhost:8000/api/users');
  const body = response.json();
  return body;
}

function App() {
  const [users, setUsers] = useState(['alpha','bravo','charlie','delta']);
  const  [inputText, setInputText] = useState('');

  getUsers()
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  const userList = users.map((user) => {
    return <User key={user} name={user} />;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUsers = [...users, inputText];
    setUsers(newUsers);
  }

  const handleChange = (event) => {
    setInputText(event.target.value);
  }

  return (
    <div className='App'>
      <ul>{userList}</ul>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange}/>
        <button type='submit'>追加</button>
      </form>
      <div>入力値:{inputText}</div>
    </div>
  );
}

export default App;