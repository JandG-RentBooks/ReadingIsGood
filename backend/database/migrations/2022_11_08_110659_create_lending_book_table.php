<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lending_book', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lending_id')
                ->references('id')
                ->on('lendings')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('book_id')
                ->references('id')
                ->on('books')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->boolean('is_back')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lending_book');
    }
};
