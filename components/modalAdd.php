<div class="modal fade" id="product-add-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Adding new product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span>&times;</span>
        </button>
      </div>
      <form id="product-add-form" method="post" enctype="multipart/form-data">
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
          <button type="submit" class="btn btn-dark">Submit</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <input type="hidden" name="action" value="add-product">
          <input type="hidden" name="product-id" value="" id="product-id">
        </div>
      </form>
    </div>
  </div>
</div>
