$(document).ready(function() {

  // getting products from database
  getProducts()

  // product form reset right before adding new product
  $(document).on("click", "#product-add-button", function() {
    $("#product-id").val("")
    $("#product-form")[0].reset()
    $("#product-image").next().css("color", "#6c757d")
    $("#product-image").next().text("Image file")
    $("#product-image-clear").prop("disabled", true)
    $("#product-image-clear").text("Clear")
    $(".custom-file-label").attr("label-content", "Select")
  })
  
  // submitting product form (creating/updating product)
  $(document).on("submit", "#product-form", function(event) {
    event.preventDefault()
    const isNew = $("#product-id").val().length > 0 ? false : true
    const toastMessage = isNew ? "New product has been added successfully" : "Product has been updated successfully"
    const toastAction = isNew ? "create" : "update"
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "post",
      dataType: "json",
      data: new FormData(this),
      processData: false,
      contentType: false,
      beforeSend: function() {
        // console.log("Data is now uploading ...")
      },
      success: function(response) {
        // console.log("Data successfully uploaded!")
        if (response) {
          $("#product-form-modal").modal("hide")
          $("#product-form")[0].reset()
          $("#product-image").next().css("color", "#6c757d")
          $("#product-image").next().text("Image file")
          if (isNew){
            $("#current-page").val(1)
          }
          createToast(toastMessage, toastAction)
          getProducts()
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // getting product to update
  $(document).on("click", "a.product-update", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "get",
      dataType: "json",
      data: {
        id: productId,
        action: "get-single-product"
      },
      beforeSend: function() {},
      success: function(response) {
        if (response) {
          $("#product-id").val(response.id)
          $("#product-name").val(response.name)
          $("#product-code").val(response.code)
          $("#product-amount").val(response.amount)
          $("#product-purchase-price").val(response.purchase_price)
          $("#product-image").val("")
          $("#product-image").next().css("color", "#495057")

          if (response.image) {
            // presenting image option
            $("#product-image").attr("image-type", "normal")
            $("#product-image").attr("image-name", response.image_initial)
            $("#product-image").next().text(response.image_initial)
            $("#product-image-clear").prop("disabled", false)
            $("#product-image-clear").text("Delete")
            $(".custom-file-label").attr("label-content", "Change")

            // checking image file existence
            $.ajax({
              url: `/php-crud/uploads/${response.image}`,
              type: "head",
              error: function() {
                // broken image option
                $("#product-image").attr("image-type", "broken")
                $("#product-image").attr("image-name", "(image file is missing)")
                $("#product-image").next().text("(image file is missing)") 
                $("#product-image").next().css("color", "#ff0000")
              }
            })

          } else {
            // no image option
            $("#product-image").attr("image-type", "no-image")
            $("#product-image").attr("image-name", "(no image)")
            $("#product-image").next().text("(no image)")
            $("#product-image-clear").prop("disabled", true)
            $("#product-image-clear").text("Clear")
            $(".custom-file-label").attr("label-content", "Select")
          }
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // viewing product card
  $(document).on("click", "a.product-view", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "get",
      dataType: "json",
      data: {
        id: productId,
        action: "get-single-product"
      },
      beforeSend: function() {
        // console.log("Data is loading ...")
      },
      success: function(response) {
        if (response) {
          let imageSrc = ""
          if (response.image) {
            imageSrc = "uploads/" + response.image
          } else {
            imageSrc = "media/image-placeholder.png"
          }
          const productCard = `
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <img src="${imageSrc}" alt="" class="rounded" onerror="imageMissing(this)">
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

  // deleting product
  $(document).on("click", "a.product-delete", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    if (confirm("Are you shure you want to delete this product?")) {
      $.ajax({
        url: "/php-crud/ajax.php",
        type: "get",
        dataType: "json",
        data: {
          id: productId,
          action: "delete-product"
        },
        beforeSend: function() {
          // console.log("Performing delete request ...")
        },
        success: function(response) {
          if (response.deleted) {
            // console.log("Product successfully deleted!")
            createToast("Product has been deleted successfully", "delete")

            // empty table bug fix
            if ($.trim($("#product-table tbdoy").html()) == "") {
              $("#current-page").val($("#current-page").val() - 1)
              if ($("current-page").val() <= 0) {
                $("current-page").val(1)
              }
            }

            getProducts()
          }
        },
        error: function(request, error) {
          console.log(arguments)
          console.log("Error: " + error)
        }
      })
    }
  })

})




// get products function
function getProducts() {
  let currentPageNumber = $("#current-page").val()
  let pageLimit = $("#page-limit").val()
  $.ajax({
    url: "/php-crud/ajax.php",
    type: "get",
    dataType: "json",
    data: {
      page: currentPageNumber,
      limit: pageLimit,
      action: "get-multiple-products"
    },
    beforeSend: function() {
      // console.log("Data is loading ...")
    },
    success: function(response) {
      // console.log("Data successfully loaded!")
      if (response.products) {
        let productRows = ""
        $.each(response.products, function(index, product) {
          productRows += createProductRow(product)
        })
        $("#product-table tbody").html(productRows)
        let productCount = response.count
        let pageCount = Math.ceil(parseInt(productCount) / pageLimit)
        createPagination(pageCount, currentPageNumber)
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
  let imageSrc = ""
  if (product.image) {
    imageSrc = "uploads/" + product.image
  } else {
    imageSrc = "media/image-placeholder.png"
  }

  let productRow = ""
  if (product) {
    productRow = `
      <tr>
        <td scope="row">
          <img src="${imageSrc}" alt="" onerror="imageMissing(this)">
        </td>
        <td>${product.name}</td>
        <td>${product.code}</td>
        <td>${product.amount}</td>
        <td>${product.purchase_price} G</td>
        <td class="operations">
          <a
            href="#"
            title="View product card"
            data-id="${product.id}"
            class="product-view ml-3 text-dark"
            data-toggle="modal"
            data-target="#product-card-modal"
          >
            <i class="fa-xl fa-solid fa-eye"></i>
          </a>
          <a
            href="#"
            title="Edit product data"
            data-id="${product.id}"
            class="product-update ml-3 text-dark"
            data-toggle="modal"
            data-target="#product-form-modal"
          >
            <i class="fa-xl fa-solid fa-pen-to-square"></i>
          </a>
          <a
            href="#"
            title="Delete product"
            data-id="${product.id}"
            class="product-delete ml-3 text-danger"
          >
            <i class="fa-xl fa-solid fa-trash-can"></i>
          </a>
        </td>
      </tr>
    `
  }
  return productRow
}
