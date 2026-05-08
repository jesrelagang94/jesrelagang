<template>
  <div
    class="ja_modalbox opened"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <div class="box_inner">
      <div class="close">
        <button
          class="close"
          @click.prevent="close"
          aria-label="Close modal dialog"
          type="button"
        >
          <i class="icon-cancel" aria-hidden="true"></i>
        </button>
      </div>
      <div class="description_wrap" id="modal-description">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBox",
  props: {
    close: { type: Function },
  },
  mounted() {
    // Focus trap for modal accessibility
    this.trapFocus();
    // Store previously focused element
    this.previouslyFocused = document.activeElement;
  },
  beforeUnmount() {
    // Return focus to previously focused element when modal closes
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
    }
  },
  methods: {
    trapFocus() {
      const modal = this.$el;
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      // Focus first element
      if (firstFocusable) {
        firstFocusable.focus();
      }

      // Handle tab key
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }

        // Close on Escape key
        if (e.key === 'Escape') {
          this.close();
        }
      });
    }
  }
};
</script>
