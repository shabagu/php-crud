$(document).ready(function() {

  // searching for products
  $(document).on("keyup", "#search-input", function() {
    let searchText = $(this).val()
    let currentPageNumber = 1
    let pageLimit = $("#page-limit").val()
    if (searchText.length > 0) {
      $.ajax({
        url: "/php-crud/ajax.php",
        type: "get",
        dataType: "json",
        data: {
          searchText: searchText,
          page: currentPageNumber,
          limit: pageLimit,
          action: "search-products"
        },
        beforeSend: function() {
          // console.log("Data is loading ...")
        },
        success: function(response) {
          if (response) {
            let productRows = ""
            $.each(response, function(index, product) {
              productRows += createProductRow(product)
            })
            $("#product-table tbody").html(productRows)
            // $("#pagination").hide()
            console.log(response)
          }
        },
        error: function(request, error) {
          console.log(arguments)
          console.log("Error: " + error)
        }
      })
    } else {
      getProducts();
      // $("#pagination").show()
    }
  })

  // clearing search input
  $(document).on("click", "#search-clear", function(event) {
    event.preventDefault()
    $("#current-page").val(1)
    $("#search-input").val("")
    // $("#pagination").show()
    setTimeout(() => {
      this.blur()
    }, 100)
    getProducts()
  })

})
