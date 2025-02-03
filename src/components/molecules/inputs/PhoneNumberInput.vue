<script setup>
import { ref } from "vue";
import InputLabel from "../atoms/InputLabel.vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "Enter Phone Number",
  },
});

// Define a list of countries with flag emoji
const countries = ref([
  { name: "Uganda", dial_code: "+256", code: "UG", flag: "🇺🇬" },
  { name: "United States", dial_code: "+1", code: "US", flag: "🇺🇸" },
  { name: "Canada", dial_code: "+1", code: "CA", flag: "🇨🇦" },
  { name: "United Kingdom", dial_code: "+44", code: "UK", flag: "🇬🇧" },
  { name: "Australia", dial_code: "+61", code: "AU", flag: "🇦🇺" },
  // Add more countries as needed
]);

// Default to the first country in the list
const selectedCountry = ref(countries.value[0]);
const phoneNumber = ref("");

</script>

<template>
  <div class="max-w-md mx-auto">
    <InputLabel forHtml="phone">Phone Number</InputLabel>
    <!-- Responsive container: vertical on mobile, horizontal on larger screens -->
    <div class="flex flex-col">
      <!-- Country Dropdown Container -->
      <div class="relative w-full  sm:mb-0 sm:mr-0">
        <select
          v-model="selectedCountry"
          :required="isRequired"
          :placeholder="placeholder"
          :class="[
            'w-full block appearance-none  border border-gray-300 border-b-0 text-gray-700 py-2 pl-3 pr-10 leading-tight focus:outline-none focus:border-blue-500 rounded-t-md rounded-b-none',
            (isLoading || isDisabled) ?  'cursor-not-allowed bg-gray-100 ' : 'bg-white ',
          ]"
          :disabled="isLoading || isDisabled"
        >
          <option
            v-for="country in countries"
            :key="country.code"
            :value="country"
          >
            {{ country.flag }} {{ country.name }} ({{ country.dial_code }})
          </option>
        </select>
        <!-- Dropdown Icon -->
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.548l-6 6-6-6z" />
          </svg>
        </div>
      </div>
      <!-- Phone Number Input -->
      <input
        type="tel"
        v-model="phoneNumber"
        :required="isRequired"
        :placeholder="placeholder"
        :class="[
          'w-full sm:flex-1 appearance-none border border-gray-300 rounded-b-md rounded-t-none py-2 px-3 leading-tight focus:outline-none focus:border-blue-500',
          (isLoading || isDisabled) ?  'cursor-not-allowed bg-gray-100 ' : 'bg-white ',
        ]"
        :disabled="isLoading || isDisabled"
      />
    </div>
    <!-- Optional: Displaying the full phone number -->
    <p class="mt-2 text-xs text-gray-500">
      Full Number:
      <strong>{{ selectedCountry.dial_code }} {{ phoneNumber }}</strong>
    </p>
  </div>
</template>


<style scoped>
/* Additional styling if needed */
</style>

