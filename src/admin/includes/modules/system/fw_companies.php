<?php

/**
 * You can find informations about system classes and development at:
 * https://docs.module-loader.de
 *
 * @phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace
 * @phpcs:disable Squiz.Classes.ValidClassName.NotCamelCaps
 * @phpcs:disable PSR1.Methods.CamelCapsMethodName
 */

use RobinTheHood\ModifiedStdModule\Classes\StdModule;

class fw_companies extends StdModule
{
    public function __construct()
    {
        parent::__construct('MODULE_FW_COMPANIES');

        $this->checkForUpdate(true);
    }

    public function display()
    {
        return $this->displaySaveButton();
    }

    public function install()
    {
        parent::install();
        $this->setAdminAccess('fw_companies');

        xtc_db_query(
            "CREATE TABLE `fw_company` (
                `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                `name` varchar(255) DEFAULT NULL,
                `address` text DEFAULT NULL,
                PRIMARY KEY (`id`)
              ) DEFAULT CHARSET=utf8;"
        );
    }

    public function remove()
    {
        parent::remove();
        $this->deleteAdminAccess('fw_companies');
    }
}
