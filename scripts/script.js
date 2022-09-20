// create products table row
function createProductRow(product) {
  let productRow = ""

  if (product) {
    productRow = `
    <tr>
      <td scope="row"><img src=uploads/${product.image}></td>
      <td>${product.name}</td>
      <td>${product.code}</td>
      <td>${product.amount}</td>
      <td>${product.purchase_price}</td>
      <td>
        <a href="" title="View product card" data-id="${product.id}" class="ml-3 profile text-dark" data-target="#product-view-modal" data-toggle="modal">
          <i class="fa-lg fa-solid fa-eye"></i>
        </a>
        <a href="" title="Edit product data" data-id="${product.id}" class="ml-3 edit text-dark" data-target="#product-add-modal" data-toggle="modal">
          <i class="fa-lg fa-solid fa-pencil"></i>
        </a>
        <a href="" title="Delete product" data-id="${product.id}" class="ml-3 delete text-danger" data-target="#product-add-modal" data-toggle="modal">
          <i class="fa-lg fa-solid fa-trash-can"></i>
        </a>
      </td>
    </tr>
    `
  }
  return productRow
}

// get products
function getProducts() {
  let pageNumber = $("#current-page").val();
  $.ajax({
    url: "/php-crud/ajax.php",
    type: "get",
    dataType: "json",
    data: {page: pageNumber, action: "get-products"},
    beforeSend: function() {
      console.log("Data is loading ...")
    },
    success: function(response) {
      console.log("Data successfully loaded!")
      console.log(response)
      if (response.products) {
        let productRows = ""
        $.each(response.products, function(index, product) {
          productRows += createProductRow(product)
        })
        $("#product-table tbody").html(productRows);
      }
    },
    error: function(request, error) {
      console.log(arguments)
      console.log("Error: " + error)
    }
  })
}



// after document has been loaded
$(document).ready(function() {

  // calling getProducts()
  getProducts();
  
  // add product action
  $(document).on("submit", "#product-add-form", function(e) {
    e.preventDefault()
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "post",
      dataType: "json",
      data: new FormData(this),
      processData: false,
      contentType: false,
      beforeSend: function() {
        console.log("Data is now uploading ...")
      },
      success: function(response) {
        console.log("Data successfully uploaded!")
        console.log(response)
        if (response) {
          $("#product-add-modal").modal("hide")
          $("#product-add-form")[0].reset()
          getProducts();
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })


})
