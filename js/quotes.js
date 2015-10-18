$('.selectpicker').selectpicker();

$('#categories .btn-info').on('click', function(e){
    $('.btn-block, .api-container span').hide('drop', {direction: 'right'});
    $('.alert').find('span').text('');
    $('.alert').hide();
    $('#quote-container').find('blockquote').hide('puff')
        .promise().done(function(){
            $('.quote').hide();
            $('.author').hide();
        }).promise().done(function(){
            if($('.selectpicker option:selected').text() === ''){
                e.preventDefault();
                $('.alert').text('Please choose an author first.').show();
            } else {
                var author = $('.selectpicker option:selected').text().split(' ').join('+');
                $.ajax('http://www.stands4.com/services/v2/quotes.php?uid=4332&tokenid=eyJxSoReSyxDd0M8&searchtype=AUTHOR&query=' + author, {
                    success: function(xml){
                        var count = $(xml).find('result').length;
                        var random = Math.floor(Math.random() * count) + 1;
                        console.log(count + ' ' + random);
                        $('.quote').html($(xml).find('results > result:nth-child(' + random + ') quote').text());
                        $('.author').html('~ ' + $(xml).find('results > result:nth-child(' + random + ') author').text());
                        $('#quote-container').find('blockquote').fadeIn(200)
                            .promise().done(function(){
                                $('.quote').show('slide', {
                                    direction: 'right'
                                })
                            }).promise().done(function(){
                                $('.author').show('slide', {
                                    direction: 'left'
                                })
                            });
                    },
                    error: function(xml){
                        console.log(xml);
                        $('.alert').show();
                        $('.alert').find('span').html(' The server had a problem handling your request. Please try again later.');
                    }
                });
            }
        });
});

$('#quote-container').find('blockquote').on('mouseenter', function(e){
    var quote = $('.quote').text() + ' ' + $('.author').text();
    var modifiedQuote = encodeURIComponent(quote.trim());
    var tweet = 'http://twitter.com/intent/tweet?text=' + modifiedQuote;

    if(quote.length > 140){
        e.preventDefault();
    } else {
        $('.btn-block').attr('href', tweet);
        $('.btn-block').show('shake', {
            direction: 'down',
            distance: 10,
            time: 4
        }, 'slow').promise().done(function(){
            $('.api-container span').show("explode", {pieces: 100});
        });
    }
});

