$(function() {
    
    $('a[href*="#"]').on('click.smoothscroll', function (e) {
        var hash = this.hash;
        var _hash = hash.replace(/#/, '');
        var theHref = $(this).attr('href').replace(/#.*/, '');
        if (theHref && location.href.replace(/#.*/, '') != theHref) return;
        var $target = _hash === '' ? $('body') : $(hash + ', a[name="' + _hash + '"]').first();
        if (!$target.length) return;
        e.preventDefault();
        $('html, body').stop().animate(
            {
                scrollTop: $target.offset().top - 0
            }, 1500, 'swing', function () {
                window.location.hash = hash;
                return false;
            }
        );
    });

    $('.filter__item').on('click', function(e) {
        var i = $(this).data('filter');
        if( i==1 ) {
            $('.portfolio__column').show();
        } else {
            $('.portfolio__column').hide();
            $('.portfolio__column.f_'+i).show();
        };
        $('.filter__item').removeClass('filter__item_active');
        $(this).addClass('filter__item_active');

        return false;
    });

});