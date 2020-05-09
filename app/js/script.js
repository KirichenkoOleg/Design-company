// $(function() {
    // плагины Gulp не поддерживают синтаксис ES6

    // $(".header__arrow-down:first").on("click", function (event) {
    //     event.preventDefault();
    //     var id  = $(this).attr('href'), //Возвращает или изменяет значение атрибутов
    //     top = $(id).offset().top; //дает координаты выбранного элем.
    //     $('body,html').animate({scrollTop: top}, 1500);
    // });

    // $('.about__nav-menu:first').on('click','a', function(event) {
    //     event.preventDefault();

    //     $('.about__nav-item').each(function(i, elem) {
    //         elem.classList.remove("about__nav-item_active");
    //     });
        
    //     this.classList.add("about__nav-item_active");
    //     // console.log( this );
    //     // console.log( event.currentTarget );
    // });

    var navMenu = $('.about__menu-nav').eq(0);
    var menuBg = $('.menu-nav__item-bg').eq(0);
    var header = $('.header').eq(0);//высота хедера
    
    $(window).on('scroll', function (e) {
        var scrollfromtop = $(this).scrollTop();//получение текущей прокрутки
        var headHeight = header.outerHeight();//высота элемента с учетом внутренних отступов и рамки

        if( scrollfromtop > headHeight ) {
            navMenu.addClass('about__menu-nav_scrolled');
            // menuBg.addClass('menu-nav__item-bg_scrolled');
        } else {
            navMenu.removeClass('about__menu-nav_scrolled');
            // menuBg.removeClass('menu-nav__item-bg_scrolled');
        }
    });

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
            }
        );
    });

// });