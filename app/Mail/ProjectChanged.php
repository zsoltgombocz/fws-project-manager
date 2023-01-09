<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Log;

class ProjectChanged extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    //Public variables can be accessed in the view file
    public $name;
    public $old;
    public $data;
    public $columnMap = [
        'name' => 'Project neve',
        'description' => 'Project leírása',
        'status' => 'Project státusza',
    ];

    public $statusMap = [
        'Fejlesztésre vár',
        'Folyamatban',
        'Kész',
    ];

    public function __construct($name, $old, $data)
    {
        $this->name = $name;
        $this->old = $old;
        $this->data = $data;

        $this->old['status'] = $this->statusMap[$this->old['status']];

        if(isset($this->data['status'])) {
            $this->data['status'] = $this->statusMap[$this->data['status']];
        }
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            from: new Address('fwsteam@email.com', 'FWS Team'),
            subject: 'Project megváltozott!',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            markdown: 'emails.project.changed',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
