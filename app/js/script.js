$(function() {
    // плагины Gulp не поддерживают синтаксис ES6

    $(".header__arrow:first").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'), //Возвращает или изменяет значение атрибутов
        top = $(id).offset().top; //дает координаты выбранного элем.
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $('.about__nav-menu:first').on('click','a', function(event) {
        event.preventDefault();

        $('.about__nav-item').each(function(i, elem) {
            elem.classList.remove("about__nav-item_active");
        });
        
        this.classList.add("about__nav-item_active");
        // console.log( this );
        // console.log( event.currentTarget );
    });



});