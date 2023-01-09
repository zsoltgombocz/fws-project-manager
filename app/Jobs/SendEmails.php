<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ProjectChanged;

class SendEmails implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $contactList;
    protected $old;
    protected $data;
    public function __construct($contacts, $old, $data)
    {
        $this->contactList = $contacts;
        $this->old = $old;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach($this->contactList as $contact) {
            Mail::to($contact->email)->send(new ProjectChanged($contact->name, $this->old, $this->data));
        }
    }
}
