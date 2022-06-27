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

Route::get('/question', 'Question\QuestionController@getQuestions');
Route::post('/question', 'Question\QuestionController@saveQuestion');
Route::put('/question/{id}', 'Question\QuestionController@updateQuestion');
Route::delete('/question/{id}', 'Question\QuestionController@deleteQuestion');
Route::get('/questionType', 'Question\QuestionController@getQuestionTypes');


Route::get('/test', 'Test\TestController@getTests');
Route::post('/test', 'Test\TestController@saveTest');
Route::put('/test/{id}', 'Test\TestController@updateTest');
Route::delete('/test/{id}', 'Test\TestController@deleteTest');
