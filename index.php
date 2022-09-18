<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- jquery cdn link -->
  <script defer src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
  <!-- bootstrap popper and js cdn link-->
  <script defer src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
  
  <!-- bootstrap css cdn link -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
  <!-- font awesome cnd link -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="index.css">

  <title>PHP CRUD</title>
</head>
<body>
  <h1 class="bg-dark text-light text-center py-2">PHP CRUD</h1>
  <div class="container">

    <!-- search form -->
    <div class="row my-3">
      <div class="col-10">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text bg-dark">
              <i class="fa-solid fa-magnifying-glass text-light"></i>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="Search for product...">
        </div>
      </div>
      <div class="">
        <button class="btn btn-dark btn-block" style="width: 174px;" type="button" data-toggle="modal" data-target="#new-product">Add product</button>
      </div>
    </div>

    <!-- table -->
    <table class="table" id="product-table">
      <thead class="table-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Code</th>
          <th scope="col">Amount</th>
          <th scope="col">Purchase price</th>
          <th scope="col">Operations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">pic1</th>
          <td>sadfasd</td>
          <td>13412341234</td>
          <td>123</td>
          <td>155</td>
          <td>
            <span>Edit</span>
            <span>Profile</span>
            <span>Delete</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- pagination -->
    <nav aria-label="Products pagination" id="products-pagination">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>

    <!-- popup form -->
    <div class="modal fade" id="new-product" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Produt</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <form id="add-form" method="post" enctype="multipart/form-data">
            <div class="modal-body">
              <!-- product name -->
              <div class="form-group">
                <label for="new-product-name">Name:</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-dark">
                      <i class="fa-solid fa-cube text-light"></i>
                    </span>
                  </div>
                  <input type="text" class="form-control" placeholder="Product name" autocomplete="off" required="required" id="new-product-name" name="name">
                </div>
              </div>
              <!-- product code -->
              <div class="form-group">
                <label for="new-product-code">Code:</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-dark">
                      <i class="fa-solid fa-barcode text-light"></i>
                    </span>
                  </div>
                  <input type="text" minlength="4" maxlength="24" class="form-control" placeholder="Product code" autocomplete="off" required="required" id="new-product-code" name="code">
                </div>
              </div>
              <!-- product amount -->
              <div class="form-group">
                <label for="new-product-amount">Amount:</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-dark">
                      <i class="fa-solid fa-cubes-stacked text-light"></i>
                    </span>
                  </div>
                  <input type="number" min="0" class="form-control" placeholder="Product amount" autocomplete="off" required="required" id="new-product-amount" name="amount">
                </div>
              </div>
              <!-- product purchase price -->
              <div class="form-group">
                <label for="new-product-purchase-price">Purchase price:</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-dark">
                      <i class="fa-solid fa-coins text-light"></i>
                    </span>
                  </div>
                  <input type="number" min="0" class="form-control" placeholder="Product purchase price" autocomplete="off" required="required" id="new-product-purchase-price" name="purchase-price">
                  <div class="input-group-append">
                    <span class="input-group-text bg-dark text-light" style="user-select: none;">&nbsp;₲&nbsp;</span>
                  </div>
                </div>
              </div>
              <!-- image -->
              <div class="form-group">
                <label for="new-product-image">Image:</label>
                <div class="input-group">
                  <label class="custom-file-label" for="new-product-image">Choose file</label>
                  <input type="file" class="custom-file-input" id="new-product-image" name="image">
                </div>
              </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark">Submit</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</body>
</html>
