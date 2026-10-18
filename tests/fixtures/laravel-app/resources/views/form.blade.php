<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Laravel example · Nexaline UI</title>
  <link rel="stylesheet" href="/assets/nexaline.min.css">
</head>
<body>
  <main class="nx-container" style="max-width: 42rem; padding-block: 3rem">
    <h1>Laravel example</h1>
    <p>Blade validation and CSRF protection using Nexaline UI.</p>
    @if (session('saved'))
      <div class="nx-alert nx-alert--success" role="status">Customer saved.</div>
    @endif
    <form method="POST" action="/customers" class="nx-card">
      @csrf
      <div class="nx-card__body">
        <div class="nx-field">
          <label class="nx-label" for="laravel-email">Email</label>
          <input class="nx-input" id="laravel-email" name="email" type="email" aria-describedby="laravel-email-error" @error('email') aria-invalid="true" @enderror>
          @error('email')
            <p class="nx-field__error" id="laravel-email-error">{{ $message }}</p>
          @enderror
        </div>
        <button class="nx-btn nx-btn--primary" type="submit">Save customer</button>
      </div>
    </form>
  </main>
  <script src="/assets/nexaline.min.js"></script>
  <script>window.NexalineUI.init();</script>
</body>
</html>
