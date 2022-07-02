<?php

namespace App\Http\Controllers\Test;

use Illuminate\Routing\Controller as BaseController;
use App\Models\Test\Test;
use App\Models\Test\TestQuestions;

class ApiTestController extends BaseController
{
    // TODO: formatting, refactoring, methods extracting, add docs, just make prettier
    // error handling, validating, auth
    public function getTests()
    {
        $tests = Test::select([
            'tests.id',
            'tests.name',
            'tests.intro_text as introText',
            'tests.max_duration as maxDuration'    
        ])
        ->get()
        ->toArray();
        return response()->json($tests, 200);
    }

    public function saveTest()
    {
        $data = request()->all();

        $test = new Test();
        $test->name = $data['name'];
        $test->intro_text = $data['introText'];
        $test->max_duration = $data['maxDuration'];
        $test->save();

        $data['id'] = $test->id;

        $testQuestionsForInsert = [];
        foreach ($data['questionIds'] as $index => $questionId) {
            $testQuestionsForInsert[] = [
                'test_id' => $test->id,
                'question_id' => $questionId,
                'order_num' => $index
            ];
        }

        TestQuestions::insert($testQuestionsForInsert); // TODO rename model

        return response()->json($data, 200);
    }

    public function updateTest()
    {
        $data = request()->all();

        $test = Test::findOrFail($data['id']);
        $test->name = $data['name'];
        $test->intro_text = $data['introText'];
        $test->max_duration = $data['maxDuration'];
        $test->save();


        TestQuestions::where('test_id', $test->id)->delete();

        $testQuestionsForInsert = [];
        foreach ($data['questionIds'] as $index => $questionId) {
            $testQuestionsForInsert[] = [
                'test_id' => $test->id,
                'question_id' => $questionId,
                'order_num' => $index
            ];
        }

        TestQuestions::insert($testQuestionsForInsert);

        return response()->json($data, 200);
    }

    public function deleteTest()
    {
        $id = request()->id;

        TestQuestions::where('test_id', $id)->delete();
        Test::where('id', '=', $id)->delete();

        return response()->json('', 200);
    }
}