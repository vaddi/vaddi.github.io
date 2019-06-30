# vaddi's github page #

This is the Repository of my github profile page. It's a small react Application which is running on [https://vaddi.github.io/]().


## What is this repository for? ##

It is just a playground for me to push my react stuff. The Repository has 2 branches, `master` contains the deployed app version and the `source` branch contains the source code stuff of the page. It contains some scripts to get a nice working and deploing flow (see **gh-pages** under the Links Section):

* start (`react-scripts start`) 
* build (`react-scripts build`)
* test (`react-scripts test --env=jsdom`)
* eject (`react-scripts eject`)
* predeplay (`yarn run build`)
* deploy (`gh-pages -b master -d build`)

They are quite a few dependencies:

* bootstrap (Bootsrap CSS Framework)
* gh-pages (Deploing into github Pages)
* lodash (A nice lodash lib)
* react (The React Library)
* react-dom (The React Dom)

Just take a look into `package.json`, it contains all of this.


## How do I get to set it up? ##

> You'll need to install yarn the package manager. See installation docs for more Deatails: [https://yarnpkg.com/lang/en/docs/install/]()

Clone the Repository:

    git clone https://github.com/vaddi/vaddi.github.io

Get into the Repositiory Folder:

    cd vaddi.github.io



## Configuration ##

Configure your application by edition my `package.json` to you needs, or use `yarn init` to setup the complete new Application (It will ask for Name, Version, Dependencies, etc.).


## Run the Application ##

Run yarn to load dependencies:

    yarn

Run Application:

    yarn start



## Links ##

### Learn React ###
* [codecademy.com](https://www.codecademy.com/) 
* [facebook.github.io](https://facebook.github.io/react/) 

### Yarn ###
* [yarnpkg.com](https://yarnpkg.com/lang/en/docs/install/)
* [code.facebook.com](https://code.facebook.com/posts/1840075619545360)

### Babel ###
* [babeljs.io](https://babeljs.io/)
* [babeljs.io/learn-es2015](https://babeljs.io/learn-es2015/)

### gh-pages ###
* [https://dev.to/javascripterika/](https://dev.to/javascripterika/deploy-a-react-app-as-a-github-user-page-with-yarn-3fka)