'use strict';

require('./index.html');
require('./src/Stylesheets');
var Elm = require('./src/HomepageView');
Elm.embed(Elm.Main, document.getElementById('main'));
