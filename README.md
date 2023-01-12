## Requirements
- PHP 8 or higher
- Composer
- NodeJS (+ npm package manager)
- MySQL

## Initialize
Run these commands to fully initialize the project. The force flag needs for a vite plugin, running without force cause dependency error.
```
composer upgrade
npm i --force
copy .env.example .env
```

Run a local database and fill the .env DB_ fields. Create the database for the application according to DB_DATABASE. After establishing connection run these:
If needed some test data, run the seed command, if not just skip. 
```
php artisan migration:fresh
php artisan db:seed --class=ProjectSeeder
```

## Starting the project
The artisan serve will be serving the Laravel API, the npm command will be serving the frontend, and running the last artisan queue command will be watching for the incoming jobs (email sending). Also make sure to fill the MAIL_ fields in the .env to send emails, furthermore for me in local Avast blocked smtp connection so double check antivirus softwares.
```
php artisan serve
npm run dev
php artisan queue:listen
```
