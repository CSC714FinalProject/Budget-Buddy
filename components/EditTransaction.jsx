import { useState } from 'react';




function EditTransaction(props) {
    const [name, setName] = useState(props.transaction.name);
    const [amount, setAmount] = useState(props.transaction.amount);
    const [transactionType, setTransactionType] = useState(props.transaction.transactionType);
    const [recurring, setRecurring] = useState(props.transaction.recurring);
    const [category, setCategory] = useState(props.transaction.category);
    const [date, setDate] = useState(props.transaction.date);


    const handleSubmit = (event) => {
        event.preventDefault();

        props.onEdit(name, amount, transactionType, recurring, category, date);


    }
    return(
        <div className = "edit-transaction-popup">
            <h3>Edit This Transaction</h3>
            <form onSubmit = {handleSubmit}>
                <label>Name: <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} required/></label>
                <br />
                <label>Amount: <input type = "number" value = {amount} onChange = {(e) => setAmount(e.target.value)} required/></label>
                <br />
                <label>Category: <input type = "text" value = {category} onChange = {(e) => setCategory(e.target.value)} required/></label>
                <br />
                <label>Date: <input type = "datetime-local" value = {date} onChange = {(e) => setDate(e.target.value)} /></label>
                <br />
                <label>Type: <input type = "text" value = {transactionType} onChange = {(e) => setTransactionType(e.target.value)} required/></label>
                <br />
                <label>Recurring: <input type = "checkbox" checked = {recurring} onChange = {(e) => setRecurring(e.target.checked)} id = "yes" /><label for = "yes">Yes</label></label>
                <br />
                <button type = "submit">Save</button>
                <button onClick = {props.onClose}>Cancel</button>

            </form>

        </div>
    );

}

export default EditTransaction;