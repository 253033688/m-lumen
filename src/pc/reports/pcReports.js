import  './reports.css';
import './table.css';
import tpl from './reports.ejs';
import b1logo from '../../common/pc/images/b1/logo.png';
import $ from "jquery";
import '../../common/js/page';
import '../../common/font-awesome/css/font-awesome.min.css';

document.body.innerHTML = tpl({
    b1logo: b1logo
});

function repeat(level) {
    var str = '';

    level = level == 1 ? 5 :
        level == 2 ? 3 : 1;

    for (var i = 0; i < level; i++) {
        str += '<i class="fa fa-star" style="color:red;"></i>';
    }

    return str;
}

function PageCallback(jq, options, callback) {
    $.ajax({
        dataType: "json",
        url: '/reportsPage/1/' + options.current_page
    })
        .done(function (data) {
            if (data.Success) {
                $(".main table").empty()
                    .html(buildTable(data.Data));

                callback(data.Total);
            }
        })
        .fail(function (e) {
            console.log(e);
        });
}

function buildTable(data) {
    let html = '';
    let len = data.length;

    for (let i = 0; i < len; i++) {
        html += '<tr>' +
            '<td>' + data[i]['MD5'] + '</td>' +
            '<td>' + data[i]['Date'] + '</td>' +
            '<td>' + (typeof parseInt(data[i]['Risk']) === 'number' && repeat(data[i]['Risk'])) + '</td>' +
            '<td><a class="btn" href="/reportsDetail/1?md5=' + data[i]['MD5'] + '">Check</a></td>' +
            '</tr>';
    }

    return html;
}

$(".bottom").pagination({
    callback: PageCallback
});

let search = $('<input type="search"/>');
let doSearch = $('<button type="button" class="btn">MD5 search</button> ');

$('.top').append(search).append(doSearch);

doSearch.off('click')
    .bind('click', function (e) {
        if (/^[0-9a-zA-Z]{32}$/.test(search.val())) {
            $.when($.ajax({
                dataType: "json",
                url: '/mobileReportsDetail/' + search.val().toUpperCase()
            }))
                .then(function (data) {
                    if (data.Success) {
                        window.location.href = "/reportsDetail/1?md5=" + search.val().toUpperCase();

                        return true;
                    }

                    alert('There is no this record in the database.');
                    return false;
                });
        } else {
            alert('please input correct md5!');
            return false;
        }
    });
