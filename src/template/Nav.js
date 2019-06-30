import React from 'react';
import { Nav } from 'react-bootstrap'

export class Navigation extends React.Component {
  
	constructor(props) {
    super(props);
    // Initial State
    this.state = {
      data: this.props.content,
    };
    this._renderNavItem = this._renderNavItem.bind(this);
    this._renderNavList = this._renderNavList.bind(this);
  }

  _renderNavItem( item ) {
    return <Nav.Link href={item.url}>{item.title}</Nav.Link>;
  }

  _renderNavList() {
   const listItems = this.state.data.map( ( i, key, item ) =>
      <Nav.Item key={key.toString()}>
        {this._renderNavItem( item[key] )}
      </Nav.Item>
    );
    return (
      <Nav fill variant="tabs" defaultActiveKey="/">
        {listItems}
      </Nav>
    );
  }
  
	render() {
		return (
			<div>
				{this._renderNavList()}
			</div>
		)
	}  
  
}
