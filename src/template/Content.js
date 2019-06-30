import React from 'react';

export class Content extends React.Component {
  
	constructor(props) {
    super(props);
    // Initial State
    this.state = {
      data: this.props.content,
    };
    this._renderContentItem = this._renderContentItem.bind(this);
    this._renderContentList = this._renderContentList.bind(this);
  }

  _renderContentItem( item ) {
    return (
      <div>
        <h1>{item.title}</h1>
        <div>{item.content}</div>
        <a href={item.url}>{item.title}</a>
      </div>
    );
  }

  _renderContentList() {
   const listItems = this.state.data.map( ( i, key, item ) =>
      <article key={key.toString()}>
        {this._renderContentItem( item[key] )}
      </article>
    );
    return (
      <div className='articles'>
        {listItems}
      </div>
    );
  }
  
	render() {
		return (
			<div className="content">
        {this.props.children}
			</div>
		)
	}  
  
}


// export const Content = (props) => (
//   <div>
//     {props.children}
//      {this._renderContentList()}
//   </div>
// );
