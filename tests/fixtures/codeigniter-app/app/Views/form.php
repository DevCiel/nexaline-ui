<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CodeIgniter example · Nexaline UI</title>
  <link rel="stylesheet" href="/assets/nexaline.min.css">
</head>
<body>
  <main class="nx-container" style="max-width: 42rem; padding-block: 3rem">
    <h1>CodeIgniter example</h1>
    <p>Server-rendered validation and CSRF protection using Nexaline UI.</p>
    <?php if (! empty($saved)): ?>
      <div class="nx-alert nx-alert--success" role="status">Customer saved.</div>
    <?php endif; ?>
    <form method="post" action="/customers" class="nx-card">
      <?= csrf_field() ?>
      <div class="nx-card__body">
        <div class="nx-field">
          <label class="nx-label" for="ci-email">Email</label>
          <input class="nx-input" id="ci-email" name="email" type="email" aria-describedby="ci-email-error"<?= $emailError ? ' aria-invalid="true"' : '' ?>>
          <?php if ($emailError): ?>
            <p class="nx-field__error" id="ci-email-error"><?= esc($emailError) ?></p>
          <?php endif; ?>
        </div>
        <button class="nx-btn nx-btn--primary" type="submit">Save customer</button>
      </div>
    </form>
  </main>
  <script src="/assets/nexaline.min.js"></script>
  <script>window.NexalineUI.init();</script>
</body>
</html>
