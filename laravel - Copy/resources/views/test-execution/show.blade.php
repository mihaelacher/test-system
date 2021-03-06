@extends('content', ['title' => 'Test Execution'])
@section('sub-content')
    <div class="form-container">
        @can('evaluate', $testExecution)
            <a class="btn btn-success" href="/testexecution/{{ $testExecution->id }}/evaluate/">Evaluate</a>
        @endcan
        <div class="row">
            <div class="form-group mt-3">
                <label class="label-text">START TIME</label>
                <p>{{ $testExecution->start_time }}</p>
            </div>
            <div class="form-group mt-3">
                <label class="label-text">END TIME</label>
                <p>{{ $testExecution->end_time }}</p>
            </div>
            <div class="form-group mt-3">
                <label class="label-text">RESULT POINTS</label>
                <p>{{ $testExecution->result_points }}</p>
            </div>
            @foreach($questions as $index => $question)
                @php
                $questionTypeId = $question->question_type_id;
                @endphp
                <div class="form-group mt-3">
                    <label class="label-text">QUESTION {{ $index + 1 }}</label>
                    <p>{{ $question->text }}</p>
                </div>
                @if(in_array($question->question_type_id, \App\Models\Question\QuestionType::OPEN_QUESTIONS))
                    <div class="col-md-12">
                        <label class="col-md-3 control-label left">Answer:</label>
                        <div class="col-md-8">
                            <p class="form-control-plaintext">
                                @switch($question->question_type_id)
                                    @case(\App\Models\Question\QuestionType::TEXT_SHORT)
                                    {{ $question->response_text_short }}
                                    @break
                                    @case(\App\Models\Question\QuestionType::TEXT_LONG)
                                    {{ $question->response_text_long }}
                                    @break
                                    @case(\App\Models\Question\QuestionType::NUMERIC)
                                    {{ $question->response_numeric }}
                                    @break
                                @endswitch
                            </p>
                        </div>
                    </div>
                @else
                    @foreach($question->answers as $answer)
                        @php
                            $testExecutionAnswers = explode(',', $question->closed_question_answers);
                        @endphp
                        <div class="col-md-12">
                            <div class="form-group col-md-1 mt-3">
                                <input class="disabled" disabled
                                       @if($questionTypeId === \App\Models\Question\QuestionType::MULTIPLE_CHOICE)
                                       type="checkbox"
                                       @else
                                       type="radio"
                                       @endif
                                       @if(in_array($answer->id, $testExecutionAnswers)) checked @endif />
                            </div>
                            <div class="form-group col-md-7 mt-3">
                                <p @if($answer->is_correct ===1) class="text-success" @endif>{{ $answer->value }}</p>
                            </div>
                        </div>
                    @endforeach
                @endif
            @endforeach
        </div>
@endsection
