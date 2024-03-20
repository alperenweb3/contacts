$(document).ready(function() {
  // Function to toggle search bar and notification
  function toggleSearchAndNotification() {
      if ($('.contact').length === 0) {
          $('#searchBar').hide();
          $('#noContactsNotification').show();
      } else {
          $('#searchBar').show();
          $('#noContactsNotification').hide();
      }
  }

// Update the search functionality
  $('#searchBar').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      let visibleContacts = 0;
      
      $('.contact').filter(function() {
          const match = $(this).text().toLowerCase().indexOf(value) > -1;
          $(this).toggle(match);

          if (match) visibleContacts++;
      });

      // Toggle search result notification
      if (visibleContacts === 0 && value !== "") {
          $('#noSearchResultsNotification').show();
      } else {
          $('#noSearchResultsNotification').hide();
      }
  });

  // Initial check to decide if the search bar should be displayed
  toggleSearchAndNotification();

  $('#showAddContactModal').on('click', function() {
      $('#addContactModal').show();
  });

  $('.close').on('click', function() {
      $('#addContactModal').hide();
  });

  $(window).on('click', function(event) {
      if ($(event.target).is('#addContactModal')) {
          $('#addContactModal').hide();
      }
  });

  $('#addContact').on('click', function() {
      const name = $('#name').val();
      const surname = $('#surname').val();
      const phoneNumber = $('#phoneNumber').val();
      const address = $('#address').val();

      if(name && surname && phoneNumber && address) {
          const contactHTML = `<div class="contact">
              <span>${name} ${surname}</span><br>
              <span>${phoneNumber}</span><br>
              <span>${address}</span>
              <span class="delete">Delete</span>
          </div>`;
          $('#contacts').append(contactHTML);
          $('#name').val('');
          $('#surname').val('');
          $('#phoneNumber').val('');
          $('#address').val('');
          $('#addContactModal').hide();
      }
      // Check after adding a new contact
      toggleSearchAndNotification();
  });

  $(document).on('click', '.delete', function() {
      $(this).parent().remove();
      // Check after deleting a contact
      toggleSearchAndNotification();
  });

  $('#searchBar').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('.contact').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
  });
});
