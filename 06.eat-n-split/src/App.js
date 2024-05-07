
import { useLayoutEffect, useState } from 'react';
import './App.css';
import { fireEvent } from '@testing-library/react';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddForm) => !showAddForm)
  }

  function handleAddFriendList(friend) {
    setFriendList((friendList) => [...friendList, friend])
    setShowAddFriend(false)
  }

  function handleSelectedList(friend) {
    setSelectedFriend((selectedFriend) => selectedFriend?.id === friend.id ? null : friend)
  }
  function handleSplitBill(value) {
    console.log(value);
    setFriendList((friendList) =>
      friendList.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

  }
  return (
    <div className="app">
      <div className='sidebar'>
        <FriendList friend={friendList} onSelectedFriend={handleSelectedList} selectedFriend={selectedFriend} key={friendList} />
        {showAddFriend && (<FormAddFriend onAddFriend={handleAddFriendList} />)}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>
      {selectedFriend && (<FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />)}
    </div>
  );
}

function Button({ children, onClick }) {
  return <button className='button' onClick={onClick}>{children}</button>
}

function FriendList({ friend, onSelectedFriend, selectedFriend }) {
  return <ul>
    {friend.map((friend) => <Friend friend={friend} key={friend.id} onSelectedFriend={onSelectedFriend} selectedFriend={selectedFriend} />)}
  </ul>
}


function Friend({ friend, onSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return <div>
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className='red'>You owe {friend.name} ${Math.abs(friend.balance)}</p>)}
      {friend.balance > 0 && (<p className='green'>{friend.name}   Owes You  ${Math.abs(friend.balance)}</p>)}
      {friend.balance === 0 && (<p>You and  {friend.name}  are even</p>)}
      <Button onClick={() => onSelectedFriend(friend)} >{isSelected ? 'Close' : 'selected'}</Button>
    </li>
  </div>
}


function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  function HandleAddSubmitForm(e) {
    e.preventDefault();
    if (!name || !image) return
    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0
    }
    setName('')
    setImage('https://i.pravatar.cc/48')
    onAddFriend(newFriend)
  }
  return <form className='form-add-friend' onSubmit={HandleAddSubmitForm}>
    <label>Friend Name</label>
    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
    <label>Image URl</label>
    <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
    <Button >Add</Button>
  </form>

}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('');
  const myExpense = bill ? bill - paidByUser : '';
  console.log(myExpense);
  function handleSplitFormBill(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? myExpense : -paidByUser)
    setBill('');
    setPaidByUser('')
    setWhoIsPaying('')
  }

  return <form className='form-split-bill' onSubmit={handleSplitFormBill}>
    <h2> Split a bill with {selectedFriend.name}</h2>
    <label>Bill value</label>
    <input type='text' value={bill} onChange={(e) => setBill(Number(e.target.value))} />
    <label>Your expense</label>
    <input type='text' value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />
    <label>{selectedFriend.name}'s expense</label>
    <input type='text' disabled value={Math.abs(myExpense)} />
    <label>Who is paying the bill</label>
    <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)} >
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>
    <Button type="submit" >Split bill</Button>
  </form>
}
export default App;
