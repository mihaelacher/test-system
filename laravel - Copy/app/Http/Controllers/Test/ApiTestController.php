<?php

namespace App\Http\Controllers\Test;

use Illuminate\Routing\Controller as BaseController;
use App\Models\Test\Test;

class ApiTestController extends BaseController
{
    // TODO: formatting, refactoring, methods extracting, add docs, just make prettier
    // error handling, validating, auth
    public function getTests()
    {
        return response()->json(Test::all()->toArray(), 200);
    }

    public function saveTest()
    {

    }

    public function updateTest()
    {

    }

    public function deleteTest()
    {
        
    }
}