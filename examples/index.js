'use strict';

require('./index.html');
require('./src/Stylesheets');
var Elm = require('./src/HomepageView');
Elm.HomepageView.embed(document.getElementById('main'));
