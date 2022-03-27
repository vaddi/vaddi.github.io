import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

//import { Secret } from '../.env';
import { Template } from './template/Template';

import './styles.css';
import Secret from './Secret';

// Content list objects for navigation and content rendering
const content = [ 
  { id: 1, title: 'home', url: '/', content: "Home page" },
  { id: 2, title: 'stuff', url: 'stuff.html', content: "Stuff page" },
  { id: 3, title: 'about', url: 'about.html', content: "About us page" },
];

const excel = { 
  headers: [ "Buch", "Autor", "Sprache", "Veröffentlicht", "Verkäufe" ], 
  data: [
    ["Der Herr der Ringe", "J. R. R. Tolkien", "Englisch", "1954-1955", "150 Millionen"],
    ["Der kleine Prinz", "Antoine de Saint-Exupéry", "Französisch", "1943", "140 Millionen"],
    ["Harry Potter und der Stein der Weisen", "J. K. Rowling", "Englisch", "1997", "107 Millionen"],
    ["Und dann gabs keines mehr", "Agatha Christie", "Englisch", "1939", "100 Millionen"],
    ["Der Traum der roten Kammer", "Cáo Xueqín", "Chinesisch", "1754-1791", "100 Millionen"],
    ["Der Hobbit", "J. R. R. Tolkien", "Englisch", "1937", "100 Millionen"],
    ["Sie", "H. Rider Haggard", "Englisch", "1887", "100 Millionen"],
  ] 
};

// import components example
import { Feeds } from './components/Feeds';
import { Excel } from './components/Excel';
import { Defcon } from './components/Defcon';
import { UserList } from './components/UserList';
import { GithubUser } from './components/GithubUser';

const appName = "vaddi.github.io";

class App extends React.Component {
  render() {
    return (
        <Template appName={appName} content={content}>

          <h4>A GithubUser Component</h4>
          <GithubUser target="vaddi" />

          <h4>A Defcon Component</h4>
          <Defcon mock={Secret.APISECRET} apiurl={Secret.APIURL} target={Secret.DEFCONTARGET} format="json" />

          <h4>Rest-API call Component</h4>
          <UserList mock={Secret.MOCKUPKEY} endpoint='users' />

          <h4>An RSS Feed Component</h4>
          <Feeds mock={Secret.APISECRET} apiurl={Secret.APIURL} target={Secret.FEEDTARGET} format="json" />

          <h4>Excel HTML Table Component</h4>
          <Excel headers={excel.headers} data={excel.data} />

        </Template>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
