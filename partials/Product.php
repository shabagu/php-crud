<?php
require_once "Database.php";
class Product extends Database
{
  protected $tableName = "product";


  // add row
  public function addRow($data) {

    if (!empty($data)) {
      $fields = $placeholder = [];

      foreach ($data as $field => $value) {
        $fields[] = $field;
        $placeholder[] = ":{$field}";
      }
    }
  # $sql = "INSERT INTO {$this->tableName} (name, code, amount, purchase_price) VALUES (:name, :code, :amount, :purchase_price)";
    $sql = "INSERT INTO {$this->tableName} (" . implode(",", $fields) . ") VALUES (" . implode(",", $placeholder) . ")";    
    $statement = $this->connection->prepare($sql);

    try {
      $this->connection->beginTransaction();
      $statement->execute($data);
      $lastInsertId = $this->connection->lastInsertId();
      $this->connection->commit();
      return $lastInsertId;

    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
      $this->connection->rollBack();
    }
  }


  // upload image
  public function uploadImage($file) {
    if (!empty($file)) {
      $fileName = $file["name"];
      $fileTempName = $file["tmp_name"];
    # $fileSize = $file["size"];
    # $fileType = $file["type"];

      $fileNameSeparated = explode(".", $fileName);
      $fileExtension = strtolower(end($fileNameSeparated));

      $allowedExtensions = ["png", "jpg", "jpeg"];
      if (in_array($fileExtension, $allowedExtensions)) {
        $fileNameHashed = md5(time() . $fileName) . "." . $fileExtension;
        $fileUploadDirectory = getcwd() . "/uploads/";
        $fileDestinationPath = $fileUploadDirectory . $fileNameHashed;

        if (move_uploaded_file($fileTempName, $fileDestinationPath)) {
          return $fileNameHashed;
        }
      }
    }
  }


  // get single row
  public function getSingleRow($field, $value) {
    $sql = "SELECT * FROM {$this->tableName} WHERE {$field} = :{$field}";
    $statement = $this->connection->prepare($sql);
    $statement->execute([":{$field}" => $value]);

    if ($statement->rowCount() > 0) {
      $result = $statement->fetch(PDO::FETCH_ASSOC);
    } else {
      $result = [];
    }
    return $result;
  }


  // get multiple rows
  public function getMultipleRows($start = 0, $limit = 7) {
    $sql = "SELECT * FROM {$this->tableName} ORDER BY id DESC LIMIT {$start}, {$limit}";
    $statement = $this->connection->prepare($sql);
    $statement->execute();

    if ($statement->rowCount() > 0) {
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } else {
      $result = [];
    }
    return $result;
  }


  // get count of rows
  public function getCountRows() {
    $sql = "SELECT count(*) as _count FROM {$this->tableName}";
    $statement = $this->connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result["_count"];
  }


  // update product
  public function updateRow($data, $id) {
    if (!empty($data)) {
      $fields = "";
      $counter = 1;
      $fieldCount = count($data);

      foreach($data as $field => $value) {
        $fields .= "{$field} = :{$field}";
        if ($counter < $fieldCount) {
          $fields .= ", ";
        }
        $counter++;
      }
    }
    $sql = "UPDATE {$this->tableName} SET {$fields} WHERE id = :id";
    $statement = $this->connection->prepare($sql);

    try {
      $this->connection->beginTransaction();
      $data["id"] = $id;
      $statement->execute($data);
      $this->connection->commit();
      
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
      $this->connection->rollBack();
    }
  }


  // delete product
  public function deleteRow($id) {
    $sql = "DELETE FROM {$this->tableName} WHERE id = :id";
    $statement = $this->connection->prepare($sql);

    try {
      $statement->execute([":id" => $id]);
      if ($statement->rowCount() > 0) {
        return true;
      }

    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
      return false;
    }
  }


  // search product
  public function searchRows($searchText, $start = 0, $limit = 7) {
    $sql = "SELECT * FROM {$this->tableName} WHERE name LIKE :search ORDER BY id DESC LIMIT {$start}, {$limit}";
    $statement = $this->connection->prepare($sql);
    $statement->execute([":search" => "%{$searchText}%"]);

    if ($statement->rowCount() > 0) {
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } else {
      $result = [];
    }
    return $result;
  }


  // delete image file
  public function deleteImageFile($id) {
    $sql = "SELECT DISTINCT image FROM {$this->tableName} WHERE id = :id";
    $statement = $this->connection->prepare($sql);
    $statement->execute(["id" => $id]);

    if ($statement->rowCount() > 0) {
      $fetched = $statement->fetch(PDO::FETCH_ASSOC);
    } else {
      $fetched = [];
    }
    $imageName = $fetched["image"];

    if ($imageName != "") {
      $filePath = getcwd() . "/uploads/" . $imageName;

      if (unlink($filePath)) {
        $result = true;
      } else {
        $result = false;
      }
    } else {
      $result = false;
    }
    return $result;
  }


  // delete image fields
  public function deleteImageFields($id) {
    $sql = "UPDATE {$this->tableName} SET image = '', image_initial = '' WHERE id = :id";
    $statement = $this->connection->prepare($sql);
    $statement->execute(["id" => $id]);
    
    try {
      $this->connection->beginTransaction();
      $statement->execute(["id" => $id]);
      $this->connection->commit();
      return true;
      
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
      $this->connection->rollBack();
      return false;
    }
  }

}
