import { useState } from 'react';

function AddTransaction(props) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onSubmit(name, amount);

        setName("");
        setAmount("");
    }


    return (
        <div className = "add-transaction-popup">
            <h3>Add New Transaction</h3>
            <form>
                <label>Name: <input type = "text" value = "name" onChange = {(e) => setName(e.target.value)} /></label>
                <label>Amount: <input type = "text" value = {amount} onChange = {(e) => setAmount(e.target.value)} /></label>
                <button type = "submit">Add</button>
            </form>
        </div>
    )
}