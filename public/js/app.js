$(document).ready(function() {
    let url = '/api/spotify?endpoint=/v1/search?q=tania%20bowra&type=artist';
    $.get(url, function(data) {
        console.log(data);
    });
});
