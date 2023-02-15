import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleText: '',
    selectVal: 'INCOME',
    amountVal: '',
    incomeExpenseList: [],
  }

  appendList = event => {
    event.preventDefault()

    this.setState(prevState => {
      const {selectVal} = prevState
      const id = uuidv4()

      const listTitle = prevState.titleText
      const listAmount = prevState.amountVal
      const expenseType = prevState.selectVal

      const listF = {id, listTitle, listAmount, expenseType}

      if (selectVal === 'INCOME') {
        return {
          titleText: '',
          amountVal: '',
          selectVal: 'INCOME',
          incomeExpenseList: [...prevState.incomeExpenseList, listF],
        }
      }
      return {
        titleText: '',
        amountVal: '',
        selectVal: 'INCOME',
        incomeExpenseList: [...prevState.incomeExpenseList, listF],
      }
    })
  }

  titleChange = event => {
    const val = event.target.value

    this.setState({
      titleText: val,
    })
  }

  amountChange = event => {
    const val = event.target.value

    this.setState({
      amountVal: val,
    })
  }

  selectValChange = event => {
    const val = event.target.value

    this.setState({
      selectVal: val,
    })
  }

  filter = ide => {
    this.setState(prevState => {
      let li = prevState.incomeExpenseList
      li = li.filter(each => each.id !== ide)

      return {
        incomeExpenseList: li,
      }
    })
  }

  render() {
    const {incomeExpenseList, titleText, selectVal, amountVal} = this.state
    console.log(incomeExpenseList, titleText, selectVal, amountVal)

    let expense = 0
    let income = 0
    // eslint-disable-next-line no-restricted-syntax
    for (const item of incomeExpenseList) {
      if (item.expenseType === 'INCOME') {
        income += parseInt(item.listAmount)
      } else {
        expense += parseInt(item.listAmount)
      }
    }

    return (
      <div className="card">
        <div className="card__header">
          <h1 className="card__header-heading">Hi,Richard</h1>
          <p className="card__header-sub">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div className="card__second">
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            amount={income - expense}
            title="Your Balance"
            altText="balance"
            class1="card__second-balance"
            class2="card__second-balance-sub"
            dataTestid="balanceAmount"
          />
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            amount={income}
            title="Your Income"
            altText="income"
            class1="card__second-income"
            class2="card__second-income-sub"
            dataTestid="incomeAmount"
          />
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            amount={expense}
            title="Your Expenses"
            altText="expenses"
            class1="card__second-expense"
            class2="card__second-expense-sub"
            dataTestid="expensesAmount"
          />
        </div>
        <div className="card__footer">
          <form className="card__footer-form" onSubmit={this.appendList}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              onChange={this.titleChange}
              placeholder="TITLE"
              id="title"
              value={titleText}
              required
            />
            <br />
            <label htmlFor="AMOUNT">AMOUNT</label>
            <br />
            <input
              id="AMOUNT"
              onChange={this.amountChange}
              placeholder="AMOUNT"
              type="number"
              value={amountVal}
              required
            />
            <br />
            <label htmlFor="select">Type</label>
            <br />
            <select
              name="expenseType"
              onChange={this.selectValChange}
              id="select"
              value={selectVal}
            >
              {transactionTypeOptions.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <br />

            <button type="submit">Add</button>
          </form>
          <div className="card__footer-content">
            <h1>History</h1>
            <div className="card__footer-content-sub">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {incomeExpenseList.map(each => (
                <TransactionItem key={each.id} fun={this.filter} list={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
