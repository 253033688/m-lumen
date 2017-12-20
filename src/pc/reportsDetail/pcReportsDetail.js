import  './reportsDetail.css';
import tpl from './reportsDetail.ejs';
import b1logo from '../../common/pc/images/b1/logo.png';
import $ from 'jquery';

function getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

document.body.innerHTML = tpl({
    b1logo: b1logo,
    md5: getQueryString('md5')
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

$.when($.ajax({
    url: '/mobileReportsDetail/' + getQueryString('md5')
}))
    .then(function (data) {
        var content = '';

        data = JSON.parse(data);

        $('#time').text(data.Date);
        $('#level').html(repeat(data.Level));

        $.each(data.Data, function (r, rValue) {
            for (var i in rValue) {
                var item = rValue[i];

                content += '<div class="content-section" id="' + i + '"><h3>' + i + '</h3>';

                if ($.isPlainObject(item[0])) {
                    $.each(item, function (_i, _item) {
                        if (i === 'Permissions') {
                            for (var name in _item) {
                                content += '<p style="color:' + (_item[name]['Risk'] == 1 ? 'red' : (_item[name]['Risk'] == 2 ? '#f99755' : '')) + '">' + name + '</p>';
                            }
                        } else {
                            for (var name in _item) {
                                if (name === 'IcoData' && _item[name]) {
                                    var img = (_item[name] !== '' && _item[name] !== 'N/A') ? '<img src="' + 'data:image/png;base64,' + _item[name] + '" alt="无图片" style="width:24px;height:24px;"/>' : '';
                                    content += '<p><span class="reports-key">' + name + "</span> : " + img + '</p>';
                                } else {
                                    if (name === 'FileSize') {
                                        item[name] = item[name] + ' bytes';
                                    }

                                    content += '<p><span class="reports-key">' + name + "</span> : " + _item[name] + '</p>';
                                }
                            }
                        }
                    });
                }
                else if ($.isArray(item) && typeof item[0] === 'string') {
                    content += '<p>' + item.join('</p><p>') + '</p>';
                }
                else if ($.isPlainObject(item)) {
                    for (var name in item) {
                        content += '<p><span class="reports-key">' + name + "</span> : " + item[name] + '</p>';
                    }
                }
                else {
                    content += '<p>' + item + '</p>';
                }

                content += '</div>';
            }
        });

        $('div.timeline-content').append(content);

        function setLineHeight() {
            var _h = $('.timeline ul').height() - $('.timeline ul li.node').first().height() / 2 - $('.timeline ul li.node').last().height() / 2;

            $('.timeline .line').height(_h);
        }

        function fixTimeline() {
            var offset = $('.main .container').offset().top;
            var scrollTop = $(window).scrollTop() + 60;

            if (offset < scrollTop) {
                $('.timeline').addClass('fixed');
            } else {
                $('.timeline').removeClass('fixed');
            }
        }

        function setDimensionBar() {
            var _i = 0, _h = 0;

            $('.timeline-content .content-section').each(function (index, domEle) {
                if ($(domEle).offset().top <= $(window).scrollTop()) {
                    _i = index;
                }
            });

            $('.timeline ul li.node').each(function (index, domEle) {
                if (index <= _i) {
                    _h += $(domEle).height();
                }
            });

            $(".bar").css({
                "top": _h - $('.timeline ul li.node').eq(_i).height() / 2
            });

            // $('.timeline ul li.node').eq(_i).css({"color": "#323C5C"}).siblings().css({"color": "#333333"});
            $('.timeline ul li.node').eq(_i).addClass('active').siblings().removeClass('active');
        }

        function addBehaviours() {
            var sections = $(".content-section");

            $.each($(".node"), function (i, element) {
                $(element).on("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    var scroll = $(sections[i]).offset().top;

                    $('html, body').animate({
                        scrollTop: scroll
                    }, 300);
                });
            });
        }

        function arrangeNodes() {
            $(".node").remove();

            $.each($(".content-section"), function (i, element) {
                var name = $(element).attr('id');
                var node = $("<li class='node'><span>" + name + "</span></li>");

                $(".timeline ul").append(node);
            });

            addBehaviours();
        }

        $(window).on("scroll resize", function (e) {
            e.stopPropagation();
            e.preventDefault();

            fixTimeline();
            setDimensionBar();
        });

        arrangeNodes();
        setLineHeight();
        setDimensionBar();
    });