import { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState(['alpha','bravo','charlie','delta']);
  const  [inputText, setInputText] = useState('');
  //let inputText = '';

  const userList = users.map((user) => {
    return <li key={user}>{user}</li>
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUsers = [...users, inputText];
    setUsers(newUsers);
    //console.log("handle submit:", inputText);
  }

  const handleChange = (event) => {
    setInputText(event.target.value);
    //console.log('handle change:', event.target.value);
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