<!-- App.vue -->
<template>
  <div id="app" class="container">
    <h1 class="text-center my-4">SaavedraSound Contacts</h1>

    <!-- Search form and filters -->
    <div class="search-filters mb-4">
      <input v-model="searchQuery" class="form-control mb-2" placeholder="Search for a contact...">
      <div class="filters">
        <select v-model="selectedProfession" class="form-select me-2">
          <option value="">All professions</option>
          <option v-for="profession in professions" :key="profession" :value="profession">
            {{ profession }}
          </option>
        </select>
        <select v-model="selectedStyle" class="form-select me-2">
          <option value="">All styles</option>
          <option v-for="style in styles" :key="style" :value="style">
            {{ style }}
          </option>
        </select>
        <select v-model="selectedGender" class="form-select me-2">
          <option value="">Any gender</option>
          <option v-for="gender in genders" :key="gender" :value="gender">
            {{ gender }}
          </option>
        </select>
      </div>
    </div>

    <!-- Contact list -->
    <div class="contacts-list">
      <div v-for="contact in filteredContacts" :key="contact.id" class="contact-card">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ contact.lastname }} {{ contact.firstname }}</h5>
            <div class="card-text">
              <p>
                <strong>{{ contact.alias }}</strong> - {{ contact.gender }}<br>
                <strong>Profession:</strong> {{ contact.profession }} - <strong>Style:</strong> {{ contact.style }}<br>
                <strong>Phone:</strong>
                <a :href="'tel:' + contact.phone">{{ contact.phone }}</a><br>
                <strong>Email:</strong>
                <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
              </p>
            </div>
            <div class="btn-group">
              <button @click="editContact(contact)" class="btn btn-primary btn-sm">Edit</button>
              <button @click="deleteContact(contact.id)" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add contact button -->
    <button @click="showAddForm = true" class="btn btn-success fixed-bottom m-4">
      Add a contact
    </button>

    <!-- Modal for adding/editing a contact -->
    <div v-if="showAddForm" class="modal">
      <div class="modal-content">
        <h3>{{ editingContact ? 'Edit' : 'Add' }} a contact</h3>
        <form @submit.prevent="saveContact">
          <input v-model="currentContact.lastname" placeholder="Last Name" required>
          <input v-model="currentContact.firstname" placeholder="First Name" required>
          <input v-model="currentContact.alias" placeholder="Alias">
          <input v-model="currentContact.phone" type="tel" placeholder="Phone" required>
          <input v-model="currentContact.email" type="email" placeholder="Email" required>
          <select v-model="currentContact.profession" class="form-select" required>
            <option value="" disabled>Choose a profession</option>
            <option v-for="prof in professionsList"
                    :key="prof"
                    :value="prof">
              {{ prof }}
            </option>
          </select>

          <!-- If "Other" is selected, show a text field -->
          <input v-if="currentContact.profession === 'Other'"
                 v-model="currentContact.otherProfession"
                 placeholder="Specify the profession"
                 class="form-control mt-2"
                 required>

          <select v-model="currentContact.style" class="form-select" required>
            <option value="" disabled>Choose a music style</option>
            <option v-for="style in stylesList"
                    :key="style"
                    :value="style">
              {{ style }}
            </option>
          </select>

          <!-- If "Other" is selected, show a text field -->
          <input v-if="currentContact.style === 'Other'"
                 v-model="currentContact.otherStyle"
                 placeholder="Specify the music style"
                 class="form-control mt-2"
                 required>

          <select v-model="currentContact.gender" class="form-select" required>
            <option value="" disabled>Gender</option>
            <option v-for="gender in gendersList"
                    :key="gender"
                    :value="gender">
              {{ gender }}
            </option>
          </select>

          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" @click="showAddForm = false" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import contactBook from '@/contactBook.js'

export default {
  mixins: [contactBook]
}
</script>

<style scoped lang="scss">
@import "@/assets/styles.scss"; // path SCSS
</style>
