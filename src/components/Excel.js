import React from 'react';

import { Form, Table, ButtonGroup, Button } from 'react-bootstrap'

/*
	Basierend auf dem Buch "Durchstarten mit React"
	ISBN: 978-3-96009-042-7

  Beispiel:
  import { Excel } from '.components/Excel';
  ...
  const headers = ['ID','Name','AGE'];
  const data = [
    [1,"John",23],
    [2,"Jow",19],
  ];
  ...
  <Excel headers={headers} data={data} />
*/

export class Excel extends React.Component {
	
	_log = [];
  
	constructor(props) {
    super(props);
    // Initial State
    this.state = {
      data: this.props.data,
      sortby: null,
      descending: false,
      edit: null,
      search: false,
			_preSearchData: null,
    };
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);
    this._sort = this._sort.bind(this);
    this._search = this._search.bind(this);
		this._toggleSearch = this._toggleSearch.bind(this);
  }
  
	componentDidMount() {
		document.onkeydown = function(e) {
			if(e.altKey && e.shiftKey && e.keyCode === 82) {
				// Alt + Shift + R(eplay)
				this._replay();
			}
		}.bind(this);
	}
	
	/*
		Editing
	*/
	
  _showEditor(e) {
    this.setState({edit: {
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex,
    }})
  }
  
  _save(e) {
    e.preventDefault();
    let input = e.target.firstChild;
    let data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this._logSetState({
      edit: null,
      data: data,
    });
  }
	
	/*
		Sorting
	*/
	
  _sort(e) {
    let column = e.target.cellIndex;
    let data = this.state.data.slice();
    let descending = this.state.sortby === column && !this.state.descending;
    data.sort(function(a, b) {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1)
    });
    this._logSetState({
      data: data,
      sortby: column,
      descending: descending
    });
  } 
	
	/*
		Searching
	*/

	_search(e) {
		let needle = e.target.value.toLowerCase();
		if(!needle) {
			this._logSetState({data: this._preSearchData});
			return;
		}
		let idx = e.target.dataset.idx;
		let searchData = this._preSearchData.filter(function(row) {
			return row[idx].toString().toLowerCase().indexOf(needle) > -1;
		});
		this._logSetState({data: searchData});
	}

	_toggleSearch() {
		if(this.state.search) {
			this._logSetState({
				data: this._preSearchData,
				search: false,
			});
			this._preSearchData = null;
		} else {
			this._preSearchData = this.state.data;
			this._logSetState({
				search: true,
			});
		}
	}
	
	/*
		Logging
	*/
	
	_logSetState(newState) {
		this._log.push(JSON.parse(JSON.stringify(
			this._log.length === 0 ? this.state : newState
		)));
		this.setState(newState);
	}
	
	_replay() {
		if(this._log.length === 0) {
			console.warn('Noch kein Status zur Wiedergabe');
			return;
		}
		let idx = -1;
		let interval = setInterval(function() {
			idx++;
			if(idx === this._log.length - 1) {
				clearInterval(interval);
			}
			this.setState(this._log[idx]);
		}.bind(this), 1000);
	}
	
	/*
		Exporting
	*/
	
	_download(format, ev) {
		let contents = format === 'json'
			? JSON.stringify(this.state.data)
			: this.state.data.reduce(function(result, row) {
				return result
					+ row.reduce(function(rowresult, cell, idx) {
						return rowresult
							+ '"'
							+ cell.replace(/"/g, '""')
							+ '"'
						+ (idx < row.length -1 ? ';' : '');
					}, '')
				+ "\n";
			}, '');
			let URL = window.URL || window.webkitURL;
			let blob = new Blob([contents], {type: 'text/' + format});
			ev.target.href = URL.createObjectURL(blob);
			ev.target.download = 'data.' + format;
	}
	
	/*
		Rendering
	*/
	
  _renderInfoText() {
    return <div>
      Component: <span>{this._reactInternalFiber.elementType.name}</span><br />
      Properties:
      <ul>
        <li>headers - Header Names as List</li>
        <li>data - Data collection as List</li>
      </ul>
      Features:
      <ul>
        <li>Renders a Bootstrap Table from given Lists (data and headers) and render them as Editable Fields.</li>
        <li>Just double-click into one Field to edit it&rsquo;s Value.</li>
        <li>Single-click onto on of the Table Header Fields enable sorting the Column ASC/DESC/NUMERIC.</li>
        <li>Click into the Search Button will enable the filter Fields, it will filtering the depending Column.</li>
        <li>After editing, sorting and filtering you can exporting the Table as JSON or CVS Data File.</li>
      </ul>
    </div>
  }
  
	_renderToolbar() {
		return <div className="toolbar">
      <ButtonGroup className="mr-2" aria-label="Search">
			  <Button onClick={this._toggleSearch} title='Filter aktivieren/deaktivieren'>Suchen</Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="Export">
			  <Button onClick={this._download.bind(this, 'json')} title='Export JSON File'><a href='data.json'>JSON</a></Button>
			  <Button onClick={this._download.bind(this, 'csv')} title='Export CSV File'><a href='data.csv'>CSV</a></Button> 
      </ButtonGroup>
		</div>
	}
	
	_renderSearch() {
		if(!this.state.search) {
			return null;
		}
		return (
			<tr onChange={this._search}>
				{this.props.headers.map(function(_ignore, idx) {
					return <td key={idx}>
						<Form.Control type="text" data-idx={idx} />
					</td>
				})}
			</tr>
		)
	}
	
  _renderTable() {
		let state = this.state;
    return (
			<Table responsive striped hover>
			  <thead onClick={this._sort}>
			    <tr>
						{this.props.headers.map(function(title, idx) {
			        return (
								<th key={idx}>{title} {
									state.sortby === idx
										/* https://dev.w3.org/html5/html-author/charref */
										? state.descending
											? '\u2191'
											: '\u2193'
										: null
								}</th>
							)
			      }, this)}
			    </tr>
			  </thead>
				<tbody onDoubleClick={this._showEditor}>
					{this._renderSearch()}	
					{state.data.map(function(row, rowidx) {
			      return (
							<tr key={rowidx}>
			          {row.map(function(cell, idx) {
			            let content = cell;
			            let edit = state.edit;
			            if(edit && edit.row === rowidx && edit.cell === idx) {
			              content = <Form onSubmit={this._save}>
											<Form.Control type="text" defaultValue={content} />
			              </Form>
			            }
			            return <td key={idx} data-row={rowidx}>{content}</td>
			          }, this)}
			        </tr>
			      )
			    }, this)}
			  </tbody>
			</Table>
    );
  }
	
	render() {
		return (
			<div>
        {this._renderInfoText()}
				{this._renderToolbar()}
				{this._renderTable()}
			</div>
		)
	}
	
}
