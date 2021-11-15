
import React, { Component } from 'react';
import './css/CitySearch.css'
// import { mockData } from './mock-data';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: []
  }

  //part of scenario 2 of feature 1
  //Show a List of Suggestions During Search
  handleInputChanged = (event) => {
    let value = event.target.value;
    let suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      suggestions,
    });
  };

  //part of scenario 3 of feature 1
  //User Can Select a City from the List of Suggestions
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false
    });
    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className='CitySearch'>
        <p>City Filter</p>
        <input
          type='text'
          className='city'
          //the value of state is query
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div >
    );
  }
}


export default CitySearch;