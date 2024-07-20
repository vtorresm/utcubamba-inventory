<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('bill_no');
            $table->string('customer_name');
            $table->string('customer_address')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('date_time');
            $table->string('gross_amount');
            $table->string('currency')->nullable();
            $table->decimal('grand_total', 10, 2);
            $table->string('service_charge_rate')->nullable();
            $table->string('service_charge');
            $table->string('igv_charge_rate')->nullable();
            $table->string('igv_charge')->nullable();
            $table->string('net_amount')->nullable();
            $table->string('discount_rate', 10, 2)->nullable();
            $table->enum('paid_status', ['En Proceso', 'Entregado', 'Pagado', 'Anulado'])->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
