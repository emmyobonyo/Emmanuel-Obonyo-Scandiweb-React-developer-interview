/* eslint-disable array-callback-return */
import { PureComponent } from 'react'
import FilteredItemsComponent from './FilteredItemsComponent'

class FilteredItems extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data.category.products,
    }
  }
  render() {
    const { changeProductState } = this.props
    const attributeNames = []
    this.state.data.map((product) => {
      product.attributes.map((attribute) => {
        if (attributeNames.indexOf(attribute.name) === -1) {
          attributeNames.push(attribute.name)
        }
      })
    })
    return (
      <FilteredItemsComponent
        names={attributeNames}
        attributes={this.state.data}
        changeProductState={changeProductState}
      />
    )
  }
}

export default FilteredItems
