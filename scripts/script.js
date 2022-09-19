$(document).ready(function() {
  
  // add product
  $(document).on("submit", "#add-form", function(e) {
    e.preventDefault()
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "post",
      dataType: "json",
      data: new FormData(this),
      processData: false,
      contentType: false,
      beforeSend: function() {
        console.log("Data is now loading...")
      },
      success: function(response) {
        console.log(response)
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })



})
