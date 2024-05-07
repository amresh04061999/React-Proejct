

// Stats component
function Stats({ items }) {
    if (!items.length) return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    )
    const numberOfItems = items.length;
    const numberOfPackedItems = items.filter((item) => item.packed).length;
    const percentage = Math.round(numberOfPackedItems / numberOfItems * 100)
    return <footer className="stats">
      <em> {percentage === 100 ? "You got everything! ready to go" : `You have ${numberOfItems} Items on your list,and your already packed ${numberOfPackedItems}(${percentage}%)`}</em>
    </footer>
  }
  export default Stats