<?php
$action = $_REQUEST["action"];

if (!empty($action)) {
  require_once "partials/Product.php";
  $product = new Product();
}

if ($action="add-product" && !empty($_POST)) {
  $name = $_POST["name"];
  $code = $_POST["code"];
  $amount = $_POST["amount"];
  $purchasePrice = $_POST["purchase-price"];
  $image = $_FILES["image"];

  $productId = (!empty($_POST["product-id"])) ? $_POST["product-id"] : "";

  $imageName="";
  if (!empty($image["name"])) {
    $imageName = $product->uploadImage($image);
    $productData = [
      "name" => $name,
      "code" => $code,
      "amount" => $amount,
      "purchase_price" => $purchasePrice,
      "image" => $imageName,
    ];
  } else {
    $productData = [
      "name" => $name,
      "code" => $code,
      "amount" => $amount,
      "purchase_price" => $purchasePrice,
    ];
  }
  
  $productId = $product->addRow($productData);

  if (!empty($productId)) {
    $productGet = $product->getSingleRow('id', $productId);
    echo json_encode($productGet);
    exit();
  }
}
