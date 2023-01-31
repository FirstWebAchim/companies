<?php

declare(strict_types=1);

namespace FirstWeb\Companies\Classes;

use RobinTheHood\ModifiedStdModule\Classes\StdController;
use FirstWeb\Companies\Classes\Repository;

class ApiController extends StdController
{
    protected function invokeGetCompanies(): void
    {
        $repo = new Repository();
        $companies = $repo->getAll();

        $this->echoJson($companies);
    }

    protected function invokeSave()
    {
        $companies = $this->getArrayFromJsonPost();

        $repo = new Repository();
        foreach ($companies as $company) {
            $this->saveCompany($company);
        }
    }

    private function saveCompany($company)
    {
        $repo = new Repository();
        $flag = $company['flag'] ?? 'none';

        if ($flag === 'none') {
            return;
        }

        $isInsert = ($flag == 'new' || $flag == 'changed') && $company['id'] < 0;
        $isUpdate = ($flag == 'new' || $flag == 'changed') && $company['id'] > 0;
        $isDelete = ($flag == 'deleted') && $company['id'] > 0;

        if ($isInsert) {
            $company = $repo->insertCompany([
                'name' => $company['name'],
                'address' => $company['address']
            ]);
        } elseif ($isUpdate) {
            $repo->updateCompany([
                'id' => $company['id'],
                'name' => $company['name'],
                'address' => $company['address']
            ]);
        } elseif ($isDelete) {
            $repo->removeCompany([
                'id' => $company['id']
            ]);
        }
    }
}
