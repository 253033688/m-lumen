import  './successCase.css';
import tpl from './successCase.ejs';
import b1logo from '../../common/pc/images/b1/logo.png';
import Security from '../../common/m/images/Security.png';
import Lite from '../../common/m/images/Hi Security Lite.png';
import cleaner from '../../common/m/images/super cleaner.png';
import vpn from '../../common/m/images/vpn.png';

import $ from "jquery";

document.body.innerHTML = tpl({
    b1logo: b1logo
});

function getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function funcContent(sec, args) {
    let _img = $('<img src="' + args.src + '" alt="" />');

    _img.load(function (evt) {
        sec.append('<div class="container">' +
            '<div class="logo">' +
            '<p><img src="' + args.src + '" alt="" /></p>' +
            '<p class="logo-name">' + args.name + '</p>' +
            '</div>' +
            '<div class="introduction">' +
            '<div class="intro">' + args.intro + '</div>' +
            (args.google ?
                    ('<p><a href="' + args.google + '" class="btn btn-default">Get it on Google Play</a></p>' +
                    '<p><a href="' + args.domestic + '" class="btn btn-reverse" id="domestic-a">Download APK</a></p>') :
                    ('<p><a href="' + args.domestic + '" class="btn btn-default" id="domestic-a">Download APK</a></p>')
            ) +
            '</div>' +
            '</div>');
    });

    $.ajax('/version')
        .done(function (data) {
            var version = data[args.version] || '';
            version = version && ' (Version: ' + version + ')';

            $('#domestic-a').text('Download APK' + version);
        });
}

let id = getQueryString('id');
let content = $('div.main').find('div.container');

switch (id) {
    case 'Security':
        funcContent(content, {
            src: Security,
            name: 'Hi Security',
            google: 'https://play.google.com/store/apps/details?id=com.ehawk.antivirus.applock.wifi',
            domestic: 'https://s3.amazonaws.com/tcl-hisecuritylab/applist/com.ehawk.antivirus.applock.wifi.apk',
            version: 'com.ehawk.antivirus.applock.wifi.apk',
            intro: '<p>Hi Security is a world class antivirus and security application for Android devices used and enjoyed by 20 million android users globally and currently featured in the Top 20 US \'tools apps\' charts! Notonly doesitprevent all Android threats, butit also protects your sensitive apps and ensuresyour online safety. Our brand-new Phone Booster function has been recently introduced, enhancing your phone experience! Hi Security: making your phone faster and safer.</p>'
        });

        break;

    case 'Lite':
        funcContent(content, {
            src: Lite,
            name: 'Hi Security Lite',
            google: 'https://play.google.com/store/apps/details?id=com.hawk.security',
            domestic: 'https://s3.amazonaws.com/tcl-hisecuritylab/applist/com.hawk.security.apk',
            version: 'com.hawk.security.apk',
            intro: '<p>Hi Security Lite is a tiny but super powerful antivirus application. It also features the highly popular App Lock and WiFi Security.</p>'
        });

        break;

    case 'cleaner':
        funcContent(content, {
            src: cleaner,
            name: 'Super Cleaner - Antivirus',
            google: 'https://play.google.com/store/apps/details?id=com.apps.go.clean.boost.master',
            domestic: 'https://s3.amazonaws.com/tcl-hisecuritylab/applist/com.apps.go.clean.boost.master.apk',
            version: 'com.apps.go.clean.boost.master.apk',
            intro: '<p>Super Cleaner is one of the most popular mobile cleaning apps on Google Play. It is currently the number 1 choice in the US market. Due to our expert technical support team, the app is able to offer antivirus service for users across the world. Thanks to Super Cleaner, millions of devices worldwide run faster and safer everyday.</p>'
        });

        break;

    case 'vpn':
        funcContent(content, {
            src: vpn,
            name: 'Hi VPN',
            google: 'https://play.google.com/store/apps/details?id=com.ehawk.proxy.freevpn',
            domestic: 'https://s3.amazonaws.com/tcl-hisecuritylab/applist/com.ehawk.proxy.freevpn.apk',
            version: 'com.ehawk.proxy.freevpn.apk',
            intro: '<p>Hi VPN ensures your online safety by providing you with a secure and encrypted connection to browse the internet. A range of high speed servers are available worldwide, such as the United States, Germany, Netherlands, United Kingdom and Canada, all free of charge!</p>'
        });

        break;
}