<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'description' => 'required|max:2048',
            'status' => 'required|numeric|between:0,2',
            'contacts' => 'sometimes|array',
            'contacts.*' => 'integer'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Projekt nevének kitöltése kötelező!',
            'name.max' => 'A projekt neve nem haladhatja meg a 255 karaktert!',
            'description.required' => 'Projekt leírása kötelező!',
            'description.max' => 'A projekt leírása nem haladhatja meg a 2048 karaktert!',
            'status.required' => 'Státusz megadása kötelező!',
            'status.numeric' => 'A státusz típusa csak szám lehet!',
            'status.between' => 'A státusznak 0 és 2 közé kell esnie!',
        ];
    }
}
