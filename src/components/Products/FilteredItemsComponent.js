import { PureComponent } from 'react';

class FilteredItemsComponent extends PureComponent {
  render() {
    const { attribute } = this.props;
    console.log(attribute)
    return (
      <h5>{attribute.name}</h5>
    )
  }
}

export default FilteredItemsComponent;