// get feed over a php xml2json parser
// Example:
// <Feeds target="https://blog.mvattersen.de/index.php?feed=rss2" />
import React from 'react';

export class Feeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      target: props.target,
      data: [],
      updateAt: null,
      format: this.props.format,
    };  
  }

  componentDidMount() {
    this.getData();
  }
  
  getData() {
    const mock = this.props.mock;
    const apiurl = this.props.apiurl;
    const target = this.props.target;
    const format = this.props.format;
    if( target === undefined || target === "" ) return null;
    const API = `${apiurl}?secret=${mock}&target=${target}&format=${format}`;

    return fetch(API, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((data) => {
        // edit the data Part to fit your needs
        let result = data[0].channel.item;
        this.setState({ data: result, updateAt: new Date() })
    }); 
  }

  _renderInfoText() {
    return <div>
      Component: <span>{this._reactInternalFiber.elementType.name}</span><br />
      Properties:
      <ul>
        <li>mock - Shared Secret</li>
        <li>apiUrl - The Middleware API (Scrape xml data and returns a json object)</li>
        <li>target - The scraping Target</li>
        <li>format - Requested Data Format</li>
      </ul>
      Features:
      <ul>
        <li>Renders a list of Elements from a given RSS/Atom News Feed Adress.</li>
        <li>Call an API to get the raw xml Data as json formated Object.</li>
      </ul>
    </div>
  }

  render() {
    const feeds = Array.isArray( this.state.data ) && this.state.data.map((item, i) => {
      return (
        <article key={i}>
          #{i} - <a href={item.link} target="_blank">{item.title}</a>
          <br />
          {item.description}
        </article>
      );
    });
    return (
      <div>
        {this._renderInfoText()}
        {feeds}
      </div>
    );
  }
}

