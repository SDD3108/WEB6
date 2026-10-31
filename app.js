$(document).ready(()=>{
    console.log('jQuery is ready!');
    $('#check-console').on('click',()=>{
        console.log('jQuery is ready!');
        $('#ready-status').text('Check your console (F12)');
    });
  
    $('#selector-id').on('click', ()=>{
        $('#id-target').text('This text was changed by ID!');
    });
    $('#selector-class').on('click', ()=>{
        $('.class-target').html('Changed with <strong>.html()</strong>!');
    });
    $('#selector-tag').on('click', ()=>{
        $('em').css({
            color: '#2563eb',
            fontSize: '20px',
            fontWeight: 'bold'
        });
    });
    $('#selector-reset').on('click', ()=>{
        $('#id-target').text('This line has an ID.');
        $('.class-target').text('This line has a class.');
        $('em').removeAttr('style');
    });
    $('#hide-text').on('click',()=>{
        $('#visibility-target').hide();
    });
    $('#show-text').on('click',()=>{
        $('#visibility-target').show();
    });
    $('#toggle-text').on('click',()=>{
        $('#visibility-target').toggle();
    });
    $('#fade-in').on('click', ()=>{
        $('#fade-target').stop(true, true).fadeIn(450);
    });
    $('#fade-out').on('click', ()=>{
        $('#fade-target').stop(true, true).fadeOut(450);
    });
    $('#fade-toggle').on('click', ()=>{
        $('#fade-target').stop(true, true).fadeToggle(450);
    });
    $('#slide-up').on('click', ()=>{
        $('#slide-content').stop(true, true).slideUp(350);
    });
    $('#slide-down').on('click', ()=>{
        $('#slide-content').stop(true, true).slideDown(350);
    });
    $('#slide-toggle, #slide-head').on('click', ()=>{
        $('#slide-content').stop(true, true).slideToggle(350);
    });
  
    let counter = 3;
    const itemClass = 'rounded-md bg-slate-100 p-3';
    $('#add-last').on('click', ()=>{
        counter++;
        $('#dynamic-list').append('<li class="' + itemClass + '">Item ' + counter + '</li>');
    });
    $('#add-first').on('click', ()=>{
        counter++;
        $('#dynamic-list').prepend('<li class="' + itemClass + '">Item ' + counter + '</li>');
    });
    $('#remove-last').on('click', ()=>{
        $('#dynamic-list li').last().remove();
    });
  
    let secondImage = false;
    $('#change-image').on('click', ()=>{
        secondImage = !secondImage;
        const file = secondImage ? 'electric.svg' : 'slowdays.svg';
        $('#attribute-image').attr('src', 'images/' + file);
        $('#attribute-image').attr('alt', secondImage ? 'Electric art' : 'Slow Days art');
        $('#image-state').text(file);
    });
    let secondLink = false;
    $('#change-link').on('click', ()=>{
        secondLink = !secondLink;
        $('#dynamic-link').attr('href', secondLink ? 'https://api.jquery.com/animate/' : 'https://api.jquery.com/');
        $('#dynamic-link').text(secondLink ? 'jQuery animate() docs' : 'jQuery documentation');
        $('#link-state').text(secondLink ? 'animate() API' : 'jQuery API');
    });
  
    $('#name-input, #email-input').on('input', ()=>{
        $('#preview-name').text($('#name-input').val() || '—');
        $('#preview-email').text($('#email-input').val() || '—');
    });
    $('#live-form').on('submit', (event)=>{
        event.preventDefault();
    });
    $('#reset-form').on('click',()=>{
        $('#name-input, #email-input').val('').trigger('input');
    });

    const maxX = (area, boxWidth)=>{
        return Math.max(20, $('#' + area).innerWidth() - boxWidth - 20);
    }
    $('#basic-animate').on('click', ()=>{
        $('#basic-box').stop(true, false).animate({
            left: Math.min(190, maxX('basic-area', 112)),
            top: 90, width: 112, height: 112
        },800);
    });
    $('#basic-reset').on('click', ()=>{
        $('#basic-box').stop(true, false).animate({
            left: 20,
            top: 20,
            width: 64,
            height: 64,
        },400);
    });
    $('#sequence-start').on('click', ()=>{
        $('#sequence-box').stop(true, false)
        .animate({
            left: Math.min(200, maxX('sequence-area', 64))
        },450)
        .animate({
            top: 125,
        },450)
        .animate({
            width: 35,
            height: 35,
        },400)
        .animate({
            left: 20,
            top: 20,
            width: 64,
            height: 64,
        },600);
    });
    $('#sequence-reset').on('click', ()=>{
      $('#sequence-box').stop(true, false).animate({
        left: 20,
        top: 20,
        width: 64,
        height: 64
    }, 400);
    });
    $('#combined-start').on('click', ()=>{
        $('#combined-box').stop(true, false).animate({
            left: Math.min(190, maxX('combined-area', 112)),
            top: 85,
            width: 112,
            height: 100,
            opacity: 0.35
        },900);
    });
    $('#combined-reset').on('click', ()=>{
        $('#combined-box').stop(true, false).animate({
            left: 20,
            top: 20,
            width: 64,
            height: 64,
            opacity: 1,
        },400);
    });
  
    let shown = $('.gallery-item').toArray();
    let current = 0;
    const updateCount = ()=>{
        $('#gallery-counter').text(shown.length + ' images');
    }
    $('.gallery-filter').on('click', ()=>{
        const filter = $(this).data('filter');
        $('.gallery-filter').removeClass('bg-blue-600 text-white').addClass('bg-slate-200 text-slate-800');
        $(this).removeClass('bg-slate-200 text-slate-800').addClass('bg-blue-600 text-white');
        $('.gallery-item').each(()=>{
            const visible = filter == 'all' || $(this).data('category') == filter;
            if(visible){
                $(this).stop(true, true).fadeIn(250);
            }
            else{
                $(this).stop(true, true).fadeOut(200);
            }
        });
        shown = $('.gallery-item').filter(()=>{
            return filter == 'all' || $(this).data('category') == filter;
        }).toArray();

        updateCount();
    });
    const showImage = (index)=>{
        if(!shown.length){
            return
        }
        current = (index + shown.length) % shown.length;
        const $selected = $(shown[current]);
        const $img = $selected.find('img');
        $('#lightbox-title').text($selected.data('title'));
        $('#lightbox-index').text((current + 1) + ' / ' + shown.length);
        $('#lightbox-image').stop(true, true).hide().attr('src', $img.attr('src')).attr('alt', $img.attr('alt')).fadeIn(250);
    }
    $('.gallery-item').on('click', ()=>{
        current = shown.indexOf(this);
        if(current < 0){
          return
        }
        showImage(current);
        $('#lightbox').removeClass('hidden').addClass('flex').hide().fadeIn(200);
        $('#lightbox-close').trigger('focus');
    });
    const closeImage = ()=>{
        $('#lightbox').fadeOut(150, ()=>{
            $(this).addClass('hidden').removeClass('flex');
        });
    }
    $('#lightbox-close').on('click', closeImage);
    $('#lightbox').on('click', (event)=>{
        if(event.target == this){
            closeImage();
        }
    });
    $('#lightbox-prev').on('click',()=>{
        showImage(current - 1);
    });
    $('#lightbox-next').on('click',()=>{
        showImage(current + 1);
    });
    $(document).on('keydown', function (event) {
        if($('#lightbox').is(':visible')){
            if(event.key == 'Escape'){
                closeImage();
            }
            if(event.key == 'ArrowLeft'){
                showImage(current - 1);
            }
            if(event.key == 'ArrowRight'){
                showImage(current + 1);
            }
        }
    });
  });
  