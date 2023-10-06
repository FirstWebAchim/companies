<?php $parentProductName  = $vars['parentProductName']; ?>

<link href="<?= $vars['controller']::TEMPLATE_PATH ?>Styles/bootstrap.min.css" rel="stylesheet">
<link href="<?= $vars['controller']::TEMPLATE_PATH ?>Styles/bootstrap_correction.css" rel="stylesheet">
<link href="<?= $vars['controller']::TEMPLATE_PATH ?>Styles/style.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<?php global $fwDevMode; if ($fwDevMode === true) { ?>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<?php } else { ?>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<?php } ?>

<div id="app">
</div>

<script src="<?= $vars['controller']::TEMPLATE_PATH ?>Scripts/Basics.js?v=<?=time()?>"></script>
<script src="<?= $vars['controller']::TEMPLATE_PATH ?>Scripts/PaginationView.vue.js?v=<?=time()?>"></script>
<script src="<?= $vars['controller']::TEMPLATE_PATH ?>Scripts/TextEditLine.vue.js?v=<?=time()?>"></script>
<script src="<?= $vars['controller']::TEMPLATE_PATH ?>Scripts/TextfieldEditLine.vue.js?v=<?=time()?>"></script>
<script src="<?= $vars['controller']::TEMPLATE_PATH ?>Scripts/App.vue.js?v=<?=time()?>"></script>