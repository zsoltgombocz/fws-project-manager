<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

use App\Models\Contact;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'status'];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function updateContactList($list) {
        $oldList = $this->contacts->pluck('id')->all();
        sort($oldList, SORT_NUMERIC);
        sort($list, SORT_NUMERIC);

        if($oldList == $list) return;

        //Check the already assigned contacts still inside the updated contact list,
        //if not remove them using projectId -1
        foreach($oldList as $oldContact) {
            if(!in_array($oldContact, $list)) {
                $c = Contact::where('id', $oldContact)->first();
                if($c !== NULL) {
                    $c->assignToProject(-1);
                }
            }
        }

        //loop through the update list of contacts, and assign to the project, make sure not to assign
        //those who are already on the list aka the oldList contains them
        foreach($list as $contact) {
            if(!in_array($contact, $oldList)) {
                $c = Contact::where('id', $contact)->first();
                if($c !== NULL) {
                    $c->assignToProject($this->id);
                }
            }
        }
    }
}
