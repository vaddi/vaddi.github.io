import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { Template } from './template/Template';

import './styles.css';

//const numbers = [1, 2, 3, 4, 5];

// List navigation
// const navigation = [
//   [ 'home', '/' ],
//   [ 'about', 'about.html' ],
// ];

// object navigation
const content = [ 
  { id: 1, title: 'home', url: '/', content: "Home page" },
  { id: 2, title: 'stuff', url: 'stuff.html', content: "Stuff page" },
  { id: 3, title: 'about', url: 'about.html', content: "About us page" },
];

const headers = [
  "Buch", "Autor", "Sprache", "veröffentlicht", "Verkäufe"
];

const data = [
  ["Der Herr der Ringe", "J. R. R. Tolkien", "Englisch", "1954-1955", "150 Millionen"],
  ["Der kleine Prinz", "Antoine de Saint-Exupéry", "Französisch", "1943", "140 Millionen"],
  ["Harry Potter und der Stein der Weisen", "J. K. Rowling", "Englisch", "1997", "107 Millionen"],
  ["Und dann gabs keines mehr", "Agatha Christie", "Englisch", "1939", "100 Millionen"],
  ["Der Traum der roten Kammer", "Cáo Xueqín", "Chinesisch", "1754-1791", "100 Millionen"],
  ["Der Hobbit", "J. R. R. Tolkien", "Englisch", "1937", "100 Millionen"],
  ["Sie", "H. Rider Haggard", "Englisch", "1887", "100 Millionen"],
];

// import components example
// import { Button } from './components/Button';
import { Excel } from './components/Excel';

const appName = "vaddi.github.io";

class App extends React.Component {
  render() {
    return (
        <Template appName={appName} content={content}>
          <h4>An Excel example</h4>
          <Excel headers={headers} initialData={data} />
        </Template>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

