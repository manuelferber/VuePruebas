<template>
  <div>
    <md-dialog-alert
      :md-active.sync="second"
      md-title="Post created!"
      md-content="Your post <strong>Material Design is awesome</strong> has been created." />
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data: () => ({
      second: true
    })
  }
</script>