import $ from 'jquery'
import html from './pr.jade'
import './pr.styl'

let $c = $('#container');
$c.append('<div id="pr" class="panel"></div>');
let $sz = $c.find('#pr');
$sz.html(html);
