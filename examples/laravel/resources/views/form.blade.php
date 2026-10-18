<form method="POST" action="/customers" class="nx-card nx-card__body">
  @csrf
  <label class="nx-label" for="email">Email</label>
  <input class="nx-input" id="email" name="email" type="email" aria-describedby="email-error" @error('email') aria-invalid="true" @enderror>
  @error('email') <p class="nx-field__error" id="email-error">{{ $message }}</p> @enderror
  <button class="nx-btn nx-btn--primary">Save</button>
</form>
