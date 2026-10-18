<?= form_open('/customers') ?>
  <?= csrf_field() ?>
  <label class="nx-label" for="email">Email</label>
  <input class="nx-input" id="email" name="email" type="email" aria-describedby="email-error">
  <p class="nx-field__error" id="email-error"><?= esc(validation_show_error('email')) ?></p>
  <button class="nx-btn nx-btn--primary">Save</button>
<?= form_close() ?>
