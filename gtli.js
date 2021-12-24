// ==UserScript==
// @name         哥特动漫王国自动签到
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  哥特动漫王国自动签到，每日任务奖励自动领取
// @author       JiuYan
// @match        *.gtloli.gay/*
// @icon         https://www.google.com/s2/favicons?domain=gtloli.gay
// @grant        none
// ==/UserScript==

(function(){
    const nowDate = new Date();
    console.log(nowDate.toTimeString().substring(0,8));
    // const autoSigninFlag = JSON.parse(localStorage.getItem('autoSignin')) || {};
    // const sessionDay = autoSigninFlag.sessionDay;
    // const sessionMonth = autoSigninFlag.sessionMonth;
    if (nowDate.getDay() !== sessionDay || nowDate.getMonth() !== sessionMonth) {
        if(location.href === 'https://www.gtloli.gay/home.php?mod=task'){
            console.log('任务页面!');
        }else if(location.href === 'https://www.gtloli.gay/forum.php'){
            console.log('首页签到!');
            autoSignin();
        }
    }
})();

function autoSignin(){
    if(document.getElementById('JD_sign').onclick){
        document.getElementById('JD_sign').click();
        // location.href = 'https://www.gtloli.gay/home.php?mod=task';
    }else{
        console.log('已签到!');
    }
}
