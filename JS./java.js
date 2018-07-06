$(document).ready(function () {


    let apiKey = 'ozO0apwx7oEQtMNOdfmMd8AUxeE42QP0';
    let limit = 10;
    let searchTopic = 0;
    let requests = 'api.giphy.com/v1/gifs/search?q' + searchTopic + '&api_key=' + apiKey + '&limit=' + limit;


    let topics = ['palace skateboards', 'supreme', 'off-white', 'balenciaga', 'gucci'];

    createButtons();

    function createButtons() {
        for (let i = 0; i < topics.length; i++) {
            let button = $('<button>');
            button.val(topics[i]).text(topics[i]).addClass('button');

            let value = button.val();
            console.log(value);

            $('#gifsbuttons').append(button);
        }
    }

    $('.submit').on('click', function (event) {
        event.preventDefault();
        let values = $('.input').val();
        console.log(values);
        values = values.toLowerCase();
        if (topics.includes(values)) {
            alert('this has already been added to the list already');
            return;
        } else {
            topics.push(values);
            let button = $('<button>');
            button.val(values).text(values).addClass('button');
            console.log(button);
            $('#gifsbuttons').append(button);
        }
    })
    $(document).on('click', '.button', function (event) {
        console.log('derp');
        event.preventDefault();
        console.log('dope')
        $('#gifsDisplay').empty();
        searchTopic = $(this).val();
        requests = `https:///api.giphy.com/v1/gifs/search?q=${searchTopic}&api_key=ozO0apwx7oEQtMNOdfmMd8AUxeE42QP0&limit=10`;
        console.log(searchTopic);
        console.log(requests);

        $.ajax({
            url: requests,
            method: 'GET'
        })

            .then(function (snapshot) {
                console.log(snapshot);
                let giphy = snapshot.data;

                for (let i = 0; i < giphy.length; i++) {
                    let newDiv = $('<div>');
                    let p = $('<p>');
                    p.text('Rated: ' + giphy[i].rating.toUpperCase());
                    let giphyImage = $('<img>');
                    giphyImage.attr('src', giphy[i].images.fixed_height_still.url);
                    giphyImage.attr('data-animate', giphy[i].images.preview_gif.url);
                    giphyImage.attr('data-still', giphy[i].images.fixed_height_still.url);
                    giphyImage.attr('data-state', 'still');
                    giphyImage.addClass('giphy');
                    newDiv.append(giphyImage);
                    newDiv.append(p);
                    $('#gifsDisplay').append(newDiv);
                    console.log(i);
                }
            })
    })
    $(document).on('click', '.giphy', function () {
        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    })
})
