import React from 'react';

// based on https://gist.github.com/ArthurGuy/784ce4b95a895752cb07df6a1320c026

export class Defcon extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };  
  }

  componentDidMount() {
    const mock = this.props.mock;
    const apiurl = this.props.apiurl;
    const target = this.props.target;
    const format = this.props.format;
    let API = `${apiurl}?secret=${mock}&target=${target}&format=${format}`;
    return fetch(API, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data) => {
        let title = data[0].channel.item.title;
        let rawLevel = title.substring(title.indexOf(": ") + 1).toLowerCase().trim();
        let level = 5;
        let color = 'Blue'
        switch(rawLevel) {
          case 'low':
            level = 5;
            color = 'Blue';
            break;
          case 'moderate':
            level = 4;
            color = 'Green';
            break;
          case 'substantial':
            level = 3;
            color = 'GoldenRod ';
            break;
          case 'severe':
            level = 2;
            color = 'DarkRed';
            break;
          case 'critical':
            level = 1;
            color = 'Red';
            break;
          default:
            level = 5;
            color = 'Blue';
        }
        let d = new Date();
        let date = d.toLocaleDateString();
        let time = d.toLocaleTimeString();
        let datetime = date + ' ' + time;
        let result = [{
          level: level,
          color: color,
          rawLevel: rawLevel,
          source: target,
          date: datetime,
        }];
        this.setState({ data: result })
    })
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
        <li>Renders a Component based on the current Defcon State for the UK.</li>
        <li>Renders the Bordercolor depending on the current State Level.
          <ul>
            <li>1 - <span style={{ color: 'Red' }}>critical</span></li>
            <li>2 - <span style={{ color: 'DarkRed' }}>severe</span></li>
            <li>3 - <span style={{ color: 'GoldenRod ' }}>substantial</span></li>
            <li>4 - <span style={{ color: 'Green' }}>moderate</span></li>
            <li>5 - <span style={{ color: 'Blue' }}>low</span></li>
          </ul>
        </li>
        <li>Call an API to get the raw xml Data as json formated Object.</li>
      </ul>
    </div>
  }

  render() {
    const defcon = this.state.data.map((item, i) => {
      return (
        <article key={i} style={{padding: '5px', margin: '20px 0 20px 0', border: '3px solid ' + item.color }}>
          <div>Current UK Threat Level: {item.rawLevel}</div>
          Defcon: {item.level}
          <br />
          Source: {item.source}
          <br />
          Date: {item.date}
        </article>
      );
    });
    return (
      <div>
        {this._renderInfoText()}
        {defcon}
      </div>
    );
  }
}

