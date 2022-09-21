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
        let productCount = response.count
        let pageCount = Math.ceil(parseInt(productCount) / 4)
        let currentPageNumber = $("#current-page").val() // todo --> const or let ???
        pagination(pageCount, currentPageNumber)

        $("#product-pagination")
      }
    },
    error: function(request, error) {
      console.log(arguments)
      console.log("Error: " + error)
    }
  })
}

// create product table row function
function createProductRow(product) {
  let productRow = ""

  if (product) {
    productRow = `
    <tr>
      <td scope="row"><img src=uploads/${product.image}></td>
      <td>${product.name}</td>
      <td>${product.code}</td>
      <td>${product.purchase_price}</td>
      <td>${product.amount}</td>
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

// pagination function
function pagination(totalNumberOfPages, currentPageNumber) {
  let pageList = "";
  if (totalNumberOfPages > 1) {
    currentPageNumber = parseInt(currentPageNumber);
    const previousLiCondition = currentPageNumber == 1 ?  "disabled" : ""
    const nextLiCondition = currentPageNumber == totalNumberOfPages ? "disabled" : ""
    pageList += `<ul class="pagination justify-content-center">`
    pageList += `<li class="page-item ${previousLiCondition}">
      <a class="page-link" href="" data-page="${currentPageNumber - 1}">&lt;</a>
    </li>`
    for (let pageNumber = 1; pageNumber <= totalNumberOfPages; pageNumber++) {
      const activeLiCondition = pageNumber == currentPageNumber ? "active" : ""
      pageList += `<li class="page-item ${activeLiCondition}">
        <a class="page-link" href="" data-page="${pageNumber}">${pageNumber}</a>
      </li>`
    }
    pageList += `<li class="page-item ${nextLiCondition}">
      <a class="page-link" href="" data-page="${currentPageNumber + 1}">&gt;</a>
    </li>`
    pageList += `</ul>`
  }
  $("#product-pagination").html(pageList)
}
