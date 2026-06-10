<?php

use App\Http\Enums\Roles;
use App\Mail\ResourceRequestMail;
use App\Models\Setting;
use App\Services\ResourceRequestService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;

uses(RefreshDatabase::class);

function validResourceRequestPayload(): array
{
    return [
        'resource' => 'Projetor Epson',
        'description' => 'Necessario para utilizacao em apresentacoes academicas.',
    ];
}

test('should send resource request with success as student', function () {
    Mail::fake();
    loginAs(Roles::STUDENT);
    Setting::create(['key' => 'request_email', 'value' => 'admin@example.com']);

    $payload = validResourceRequestPayload();

    $response = $this->postJson('/api/v1/resource-requests', $payload);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Requerimento enviado com sucesso.',
        ]);

    Mail::assertSent(ResourceRequestMail::class, function (ResourceRequestMail $mail) use ($payload) {
        return $mail->hasTo('admin@example.com')
            && $mail->resourceRequest === $payload;
    });
});

test('should send resource request with success as teacher', function () {
    Mail::fake();
    loginAs(Roles::TEACHER);
    Setting::create(['key' => 'request_email', 'value' => 'admin@example.com']);

    $response = $this->postJson('/api/v1/resource-requests', validResourceRequestPayload());

    $response->assertStatus(200);
    Mail::assertSent(ResourceRequestMail::class);
});

test('should return 401 when sending resource request without authentication', function () {
    $response = $this->postJson('/api/v1/resource-requests', [
        'resource' => 'Projetor Epson',
        'description' => 'Necessario para utilizacao em apresentacoes academicas.',
    ]);

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Usuário não autorizado.',
        ]);
});

test('should return 403 when admin tries to send resource request', function () {
    loginAs(Roles::ADMIN);

    $response = $this->postJson('/api/v1/resource-requests', validResourceRequestPayload());

    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Acesso negado. Você não tem permissão para executar esta ação.',
        ]);
});

test('should validate required fields when sending resource request', function () {
    loginAs(Roles::STUDENT);

    $response = $this->postJson('/api/v1/resource-requests', []);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Erro de validação',
        ])
        ->assertJsonValidationErrors(['resource', 'description']);
});

test('should validate resource request field rules', function () {
    loginAs(Roles::STUDENT);
    $response = $this->postJson('/api/v1/resource-requests', [
        'resource' => str_repeat('a', 101),
        'description' => str_repeat('a', 501),
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['resource', 'description']);

    $response = $this->postJson('/api/v1/resource-requests', [
        'resource' => 'Projetor 123',
        'description' => 'Descricao com numero 123',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['resource', 'description']);
});

test('should allow punctuation when sending resource request', function () {
    Mail::fake();
    loginAs(Roles::STUDENT);
    Setting::create(['key' => 'request_email', 'value' => 'admin@example.com']);

    $response = $this->postJson('/api/v1/resource-requests', [
        'resource' => 'Projetor Epson - auditório',
        'description' => 'Necessário para apresentações acadêmicas, aulas e eventos.',
    ]);

    $response->assertStatus(200);
    Mail::assertSent(ResourceRequestMail::class);
});

test('should return 500 when resource request service fails', function () {
    loginAs(Roles::STUDENT);

    $this->mock(ResourceRequestService::class, function ($mock) {
        $mock->shouldReceive('send')->once()->andReturnFalse();
    });

    $response = $this->postJson('/api/v1/resource-requests', validResourceRequestPayload());

    $response->assertStatus(500)
        ->assertJson([
            'success' => false,
            'message' => 'Ocorreu uma falha no servidor.',
        ]);
});

test('should not persist resource request data', function () {
    Mail::fake();
    loginAs(Roles::STUDENT);
    Setting::create(['key' => 'request_email', 'value' => 'admin@example.com']);

    $response = $this->postJson('/api/v1/resource-requests', validResourceRequestPayload());

    $response->assertStatus(200);
    expect(Schema::hasTable('resource_requests'))->toBeFalse();
});
