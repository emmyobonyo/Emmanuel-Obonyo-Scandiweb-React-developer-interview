import { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import FilteredItems from './FilteredItems';
import { Query } from '@apollo/client/react/components';
import GET_ATTRIBUTES from '../../graphql/getAttributes';

class Filter extends PureComponent {
  render() {
    const { category } = this.props.params;
    console.log(category)
    return (
      <div>
        <Query
          key="yes"
          query={GET_ATTRIBUTES}
          variables={{ input: { title: `${!category ? 'all' : category}` } }}
          fetchPolicy="network-only"
        >
          {({ loading, data }) => {
            if (loading) return null;
            return <FilteredItems data={data} />
          }}
        </Query>
      </div>
    )
  }
}

export default (props) => (
  <Filter
    {...props}
    params={useParams()}
  />
);