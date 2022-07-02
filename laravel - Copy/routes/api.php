<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/question', 'Question\ApiQuestionController@getQuestions');
Route::post('/question', 'Question\ApiQuestionController@saveQuestion');
Route::put('/question/{id}', 'Question\ApiQuestionController@updateQuestion');
Route::delete('/question/{id}', 'Question\ApiQuestionController@deleteQuestion');
Route::get('/questionType', 'Question\ApiQuestionController@getQuestionTypes');


Route::get('/test', 'Test\ApiTestController@getTests');
Route::post('/test', 'Test\ApiTestController@saveTest');
Route::put('/test/{id}', 'Test\ApiTestController@updateTest');
Route::delete('/test/{id}', 'Test\ApiTestController@deleteTest');


Route::get('/user', 'User\ApiUserController@getUsers');
Route::post('/user', 'User\ApiUserController@saveUser');
Route::put('/user/{id}', 'User\ApiUserController@updateUser');
Route::delete('/user/{id}', 'User\ApiUserController@deleteUser');
