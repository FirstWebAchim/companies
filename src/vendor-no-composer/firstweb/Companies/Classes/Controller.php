<?php

declare(strict_types=1);

namespace FirstWeb\Companies\Classes;

use RobinTheHood\ModifiedStdModule\Classes\StdController;
use RobinTheHood\ModifiedUi\Classes\Admin\Page;
use RobinTheHood\ModifiedUi\Classes\Admin\HtmlView;

class Controller extends StdController
{
    public const FILE_NAME = 'fw_companies.php';
    public const SESSION_PREFIX = 'fw_companies';
    public const TEMPLATE_PATH = '../vendor-no-composer/firstweb/Companies/Templates/';

    protected function invokeIndex(): void
    {
        $page = new Page();
        $page->setHeading('Firmen by First-Web');
        $page->setSubHeading('Katalog');

        $htmlView = new HtmlView();
        $htmlView->loadHtml(self::TEMPLATE_PATH . 'Index.tmpl.php', [
            'controller' => $this,
        ]);
        $page->addComponent($htmlView);

        $page->render();
        die();
    }
}
