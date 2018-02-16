$(document).ready(function() {
    let url = "/api/spotify?endpoint=/v1/search?" + encodeURIComponent("q=bob&type=artist");
	//let url = '/api/spotify?endpoint=/v1/me';
    $.get(url, function(data) {
        console.log(data);
    });
});
