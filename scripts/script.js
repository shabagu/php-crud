// after document has been loaded
$(document).ready(function() {

  // calling getProducts()
  getProducts()
  
  // submitting product form
  $(document).on("submit", "#product-form", function(event) {
    event.preventDefault()
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
          $("#product-form-modal").modal("hide")
          $("#product-form")[0].reset()
          getProducts()
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // onclick event for pagination
  $(document).on("click", "ul.pagination li a", function(event) {
    event.preventDefault()
    const targetPage = $(this).data("page")
    $("#current-page").val(targetPage)
    getProducts()
    // $(this).parent().siblings().removeClass("active")
    // $(this).parent().addClass("active")
  })

  // onclick event for getting product to update
  $(document).on("click", "a.product-update", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "get",
      dataType: "json",
      data: {
        id: productId,
        action: "get-product-to-update"
      },
      beforeSend: function() {
        console.log("Data is loading ...")
      },
      success: function(response) {
        console.log("Data successfully loaded!")
        console.log(response)
        if (response) {
          $("#product-name").val(response.name)
          $("#product-code").val(response.code)
          $("#product-amount").val(response.amount)
          $("#product-purchase-price").val(response.purchase_price)
          $("#product-id").val(response.id)
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // onclick event for reseting product form when adding new product
  $("#product-add-button").on("click", function() {
    $("#product-form")[0].reset()
    $("#product-id").val("")
  })

  // onclick event for deleting
  $(document).on("click", "a.product-delete", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    if (confirm(`Are you shure you want to delete this product?`)) {
      $.ajax({
        url: "/php-crud/ajax.php",
        type: "get",
        dataType: "json",
        data: {
          id: productId,
          action: "delete-product"
        },
        beforeSend: function() {
          console.log("Performing delete request ...")
        },
        success: function(response) {
          if (response.deleted) {
            $(".display-message")
              .html("Product successfully deleted")
              .fadeIn()
              .delay(2500)
              .fadeOut()

            getProducts()
            console.log("Product successfully deleted!")
          }
        },
        error: function(request, error) {
          console.log(arguments)
          console.log("Error: " + error)
        }
      })
    }
  })

  // onclick event for viewing product card
  $(document).on("click", "a.product-view", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "get",
      dataType: "json",
      data: {
        id: productId,
        action: "get-product-to-update"
      },
      beforeSend: function() {
        console.log("Data is loading ...")
      },
      success: function(response) {
        if (response) {
          const productCard = `
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <img src="uploads/${response.image}" alt="" class="rounded">
            </div>
            <div class="col-sm-6 col-md-8">
              <h4 class="text-primary" title="Product name">${response.name}</h4>
              <p title="Product code" class="mb-0"><i class="mr-3 fa-solid fa-barcode"></i>${response.code}</p>
              <p title="Product amount" class="mb-0"><i class="mr-3 fa-solid fa-cubes-stacked"></i>${response.amount}</p>
              <p title="Product purchase price" class="mb-0"><i class="mr-3 fa-solid fa-coins"></i>${response.purchase_price} G</p>
            </div>
          </div>
          `
          $("#product-card").html(productCard)
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // event for search
  $(document).on("keyup", "#search-input", function() {
    const searchText = $(this).val()
    if (searchText.length > 0) {
      $.ajax({
        url: "/php-crud/ajax.php",
        type: "get",
        dataType: "json",
        data: {
          searchText: searchText,
          action: "search-products"
        },
        beforeSend: function() {
          console.log("Data is loading ...")
        },
        success: function(response) {
          if (response) {
            let productRows = ""
            $.each(response, function(index, product) {
              productRows += createProductRow(product)
            })
            $("#product-table tbody").html(productRows)
            $("#product-pagination").hide()
          }
        },
        error: function(request, error) {
          console.log(arguments)
          console.log("Error: " + error)
        }
      })
    } else {
      getProducts();
      $("#product-pagination").show()
    }
  })


})



// get products
function getProducts() {
  let currentPageNumber = $("#current-page").val()
  $.ajax({
    url: "/php-crud/ajax.php",
    type: "get",
    dataType: "json",
    data: {
      page: currentPageNumber,
      action: "get-products"
    },
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
        $("#product-table tbody").html(productRows)
        let productCount = response.count
        let pageCount = Math.ceil(parseInt(productCount) / 4)
        // let currentPageNumber = $("#current-page").val()
        // todo -->> ???? is previous line needed / zero rows bug fix (when deleting last row in page)
        pagination(pageCount, currentPageNumber)
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
        <td scope="row"><img src=uploads/${product.image} alt=""></td>
        <td>${product.name}</td>
        <td>${product.code}</td>
        <td>${product.amount}</td>
        <td>${product.purchase_price} G</td>
        <td>
          <a
            href="#"
            title="View product card"
            data-id="${product.id}"
            class="product-view ml-3 text-dark"
            data-toggle="modal"
            data-target="#product-card-modal"
          >
            <i class="fa-lg fa-solid fa-eye"></i>
          </a>
          <a
            href="#"
            title="Edit product data"
            data-id="${product.id}"
            class="product-update ml-3 text-dark"
            data-toggle="modal"
            data-target="#product-form-modal"
          >
            <i class="fa-lg fa-solid fa-pencil"></i>
          </a>
          <a
            href="#"
            title="Delete product"
            data-id="${product.id}"
            class="product-delete ml-3 text-danger"
          >
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
  let pageList = ""
  if (totalNumberOfPages > 1) {
    currentPageNumber = parseInt(currentPageNumber)
    const previousLiCondition = currentPageNumber == 1 ?  "disabled" : ""
    const nextLiCondition = currentPageNumber == totalNumberOfPages ? "disabled" : ""
    pageList += `<ul class="pagination justify-content-center">`
    pageList += `
      <li class="page-item ${previousLiCondition}">
        <a class="page-link" href="#" data-page="${currentPageNumber - 1}">&lt; Previous</a>
      </li>
    `
    for (let pageNumber = 1; pageNumber <= totalNumberOfPages; pageNumber++) {
      const activeLiCondition = pageNumber == currentPageNumber ? "active" : ""
      pageList += `
        <li class="page-item ${activeLiCondition}">
          <a class="page-link" href="#" data-page="${pageNumber}">${pageNumber}</a>
        </li>
      `
    }
    pageList += `
      <li class="page-item ${nextLiCondition}">
        <a class="page-link" href="#" data-page="${currentPageNumber + 1}">Next &gt;</a>
      </li>
    `
    pageList += `</ul>`
  }
  $("#product-pagination").html(pageList)
}
