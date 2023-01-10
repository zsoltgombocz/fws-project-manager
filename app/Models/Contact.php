<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email'];

    //passing -1 as id removes from project
    public function assignToProject($projectId) {
        if($projectId === -1) {
            $this->project_id = NULL;
        }else{
            $this->project_id = $projectId;
        }

        $this->save();
    }
}
