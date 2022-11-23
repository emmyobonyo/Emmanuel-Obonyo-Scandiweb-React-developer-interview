import { PureComponent } from 'react';
import FilteredItemsComponent from './FilteredItemsComponent';

class FilteredItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.category.products,
    }
  }
  
  render() {
    this.state.data.map((product) => {
      product.attributes.map((attribute) => {
        console.log(attribute.name)
      })
    })
    return (
      this.state.data.map((product) => (
        product.attributes.map((attribute) => (
          <FilteredItemsComponent attribute={attribute} />
        ))
      ))
    )
  }
}

export default FilteredItems;