import {Component} from 'react'
import './index.css'

class MoneyDetails extends Component {
  render() {
    const {
      imgUrl,
      amount,
      title,
      altText,
      class1,
      class2,
      dataTestid,
    } = this.props
    return (
      <div className={class1}>
        <img src={imgUrl} alt={altText} />
        <div className={class2}>
          <p className="head-font">{title}</p>
          <p
            className="amount-font"
            data-testid={dataTestid}
          >{`Rs ${amount}`}</p>
        </div>
      </div>
    )
  }
}

export default MoneyDetails
