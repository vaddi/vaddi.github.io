// Example of a single Component 
// Fetching Data from an API and render the Data
// after the fetch promises are resolved
import React from 'react';

import { Media } from 'react-bootstrap'

export class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: []}
  }

  componentDidMount() {
    this.UserList();
  }

  UserList() {
    const mock = this.props.mock;
    const endpoint = this.props.endpoint;
    let userApi = 'https://' + mock + '.mockapi.io/api/v1/' + endpoint + '';
    if( mock === "" || endpoint === "" ) return null;
    return fetch(userApi, {
      method: 'GET'
    }).then(response => response.json())
      .then((data) => {
        this.setState({ data: data })
      })
  }

  timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  }

  boolConverter(value) {
    return value ? '1' : '0';
  }

  _renderInfoText() {
    return <div>
      Component: <span>{this._reactInternalFiber.elementType.name}</span><br />
      Properties:
      <ul>
        <li>mock - Shared Secret</li>
        <li>endpoint - url endpont for get request</li>
      </ul>
      Features:
      <ul>
        <li>Renders a list of Elements from a given <a href='https://www.mockapi.io/'>mockup.io</a> Endpoint.</li>
        <li>Directly uses a GET call to the API and transform the responding json Object into a nicly Html Element.</li>
      </ul>
    </div>
  }

  render() {
    // Single Data Element redering
    const persons = Array.isArray( this.state.data ) && this.state.data.map((item, i) => {
      return (
        <Media key={i} as="li" className="article">
          <a href={item.imageUrl} target='_blank'>
            <img
              width={100}
              height={100}
              className="align-self-center mr-4"
              src={item.avatar}
              alt={item.imageAlt}
              title={item.name}
            />
          </a>
          <Media.Body>
            <h5>{item.id} - {item.name}</h5>
            <div>CreatedAt: {this.timeConverter(item.createdAt)} / {item.createdAt}</div>
            <div>Active: {this.boolConverter(item.active)}</div>
            <div>Image: <a href={item.avatar} target='_blank'>{item.name}</a></div>
            <div>Alt: {item.name}</div>
          </Media.Body>
        </Media>
      );
    });
    
    // Datalist rendering
    return (
      <div>
        { this._renderInfoText() }
        <ul className="list-unstyled">
          { persons }
        </ul>
      </div>
    );
  }
}

