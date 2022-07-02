<?php

namespace App\Http\Controllers\Question;

use App\Models\Question\Question;
use App\Models\Question\QuestionType;
use App\Models\Question\QuestionAnswer;
use Illuminate\Routing\Controller as BaseController;

class ApiQuestionController extends BaseController
{
    // TODO: formatting, refactoring, methods extracting, add docs, just make prettier
    // error handling, validating, auth
        public function getQuestions()
    {
        $questions = Question::join('question_types as qt', 'qt.id', '=', 'questions.question_type_id')
            ->select([
                'questions.id',
                'questions.text',
                'questions.instruction',
                'qt.name as questionType',
                'qt.id as questionTypeId',
                'questions.points'
            ])
            ->get()
            ->keyBy('id')
            ->toArray();
        
        $answers = QuestionAnswer::whereIn('question_id', array_column($questions, 'id'))
        ->select([
            'question_id', 'value', 'is_correct', 'order_num'
        ])
        ->orderBy('order_num')
        ->get()
        ->groupBy('question_id')
        ->toArray();

        foreach($questions as $questionId => &$question) {
            if (!isset($answers[$questionId])) {
                continue;
            }
            $questionAnswers = $answers[$questionId];

            foreach($questionAnswers as $answer) {
                $question['answer'][$answer['order_num']] = $answer['value'];

                if (!isset($question['isCorrect'])) {
                    $question['isCorrect'] = [];
                }
                
                $question['isCorrect'][$answer['order_num']] = $answer['is_correct'];
            }
            
        }

        return response()->json(array_values($questions), 200);
    }

    public function getQuestionTypes()
    {
        return response()->json(QuestionType::all()->toArray(), 200);
    }

    public function updateQuestion()
    {
        $data = request()->all();

        try {
            Question::findOrFail($data['id'])
            ->update([
                'text' => $data['text'],
                'instruction' => $data['instruction'],
                'question_type_id' => $data['questionTypeId'],
                'points' => $data['points'],
                'updated_by' => 1,
        ]);

        QuestionAnswer::where('id', '=', $data['id'])->delete();
        
        if (isset($data['answer'])) {
             $answersForInsert = [];

            foreach($data['answer'] as $index => $value) {
                $answersForInsert[] = [
                    'value' => $value,
                    'order_num' => $index,
                    'question_id' => $data['id'],
                    'is_correct' => isset($data['isCorrect'][$index]) ? 1 : 0,
                    'created_by' => 1,
                    'updated_by' => 1
                ];
            }

        QuestionAnswer::insert($answersForInsert);
        }
        
        } catch(\Throwable $t) {
            return response($t->getMessage(), 500);
        }
       
        return response()->json($data, 200);
    }

    public function saveQuestion()
    {
          $data = request()->all();

        $question = new Question();
         $question->text = $data['text'];
         $question->instruction = $data['instruction'];
         $question->question_type_id = $data['questionTypeId'];
         $question->points = $data['points'];
         $question->created_by = 1;
         $question->updated_by = 1;
         $question->save();
       
        if (isset($data['answer'])) {
             $answersForInsert = [];

            foreach($data['answer'] as $index => $value) {
                $answersForInsert[] = [
                    'value' => $value,
                    'order_num' => $index + 1,
                    'question_id' => $data['id'],
                    'is_correct' => isset($data['isCorrect'][$index]) ? 1 : 0,
                    'created_by' => 1,
                    'updated_by' => 1
                ];
            }

        QuestionAnswer::insert($answersForInsert);
        }

        $data['id'] = $question->id;

        return response()->json($data, 200);
    }

    public function deleteQuestion()
    {
        $id = request()->id;
        QuestionAnswer::where('id', '=', $id)->delete();
        Question::where('id', '=', $id)->delete();

        return response()->json('', 200);
    }
}