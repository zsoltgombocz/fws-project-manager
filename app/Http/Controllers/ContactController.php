<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

use App\Http\Requests\ContactRequest;


class ContactController extends Controller
{
    public function create(ContactRequest $request)
    {
        $validate = $request->validated();

        $contact = Contact::create($validate);

        return Response::json($contact, 200);
    }

    public function update(ContactRequest $request, $id)
    {
        $validate = $request->validated();

        $contact = Contact::where('id', $id)->first();
        if($contact === NULL) return Response::json(['message' => 'Contact not found!'], 404);

        $contact->update($validate);

        return Response::json('OK', 200);
    }

    public function destroy($id)
    {
        $contact = Contact::where('id', $id)->first();
        if($contact === NULL) return Response::json(['message' => 'Contact not found!'], 404);

        $contact->delete();
        return Response::json("DELETED", 200, []);
    }

    public function assign($contactId, $projectId) {
        $contact = Contact::where('id', $contactId)->first();
        if($contact === NULL) return Response::json(['message' => 'Contact not found!'], 404);
        //If getting -1 for projectId remove the contact from

        if($projectId === "-1") {
            $contact->project_id = NULL;
        }else{
            $project = Project::where('id', $projectId)->with('contacts')->first();
            if($project === NULL) return Response::json(['message' => 'Project not found!'], 404);

            $contact->project_id = $projectId;
        }

        $contact->save();
        return Response::json($projectId === "-1" ? "REMOVED" : "OK", 200);
    }
}
