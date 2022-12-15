<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Enums\ProjectStatus;
use App\Http\Requests\ProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = $request->filter <= 2 && $request->filter >= 0 ? $request->filter : '%';

        $data = Project::where('status',  $filter === '%' ? 'LIKE' : '=', $filter)->with('contacts')->paginate(10);
        return Response::json($data, 200, [], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
    }

    public function create(ProjectRequest $request)
    {
        $validate = $request->validated();

        $project = Project::create($validate);

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
        $validate = $request->validated();

        $project = Project::where('id', $id)->with('contacts')->first();
        if($project === NULL) return Response::json(NULL, 404);
        $oldValues = $project->getOriginal();

        $project->update($validate);
        //dispatch job to send email

        return Response::json('OK', 200);
    }

    public function destroy($id)
    {
        $project = Project::where('id', $id)->with('contacts')->first();
        if($project === NULL) return Response::json(NULL, 404);

        $contacts = $project->contacts;
        $project->delete();

        //dispatch job to send email about removal
        return Response::json("DELETED", 200, []);
    }
}
