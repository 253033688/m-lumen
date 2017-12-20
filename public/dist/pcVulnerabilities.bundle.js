webpackJsonp([4],{

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vulnerabilities_css__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vulnerabilities_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vulnerabilities_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vulnerabilities_ejs__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vulnerabilities_ejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vulnerabilities_ejs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_js_page__ = __webpack_require__(95);






document.body.innerHTML = __WEBPACK_IMPORTED_MODULE_1__vulnerabilities_ejs___default()({
    b1logo: __WEBPACK_IMPORTED_MODULE_2__common_pc_images_b1_logo_png___default.a
});

function buildLi(data) {
    var html = '<li class="article clear">';
    var CVE = data.shift().CVE,
        DateReported = data.shift().DateReported,
        Severity = data.shift().Severity;

    html += '<div class="left"><span class="day">' + DateReported.slice(-2) + '</span>' + DateReported.slice(0, 7) + '</div>' + ' <div class="right"><i class="dot"></i><h3>' + CVE + '</h3>' + '<div class="data"><span><i class="fa fa-clock-o"></i> Time：' + DateReported + '</span><span><i class="fa fa-bars"></i> Risk Level: ' + Severity + '</span></div>' + '<ul class="article-desc">';

    __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(data, function (r, rValue) {
        for (var i in rValue) {
            var item = rValue[i];

            if (i === 'UpdatedGoogleDevices') {
                html += '<li>Updated Google Devices</li>';
            } else if (i === 'ExploitsName') {
                html += '<li>Exploits Name</li>';
            } else if (i === 'ExploitsDescription') {
                html += '<li>Exploits Description</li>';
            } else {
                html += '<li>' + i + '</li>';
            }

            if (__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.isArray(item)) {
                __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(item, function (_i, _item) {
                    for (var name in _item) {
                        if (__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.isEmptyObject(_item[name])) {
                            html += '<p>' + name + '</p>';
                        } else {
                            var _tmp = _item[name].shift();

                            html += '<p><a href="' + _tmp + '">' + name + '</a>';

                            __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(_item[name], function (a, aItem) {
                                html += '<a href="' + aItem + '">[' + (a + 2) + ']</a>';
                            });

                            html += '</p>';
                        }
                    }
                });
            } else if (__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.isPlainObject(item)) {
                for (var name in item) {
                    html += '<p>' + name + " : " + item[name] + '</p>';
                }
            } else {
                html += '<p>' + item + '</p>';
            }
        }
    });

    html += '</ul></div></li>';

    return html;
}

function PageCallback(jq, options, callback) {
    __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.ajax({
        dataType: "json",
        url: '/reportsPage/2/' + options.current_page
    }).done(function (data) {
        if (data.Success) {
            __WEBPACK_IMPORTED_MODULE_3_jquery___default()("#content").empty();

            var html = '';
            __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.each(data.Data, function (index, news) {
                html += buildLi(news);
            });

            __WEBPACK_IMPORTED_MODULE_3_jquery___default()("#content").html(html);

            callback(data.Total);
        }
    }).fail(function (e) {
        console.log(e);
    });
}

__WEBPACK_IMPORTED_MODULE_3_jquery___default()(".page").pagination({
    callback: PageCallback
});

/***/ }),

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(494);
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
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!./vulnerabilities.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!./vulnerabilities.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports
exports.i(__webpack_require__(36), "");

// module
exports.push([module.i, ".main {\r\n    margin: 60px 0;\r\n}\r\n\r\n.banner {\r\n    background-color: #323C5C;\r\n    background-repeat: no-repeat;\r\n    background-position: right center;\r\n    background-size: cover;\r\n}\r\n\r\n.banner {\r\n    background-image: url(" + __webpack_require__(495) + ");\r\n}\r\n\r\n.banner .container {\r\n    padding-top: 68px;\r\n    height: 354px;\r\n    color: #ffffff;\r\n    text-align: left;\r\n}\r\n\r\n.banner p.banner-title {\r\n    margin: 70px 0 20px 100px;\r\n    line-height: 1.1;\r\n    font-size: 40px;\r\n}\r\n\r\n.banner p.banner-desc {\r\n    margin: 20px 0 0 100px;\r\n    line-height: 1.1;\r\n    font-size: 18px;\r\n}\r\n\r\n.main {\r\n    padding: 60px 0;\r\n    color: #333333;\r\n    background-color: #ffffff;\r\n}\r\n\r\nul.content {\r\n    position: relative;\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\nul.content:after {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    height: 40px;\r\n    background-color: #fff;\r\n}\r\n\r\n.article {\r\n    position: relative;\r\n}\r\n\r\n.article .left {\r\n    position: relative;\r\n    float: left;\r\n    padding-right: 2em;\r\n    width: 12%;\r\n    color: #B3B3B3;\r\n}\r\n\r\n.article .right {\r\n    position: relative;\r\n    float: left;\r\n    padding: 0 0 40px 3em;\r\n    width: 88%;\r\n    border-left: 1px solid #323C5C;\r\n}\r\n\r\n.article .left .day {\r\n    display: block;\r\n    font-size: 24px;\r\n    color: #333333;\r\n}\r\n\r\n.article .right .dot {\r\n    position: absolute;\r\n    left: -12px;\r\n    width: 24px;\r\n    height: 24px;\r\n    background-color: #323C5C;\r\n    border: 4px solid #8c91a3;\r\n    -webkit-border-radius: 50%;\r\n    -moz-border-radius: 50%;\r\n    border-radius: 50%;\r\n}\r\n\r\n.article .right h3 {\r\n    margin: 0 0 1em 0;\r\n    font-size: 24px;\r\n    font-weight: 600;\r\n}\r\n\r\n.article .right .data {\r\n    margin-bottom: 1em;\r\n    font-size: 12px;\r\n    color: #B3B3B3;\r\n}\r\n\r\n.article .right .data span {\r\n    margin-right: 2em;\r\n}\r\n\r\n.article .right ul.article-desc {\r\n    margin-top: 2em;\r\n    padding-left: 20px;\r\n    font-family: Roboto-Light, sans-serif;\r\n}\r\n\r\n.article .right ul.article-desc li {\r\n    font-family: Roboto-Regular, sans-serif;\r\n    color: #000000;\r\n}\r\n\r\n.article .right ul.article-desc a {\r\n    color: #337ab7;\r\n}\r\n\r\n.btn {\r\n    display: inline-block;\r\n    margin-bottom: 0;\r\n    padding: .5em 1.5em;\r\n    font-size: 1.6rem;\r\n    font-weight: 400;\r\n    line-height: 1.2;\r\n    text-align: center;\r\n    white-space: nowrap;\r\n    background-image: none;\r\n    border: 1px solid transparent;\r\n    border-radius: 0;\r\n    cursor: pointer;\r\n    outline: 0;\r\n    -webkit-appearance: none;\r\n    user-select: none;\r\n    -webkit-transition: background-color 300ms ease-out, border-color 300ms ease-out;\r\n    transition: background-color 300ms ease-out, border-color 300ms ease-out;\r\n}\r\n\r\n.article .right a.btn {\r\n    font-size: 14px;\r\n    color: #fff;\r\n    text-decoration: none;\r\n    background: #323C5C;\r\n    border: 1px solid #323C5C;\r\n\r\n}\r\n\r\n.article .right a.btn:hover {\r\n    background: #4B5984;\r\n}\r\n\r\n.radius {\r\n    border-radius: 2px;\r\n}\r\n\r\n.btn-xs {\r\n    font-size: 1.2rem;\r\n}\r\n\r\n.page {\r\n    position: relative;\r\n    margin: 0 auto;\r\n    padding-top: 40px;\r\n    text-align: center;\r\n}\r\n\r\n.page a,\r\n.page span {\r\n    display: inline-block;\r\n    margin-right: 1em;\r\n    padding: 0.25em 0.5em;\r\n    border-radius: 2px;\r\n    color: #323C5C;\r\n}\r\n\r\n.page a:hover {\r\n    color: #6f768c;\r\n}\r\n\r\n.page span.current {\r\n    color: #fff;\r\n    background-color: #323C5C;\r\n}\r\n\r\n.page a.current:hover {\r\n    background: #4B5984;\r\n}\r\n\r\n.page a.disabled,\r\n.page span.current.prev,\r\n.page span.current.prev:before,\r\n.page span.current.next,\r\n.page span.current.next:after {\r\n    color: #B3B3B3;\r\n    background-color: transparent;\r\n    cursor: not-allowed;\r\n}\r\n\r\n.page a.prev,\r\n.page span.prev,\r\n.page a.next,\r\n.page span.next {\r\n    position: relative;\r\n    padding: 0 1em;\r\n}\r\n\r\n.page a.prev:before,\r\n.page span.current.prev:before {\r\n    content: \" \";\r\n    position: absolute;\r\n    top: 5px;\r\n    left: -0.5em;\r\n    display: inline-block;\r\n    width: 0;\r\n    height: 0;\r\n    vertical-align: middle;\r\n    border-right: 5px solid;\r\n    border-right: 5px solid \\9;\r\n    border-top: 5px solid transparent;\r\n    border-left: 5px solid transparent;\r\n    border-bottom: 5px solid transparent;\r\n}\r\n\r\n.page a.next:after,\r\n.page span.current.next:after {\r\n    content: \" \";\r\n    position: absolute;\r\n    top: 5px;\r\n    right: -0.5em;\r\n    display: inline-block;\r\n    width: 0;\r\n    height: 0;\r\n    margin-left: 2px;\r\n    vertical-align: middle;\r\n    border-left: 5px solid;\r\n    border-left: 5px solid \\9;\r\n    border-top: 5px solid transparent;\r\n    border-right: 5px solid transparent;\r\n    border-bottom: 5px solid transparent;\r\n}", ""]);

// exports


/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/ee9aa67cb13af890ca966a1c9f686f41.png";

/***/ }),

/***/ 496:
/***/ (function(module, exports) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="header">\r\n    <div class="container">\r\n        <div class="title">Hi Security Lab</div>\r\n        <ul>\r\n            <li><a href="/">Home</a></li>\r\n            <li><a href="/events">Events</a></li>\r\n            <li><a href="/reports/1">Reports</a></li>\r\n            <li class="active"><a href="/reports/2">Vulnerabilities</a></li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n<div class="banner">\r\n    <div class="container">\r\n        <p class="banner-title">Vulnerability analysis reports</p>\r\n        <p class="banner-desc"></p>\r\n    </div>\r\n</div>\r\n<div class="main">\r\n    <div class="container">\r\n        <ul class="content" id="content">\r\n        </ul>\r\n        <div class="page wrap">\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id="footer">\r\n    <div class="container">\r\n        <div>\r\n            <p><img src="' +
((__t = (b1logo)) == null ? '' : __t) +
'" alt="" style="width:56px;height:56px;vertical-align: middle;">\r\n            </p>\r\n            <h3>Hi Security Lab</h3>\r\n        </div>\r\n        <hr/>\r\n        <div>\r\n            <p><a href="/">HOME</a></p>\r\n            <p><a href="/events">GLOBAL SECURITY EVENTS</a></p>\r\n            <p><a href="/reports/1">MALWARE ANALYSIS REPORTS</a></p>\r\n            <p><a href="/reports/2">VULNERABILITY ANALYSIS REPORTS</a></p>\r\n        </div>\r\n        <hr/>\r\n        <div>\r\n            <p>Copyright &copy; 2017 Hi Security Lab</p>\r\n            <p>All rights reserved</p>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
}

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn.pagination = function (options) {
    return this.each(function () {
        var $this = $(this);

        this.options = $.extend({
            items_total: 0,
            items_per_page: 10,
            display_pages_num: 10, // 展示的页码个数
            current_page: 0,
            prev_text: "Prev",
            next_text: "Next",
            link_to: "#",
            ellipse_text: "...",
            prev_show_always: true,
            next_show_always: true,
            first_show_always: true,
            last_show_always: true,
            callback: function callback() {
                return false;
            }
        }, options);
        this.options.callback($this, this.options, callback);

        /*
         * 计算总页数
         *
         * */
        function getPages(options) {
            return Math.ceil(options.items_total / options.items_per_page);
        }

        /*
         * 计算起始页码和结束页码
         *
         * */
        function getInterval(current_page, options) {
            var half_entry = Math.ceil(options.display_pages_num / 2);
            var pages = getPages(options);

            var start_page = current_page > half_entry ? Math.max(Math.min(current_page - half_entry, pages - options.display_pages_num), 0) : 0;
            var end_page = current_page > half_entry ? Math.min(current_page + half_entry, pages) : Math.min(options.display_pages_num, pages);

            return [start_page, end_page];
        }

        /*
         * 绘制分页
         *
         * */
        function drawPages($this, options) {
            var pages = getPages(options);
            var current_page = options.current_page;
            var interval = getInterval(current_page, options);
            var appendItem = function appendItem(page_id, appendices) {
                var lnk;

                page_id = page_id < 0 ? 0 : page_id < pages ? page_id : pages - 1;
                appendices = $.extend({ text: page_id + 1, classes: "" }, appendices || {});

                if (page_id == current_page) {
                    lnk = $("<span class='current'>" + appendices.text + "</span>");
                } else {
                    lnk = $("<a>" + appendices.text + "</a>").bind("click", function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        options.current_page = page_id;
                        options.callback($this, $this[0].options, callback);
                    }).attr('href', options.link_to.replace(/__id__/, page_id));
                }
                if (appendices.classes) {
                    lnk.addClass(appendices.classes);
                }

                $this.append(lnk);
            };

            if (options.prev_text && (options.prev_show_always || current_page > 0)) {
                appendItem(current_page - 1, { text: options.prev_text, classes: "prev" });
            }
            if (options.first_show_always && interval[0] > 0) {
                appendItem(0);
            }
            if (options.ellipse_text && interval[0] > 1) {
                $("<span>" + options.ellipse_text + "</span>").appendTo($this);
            }

            for (var i = interval[0]; i < interval[1]; i++) {
                appendItem(i);
            }

            if (options.ellipse_text && interval[1] < pages - 1) {
                $("<span>" + options.ellipse_text + "</span>").appendTo($this);
            }
            if (options.last_show_always && interval[1] < pages) {
                appendItem(pages - 1);
            }
            if (options.next_text && (options.next_show_always || current_page < pages)) {
                appendItem(current_page + 1, { text: options.next_text, classes: "next" });
            }
        }

        function callback(items_total) {
            $this.empty();
            $this[0].options.items_total = items_total;

            drawPages($this, $this[0].options);
        }
    });
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ })

},[492]);