$.ajax({
    url: "http://localhost/outdoorGear/api/route.php",
    type: "POST",
    dataType  : 'json',
    data: {
    'action':'fetch_all_products'
    },
    success: function(data) {
        console.log(data);  
    }
});