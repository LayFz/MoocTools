// ==UserScript==
// @name         英华学堂刷课脚本
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  学堂在线自动播放下一集（仅在成都文理学院测试成功，其他学校没试）
// @author       LayFz
// @match        *://mooc.*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var playNext = function(){
        // 定位当前数据
        var localElement = $('.detmain-navlist ').parent().find('.item a').index($('a.on'));
        // 所有课程数据
        var sameChaperNameArray = $('.detmain-navlist ').parent().find('.item a');
        if(localElement == (sameChaperNameArray.length-1)){
            $('video')[0].onended = function(){
                 alert("Easy Easy，区区网课也敢班门弄斧！")
            }
        }else{
            setTimeout(function(){
                async : $(sameChaperNameArray[localElement+1])[0].click();
            },5000);
        }
    }
    $(document).ready(function(){
        var timer = setInterval(function(){
            if($('video').length && $('video')[0].readyState == 4){
                if($('video')[0].readyState == 4){
                    if($('video')[0].paused){
                        console.log("paused");
                        $('video')[0].play();
                    }
                    $('video')[0].onended = function(){
                        playNext();
                    }
                     $('video')[0].muted = true;
                    $('video')[0].playbackRate = 1.0;
                    $('video')[0].currentTime = 0;
                   // $('video')[0].volume = 0;
                    clearInterval(timer);
                }
            }
        },1000);
    });
})();