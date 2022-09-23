<div class="modal fade" id="product-form-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span>&times;</span>
        </button>
      </div>
      <form id="product-form" method="post" enctype="multipart/form-data">
        <div class="modal-body">
          <!-- product name -->
          <div class="form-group">
            <label for="product-name">Name:</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text bg-dark">
                  <i class="fa-solid fa-cube text-light"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Product name"
                autocomplete="off"
                required="required"
                id="product-name"
                name="name"
              >
            </div>
          </div>
          <!-- product code -->
          <div class="form-group">
            <label for="product-code">Code:</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text bg-dark">
                  <i class="fa-solid fa-barcode text-light"></i>
                </span>
              </div>
              <input
                type="text"
                minlength="4"
                maxlength="24"
                class="form-control"
                placeholder="Product code"
                autocomplete="off"
                required="required"
                id="product-code"
                name="code"
              >
            </div>
          </div>
          <!-- product amount -->
          <div class="form-group">
            <label for="product-amount">Amount:</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text bg-dark">
                  <i class="fa-solid fa-cubes-stacked text-light"></i>
                </span>
              </div>
              <input
                type="number"
                min="0"
                class="form-control"
                placeholder="Product amount"
                autocomplete="off"
                required="required"
                id="product-amount"
                name="amount"
              >
            </div>
          </div>
          <!-- product purchase price -->
          <div class="form-group">
            <label for="product-purchase-price">Purchase price:</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text bg-dark">
                  <i class="fa-solid fa-coins text-light"></i>
                </span>
              </div>
              <input
              type="number"
              min="0"
              class="form-control"
              placeholder="Product purchase price"
              autocomplete="off"
              required="required"
              id="product-purchase-price"
              name="purchase-price"
              >
              <div class="input-group-append">
                <span class="input-group-text bg-dark text-light" style="user-select: none;">&nbsp;G&nbsp;</span>
              </div>
            </div>
          </div>
          <!-- image -->
          <div class="form-group">
            <label for="product-image">Image:</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text bg-dark">
                  <i class="fa-solid fa-image text-light"></i>
                </span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="product-image"
                  name="image"
                >
                <label class="custom-file-label" for="product-image">Image file (png, jpg or jpeg)</label>
              </div>
              <!-- <div class="input-group-append"> -->
                <!-- <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button> -->
              <!-- </div> -->
            </div>
          </div>
          
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-dark">Submit</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <input type="hidden" name="action" value="submit-product-form">
          <input type="hidden" name="product-id" id="product-id" value="">
        </div>
      </form>
    </div>
  </div>
</div>
