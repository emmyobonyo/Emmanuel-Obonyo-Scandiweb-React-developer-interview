import { PureComponent } from 'react';

class FilteredItemsComponent extends PureComponent {
  render() {
    const { attribute, names } = this.props;
    return (
      <div>
        {names.map((name) => (
          <h5>{name}</h5>
        ))}
      </div>
    )
  }
}

export default FilteredItemsComponent;