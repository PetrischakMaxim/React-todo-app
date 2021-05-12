import React from 'react';

import './item-add-form.css';


const ItemAddForm = ({onAddItem}) => {
    return (
        <div className="item-add-form">
            <button onClick={ () => onAddItem('Hello')} className="btn btn-outline-secondary">Add item</button>
        </div>
    );
};
  
export default ItemAddForm;