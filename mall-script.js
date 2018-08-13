$(document).ready(function () {
    // =================================================================================================================
    // configure map
    // =================================================================================================================
    var mymap = L.map('map').setView([3.139003, 101.686855], 10);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicmFmaXphbi1iYWhhcnVtIiwiYSI6ImNqa2kyc3VudDEwanAzdm1sa2hrbXljaGoifQ.3OBKi3hcYVUCD7jrJ76tYw'
    }).addTo(mymap);

    // =================================================================================================================
    // retrieve json
    // =================================================================================================================
    $.ajax({
            dataType: "json",
            url: 'mall.json'
        }
    )
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var name = data[i].name;
                var latitude = data[i].latitude;
                var longitude = data[i].longitude;
                var address = data[i].address;
                var contact = data[i].contact;
                var hour = data[i].hour;
                console.log(name);
                console.log(latitude);
                console.log(longitude);
                console.log(address);
                console.log(contact);
                console.log(hour);


                $('#mall-list').append('<li class="list-group-item d-flex justify-content-between align-items-center">' +
                    '<a><p id="' + id +
                    '" data-latitude="' + latitude +
                    '" data-longitude="' + longitude +
                    '" data-name="' + name +
                    '" data-address="' + address +
                    '">' + name + '</p></a>')

                // function click on <p>
                $('#' + id).on('click', function () {
                    var name = $(this).data('name');
                    var address = $(this).data('address');
                    var latitude = $(this).data('latitude');
                    var longitude = $(this).data('longitude');
                    $("#detail").text(name);
                    $("#name").text('Name: ' + name);
                    $("#address").text('Address: ' + address);
                    $("#contact").text('Contact: ' + contact);
                    $("#hour").text('Hour: ' + hour);
                    mymap.flyTo(new L.LatLng(latitude, longitude), 18);
                });

                // create marker
                // and add it to map
                var marker = L.marker([latitude, longitude], data[i]);
                marker.addTo(mymap);

                // bind tooltip to marker
                marker.bindPopup('<p>' + name + '</p>').openPopup();
                marker.on('click', onMarkerClick);
            }
        });

    function onMarkerClick(e) {
        console.log(e.sourceTarget.options.name);
        console.log(e.sourceTarget.options.address);
        console.log(e.sourceTarget.options.contact);
        console.log(e.sourceTarget.options.hour);
        $("#detail").text(e.sourceTarget.options.name);
        $("#name").text('Name: ' + e.sourceTarget.options.name);
        $("#address").text('Address: ' + e.sourceTarget.options.addres);
        $("#contact").text('Contact: ' + e.sourceTarget.options.contact);
        $("#hour").text('Hour: ' + e.sourceTarget.options.hour);
        mymap.flyTo(new L.LatLng(e.sourceTarget.options.latitude, e.sourceTarget.options.longitude), 18);
    }


    // =================================================================================================================
    // configure function search
    // =================================================================================================================
    $("#search").keyup(function () {
        let val = $(this).val();
        console.log(val);
        filter = $(this).val().toUpperCase();
        var ul = $('#mall-list')[0];
        lis = ul.children;
        for (i = 0; i < lis.length; i++) {
            console.log(lis[i]);
            a = lis[i].firstChild;
            console.log(a);
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                lis[i].style.display = "";
            } else {
                lis[i].style.display = "none";
            }
        }
    });


});