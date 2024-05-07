import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// main component
function App() {
  const [items, setItem] = useState([])

  function handleItem(item) {
    setItem((items) => [...items, item])
  }

  function handleDeleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItem((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
  }
  function handleClearList() {
    const confirmed = window.confirm('Are you delete all items');
    if (confirmed) setItem([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Stats items={items} />
    </div>
  );
}
export default App;
