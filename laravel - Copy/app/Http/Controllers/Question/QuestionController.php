<?php

namespace App\Http\Controllers\Question;

use Illuminate\Routing\Controller as BaseController;
use App\Http\Requests\Question\QuestionCreateRequest;
use App\Http\Requests\Question\QuestionDestroyRequest;
use App\Http\Requests\Question\QuestionEditRequest;
use App\Http\Requests\Question\QuestionIndexRequest;
use App\Http\Requests\Question\QuestionShowRequest;
use App\Http\Requests\Question\QuestionStoreRequest;
use App\Http\Requests\Question\QuestionUpdateRequest;
use App\Models\Question\Question;
use App\Models\Question\QuestionType;
use App\Models\Question\QuestionAnswer;
use App\Services\QuestionService;
use App\Util\MessageUtil;
use Illuminate\Support\Facades\DB;

class QuestionController extends BaseController
{
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

    public function getQuestionAnswers()
    {
        $result = QuestionAnswer::where('question_id', request()->id)
            ->get()->groupBy('question_id')->toArray();

           return response()->json($result, 200);   
    }

    /**
     * @method GET
     * @uri /questions/index
     * @param QuestionIndexRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index(QuestionIndexRequest $request)
    {
        return view('question.index');
    }

    /**
     * @method GET
     * @uri /questions/{id}
     * @param QuestionShowRequest $request
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function show(QuestionShowRequest $request, int $id)
    {
        $question = Question::findOrFail($id);

        return view('question.show')
            ->with('question', $question);
    }

    /**
     * @method GET
     * @uri /questions/create
     * @param QuestionCreateRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create(QuestionCreateRequest $request)
    {
        return view('question.create')
            ->with('questionTypes', QuestionType::all()->sortBy('id'));
    }

    /**
     * @method POST
     * @uri /questions/store
     * @param QuestionStoreRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(QuestionStoreRequest $request)
    {
        QuestionService::handleQuestionOperations($request);

        MessageUtil::success('You have successfully created the question!');

        return redirect('/questions/index');
    }

    /**
     * @method GET
     * @uri /questions/{id}/edit
     * @param QuestionEditRequest $request
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit(QuestionEditRequest $request, $id)
    {
      return view('question.edit')
            ->with('questionTypes', QuestionType::all()->sortBy('id'))
            ->with('question', Question::findOrFail($id));
    }

    /**
     * @method POST
     * @uri /questions/{id}/update
     * @param QuestionUpdateRequest $request
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(QuestionUpdateRequest $request, $id)
    {
        QuestionService::handleQuestionOperations($request, $id);

        MessageUtil::success('You have successfully updated the question!');

        return redirect('/questions/' . $id);
    }

    /**
     * @method POST
     * @uri /questions/{id}/delete
     * @param QuestionDestroyRequest $request
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function delete(QuestionDestroyRequest $request, $id)
    {
        QuestionService::destroyQuestion($id);

        MessageUtil::success('You have successfully deleted the question!');

        return redirect('/questions/index');
    }
}
