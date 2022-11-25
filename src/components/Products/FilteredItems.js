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
    console.log(this.state.data)
    const { changeProductState } = this.props;
    const attributeNames = [];
    this.state.data.map((product) => {
      product.attributes.map((attribute) => {
        attributeNames.indexOf(attribute.name) === -1 ? attributeNames.push(attribute.name) : console.log('Item already exists')
      })
    })
    console.log(attributeNames)
    return (
      <FilteredItemsComponent names={attributeNames} attributes={this.state.data} changeProductState={changeProductState}/> 
    )
  }
}

export default FilteredItems;