@component('mail::message')
# Hello {{ $name }},

@component('mail::table')
| Adatok       | Régi       | Új       |
| :------ | :------ | :------ |
@foreach ($data as $colName => $value)
    @if ($colName !== 'updated_at')
        | {{ $columnMap[$colName] }} | {{ $old[$colName] }} | {{ $value }} |
    @endif
@endforeach
@endcomponent

Frissítve: {{ $data['updated_at'] }}.

Üdvözlettel,

{{ config('app.name') }}
@endcomponent
