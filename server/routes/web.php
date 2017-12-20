<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', ['uses' => 'FrontController@home']);
$app->get('/events', ['uses' => 'FrontController@events']);
$app->get('/reports/{type}', ['uses' => 'FrontController@reports']);
$app->get('/successCase', ['uses' => 'FrontController@successCase']);

$app->get('/reportsDetail/{type}', ['uses' => 'FrontController@reportsDetail']);
$app->get('/eventSummary', ['uses' => 'FrontController@eventSummary']);
$app->get('/mobileVirusMap', ['uses' => 'FrontController@mobileVirusMap']);
$app->get('/mobileTopVirus', ['uses' => 'FrontController@mobileTopVirus']);
$app->get('/mobileVirusIncrease', ['uses' => 'FrontController@mobileVirusIncrease']);

$app->get('/reportsPage/{type}/{page}', ['uses' => 'FrontController@reportsPage']);
$app->get('/mobileReportsDetail/{md5}', ['uses' => 'FrontController@mobileReportsDetail']);
$app->get('/mobileVulnerabilitiesDetail/{cve}', ['uses' => 'FrontController@mobileVulnerabilitiesDetail']);

$app->get('/version', ['uses' => 'FrontController@version']);
