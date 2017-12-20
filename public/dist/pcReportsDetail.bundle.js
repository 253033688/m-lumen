webpackJsonp([5],{

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reportsDetail_css__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reportsDetail_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__reportsDetail_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reportsDetail_ejs__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reportsDetail_ejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__reportsDetail_ejs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);





function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

document.body.innerHTML = __WEBPACK_IMPORTED_MODULE_1__reportsDetail_ejs___default()({
    b1logo: __WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png___default.a,
    md5: getQueryString('md5')
});

function repeat(level) {
    var str = '';

    level = level == 1 ? 5 : level == 2 ? 3 : 1;

    for (var i = 0; i < level; i++) {
        str += '<i class="fa fa-star" style="color:red;"></i>';
    }

    return str;
}

__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.when(__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.ajax({
    url: '/mobileReportsDetail/' + getQueryString('md5')
})).then(function (data) {
    var content = '';

    data = JSON.parse(data);

    __WEBPACK_IMPORTED_MODULE_3_jquery___default()('#time').text(data.Date);
    __WEBPACK_IMPORTED_MODULE_3_jquery___default()('#level').html(repeat(data.Level));

    __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(data.Data, function (r, rValue) {
        for (var i in rValue) {
            var item = rValue[i];

            content += '<div class="content-section" id="' + i + '"><h3>' + i + '</h3>';

            if (__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.isPlainObject(item[0])) {
                __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(item, function (_i, _item) {
                    if (i === 'Permissions') {
                        for (var name in _item) {
                            content += '<p style="color:' + (_item[name]['Risk'] == 1 ? 'red' : _item[name]['Risk'] == 2 ? '#f99755' : '') + '">' + name + '</p>';
                        }
                    } else {
                        for (var name in _item) {
                            if (name === 'IcoData' && _item[name]) {
                                var img = _item[name] !== '' && _item[name] !== 'N/A' ? '<img src="' + 'data:image/png;base64,' + _item[name] + '" alt="无图片" style="width:24px;height:24px;"/>' : '';
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
            } else if (__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.isArray(item) && typeof item[0] === 'string') {
                content += '<p>' + item.join('</p><p>') + '</p>';
            } else if (__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.isPlainObject(item)) {
                for (var name in item) {
                    content += '<p><span class="reports-key">' + name + "</span> : " + item[name] + '</p>';
                }
            } else {
                content += '<p>' + item + '</p>';
            }

            content += '</div>';
        }
    });

    __WEBPACK_IMPORTED_MODULE_3_jquery___default()('div.timeline-content').append(content);

    function setLineHeight() {
        var _h = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline ul').height() - __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline ul li.node').first().height() / 2 - __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline ul li.node').last().height() / 2;

        __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline .line').height(_h);
    }

    function fixTimeline() {
        var offset = __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.main .container').offset().top;
        var scrollTop = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(window).scrollTop() + 60;

        if (offset < scrollTop) {
            __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline').addClass('fixed');
        } else {
            __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline').removeClass('fixed');
        }
    }

    function setDimensionBar() {
        var _i = 0,
            _h = 0;

        __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline-content .content-section').each(function (index, domEle) {
            if (__WEBPACK_IMPORTED_MODULE_3_jquery___default()(domEle).offset().top <= __WEBPACK_IMPORTED_MODULE_3_jquery___default()(window).scrollTop()) {
                _i = index;
            }
        });

        __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline ul li.node').each(function (index, domEle) {
            if (index <= _i) {
                _h += __WEBPACK_IMPORTED_MODULE_3_jquery___default()(domEle).height();
            }
        });

        __WEBPACK_IMPORTED_MODULE_3_jquery___default()(".bar").css({
            "top": _h - __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline ul li.node').eq(_i).height() / 2
        });

        // $('.timeline ul li.node').eq(_i).css({"color": "#323C5C"}).siblings().css({"color": "#333333"});
        __WEBPACK_IMPORTED_MODULE_3_jquery___default()('.timeline ul li.node').eq(_i).addClass('active').siblings().removeClass('active');
    }

    function addBehaviours() {
        var sections = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(".content-section");

        __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(".node"), function (i, element) {
            __WEBPACK_IMPORTED_MODULE_3_jquery___default()(element).on("click", function (e) {
                e.stopPropagation();
                e.preventDefault();

                var scroll = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(sections[i]).offset().top;

                __WEBPACK_IMPORTED_MODULE_3_jquery___default()('html, body').animate({
                    scrollTop: scroll
                }, 300);
            });
        });
    }

    function arrangeNodes() {
        __WEBPACK_IMPORTED_MODULE_3_jquery___default()(".node").remove();

        __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(__WEBPACK_IMPORTED_MODULE_3_jquery___default()(".content-section"), function (i, element) {
            var name = __WEBPACK_IMPORTED_MODULE_3_jquery___default()(element).attr('id');
            var node = __WEBPACK_IMPORTED_MODULE_3_jquery___default()("<li class='node'><span>" + name + "</span></li>");

            __WEBPACK_IMPORTED_MODULE_3_jquery___default()(".timeline ul").append(node);
        });

        addBehaviours();
    }

    __WEBPACK_IMPORTED_MODULE_3_jquery___default()(window).on("scroll resize", function (e) {
        e.stopPropagation();
        e.preventDefault();

        fixTimeline();
        setDimensionBar();
    });

    arrangeNodes();
    setLineHeight();
    setDimensionBar();
});

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(490);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(22)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!./reportsDetail.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!./reportsDetail.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports
exports.i(__webpack_require__(36), "");

// module
exports.push([module.i, ".banner {\r\n    background-color: #323C5C;\r\n    background-repeat: no-repeat;\r\n    background-position: right center;\r\n    background-size: cover;\r\n}\r\n\r\n.banner {\r\n    background-image: url(" + __webpack_require__(94) + ");\r\n}\r\n\r\n.banner .container {\r\n    padding-top: 68px;\r\n    height: 354px;\r\n    color: #ffffff;\r\n    text-align: left;\r\n}\r\n\r\n.banner p.banner-title {\r\n    margin: 70px 0 20px 100px;\r\n    line-height: 1.1;\r\n    font-size: 40px;\r\n}\r\n\r\n.banner p.banner-desc {\r\n    margin: 20px 0 0 100px;\r\n    line-height: 1.1;\r\n    font-size: 18px;\r\n}\r\n\r\nh3.content-title {\r\n    margin: 0 auto 1em;\r\n    font-family: Roboto-Regular, sans-serif;\r\n    font-size: 24px;\r\n    font-weight: 500;\r\n    /*text-align: center;*/\r\n    word-break: break-all;\r\n    word-wrap: break-word;\r\n    color: #000000;\r\n}\r\n\r\n.main-desc {\r\n    margin: 1em auto;\r\n}\r\n\r\n.main-desc > span {\r\n    float: left;\r\n    padding: 0 10px;\r\n    min-width: 50%;\r\n    font-family: Roboto-Regular, sans-serif;\r\n    font-size: 12px;\r\n    opacity: 0.54;\r\n    color: #000000;\r\n}\r\n\r\n.timeline-content {\r\n    margin-top: 2em;\r\n    width: 75%;\r\n    font-family: Roboto-Light, sans-serif;\r\n}\r\n\r\n.timeline-content h3 {\r\n    margin: 1em auto;\r\n    font-family: Roboto-Regular, sans-serif;\r\n    font-size: 16px;\r\n    color: #000;\r\n}\r\n\r\ndiv.timeline-content p {\r\n    display: block;\r\n    margin: 4px 0;\r\n    padding: 0;\r\n    height: auto;\r\n    line-height: 24px;\r\n    font-size: 14px;\r\n    font-family: Roboto-Light, sans-serif;\r\n    word-break: break-all;\r\n    word-wrap: break-word;\r\n    color: #000;\r\n}\r\n\r\np img {\r\n    vertical-align: middle;\r\n}\r\n\r\n.reports-key {\r\n    font-weight: 600;\r\n}\r\n\r\n.timeline {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 50%;\r\n    margin-right: -600px;\r\n    overflow: visible;\r\n}\r\n\r\n.timeline.fixed {\r\n    position: fixed;\r\n    top: 60px;\r\n}\r\n\r\n.timeline .line {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 0;\r\n    width: 1px;\r\n    height: 100px;\r\n    background-color: #323C5C;\r\n}\r\n\r\n.timeline ul {\r\n    position: relative;\r\n    margin: 0;\r\n    padding: 0;\r\n    line-height: 36px;\r\n    list-style: none;\r\n}\r\n\r\n.timeline .bar {\r\n    position: absolute;\r\n    top: 0;\r\n    right: -3px;\r\n    z-index: 2;\r\n    margin-top: -3px;\r\n    width: 7px;\r\n    height: 7px;\r\n    background-color: #323C5C;\r\n    border: 1px solid #323C5C;\r\n    -webkit-border-radius: 50%;\r\n    -moz-border-radius: 50%;\r\n    border-radius: 50%;\r\n    -webkit-transition: top 0.5s;\r\n    -moz-transition: top 0.5s;\r\n    -o-transition: top 0.5s;\r\n    transition: top 0.5s;\r\n}\r\n\r\n.node {\r\n    display: block;\r\n    position: relative;\r\n    margin: 0;\r\n    padding: 0;\r\n    padding-right: 16px;\r\n    width: auto;\r\n    color: #323C5C;\r\n    overflow: visible;\r\n    cursor: pointer;\r\n    -webkit-transition: all 0.5s;\r\n    -moz-transition: all 0.5s;\r\n    -ms-transition: all 0.5s;\r\n    -o-transition: all 0.5s;\r\n    transition: all 0.5s;\r\n}\r\n\r\n.node.active {\r\n    font-size: 16px;\r\n}\r\n\r\n.node.active,\r\n.node:hover {\r\n    color: #6f768c;\r\n}\r\n\r\n.node.active:after {\r\n    background-color: #6f768c;\r\n    border: 1px solid #6f768c;\r\n}\r\n\r\n.node:after {\r\n    content: \"\";\r\n    position: absolute;\r\n    top: 50%;\r\n    right: -3px;\r\n    z-index: 1;\r\n    margin-top: -3px;\r\n    width: 7px;\r\n    height: 7px;\r\n    background-color: #ffffff;\r\n    border: 1px solid #323C5C;\r\n    -webkit-border-radius: 50%;\r\n    -moz-border-radius: 50%;\r\n    border-radius: 50%;\r\n    -webkit-transition: all 0.5s;\r\n    -moz-transition: all 0.5s;\r\n    -ms-transition: all 0.5s;\r\n    -o-transition: all 0.5s;\r\n    transition: all 0.5s;\r\n}\r\n\r\n.node span {\r\n    transition: all 0.4s ease-out;\r\n    padding: 10px;\r\n    white-space: nowrap;\r\n    font-weight: 200;\r\n}", ""]);

// exports


/***/ }),

/***/ 491:
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="header">\r\n    <div class="container">\r\n        <div class="title">Hi Security Lab</div>\r\n        <ul>\r\n            <li><a href="/">Home</a></li>\r\n            <li><a href="/events">Events</a></li>\r\n            <li class="active"><a href="/reports/1">Reports</a></li>\r\n            <li><a href="/reports/2">Vulnerabilities</a></li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n<div class="banner">\r\n    <div class="container">\r\n        <p class="banner-title">Malware analysis reports</p>\r\n        <p class="banner-desc"></p>\r\n    </div>\r\n</div>\r\n<div class="main">\r\n    <div class="container">\r\n        <h3 class="content-title">' +
((__t = (md5)) == null ? '' : __t) +
'</h3>\r\n        <div class="reports-info clear">\r\n            <span style="margin-right:20px;opacity: 0.54;"><i class="fa fa-clock-o"></i> Time: <span\r\n                    id="time"></span></span>\r\n            <span><span style="opacity: 0.54;"><i class="fa fa-bars"></i> Risk Level: </span><span\r\n                    id="level"></span></span>\r\n        </div>\r\n        <div class="timeline-content"></div>\r\n        <div class="timeline">\r\n            <ul></ul>\r\n            <div class="line"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id="footer">\r\n    <div class="container">\r\n        <div>\r\n            <p><img src="' +
((__t = (b1logo)) == null ? '' : __t) +
'" alt="" style="width:56px;height:56px;vertical-align: middle;">\r\n            </p>\r\n            <h3>Hi Security Lab</h3>\r\n        </div>\r\n        <hr/>\r\n        <div>\r\n            <p><a href="/">HOME</a></p>\r\n            <p><a href="/events">GLOBAL SECURITY EVENTS</a></p>\r\n            <p><a href="/reports/1">MALWARE ANALYSIS REPORTS</a></p>\r\n            <p><a href="/reports/2">VULNERABILITY ANALYSIS REPORTS</a></p>\r\n        </div>\r\n        <hr/>\r\n        <div>\r\n            <p>Copyright &copy; 2017 Hi Security Lab</p>\r\n            <p>All rights reserved</p>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
}

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/f948ec3ba649b8c90d4f325ece0e3c65.png";

/***/ })

},[488]);