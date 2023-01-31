<?php

declare(strict_types=1);

namespace FirstWeb\Companies\Classes;

class Repository
{
    public function getAll()
    {
        $sql = "SELECT * FROM fw_company";

        $query = xtc_db_query($sql);
        $companies = [];
        while ($row = xtc_db_fetch_array($query)) {
            $companies[] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'address' => $row['address']
            ];
        }
        return $companies;
    }

    public function insertCompany($company)
    {
        $name = $company['name'];
        $address = $company['address'];

        $sql = "INSERT INTO fw_company
                    (name, address) 
                VALUES 
                    ('$name', '$address')";

        $query = xtc_db_query($sql);
        return xtc_db_insert_id();
    }

    public function updateCompany($company)
    {
        $id = $company['id'];
        $name = $company['name'];
        $address = $company['address'];

        $sql = "UPDATE fw_company
                SET name = '$name', address = '$address'
                WHERE id = $id";

        $query = xtc_db_query($sql);
    }

    public function removeCompany($company)
    {
        $id = $company['id'];
        $sql = "DELETE FROM fw_company WHERE id = $id";
        $query = xtc_db_query($sql);
    }
}
