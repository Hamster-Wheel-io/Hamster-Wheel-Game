


// $('#rainbow').fadeOut(2000, function() {
//     $('this').css("display", "none")
// })

$('#rainbow2').delay(2000).fadeIn(4000, function() {
    $('#rainbow2').css("z-index", "1");
});

$('#rainbow3').delay(8000).fadeIn(2000, function() {
    $("#rainbow3").css("z-index", "1");
});

$(window).on('scroll', () =>{
    if ( $(window).scrollTop() > 532  && $(window).scrollTop() < 1166){
        $(".navbar-brand").css('color', 'black');
    }
});

$(window).on('scroll', () =>{
    if (( $(window).scrollTop() > 532 ) && ($(window).scrollTop() < 1166)){
        $(".nav-link").css('color', 'black');
    }
    else {$(".nav-link").css('color', 'white')};
});

$(window).on('scroll', () =>{
    if (( $(window).scrollTop() > 532 ) && ($(window).scrollTop() < 1166)){
        $(".nav-link").css('color', 'black');
    }
    else {$(".navbar-brand").css('color', 'white')};
});

// $(document).onReady(() => {
//     if ($(window).width() < 500 )
// });
