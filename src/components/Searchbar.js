import React, { Component } from 'react';
import '../css/styles.css';

class Searchbar extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(e.target.querySelector('input').value);
      }
    };
  
    render() {
      return (
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.handleSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>
  
            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      );
    }
  }
  
  export default Searchbar;
