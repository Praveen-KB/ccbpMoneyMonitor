import {Component} from 'react'

class TransactionItem extends Component {
  render() {
    const {list, fun} = this.props
    const {id, listTitle, listAmount, expenseType} = list

    const del = () => {
      fun(id)
    }
    return (
      <li>
        <p>{listTitle}</p>
        <p>{listAmount}</p>
        <p>{expenseType}</p>
        <button type="button" data-testid="delete" onClick={del}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </li>
    )
  }
}

export default TransactionItem
