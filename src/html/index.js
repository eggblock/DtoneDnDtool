import $ from 'jquery'
import './sz/sz.js'
import './prototype/pr.js'
import './style.styl'
import html from './index.jade'
import './stylus/poabar.styl'

let $c = $('#container');
$c.prepend(html);

$('#login-pbar').click(function(){
    let self = this;
    if($(self).attr('status')=='0'){
      let name = prompt("请输入您的认证（例如）账号|密码: 12@450.moe|123456","");
      let _acc = name.split('|');

      //console.warn(name);
      wilddog.auth().signInWithEmailAndPassword(_acc[0], _acc[1]).then(function(d) {
        dtoneObj.login ={
          status: true,
          info: d
        }
        $(self).attr('status','1').find('p').text('已登陆');
      });
    }
    //12@450.moe|912450
})
