// This file contains the Vue.js component for the contact book
export default {
  data() {
    return {
      contacts: [],
      searchQuery: '',
      selectedProfession: '',
      selectedGender: '',
      selectedStyle: '',
      showAddForm: false,
      professionsList: [
        'DJ',
        'Musician',
        'Producer',
        'Other'
      ],
      stylesList: [
        'RnB/Hip-Hop',
        'House',
        'Afrohouse',
        'Techno',
        'Drum and bass',
        'Funk disco',
        'Latino',
        'Lounge',
        'Mixed',
        'Other'
      ],
      gendersList: [
        'Male',
        'Female',
        'Other'
      ],
      currentContact: {
        id: null,
        lastname: '',
        firstname: '',
        alias: '',
        phone: '',
        email: '',
        profession: '',
        style: '',
        gender: '',
      },
      editingContact: null
    }
  },
  computed: {
    professions() {
      // Gets all unique professions from contacts
      const uniqueProfessions = [...new Set(this.contacts.map(c => c.profession))]
      // Combines with predefined list avoiding duplicates
      return [...new Set([...this.professionsList, ...uniqueProfessions])]
        .filter(p => p !== 'Other')  // Removes "Other" from filter list
        .sort()  // Sorts alphabetically
    },


    styles() {
      // Gets all music styles from contacts
      const uniqueStyles = [...new Set(this.contacts.map(c => c.style))]
      // Combine with predefined list avoiding duplicates
      return [...new Set([...this.stylesList, ...uniqueStyles])]
        .filter(style => style !== 'Other')  // Removes "Other" from filter list
        .sort()  // Sorts alphabetically
    },

    genders() {
      // Gets all genders from contacts
      const uniqueGenders = [...new Set(this.contacts.map(c => c.gender))]
      // Combine with predefined list avoiding duplicates
      return [...new Set([...this.gendersList, ...uniqueGenders])]
        .filter(gender => gender !== 'Other')  // Removes "Other" from filter list
        .sort()  // Sorts alphabetically
    },

    filteredContacts() {
      return this.contacts.filter(contact => {
        const matchesSearch = !this.searchQuery ||
          contact.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          contact.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (contact.alias && contact.alias.toLowerCase().includes(this.searchQuery.toLowerCase()))

        const matchesProfession = !this.selectedProfession ||
          contact.profession === this.selectedProfession

        const matchesStyle = !this.selectedStyle ||
          contact.style === this.selectedStyle

        const matchesGender = !this.selectedGender ||
          contact.gender === this.selectedGender


        return matchesSearch && matchesProfession && matchesGender && matchesStyle
      })
    },
  },

  methods: {
    async saveContact() {
      let contactToSave = { ...this.currentContact }

      // If "Other" is selected, use the custom profession
      if (contactToSave.profession === 'Other' && contactToSave.otherProfession) {
        contactToSave.profession = contactToSave.otherProfession
      }

      // If "Other" is selected, use the custom style
      if (contactToSave.style === 'Other' && contactToSave.otherStyle) {
        contactToSave.style = contactToSave.otherStyle
      }

      // if "Other" is selected, use the custom gender
      if (contactToSave.gender === 'Other' && contactToSave.otherGender) {
        contactToSave.gender = contactToSave.otherGender
      }

      if (this.editingContact) {
        const index = this.contacts.findIndex(c => c.id === this.editingContact.id)
        this.contacts[index] = { ...contactToSave, id: this.editingContact.id }
      } else {
        this.contacts.push({
          ...contactToSave,
          id: Date.now().toString()
        })
      }
      this.showAddForm = false
      this.editingContact = null
      this.resetForm()
    },

    resetForm() {
      this.currentContact = {
        id: null,
        lastname: '',
        firstname: '',
        alias: '',
        phone: '',
        email: '',
        profession: '',
        otherProfession: '',
        style: '',
        otherStyle: '',
        gender: '',
        otherGender: ''
      }
    },

    editContact(contact) {
      this.editingContact = contact
      this.currentContact = { ...contact }
      // If the profession is not in the list, set it to "Other"
      if (!this.professionsList.includes(contact.profession)) {
        this.currentContact.profession = 'Other'
        this.currentContact.otherProfession = contact.profession
      }
      // If the style is not in the list, set it to "Other"
      if (!this.stylesList.includes(contact.style)) {
        this.currentContact.style = 'Other'
        this.currentContact.otherStyle = contact.style
      }
      // If the gender is not in the list, set it to "Other"
      if (!this.gendersList.includes(contact.gender)) {
        this.currentContact.gender = 'Other'
        this.currentContact.otherGender = contact.gender
      }
      this.showAddForm = true
    },
    deleteContact(id) {
      if (confirm('Are you sure you want to delete this contact?')) {
        this.contacts = this.contacts.filter(c => c.id !== id)
      }
    }
  },
  mounted() {
    // Load saved contacts on start
    const savedContacts = localStorage.getItem('contacts')
    if (savedContacts) {
      this.contacts = JSON.parse(savedContacts)
    }
  },
  watch: {
    contacts: {
      handler(newContacts) {
        // Save contacts on every modification
        localStorage.setItem('contacts', JSON.stringify(newContacts))
      },
      deep: true
    }
  },
}
