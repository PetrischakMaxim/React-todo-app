import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    {
      name:'all',
      label: 'All'
    },
    {
      name:'active',
      label: 'Active'
    },
    {
      name:'done',
      label: 'Done'
    }
  ]

  render() {
    const {filterItem,onFilterChange} = this.props;

    const buttons = this.buttons.map(({name,label}) => {
      const isActive = filterItem === name;

      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button 
          key={name} 
          className={`btn ${clazz}`}
          onClick = {()=> onFilterChange(name)}
        >
        {label}</button>
      )
    })

    return (
      <div className="btn-group">
          {buttons}
      </div>
    )
  }
}
