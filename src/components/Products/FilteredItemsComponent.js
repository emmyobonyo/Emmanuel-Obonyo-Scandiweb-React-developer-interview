/*eslint-disable array-callback-return */
import { PureComponent } from 'react'

class FilteredItemsComponent extends PureComponent {
  componentDidMount() {
    const element = document.getElementsByClassName('filtered-colors')
    if (element.length > 0) {
      const lastElement = element[0].parentElement.lastChild
      lastElement.remove()
    }
  }
  render() {
    const { attributes, names, changeProductState } = this.props
    let filteredArray = []
    const filtered = (name) =>
      name === 'Size' || name === 'Capacity' ? (
        <select onChange={changeProductState}>
          {attributes.map((attribute) => {
            return attribute.attributes.map((attribute) => {
              ;<>
                {attribute.name === name
                  ? attribute.items.map((item) => {
                      return filteredArray.push(item.value)
                    })
                  : console.log('nothing')}
              </>
            })
          })}
          {[...new Set(filteredArray)].map((item) => (
            <option>{item}</option>
          ))}
          {(filteredArray.length = 0)}
        </select>
      ) : name === 'Color' ? (
        <>
          {attributes.map((attribute) => {
            return attribute.attributes.map((attribute) => {
              ;<>
                {attribute.name === name
                  ? attribute.items.map((item) => {
                      filteredArray.push(item.value)
                    })
                  : console.log('nothing')}
              </>
            })
          })}
          {[...new Set(filteredArray)].map((item) => (
            <span
              className='filtered-colors'
              style={{ backgroundColor: item }}
              onClick={changeProductState}
              id={item}
            ></span>
          ))}
          {(filteredArray.length = 0)}
        </>
      ) : (
        <>
          {attributes.map((attribute) => {
            attribute.attributes.map((attribute) => {
              ;<>
                {attribute.name === name
                  ? attribute.items.map((item) => {
                      return filteredArray.push(item.value)
                    })
                  : console.log('nothing')}
              </>
            })
          })}
          {[...new Set(filteredArray)].map((item) => (
            <>
              <input
                type='checkbox'
                value={`${item}`}
                onClick={changeProductState}
              />
              <label for='vehicle1'>{item}</label>
            </>
          ))}
        </>
      )
    return (
      <div>
        {names.map((name) => (
          <div>
            <h4>{name}</h4>
            {filtered(name)}
          </div>
        ))}
      </div>
    )
  }
}

export default FilteredItemsComponent
