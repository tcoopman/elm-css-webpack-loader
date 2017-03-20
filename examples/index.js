'use strict';

require('./index.html');
require('./src/Stylesheets.elm');
var Elm = require('./src/HomepageView.elm');
Elm.HomepageView.embed(document.getElementById('main'));
