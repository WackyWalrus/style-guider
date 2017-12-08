

/* eslint no-console:0 */
//
// a relevant structure within app/javascript and only use these pack files to reference
// layout file, like app/views/layouts/application.html.erb
// present in this directory. You're encouraged to place your actual application logic in
// Support component names relative to this directory:
// that code so it'll be compiled.
// This file is automatically compiled by Webpack, along with any other files
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate

import '../scss/main.scss'
import Bootstrap from 'bootstrap/dist/js/bootstrap'

var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)