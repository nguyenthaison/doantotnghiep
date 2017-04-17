# Graduation project - Website Music

## Environment
* Requires Ruby version >= 2.3 and Rails version >= 4.0

## DevDependencies
* [Reactjs](https://facebook.github.io/react/ "Reactjs")
* [Babel](http://babeljs.io/ "Babel")
* [Webpack](https://webpack.github.io/docs/ "Webpack")
* [ES6](http://exploringjs.com/es6/ "ES6")

## Function
* login, logout
* play one music
* play album
* repeat one music, repeat album, shuffe
* upload, download music
* show ranking music, album

## How to run the test suite

* After install ruby on rails, clone or download project in https://github.com/nguyenthaison/doantotnghiep.
* create file database.yml same database.yml.example in path: app/config/database.yml.example.

<pre>
  <code>
    $ cd doantotnghiep
    $ rails db:remake_data
    $ bundle install
    $ npm install
    $ npm start
    //open two terminal
    $ rails s //one terminal
    $ webpack --w //one terminal
  </code>
</pre>

* open website and typing: localhost:3000 and login with account

<pre>
   <code>
    username: admin
    password: 123456
   </code>
</pre>

## How to contribute

* Feel free to fork and send PRs or issues, be it for features, bug fixes, or documentation!
