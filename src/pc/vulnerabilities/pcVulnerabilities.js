import  './vulnerabilities.css';
import tpl from './vulnerabilities.ejs';
import b1logo from '../../common/pc/images/b1/logo.png';
import $ from 'jquery';
import '../../common/js/page';

document.body.innerHTML = tpl({
    b1logo: b1logo
});

function buildLi(data) {
    let html = '<li class="article clear">';
    let CVE = data.shift().CVE,
        DateReported = data.shift().DateReported,
        Severity = data.shift().Severity;

    html += '<div class="left"><span class="day">' + DateReported.slice(-2) + '</span>' + DateReported.slice(0, 7) + '</div>' +
        ' <div class="right"><i class="dot"></i><h3>' + CVE + '</h3>' +
        '<div class="data"><span><i class="fa fa-clock-o"></i> Time：' + DateReported + '</span><span><i class="fa fa-bars"></i> Risk Level: ' + Severity + '</span></div>' +
        '<ul class="article-desc">';

    $.each(data, function (r, rValue) {
        for (let i in rValue) {
            let item = rValue[i];

            if (i === 'UpdatedGoogleDevices') {
                html += '<li>Updated Google Devices</li>';
            } else if (i === 'ExploitsName') {
                html += '<li>Exploits Name</li>';
            } else if (i === 'ExploitsDescription') {
                html += '<li>Exploits Description</li>';
            } else {
                html += '<li>' + i + '</li>';
            }

            if ($.isArray(item)) {
                $.each(item, function (_i, _item) {
                    for (let name in _item) {
                        if ($.isEmptyObject(_item[name])) {
                            html += '<p>' + name + '</p>';
                        }
                        else {
                            let _tmp = _item[name].shift();

                            html += '<p><a href="' + _tmp + '">' + name + '</a>';

                            $.each(_item[name], function (a, aItem) {
                                html += '<a href="' + aItem + '">[' + (a + 2) + ']</a>';
                            });

                            html += '</p>';
                        }
                    }
                });
            }
            else if ($.isPlainObject(item)) {
                for (let name in item) {
                    html += '<p>' + name + " : " + item[name] + '</p>';
                }
            }
            else {
                html += '<p>' + item + '</p>';
            }
        }
    });

    html += '</ul></div></li>';

    return html;
}

function PageCallback(jq, options, callback) {
    $.ajax({
        dataType: "json",
        url: '/reportsPage/2/' + options.current_page
    })
        .done(function (data) {
            if (data.Success) {
                $("#content").empty();

                let html = '';
                $.each(data.Data, function (index, news) {
                    html += buildLi(news);
                });

                $("#content").html(html);

                callback(data.Total);
            }
        })
        .fail(function (e) {
            console.log(e);
        });
}

$(".page").pagination({
    callback: PageCallback
});
