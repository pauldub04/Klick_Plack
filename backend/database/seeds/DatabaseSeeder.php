<?php
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
 
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin'),
            'coins' => 0,
            'bought' => json_encode(array(0,0)),
            'onClick' => 1,
        ]);        
   
        User::create([
            'name' => 'User',
            'email' => 'user@test.com',
            'password' => Hash::make('user'),
            'coins' => 0,
            'bought' => json_encode(array(0,0)),
            'onClick' => 1,
        ]);
    }
}