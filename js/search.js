Vue.component('searchform', {
    props: ['value'],
    template: `
  		<input type="text" class="search-field header_form_search"
		  v-bind:value="value"
		  v-on:input="$emit('input', $event.target.value)">`,
});
