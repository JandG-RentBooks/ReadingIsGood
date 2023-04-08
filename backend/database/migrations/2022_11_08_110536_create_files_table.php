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
        Schema::create('files', function (Blueprint $table) {
            $table->id();

            $table->string('name')->comment('Publikus elnevezés');

            $table->string('path')->comment('Elérési útvonal');

            $table->string('file_name')->comment('Fájl elnevezés');

            $table->string('file_type')->comment('Fájl kiterjesztése');

            $table->string('file_size')->comment('Fájl mérete');

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
        Schema::dropIfExists('files');
    }
};
