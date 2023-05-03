import { useState } from 'react';
import { useEffect } from 'react';
import './AddTransaction.css';



function AddTransaction(props) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState();
    


    useEffect(() => {
        if (props.editedTransaction) {
          setName(props.editedTransaction.name);
          setAmount(props.editedTransaction.amount);
          setTransactionType(props.editedTransaction.transactionType);
          setRecurring(props.editedTransaction.recurring);
          setCategory(props.editedTransaction.category);
          setDate(props.editedTransaction.date);
        }
      }, [props.editedTransaction]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(date);

        props.onSubmit(name, amount, transactionType, recurring, category, date);


    }


    return (
        <div className = "add-transaction-popup">
            {props.editedTransaction ? <h3 className = "edit-title">Edit Transaction</h3> : <h3 className = "add-title">Add New Transaction</h3>}
            <form className = "add-form" onSubmit = {handleSubmit}>
                <label>Name: <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} /></label>
                <br/>
                <label>Amount: <input type = "number" value = {amount} onChange = {(e) => setAmount(e.target.value)} /></label>
                <br/>
                <label>Category: <input type = "text" value = {category} onChange = {(e) => setCategory(e.target.value)} /></label>
                <br/>
                <label>Date: <input type = "datetime-local" defaultValue = {date} onChange = {(e) => setDate(e.target.value)} /></label>
                <br/>
                <label>Type: <input type = "text" value = {transactionType} onChange = {(e) => setTransactionType(e.target.value)} /></label>
                <br/>
                <label>Recurring: 
                    <input type = "checkbox" value = {recurring} onChange = {(e) => setRecurring(e.target.value)} id="yes"/>
                    <label for="yes">Yes</label>
                </label>
                <br></br>
                {props.editedTransaction ? <button type = "submit">Save</button> : <button type = "submit">Add</button>}
                <button onClick = {props.onClose}>Cancel</button>
            </form>
            
        </div>

    );
}

export default AddTransaction;