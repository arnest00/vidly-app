import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ textProperty, valueProperty, listItems, listType, onListSelect, currentList }) => {
  return (
    <div className="list-group">
      { listItems.map(item => (
        <button
          type='button'
          onClick={() => onListSelect(item)}
          className={currentList === item ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}
          key={item[valueProperty]}
        >
            {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

ListGroup.propTypes = {
  listItems: PropTypes.array.isRequired
};
 
export default ListGroup;