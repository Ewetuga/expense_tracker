import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description || !amount) {
      showMessage('Please fill in all fields')
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString()
      }

      setExpenses([...expenses, newExpense])
      setDescription('')
      setAmount('')
      setIsLoading(false)
      showMessage('Expense added successfully!')
    }, 500)
  }

  const handleDelete = (id) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setExpenses(expenses.filter(expense => expense.id !== id))
      setIsLoading(false)
      showMessage('Expense deleted successfully!')
    }, 300)
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="expense-form">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input 
              type="text" 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter expense description"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount ($):</label>
            <input 
              type="number" 
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              step="0.01"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={`btn-add ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>
      </div>

      <div className="expense-list">
        <h2>Expenses</h2>
        {expenses.length === 0 ? (
          <p className="no-expenses">No expenses added yet</p>
        ) : (
          <>
            <ul>
              {expenses.map(expense => (
                <li key={expense.id} className="expense-item">
                  <div className="expense-info">
                    <span className="expense-description">{expense.description}</span>
                    <span className="expense-date">{expense.date}</span>
                  </div>
                  <div className="expense-actions">
                    <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                    <button 
                      onClick={() => handleDelete(expense.id)}
                      className={`btn-delete ${isLoading ? 'loading' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? '...' : 'Delete'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="expense-total">
              <h3>Total Expenses</h3>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
