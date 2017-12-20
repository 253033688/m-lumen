import $ from "jquery";
import echarts from "echarts";
import "./events.css";
import tpl from './events.ejs';
import './world';

import b1logo from '../../common/pc/images/b1/logo.png';
document.body.innerHTML = tpl({
    b1logo: b1logo
});

$('#event-section1, #event-section2').height($(window).height());

$.ajax({
    url: '/eventSummary',
    dataType: 'json'
})
    .done(function (data) {
        let nowDate = new Date(Date.parse(new Date()) - 24 * 60 * 60 * 1000);
        let today = Date.parse(nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + (nowDate.getDate()));
        let InterNum = data.EventIncrease / (24 * 60 * 60 * 1000);
        let startNum = data.EventTotal + InterNum * ((new Date()).getTime() - today);

        if (data.Success) {
            $('table.event-globe-desc td:eq(0) span.event-globe-desc-num').text(((data.UserTotal || 0) / 1000000).toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
            $('table.event-globe-desc td:eq(1) span.event-globe-desc-num').text(((startNum || 0) / 1000000).toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
            $('table.event-globe-desc td:eq(2) span.event-globe-desc-num').text(((data.VirusTotal || 0) / 1000000).toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
        }
    })
    .fail(function (e) {
        console.log(e, 3);
    });

$.when(
    $.ajax({
        url: '/mobileVirusMap',
        dataType: 'json'
    }),
    $.ajax({
        url: '/mobileTopVirus',
        dataType: 'json'
    }),
    $.ajax({
        url: '/mobileVirusIncrease',
        dataType: 'json'
    })
)
    .then(function (data1, data2, data3) {
        if (!data1[0].Success || !data2[0].Success || !data3[0].Success)
            return $.Deferred().reject('Loading data failed.');
        return $.Deferred().resolve(data1[0]['Data'], data2[0]['Data'], data3[0]['Data']);
    })
    .done(function (data1, data2, data3) {
        let geoData_value, geoData_value_10, min1, max1, min2, max2, min3, max3, _max3_tmp, data3_keys = [], data3_values = [], geoData = {};
        const country = [
            {
                "codec": "-",
                "name": "-"
            },
            {
                "codec": "AU",
                "name": "Australia"
            },
            {
                "codec": "CN",
                "name": "China"
            },
            {
                "codec": "JP",
                "name": "Japan"
            },
            {
                "codec": "TH",
                "name": "Thailand"
            },
            {
                "codec": "IN",
                "name": "India"
            },
            {
                "codec": "MY",
                "name": "Malaysia"
            },
            {
                "codec": "KR",
                "name": "Korea, Republic of"
            },
            {
                "codec": "SG",
                "name": "Singapore"
            },
            {
                "codec": "TW",
                "name": "Taiwan, Province of China"
            },
            {
                "codec": "HK",
                "name": "Hong Kong"
            },
            {
                "codec": "PH",
                "name": "Philippines"
            },
            {
                "codec": "VN",
                "name": "Viet Nam"
            },
            {
                "codec": "NO",
                "name": "Norway"
            },
            {
                "codec": "FR",
                "name": "France"
            },
            {
                "codec": "GB",
                "name": "United Kingdom"
            },
            {
                "codec": "NL",
                "name": "Netherlands"
            },
            {
                "codec": "DE",
                "name": "Germany"
            },
            {
                "codec": "US",
                "name": "United States"
            },
            {
                "codec": "ES",
                "name": "Spain"
            },
            {
                "codec": "DK",
                "name": "Denmark"
            },
            {
                "codec": "SE",
                "name": "Sweden"
            },
            {
                "codec": "BE",
                "name": "Belgium"
            },
            {
                "codec": "FI",
                "name": "Finland"
            },
            {
                "codec": "RU",
                "name": "Russian Federation"
            },
            {
                "codec": "IT",
                "name": "Italy"
            },
            {
                "codec": "GR",
                "name": "Greece"
            },
            {
                "codec": "AE",
                "name": "United Arab Emirates"
            },
            {
                "codec": "AT",
                "name": "Austria"
            },
            {
                "codec": "ZA",
                "name": "South Africa"
            },
            {
                "codec": "IL",
                "name": "Israel"
            },
            {
                "codec": "QA",
                "name": "Qatar"
            },
            {
                "codec": "KZ",
                "name": "Kazakhstan"
            },
            {
                "codec": "PT",
                "name": "Portugal"
            },
            {
                "codec": "SA",
                "name": "Saudi Arabia"
            },
            {
                "codec": "LV",
                "name": "Latvia"
            },
            {
                "codec": "IR",
                "name": "Iran, Islamic Republic of"
            },
            {
                "codec": "CA",
                "name": "Canada"
            },
            {
                "codec": "MX",
                "name": "Mexico"
            },
            {
                "codec": "SY",
                "name": "Syrian Arab Republic"
            },
            {
                "codec": "UA",
                "name": "Ukraine"
            },
            {
                "codec": "KW",
                "name": "Kuwait"
            },
            {
                "codec": "BH",
                "name": "Bahrain"
            },
            {
                "codec": "LB",
                "name": "Lebanon"
            },
            {
                "codec": "OM",
                "name": "Oman"
            },
            {
                "codec": "JO",
                "name": "Jordan"
            },
            {
                "codec": "CZ",
                "name": "Czech Republic"
            },
            {
                "codec": "CH",
                "name": "Switzerland"
            },
            {
                "codec": "IQ",
                "name": "Iraq"
            },
            {
                "codec": "TR",
                "name": "Turkey"
            },
            {
                "codec": "RO",
                "name": "Romania"
            },
            {
                "codec": "GE",
                "name": "Georgia"
            },
            {
                "codec": "AZ",
                "name": "Azerbaijan"
            },
            {
                "codec": "ZM",
                "name": "Zambia"
            },
            {
                "codec": "ZW",
                "name": "Zimbabwe"
            },
            {
                "codec": "PS",
                "name": "Palestine, State of"
            },
            {
                "codec": "LT",
                "name": "Lithuania"
            },
            {
                "codec": "SK",
                "name": "Slovakia"
            },
            {
                "codec": "RS",
                "name": "Serbia"
            },
            {
                "codec": "HU",
                "name": "Hungary"
            },
            {
                "codec": "IS",
                "name": "Iceland"
            },
            {
                "codec": "BG",
                "name": "Bulgaria"
            },
            {
                "codec": "SI",
                "name": "Slovenia"
            },
            {
                "codec": "MD",
                "name": "Moldova, Republic of"
            },
            {
                "codec": "MK",
                "name": "Macedonia, The Former Yugoslav Republic of"
            },
            {
                "codec": "AO",
                "name": "Angola"
            },
            {
                "codec": "LI",
                "name": "Liechtenstein"
            },
            {
                "codec": "JE",
                "name": "Jersey"
            },
            {
                "codec": "HR",
                "name": "Croatia"
            },
            {
                "codec": "PL",
                "name": "Poland"
            },
            {
                "codec": "BA",
                "name": "Bosnia and Herzegovina"
            },
            {
                "codec": "EE",
                "name": "Estonia"
            },
            {
                "codec": "KG",
                "name": "Kyrgyzstan"
            },
            {
                "codec": "IE",
                "name": "Ireland"
            },
            {
                "codec": "IM",
                "name": "Isle of Man"
            },
            {
                "codec": "MT",
                "name": "Malta"
            },
            {
                "codec": "GI",
                "name": "Gibraltar"
            },
            {
                "codec": "LY",
                "name": "Libya"
            },
            {
                "codec": "LU",
                "name": "Luxembourg"
            },
            {
                "codec": "AM",
                "name": "Armenia"
            },
            {
                "codec": "VG",
                "name": "Virgin Islands, British"
            },
            {
                "codec": "YE",
                "name": "Yemen"
            },
            {
                "codec": "BY",
                "name": "Belarus"
            },
            {
                "codec": "RE",
                "name": "Reunion"
            },
            {
                "codec": "GP",
                "name": "Guadeloupe"
            },
            {
                "codec": "CY",
                "name": "Cyprus"
            },
            {
                "codec": "MQ",
                "name": "Martinique"
            },
            {
                "codec": "GY",
                "name": "Guyana"
            },
            {
                "codec": "PR",
                "name": "Puerto Rico"
            },
            {
                "codec": "AS",
                "name": "American Samoa"
            },
            {
                "codec": "GU",
                "name": "Guam"
            },
            {
                "codec": "MP",
                "name": "Northern Mariana Islands"
            },
            {
                "codec": "DO",
                "name": "Dominican Republic"
            },
            {
                "codec": "VI",
                "name": "Virgin Islands, U.S."
            },
            {
                "codec": "VE",
                "name": "Venezuela, Bolivarian Republic of"
            },
            {
                "codec": "BR",
                "name": "Brazil"
            },
            {
                "codec": "NZ",
                "name": "New Zealand"
            },
            {
                "codec": "BD",
                "name": "Bangladesh"
            },
            {
                "codec": "PK",
                "name": "Pakistan"
            },
            {
                "codec": "ID",
                "name": "Indonesia"
            },
            {
                "codec": "NP",
                "name": "Nepal"
            },
            {
                "codec": "PG",
                "name": "Papua New Guinea"
            },
            {
                "codec": "CL",
                "name": "Chile"
            },
            {
                "codec": "CO",
                "name": "Colombia"
            },
            {
                "codec": "AR",
                "name": "Argentina"
            },
            {
                "codec": "MO",
                "name": "Macao"
            },
            {
                "codec": "LK",
                "name": "Sri Lanka"
            },
            {
                "codec": "EC",
                "name": "Ecuador"
            },
            {
                "codec": "CR",
                "name": "Costa Rica"
            },
            {
                "codec": "KY",
                "name": "Cayman Islands"
            },
            {
                "codec": "UY",
                "name": "Uruguay"
            },
            {
                "codec": "EG",
                "name": "Egypt"
            },
            {
                "codec": "BB",
                "name": "Barbados"
            },
            {
                "codec": "BS",
                "name": "Bahamas"
            },
            {
                "codec": "LC",
                "name": "Saint Lucia"
            },
            {
                "codec": "DM",
                "name": "Dominica"
            },
            {
                "codec": "KH",
                "name": "Cambodia"
            },
            {
                "codec": "TK",
                "name": "Tokelau"
            },
            {
                "codec": "MV",
                "name": "Maldives"
            },
            {
                "codec": "AF",
                "name": "Afghanistan"
            },
            {
                "codec": "NC",
                "name": "New Caledonia"
            },
            {
                "codec": "FJ",
                "name": "Fiji"
            },
            {
                "codec": "MN",
                "name": "Mongolia"
            },
            {
                "codec": "WF",
                "name": "Wallis and Futuna"
            },
            {
                "codec": "AL",
                "name": "Albania"
            },
            {
                "codec": "UZ",
                "name": "Uzbekistan"
            },
            {
                "codec": "BL",
                "name": "Saint Barthelemy"
            },
            {
                "codec": "ME",
                "name": "Montenegro"
            },
            {
                "codec": "SM",
                "name": "San Marino"
            },
            {
                "codec": "CD",
                "name": "Congo, The Democratic Republic of The"
            },
            {
                "codec": "GG",
                "name": "Guernsey"
            },
            {
                "codec": "TJ",
                "name": "Tajikistan"
            },
            {
                "codec": "MM",
                "name": "Myanmar"
            },
            {
                "codec": "BM",
                "name": "Bermuda"
            },
            {
                "codec": "VC",
                "name": "Saint Vincent and The Grenadines"
            },
            {
                "codec": "NG",
                "name": "Nigeria"
            },
            {
                "codec": "BO",
                "name": "Bolivia, Plurinational State of"
            },
            {
                "codec": "LR",
                "name": "Liberia"
            },
            {
                "codec": "KE",
                "name": "Kenya"
            },
            {
                "codec": "GH",
                "name": "Ghana"
            },
            {
                "codec": "TZ",
                "name": "Tanzania, United Republic of"
            },
            {
                "codec": "BW",
                "name": "Botswana"
            },
            {
                "codec": "MZ",
                "name": "Mozambique"
            },
            {
                "codec": "MG",
                "name": "Madagascar"
            },
            {
                "codec": "NA",
                "name": "Namibia"
            },
            {
                "codec": "CI",
                "name": "Cote D'ivoire"
            },
            {
                "codec": "SD",
                "name": "Sudan"
            },
            {
                "codec": "CM",
                "name": "Cameroon"
            },
            {
                "codec": "MW",
                "name": "Malawi"
            },
            {
                "codec": "MU",
                "name": "Mauritius"
            },
            {
                "codec": "GA",
                "name": "Gabon"
            },
            {
                "codec": "ML",
                "name": "Mali"
            },
            {
                "codec": "BJ",
                "name": "Benin"
            },
            {
                "codec": "TD",
                "name": "Chad"
            },
            {
                "codec": "CV",
                "name": "Cabo Verde"
            },
            {
                "codec": "RW",
                "name": "Rwanda"
            },
            {
                "codec": "CG",
                "name": "Congo"
            },
            {
                "codec": "UG",
                "name": "Uganda"
            },
            {
                "codec": "GM",
                "name": "Gambia"
            },
            {
                "codec": "LS",
                "name": "Lesotho"
            },
            {
                "codec": "MA",
                "name": "Morocco"
            },
            {
                "codec": "DZ",
                "name": "Algeria"
            },
            {
                "codec": "GN",
                "name": "Guinea"
            },
            {
                "codec": "SZ",
                "name": "Swaziland"
            },
            {
                "codec": "BF",
                "name": "Burkina Faso"
            },
            {
                "codec": "SO",
                "name": "Somalia"
            },
            {
                "codec": "SL",
                "name": "Sierra Leone"
            },
            {
                "codec": "NE",
                "name": "Niger"
            },
            {
                "codec": "CF",
                "name": "Central African Republic"
            },
            {
                "codec": "TG",
                "name": "Togo"
            },
            {
                "codec": "SS",
                "name": "South Sudan"
            },
            {
                "codec": "BI",
                "name": "Burundi"
            },
            {
                "codec": "GQ",
                "name": "Equatorial Guinea"
            },
            {
                "codec": "SC",
                "name": "Seychelles"
            },
            {
                "codec": "SN",
                "name": "Senegal"
            },
            {
                "codec": "MR",
                "name": "Mauritania"
            },
            {
                "codec": "DJ",
                "name": "Djibouti"
            },
            {
                "codec": "ET",
                "name": "Ethiopia"
            },
            {
                "codec": "KM",
                "name": "Comoros"
            },
            {
                "codec": "IO",
                "name": "British Indian Ocean Territory"
            },
            {
                "codec": "TN",
                "name": "Tunisia"
            },
            {
                "codec": "YT",
                "name": "Mayotte"
            },
            {
                "codec": "LA",
                "name": "Lao People's Democratic Republic"
            },
            {
                "codec": "BN",
                "name": "Brunei Darussalam"
            },
            {
                "codec": "NR",
                "name": "Nauru"
            },
            {
                "codec": "VU",
                "name": "Vanuatu"
            },
            {
                "codec": "BT",
                "name": "Bhutan"
            },
            {
                "codec": "WS",
                "name": "Samoa"
            },
            {
                "codec": "FM",
                "name": "Micronesia, Federated States of"
            },
            {
                "codec": "PF",
                "name": "French Polynesia"
            },
            {
                "codec": "TL",
                "name": "Timor-Leste"
            },
            {
                "codec": "TO",
                "name": "Tonga"
            },
            {
                "codec": "MC",
                "name": "Monaco"
            },
            {
                "codec": "GL",
                "name": "Greenland"
            },
            {
                "codec": "FO",
                "name": "Faroe Islands"
            },
            {
                "codec": "BZ",
                "name": "Belize"
            },
            {
                "codec": "NU",
                "name": "Niue"
            },
            {
                "codec": "KI",
                "name": "Kiribati"
            },
            {
                "codec": "MH",
                "name": "Marshall Islands"
            },
            {
                "codec": "PW",
                "name": "Palau"
            },
            {
                "codec": "SB",
                "name": "Solomon Islands"
            },
            {
                "codec": "TV",
                "name": "Tuvalu"
            },
            {
                "codec": "KP",
                "name": "Korea, Democratic People's Republic of"
            },
            {
                "codec": "PE",
                "name": "Peru"
            },
            {
                "codec": "PY",
                "name": "Paraguay"
            },
            {
                "codec": "GF",
                "name": "French Guiana"
            },
            {
                "codec": "SR",
                "name": "Suriname"
            },
            {
                "codec": "GT",
                "name": "Guatemala"
            },
            {
                "codec": "HN",
                "name": "Honduras"
            },
            {
                "codec": "NI",
                "name": "Nicaragua"
            },
            {
                "codec": "SV",
                "name": "El Salvador"
            },
            {
                "codec": "PA",
                "name": "Panama"
            },
            {
                "codec": "VA",
                "name": "Holy See"
            },
            {
                "codec": "AD",
                "name": "Andorra"
            },
            {
                "codec": "ER",
                "name": "Eritrea"
            },
            {
                "codec": "GW",
                "name": "Guinea-Bissau"
            },
            {
                "codec": "ST",
                "name": "Sao Tome and Principe"
            },
            {
                "codec": "TM",
                "name": "Turkmenistan"
            },
            {
                "codec": "AG",
                "name": "Antigua and Barbuda"
            },
            {
                "codec": "CU",
                "name": "Cuba"
            },
            {
                "codec": "GD",
                "name": "Grenada"
            },
            {
                "codec": "HT",
                "name": "Haiti"
            },
            {
                "codec": "JM",
                "name": "Jamaica"
            },
            {
                "codec": "KN",
                "name": "Saint Kitts and Nevis"
            },
            {
                "codec": "TT",
                "name": "Trinidad and Tobago"
            },
            {
                "codec": "FK",
                "name": "Falkland Islands (Malvinas)"
            },
            {
                "codec": "TC",
                "name": "Turks and Caicos Islands"
            },
            {
                "codec": "CW",
                "name": "Curacao"
            },
            {
                "codec": "AI",
                "name": "Anguilla"
            },
            {
                "codec": "UM",
                "name": "United States Minor Outlying Islands"
            },
            {
                "codec": "AW",
                "name": "Aruba"
            },
            {
                "codec": "PM",
                "name": "Saint Pierre and Miquelon"
            },
            {
                "codec": "SX",
                "name": "Sint Maarten (Dutch Part)"
            },
            {
                "codec": "MF",
                "name": "Saint Martin (French Part)"
            },
            {
                "codec": "AX",
                "name": "Aland Islands"
            },
            {
                "codec": "NF",
                "name": "Norfolk Island"
            },
            {
                "codec": "AQ",
                "name": "Antarctica"
            },
            {
                "codec": "BQ",
                "name": "Bonaire, Sint Eustatius and Saba"
            },
            {
                "codec": "GS",
                "name": "South Georgia and The South Sandwich Islands"
            },
            {
                "codec": "MS",
                "name": "Montserrat"
            },
            {
                "codec": "CK",
                "name": "Cook Islands"
            }
        ];
        const capital = {
            'Afghanistan': [69.11, 34.28],
            'Angola': [13.15, -8.5],
            'Albania': [19.49, 41.18],
            'United Arab Emirates': [54.22, 24.28],
            'Argentina': [-60, -36.3],
            'Armenia': [44.31, 40.1],
            'Australia': [149.08, -35.15],
            'Austria': [16.22, 48.12],
            'Azerbaijan': [49.56, 40.29],
            'Burundi': [29.18, -3.16],
            'Belgium': [4.21, 50.51],
            'Benin': [2.42, 6.23],
            'Burkina Faso': [-1.3, 12.15],
            'Bangladesh': [90.26, 23.43],
            'Bulgaria': [23.2, 42.45],
            'Bahamas': [-77.2, 25.05],
            'Bosnia and Herzegovina': [18.26, 43.52],
            'Belarus': [27.3, 53.52],
            'Belize': [-88.3, 17.18],
            'Bolivia, Plurinational State of': [-68.1, -16.2],
            'Brazil': [-47.55, -15.47],
            'Brunei Darussalam': [115, 4.52],
            'Bhutan': [89.45, 27.31],
            'Botswana': [25.57, -24.45],
            'Central African Republic': [18.35, 4.23],
            'Canada': [-75.42, 45.27],
            'Switzerland': [7.28, 46.57],
            'Chile': [-70.4, -33.24],
            'China': [116.2, 39.55],
            'Japan': [139.46, 35.42],
            'Singapore': [103.48, 1.29],
            'Cameroon': [11.35, 3.5],
            'Congo': [15.15, -4.2],
            'Colombia': [-74, 4.34],
            'Costa Rica': [-84.02, 9.55],
            'Cuba': [-82.22, 23.08],
            'Cyprus': [33.25, 35.1],
            'Czech Republic': [14.22, 50.05],
            'Germany': [13.25, 52.3],
            'Djibouti': [42.2, 11.08],
            'Denmark': [12.34, 55.41],
            'Algeria': [3.08, 36.42],
            'Ecuador': [-78.35, -0.15],
            'Egypt': [31.14, 30.01],
            'Eritrea': [38.55, 15.19],
            'Spain': [-3.45, 40.25],
            'Estonia': [24.48, 59.22],
            'Ethiopia': [38.42, 9.02],
            'Finland': [25.03, 60.15],
            'Fiji': [178.3, -18.06],
            'Falkland Islands (Malvinas)': [-59.51, -51.4],
            'France': [2.2, 48.5],
            'Gabon': [9.26, 0.25],
            'United Kingdom': [-0.05, 51.36],
            'Georgia': [44.5, 41.43],
            'Ghana': [-0.06, 5.35],
            'Guinea': [-13.49, 9.29],
            'Gambia': [-16.4, 13.28],
            'Guinea Bissau': [-15.45, 11.45],
            'Equatorial Guinea': [8.5, 3.45],
            'Greece': [23.46, 37.58],
            'Greenland': [-51.35, 64.1],
            'Guatemala': [-90.22, 14.4],
            'French Guiana': [-52.18, 5.05],
            'Guyana': [-58.12, 6.5],
            'Honduras': [-87.14, 14.05],
            'Croatia': [15.58, 45.5],
            'Haiti': [-72.2, 18.4],
            'Hungary': [19.05, 47.29],
            'Indonesia': [106.49, -6.09],
            'India': [77.13, 28.37],
            'Ireland': [-6.15, 53.21],
            'Iran, Islamic Republic of': [51.3, 35.44],
            'Iraq': [44.3, 33.2],
            'Iceland': [-21.57, 64.1],
            'Israel': [35.12, 31.47],
            'Italy': [12.29, 41.54],
            'Jamaica': [-76.5, 18],
            'Jordan': [35.52, 31.57],
            'Kazakhstan': [71.3, 51.1],
            'Kenya': [36.48, -1.17],
            'Kyrgyzstan': [74.46, 42.54],
            'Cambodia': [104.55, 11.33],
            'Korea, Republic of': [126.58, 37.31],
            'Kuwait': [48, 29.3],
            'Lebanon': [35.31, 33.53],
            'Liberia': [-10.47, 6.18],
            'Libya': [13.07, 32.49],
            'Lesotho': [27.3, -29.18],
            'Lithuania': [25.19, 54.38],
            'Luxembourg': [6.09, 49.37],
            'Latvia': [24.08, 56.53],
            'Moldova': [28.5, 47.02],
            'Madagascar': [47.31, -18.55],
            'Mexico': [-99.1, 19.2],
            'Macedonia': [21.26, 42.01],
            'Mali': [-7.55, 12.34],
            'Myanmar': [96.2, 16.45],
            'Mozambique': [32.32, -25.58],
            'Mauritania': [57.3, -20.1],
            'Malawi': [33.48, -14],
            'Malaysia': [101.41, 3.09],
            'Namibia': [17.04, -22.35],
            'New Caledonia': [166.3, -22.17],
            'Niger': [2.06, 13.27],
            'Nigeria': [7.32, 9.05],
            'Nicaragua': [-86.2, 12.06],
            'Netherlands': [4.54, 52.23],
            'Norway': [10.45, 59.55],
            'Nepal': [85.2, 27.45],
            'New Zealand': [174.46, -41.19],
            'Oman': [58.36, 23.37],
            'Pakistan': [73.1, 33.4],
            'Panama': [-79.25, 9],
            'Peru': [-77, -12],
            'Philippines': [121.03, 14.4],
            'Papua New Guinea': [147.08, -9.24],
            'Poland': [21, 52.13],
            'Puerto Rico': [-66.07, 18.28],
            'Portugal': [-9.1, 38.42],
            'Paraguay': [-57.3, -25.1],
            'Qatar': [51.35, 25.15],
            'Romania': [26.1, 44.27],
            'Russian Federation': [37.35, 55.45],
            'Saudi Arabia': [46.42, 24.41],
            'Sudan': [32.35, 15.31],
            'Senegal': [-17.29, 14.34],
            'Solomon Islands': [159.57, -9.27],
            'Sierra Leone': [-13.17, 8.3],
            'El Salvador': [-89.1, 13.4],
            'Somalia': [45.25, 2.02],
            'Suriname': [-55.1, 5.5],
            'Slovakia': [17.07, 48.1],
            'Slovenia': [14.33, 46.04],
            'Sweden': [18.03, 59.2],
            'Swaziland': [31.06, -26.18],
            'Syrian Arab Republic': [36.18, 33.3],
            'Chad': [14.59, 12.1],
            'Togo': [1.2, 6.09],
            'Thailand': [100.35, 13.45],
            'Tajikistan': [68.48, 38.33],
            'Turkmenistan': [57.5, 38],
            'East Timor': [125.34, -8.29],
            'Tunisia': [10.11, 36.5],
            'Turkey': [32.54, 39.57],
            'United Republic of Tanzania': [35.45, -6.08],
            'Uganda': [32.3, 0.2],
            'Ukraine': [30.28, 50.3],
            'Uruguay': [-56.11, -34.5],
            'United States': [-77.02, 39.91],
            'Uzbekistan': [69.1, 41.2],
            'Venezuela, Bolivarian Republic of': [-66.55, 10.3],
            'Vanuatu': [168.18, -17.45],
            'South Africa': [28.12, -25.44],
            'Zambia': [28.16, -15.28],
            'Zimbabwe': [31.02, -17.43],
            'Taiwan, Province of China': [121.50, 25.05],
            'Hong Kong': [114.08, 22.17]
        };
        let option_geo = {
            baseOption: {
                backgroundColor: '#323C5C',
                animationDurationUpdate: 600,
                animationEasingUpdate: 'quinticInOut',
                title: {
                    text: 'Globe Security Events',
                    left: 'center',
                    top: 110,
                    textStyle: {
                        fontSize: 24,
                        fontWeight: 400,
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    formatter: function (params) {
                        if ('value' in params.data) {
                            return params.data.value[4] + ': ' + params.data.value[3];
                        }
                    }
                },
                timeline: {
                    show: false,
                    axisType: 'category',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 3000,
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
                },
                geo: {
                    map: 'world',
                    roam: false,
                    zoom: 1,
                    scaleLimit: {min: 1, max: 1},
                    label: {
                        emphasis: {
                            show: true,
                            textstyle: {
                                color: '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#4b5984',
                            borderColor: '#323C5C',
                            color: '#323C5C',
                            textstyle: {
                                color: '#ffffff'
                            }
                        },
                        emphasis: {
                            areaColor: '#ffffff',
                            color: '#323C5C',
                            textstyle: {
                                color: '#323c5c'
                            }
                        }
                    },
                    left: 150,
                    top: 200,
                    right: 200,
                    bottom: 180
                },
                series: [
                    {
                        id: 'map',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        showEffectOn: 'render',
                        rippleEffect: {
                            scale: 6,
                            brushType: 'fill'
                        },
                        hoverAnimation: true,
                        zlevel: 1
                    }
                ]
            },
            options: []
        };

        // world.json国家使用完整名称，首都经纬度也使用完整名称，但后台收集返回的数据确实简写，因此需要转换为完整的名称
        geoData = {};
        country.forEach(function (item) {
            if (capital[item.name] && data1[item.codec.toLowerCase()]) {
                geoData[item.name] = {
                    name: item.name,
                    value: capital[item.name].concat(data1[item.codec.toLowerCase()] / 10, data1[item.codec.toLowerCase()], item.name)
                };
            }
        });
        // 转为数组并倒序排列
        geoData_value = gainObjectValues(geoData).sort(function (a, b) {
            return b.value[3] - a.value[3];
        });
        // 获取前10大国家数据
        geoData_value_10 = geoData_value.slice(0, 10).reverse();
        max1 = geoData_value_10[geoData_value_10.length - 1].value[3];

        // 从geoData_value中随机获取元素
        for (let i = 0; i < 20; i++) {
            // 首先随机获取1个展示国家的个数
            let randomNumber = parseInt(geoData_value.length / 1.6 + Math.random() * (geoData_value.length / 1.2 - geoData_value.length / 1.6), 10);

            option_geo.options.push({
                visualMap: {
                    seriesIndex: 0,
                    show: false,
                    min: 0,
                    max: max1,
                    dimension: 3,
                    inRange: {
                        color: ['#f06c2b', '#f44336']
                    }
                },
                series: [
                    {
                        id: 'map',
                        name: 'virus respect',
                        data: gainRandomItem(randomNumber, geoData_value, geoData_value_10),
                        symbolSize: function (val) {
                            Math.log2 = Math.log2 || function (x) {
                                    return Math.log(x) * Math.LOG2E;
                                };

                            return Math.log2(val[2]);
                        }
                    }
                ]
            });
        }

        let geoDom = $('<div class="echarts"/>');
        $('#event-section1 .wrape').append(geoDom);
        let geoDom_echarts = echarts.init(geoDom[0]);
        geoDom_echarts.setOption(option_geo);

        // data2转换格式后排序
        data2 = gainObjectEntries(data2).sort(function (a, b) {
            return a[1] - b[1];
        });
        min2 = data2[0][1];
        max2 = data2[data2.length - 1][1];

        // 获取data3最大值
        max3 = gainObjectValues(gainObjectValues(data3).sort(function (a, b) {
            return gainObjectValues(b) - gainObjectValues(a);
        })[0]);
        for (let i = 0; i < data3.length; i++) {
            $.merge(data3_keys, gainObjectKeys(data3[i]));
            $.merge(data3_values, gainObjectValues(data3[i]));
        }

        let option_charts = {
            backgroundColor: '#323C5C',
            title: [
                {
                    text: 'Today\’s top 10 affected areas',
                    left: '1%',
                    top: '5%',
                    textStyle: {
                        fontFamily: "HelveticaNeue-Light, sans-serif",
                        fontSize: 18,
                        fontWeight: 200,
                        color: '#ffffff'
                    }
                },
                {
                    text: 'Today\'s top 10 viruses',
                    left: '55%',
                    top: '5%',
                    textStyle: {
                        fontFamily: "HelveticaNeue-Light, sans-serif",
                        fontSize: 18,
                        fontWeight: 200,
                        color: '#ffffff'
                    }
                },
                {
                    text: 'Trends in security threats',
                    left: '1%',
                    top: '42%',
                    textStyle: {
                        fontFamily: "HelveticaNeue-Light, sans-serif",
                        fontSize: 18,
                        fontWeight: 200,
                        color: '#ffffff'
                    }
                }
            ],
            visualMap: [
                {
                    seriesIndex: 0,
                    show: false,
                    min: 0,
                    max: max1,
                    dimension: 0,
                    inRange: {
                        color: ['#ff8e00', '#ff0000']
                    }
                },
                {
                    seriesIndex: 1,
                    show: false,
                    min: 0,
                    max: max2,
                    dimension: 0,
                    inRange: {
                        color: ['#ff8e00', '#ff0000']
                    }
                }
            ],
            grid: [
                {
                    left: '0%',
                    right: '55%',
                    top: '10%',
                    bottom: '60%',
                    containLabel: true
                },
                {
                    left: '55%',
                    right: '5%',
                    top: '10%',
                    bottom: '60%',
                    containLabel: true
                },
                {
                    left: '1%',
                    right: '3%',
                    top: '50%',
                    bottom: '11%',
                    containLabel: true
                }
            ],
            xAxis: [
                {
                    gridIndex: 0,
                    min: 0,
                    max: max1,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    gridIndex: 1,
                    min: 0,
                    max: max2,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    gridIndex: 2,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ffffff'
                        }
                    },
                    axisLabel: {
                        show: true,
                        margin: 20,
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['#3c4664', '#47506d']
                        }
                    },
                    data: data3_keys
                }
            ],
            yAxis: [
                {
                    gridIndex: 0,
                    type: 'category',
                    axisLabel: {
                        show: true,
                        margin: 12,
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    data: geoData_value_10.map(function (item) {
                        return item.name
                    })
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    axisLabel: {
                        show: true,
                        margin: 12,
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    data: data2.map(function (item) {
                        return item[0]
                    })
                },
                {
                    gridIndex: 2,
                    min: 0,
                    max: ((_max3_tmp = Math.ceil(max3 * 1.2 / Math.pow(10, (max3.toString().length - 2)))) % 2 == 0 ? _max3_tmp : _max3_tmp + 1) * (Math.pow(10, (max3.toString().length - 2))),
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ffffff'
                        }
                    },
                    axisLabel: {
                        show: true,
                        margin: 20,
                        textStyle: {
                            color: '#ffffff'
                        },
                        formatter: function (value, _) {
                            return (value / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    tooltip: {
                        show: false
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            offset: [20, 0],
                            textStyle: {
                                color: '#ffffff'
                            },
                            formatter: function (params) {
                                return (params.value).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                            }
                        }
                    },
                    barWidth: '50%',
                    data: geoData_value_10.map(function (item) {
                        return item.value[3]
                    })
                },
                {
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    tooltip: {
                        show: false
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            offset: [20, 0],
                            textStyle: {
                                color: '#ffffff'
                            },
                            formatter: function (params) {
                                return (params.value).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                            }
                        }
                    },
                    barWidth: '50%',
                    data: data2.map(function (item) {
                        return item[1]
                    })
                },
                {
                    type: 'line',
                    name: 'Number of security threats',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 1,
                                color: '#ffffff'
                            }, {
                                offset: 0,
                                color: '#ffffff'
                            }], false),
                            opacity: 0.2
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#ffffff',
                            opacity: 0.5
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffffff',
                            borderColor: '#ffffff',
                            borderWidth: 3
                        },
                        emphasis: {
                            color: '#ffffff',
                            borderColor: '#ffffff',
                            borderWidth: 5
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            offset: [0, 20],
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 12
                            },
                            formatter: function (params) {
                                return (params.value / 1000).toFixed(1);
                            }
                        }
                    },
                    data: data3_values
                }
            ]
        };

        let dom_charts = $('<div class="echarts"/>');
        $('#event-section2 .wrape').append(dom_charts);
        let dom_charts_echarts = echarts.init(dom_charts[0]);
        dom_charts_echarts.setOption(option_charts);

        $(window).resize(function () {
            geoDom.css({
                width: dom.parent().width,
                height: dom.parent().height
            });
            geoDom_echarts.resize();

            dom_charts.css({
                width: dom.parent().width,
                height: dom.parent().height
            });
            dom_charts_echarts.resize();
        });
    })
    .fail(function (err) {
        console.log(err);
    });

function gainObjectKeys(obj) {
    let keys = [];
    for (let k in obj) {
        keys.push(k);
    }

    return keys;
}

function gainObjectValues(obj) {
    let values = [];
    for (let v in obj) {
        values.push(obj[v]);
    }

    return values;
}

function gainObjectEntries(obj) {
    let entries = [];
    for (let k in obj) {
        entries.push([k, obj[k]]);
    }

    return entries;
}

function gainRandomItem(randomNumber, geoData_value, geoData_value_10) {
    let key, keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], sampleData = [];

    for (let j = 0; j < randomNumber; j++) {
        key = Math.floor((Math.random() + 0.001) * (geoData_value.length - 1));

        if (keys.indexOf(key) === -1) {
            keys.push(key);
            sampleData.push(geoData_value[key]);
        }
    }
    sampleData = sampleData.concat(geoData_value_10);

    return sampleData;
}