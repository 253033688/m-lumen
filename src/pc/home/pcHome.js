import $ from "jquery";
import CountUp from "CountUp.js";

// 构建页面
import  './home.css';
import tpl from './home.ejs';

import b1bg from '../../common/pc/images/b1/bg.png';
import b1logo from '../../common/pc/images/b1/logo.png';
import b1word from '../../common/pc/images/b1/word.png';
import b2bg from '../../common/pc/images/b2/bg.png';
import b2word from '../../common/pc/images/b2/word.png';
import b3bg from '../../common/pc/images/b3/bg.png';
import b3icon from '../../common/pc/images/b3/icon.png';
import b3word from '../../common/pc/images/b3/word.png';
import Security from '../../common/m/images/Security.png';
import Lite from '../../common/m/images/Hi Security Lite.png';
import cleaner from '../../common/m/images/super cleaner.png';
import vpn from '../../common/m/images/vpn.png';
document.body.innerHTML = tpl({
    b1bg: b1bg,
    b1logo: b1logo,
    b1word: b1word,
    b2bg: b2bg,
    b2word: b2word,
    b3bg: b3bg,
    b3icon: b3icon,
    b3word: b3word,
    Security: Security,
    Lite: Lite,
    cleaner: cleaner,
    vpn: vpn,
});

// 引入轮播
import "./zoomout-album.css";
import "./zoomout-album-desk";

new $.Carousel({
    root: '#section1',
    auto: true
});

let options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.'
};

$.ajax({
    url: '/eventSummary',
    dataType: 'json'
})
    .done(function (data) {
        // data = JSON.parse(data);

        if (data.Success) {
            let nowDate = new Date(new Date() - 24 * 60 * 60 * 1000);
            let today = Date.parse(nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + (nowDate.getDate()));
            let InterNum = data.EventIncrease / (24 * 60 * 60 * 1000);
            let startNum = data.EventTotal + InterNum * ((new Date()).getTime() - today);
            let time = 1000;

            let demo = new CountUp("countUp", startNum, startNum, 0, 2.5, options);
            let timer = setTimeout(autoNum, time);

            function autoNum() {
                time = Math.floor(Math.random() * 10000 / 2);

                demo.update(data.EventTotal + InterNum * ((new Date()).getTime() - today));

                timer = null;
                timer = setTimeout(autoNum, time);
            }

            $('.num-columns-left .num-columns-num').text((data.UserTotal || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
            $('.num-columns-right .num-columns-num').text((data.VirusTotal || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
        }
    });

