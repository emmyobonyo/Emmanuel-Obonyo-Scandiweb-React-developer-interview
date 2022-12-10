import { PureComponent } from 'react'

class FilteredItemsComponent extends PureComponent {
  render() {
    const { attributes, names, changeProductState } = this.props
    let filteredArray = []
    const filtered = (name) =>
      name != 'Color' ? (
        <select onChange={changeProductState}>
          {attributes.map((attribute) => {
            attribute.attributes.map((attribute) => {
              ;<>
                {attribute.name == name
                  ? attribute.items.map((item) => {
                      filteredArray.push(item.value)
                    })
                  : console.log('nothing')}
              </>
            })
          })}
          {[...new Set(filteredArray)].map((item) => (
            <option>{item}</option>
          ))}
          {(filteredArray = [])}
        </select>
      ) : (
        <>
          {attributes.map((attribute) => {
            attribute.attributes.map((attribute) => {
              ;<>
                {attribute.name == name
                  ? attribute.items.map((item) => {
                      filteredArray.push(item.value)
                    })
                  : console.log('nothing')}
              </>
            })
          })}
          {[...new Set(filteredArray)].map((item) => (
            <span>{item}</span>
          ))}
          {(filteredArray = [])}
        </>
      )

    filtered('Size')
    return (
      <div>
        {names.map((name) => (
          <div>
            <h5>{name}</h5>
            {filtered(name)}
          </div>
        ))}
      </div>
    )
  }
}

export default FilteredItemsComponent
