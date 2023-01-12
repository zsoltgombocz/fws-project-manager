<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'email' => 'required|unique:contacts,email,'.$this->id.'|max:255|email',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'A név kitöltése kötelező!',
            'name.max' => 'A név nem haladhatja meg a 255 karaktert!',
            'email.required' => 'E-mail megadása  kötelező!',
            'email.unique' => 'Az e-mail már használatba van!',
            'email.max' => 'Az e-mail nem haladhatja meg a 2048 karaktert!',
            'email.email' => 'Nem megfelelő e-mail formátum!',
        ];
    }
}
