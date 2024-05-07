import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

// app component this one main component 
function App() {
    return <div className="container">
        <Header />
        <Menu />
        <Footer />
    </div>
}

// menu  component 
function Menu() {
    const pizzas = pizzaData
    const pizzaNumber = pizzas.length
    return <main className="menu">
        <h2> Our menu</h2>
        {pizzaNumber > 0 ?
            <React.Fragment key="ABX">
                <p>Authentic italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious</p>
                <ul className="pizzas"> {pizzas.map((pizza) => <Pizza pizzaObject={pizza} key={pizza.name} />)}</ul>
            </React.Fragment>
            : 'No record'}
    </main>
}

// pizza component 
function Pizza(props) {
    // if (props.pizzaObject.soldOut) return null;
    return <li className={`pizza ${props.pizzaObject.soldOut ? 'sold-out' : ''}`}>
        <img src={props.pizzaObject.photoName} alt={props.pizzaObject.name}></img>
        <div>
            <h3>{props.pizzaObject.name}</h3>
            <p>{props.pizzaObject.ingredients}</p>
            <span>{props.pizzaObject.soldOut ? "SOLD OUT" : props.pizzaObject.price + 3}</span>
        </div>
    </li>
}

// footer component 
function Header() {
    return <header className="header"><h1 >Fast React Pizza co.</h1></header>
}
// footer component 
function Footer() {
    const hour = new Date().getHours();
    const openHour = 8;
    const closeHour = 21;
    const isOpen = (hour >= openHour && hour <= closeHour)
    console.log(isOpen);
    return (<footer className="footer">
        {isOpen && <Order closeHour={closeHour} openHour={openHour} />
        }
    </footer>)
}
// Order component 
function Order({ openHour, closeHour }) {
    return <div className="order">
        <p>We are open  {openHour}:00 Come visit us or order online </p>
        <p>We are open until {closeHour}:00  Come visit us or order online </p>
        <button className="btn">Order</button>
    </div>
}

// select root and show single page application using dome 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>

)