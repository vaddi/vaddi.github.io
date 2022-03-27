import React from 'react';

// Example to fetch data from a xml source
// Usage:
// <Feeds target="https://blog.mvattersen.de/index.php?feed=rss2" />

const apiURL = 'https://www.mvattersen.de/resolver.php';
const secret = 'T0p5ecr3tK3y!';

export class GithubUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updateAt: null,
    };  
  }

  // Default data if nothing isse// Default data if nothing issett
  static defaultProps = {
    format: 'json',
  }

  componentDidMount() {
    this.getData();
  }

  timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  }

  getData() {
    const target = this.props.target;
    const format = this.props.format;
    //if( target === undefined || target === "" ) return null;
    const targetUrl = 'https://github.com/' + target + '.atom';
    const API = `${apiURL}?secret=${secret}&target=${targetUrl}&format=${format}`;
    return fetch(API, {
      method: 'POST',
    })
    .then(response => response.json())
    .then((data) => {
      let result = data[0].entry;
      this.setState({ data: result, updateAt: new Date() })
    }); 
  }

  _renderInfoText() {
    return <div>
      Component: <span>{this._reactInternalFiber.elementType.name}</span><br />
      Properties:
      <ul>
        <li>Target - Github Username as Target </li>
      </ul>
      Features:
      <ul>
        <li>Renders a list of Github Activity from a given .</li>
      </ul>
    </div>
  }

  render() {
    const feeds = Array.isArray( this.state.data ) && this.state.data.map((item, i) => {
      return (
        <article key={i} className="feed">
          <div className="time">{this.timeConverter( item.updated )}</div>
          <div>#{ i } - <a href={item.link.href}>{item.title}</a></div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: item.content.toString() }}></div>
        </article>
      );
    });
    return (
      <div className="feeds">
        { this._renderInfoText() }
        {feeds}
      </div>
    );
  }
}

//           {item.content.toString()}
//
