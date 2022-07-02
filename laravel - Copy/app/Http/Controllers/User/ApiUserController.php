<?php

namespace App\Http\Controllers\User;

use App\Models\Question\Question;
use App\Models\Authorization\User;
use App\Models\Question\QuestionType;
use App\Models\Question\QuestionAnswer;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;


class ApiUserController extends BaseController
{
    // TODO: formatting, refactoring, methods extracting, add docs, just make prettier
    // error handling, validating, auth
    public function getUsers()
    {
        $users = User::select([
            'id',
            'first_name as firstName',
            'last_name as lastName',
            'username',
            'email',
            'is_admin as isAdmin'
        ])
        ->get()
        ->toArray();
        
        return response()->json(array_values($users), 200);
    }

    public function updateUser()
    {
        $data = request()->all();

        try {
        $user = User::findOrFail($data['id']);
        $user->first_name = $data['firstName'];
        $user->last_name = $data['lastName'];
        $user->username = $data['username'];
        $user->email = $data['email'];    
        $user->password = Hash::make($data['password']);
        $user->is_admin = $data['isAdmin'] === 'true' ? 1 : 0;
        $user->save();
        } catch(\Throwable $t) {
            return response("Oops something went wrong!", 500);
        }
       
        unset($data['password']);

        return response()->json($data, 200);
    }

    public function saveUser()
    {
        $data = request()->all();

        try {
        $user = new User();
        $user->first_name = $data['firstName'];
        $user->last_name = $data['lastName'];
        $user->username = $data['username'];
        $user->email = $data['email'];    
        $user->password = Hash::make($data['password']);
        $user->is_admin = $data['isAdmin'] === 'true' ? 1 : 0;
        $user->created_by = 1;
        $user->save();
        } catch(\Throwable $t) {
            return response($t->getMessage(), 500); //TODO: handle errors
        }
       
        unset($data['password']);
        $data['id'] = $user->id;

        return response()->json($data, 200);
    }

    public function deleteUser()
    {
        $id = request()->id;
        
        User::where('id', '=', $id)->delete();

        return response()->json('', 200);
    }
}