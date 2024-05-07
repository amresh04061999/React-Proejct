
// Item component 

function Item({ item, onDeleteItem, onToggleItem }) {
    console.log(item);
    return <div>
      <li style={item.packed ? { textDecoration: "line-through" } : {}} >
        <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
        <span>{item.quantity} {item.description}</span>
        <button style={{ color: "white" }} onClick={() => onDeleteItem(item.id)}>X</button>
      </li>
    </div>
  }

  export default Item