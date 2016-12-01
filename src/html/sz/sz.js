import $ from 'jquery'
import html from './sz.jade'
import './sz.styl'
import _ from 'lodash'
//import wilddog from 'wilddog'
let olnum = 0;
ref.child('base').on("value",function(d){
  let _d = d.val();
  if(_d.online === '66'){
      $("#online-status").removeClass().addClass('dex-bg').find('p').text('在线');
      //olnum = parseInt(_d.olnum)+1;
      //ref.child('base/olnum').set(olnum)
      $("#online-num p").text(olnum);
  }
});
ref.child('pool').on("value",function(d){
  let _d = d.val();
  if($rlist.find('li').length>10){
     $rlist.find('li').eq(0).remove();
  }
  if(dtoneObj.init != 0){
    if(!dtoneObj.login.status)$rlist.append(_d._tmp);
  }else{
    dtoneObj.init = 1;
  }
});

let $c = $('#container');
$c.append('<div id="sz" class="panel"></div>');
let $sz = $c.find('#sz');
$sz.html(html);
let $rlist = $('#sz-result-list');
$('#sz-list').on('click','.sz-btn',function(){
  let _type = $(this).attr('type');
  let _data = $(this).attr('data');
  let [_cishu,_html,_sum,arr]= [1,'','',[]];
  let _exhtml = {
      content: '',
      oper: $(this).parent().find('#sz-math').text(),
      adj: $(this).parent().find('.adj-ipt').val(),
      _adj: '',
      write: false
  };
  switch (_type) {
    case '2':
      let val = $(this).parent().find('input').val()
      if(val == ''){
        _data = 2;
      }else {
        _data = val;
      }
      break;
    case '3':
      let dval = $(this).parent().find('input.d-ipt').val();
      let sval = $(this).parent().find('input.v-ipt').val();
      dval != '' ?  _cishu = dval : '';
      if(sval == ''){
        _data = 2;
      }else {
        _data = sval;
      }
    default:
  };

  if(_cishu==1){
    let _result = _.random(1,parseInt(_data));
    dtoneObj.count++;
    let color = 'clv-'+_.round(4*_result/_data);
    if($rlist.find('li').length>10){
       $rlist.find('li').eq(0).remove();
    }
    //console.warn($rlist.find('li'));
    _html = `
        ${dtoneObj.count}  结果是：<span class="${color}">${_result}</span>     (${_cishu}d${_data})
    `
  }else{
    let _result;
    for(let i = 0;i<_cishu;i++){
      _result = _.random(1,parseInt(_data));
      arr.push(_result);
    }
    _sum = _.sum(arr);
    dtoneObj.count++;
    let color = 'clv-'+_.round(4*_sum/(_cishu*_data));
    if($rlist.find('li').length>10){
       $rlist.find('li').eq(0).remove();
    }
    //console.warn($rlist.find('li'));
    let _arr = arr.sort(function(a,b){return a>b?1:-1});
    _html = `
          ${dtoneObj.count}  结果是：<span>${_arr.join('+')}=</span><span class="${color}">${_sum}</span>(${_cishu}d${_data})
      `
  }
  _exhtml.write = false;
  switch (_exhtml.adj) {
    case 'max':
      _exhtml._adj = arr.sort(function(a,b){return a<b?1:-1})[0]
      _exhtml.write = true;
      debugger
    break;
    case 'min':
      _exhtml._adj = arr.sort(function(a,b){return a>b?1:-1})[0]
      _exhtml.write = true;
    break;
    default:
    if(_exhtml.adj != undefined){
      _exhtml.adj = _exhtml.adj.replace(/[^\d]/g,"");
    };
    if(_exhtml.adj != ''){
      _exhtml._adj = _exhtml.adj;
      _exhtml.write = true;
    };
  }
  if(_exhtml.oper=='+'){
    _exhtml.result = _sum + parseInt(_exhtml._adj);
  }else{
    _exhtml.result = _sum - _exhtml._adj;
  }
  if(_exhtml.result<0)_exhtml.result=0;
  if(_exhtml.write&&_cishu>1){
    _exhtml.content = `
    ${_exhtml.oper} ${_exhtml._adj} = ${_exhtml.result}
    `;
  }
  $rlist.append(`<li>loc.`+_html +`${_exhtml.content}</li>`);
  if(dtoneObj.login.status){
    ref.child('pool').update({
      _tmp:`<li>net.`+_html +`${_exhtml.content}</li>`
    });
  }
});

$('.sz-diy-ipt').on('input',function(){
  let val = $(this).val();
  val = val.replace(/[^\d]/g,"");
  if($(this).attr('rule')!=1)$(this).val(val);
})

$('#sz-clear').click(function(){
    //- ${_arr[0]} = ${_sum - _arr[0]}
    $('#sz-result-list li').css('opacity','0');
    setTimeout(function(){
      $('#sz-result-list').html('<li>列表已经清空</li>');
    },500);
});

$('#sz-math').click(function(){
  $(this).text()=='-'?$(this).text('+'):$(this).text('-');
});
