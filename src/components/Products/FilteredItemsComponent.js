import { PureComponent } from 'react';

class FilteredItemsComponent extends PureComponent {
  render() {
    const { attributes, names } = this.props;
    let filteredArray = [];
    const filtered = (name) => (
      <select>
        {attributes.map((attribute) => {
          attribute.attributes.map((attribute) => {
            <>
              { attribute.name == name ?
                attribute.items.map((item) => {
                  filteredArray.push(item.value)
                })
              : console.log('nothing')}
            </>
          })
        }) }
        {[...new Set(filteredArray)].map((item) => (
          <option>{item}</option>
        ))}
        { filteredArray = []}
      </select>
    )

    filtered('Size');
    return (
      <div>
        {names.map((name) => (
          <div>
            <h5>{name}</h5>
            { filtered(name) }
           {/*  <select>
              { attributes.map((attribute) => (
                attribute.attributes.map((attribute) => (
                  <>
                    {  attribute.name == name ? 
                      attribute.items.map((item) => (
                      <option>{ item.value }</option>
                    )) : console.log('nothing') }
                  </>
                ))
              )) }
            </select> */}
           {/*  { attributes.map((attribute) => (
              attribute.attributes.map((attribute) => (
                attribute.name == name ? 
                <select>
                  { attribute.items.map((item) => (
                    <option>{item.value}</option>
                  )) }
                </select> 
                : 
                console.log('no match')
              ))
            )) } */}
          </div>
        ))}
      </div>
    )
  }
}

export default FilteredItemsComponent;