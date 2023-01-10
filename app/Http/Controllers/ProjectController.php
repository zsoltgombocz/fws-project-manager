<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Enums\ProjectStatus;
use App\Http\Requests\ProjectRequest;
use App\Jobs\SendEmails;
use App\Models\Contact;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $reqFilter = $request->filter;
        $all = $request->all !== NULL && $request->all;
        $filter = $reqFilter !== NULL && $reqFilter <= 2 && $reqFilter >= 0 ? $reqFilter : '%';

        //if count provided return with the count only, dont make unnecessary select - navbar extra
        if($all){
            $allProjectCount = Project::all()->count();
            return Response::json($allProjectCount, 200, [], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
        }else{
            $data = Project::where('status',  $filter === '%' ? 'LIKE' : '=', $filter)->with('contacts')->paginate(10);
            return Response::json($data, 200, [], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
        }
    }

    public function create(ProjectRequest $request)
    {
        $validate = $request->validated();
        $project = Project::create($validate);

        //assign all contact that has been passed with the payload
        $contacts = $validate['contacts'];
        if(count($contacts) > 0) {
            foreach($contacts as $contact) {
                $c = Contact::where('id', $contact)->first();
                if($c !== NULL) {
                    $c->assignToProject($project->id);
                }
            }
        }

        return Response::json($project, 200);
    }

    public function show($id)
    {
        $project = Project::where('id', $id)->with('contacts')->first();
        if($project === NULL) return Response::json(NULL, 404);

        return Response::json($project, 200, []);
    }

    public function update(ProjectRequest $request, $id)
    {
        $project = Project::where('id', $id)->with('contacts')->first();
        if($project !== NULL) {
            $validate = $request->validated();
            if($project === NULL) return Response::json(NULL, 404);
            $oldValues = $project->getOriginal();

            $project->update($validate);

            $project->updateContactList($validate['contacts']);

            //dispatch job to send email
            if($project->wasChanged()) {
                $contacts = $project->contacts;

                SendEmails::dispatch($contacts, $oldValues, $project->getChanges());
            }

            return Response::json($project, 200);
        }else return Response::json(NULL, 404);
    }

    public function destroy($id)
    {
        $project = Project::where('id', $id)->first();
        if($project === NULL) return Response::json(NULL, 404);

        $contacts = $project->contacts;
        $project->delete();

        //dispatch job to send email about removal
        return Response::json("DELETED", 200, []);
    }
}
