$(document).ready(function () {
  console.log('jQuery is ready!');

  $('#check-console').on('click', function () {
    console.log('jQuery is ready!');
    $('#ready-status').text('Check your console (F12) ✓');
  });

  $('#selector-id').on('click', function () {
    $('#id-target').text('This text was changed by ID!');
  });
  $('#selector-class').on('click', function () {
    $('.class-target').html('Changed with <strong>.html()</strong>!');
  });
  $('#selector-tag').on('click', function () {
    $('em').css({ color: '#2563eb', fontSize: '20px', fontWeight: 'bold' });
  });
  $('#selector-reset').on('click', function () {
    $('#id-target').text('This line has an ID.');
    $('.class-target').text('This line has a class.');
    $('em').removeAttr('style');
  });

  $('#hide-text').on('click', function () { $('#visibility-target').hide(); });
  $('#show-text').on('click', function () { $('#visibility-target').show(); });
  $('#toggle-text').on('click', function () { $('#visibility-target').toggle(); });

  $('#fade-in').on('click', function () { $('#fade-target').stop(true, true).fadeIn(450); });
  $('#fade-out').on('click', function () { $('#fade-target').stop(true, true).fadeOut(450); });
  $('#fade-toggle').on('click', function () { $('#fade-target').stop(true, true).fadeToggle(450); });

  $('#slide-up').on('click', function () { $('#slide-content').stop(true, true).slideUp(350); });
  $('#slide-down').on('click', function () { $('#slide-content').stop(true, true).slideDown(350); });
  $('#slide-toggle, #slide-head').on('click', function () { $('#slide-content').stop(true, true).slideToggle(350); });

  let counter = 3;
  const itemClass = 'rounded-md bg-slate-100 p-3';
  $('#add-last').on('click', function () {
    counter++;
    $('#dynamic-list').append('<li class="' + itemClass + '">Item ' + counter + '</li>');
  });
  $('#add-first').on('click', function () {
    counter++;
    $('#dynamic-list').prepend('<li class="' + itemClass + '">Item ' + counter + '</li>');
  });
  $('#remove-last').on('click', function () { $('#dynamic-list li').last().remove(); });

  let secondImage = false;
  $('#change-image').on('click', function () {
    secondImage = !secondImage;
    const file = secondImage ? 'electric.svg' : 'slowdays.svg';
    $('#attribute-image').attr('src', 'assets/images/' + file);
    $('#attribute-image').attr('alt', secondImage ? 'Electric art' : 'Slow Days art');
    $('#image-state').text(file);
  });
  let secondLink = false;
  $('#change-link').on('click', function () {
    secondLink = !secondLink;
    $('#dynamic-link').attr('href', secondLink ? 'https://api.jquery.com/animate/' : 'https://api.jquery.com/');
    $('#dynamic-link').text(secondLink ? 'jQuery animate() docs' : 'jQuery documentation');
    $('#link-state').text(secondLink ? 'animate() API' : 'jQuery API');
  });

  $('#name-input, #email-input').on('input', function () {
    $('#preview-name').text($('#name-input').val() || '—');
    $('#preview-email').text($('#email-input').val() || '—');
  });
  $('#live-form').on('submit', function (event) { event.preventDefault(); });
  $('#reset-form').on('click', function () {
    $('#name-input, #email-input').val('').trigger('input');
  });

  function maxX(area, boxWidth) {
    return Math.max(20, $('#' + area).innerWidth() - boxWidth - 20);
  }
  $('#basic-animate').on('click', function () {
    $('#basic-box').stop(true, false).animate({ left: Math.min(190, maxX('basic-area', 112)), top: 90, width: 112, height: 112 }, 800);
  });
  $('#basic-reset').on('click', function () {
    $('#basic-box').stop(true, false).animate({ left: 20, top: 20, width: 64, height: 64 }, 400);
  });
  $('#sequence-start').on('click', function () {
    $('#sequence-box').stop(true, false)
      .animate({ left: Math.min(200, maxX('sequence-area', 64)) }, 450)
      .animate({ top: 125 }, 450)
      .animate({ width: 35, height: 35 }, 400)
      .animate({ left: 20, top: 20, width: 64, height: 64 }, 600);
  });
  $('#sequence-reset').on('click', function () {
    $('#sequence-box').stop(true, false).animate({ left: 20, top: 20, width: 64, height: 64 }, 400);
  });
  $('#combined-start').on('click', function () {
    $('#combined-box').stop(true, false).animate({ left: Math.min(190, maxX('combined-area', 112)), top: 85, width: 112, height: 100, opacity: 0.35 }, 900);
  });
  $('#combined-reset').on('click', function () {
    $('#combined-box').stop(true, false).animate({ left: 20, top: 20, width: 64, height: 64, opacity: 1 }, 400);
  });

  let shown = $('.gallery-item').toArray();
  let current = 0;
  function updateCount() { $('#gallery-counter').text(shown.length + ' images'); }
  $('.gallery-filter').on('click', function () {
    const filter = $(this).data('filter');
    $('.gallery-filter').removeClass('bg-blue-600 text-white').addClass('bg-slate-200 text-slate-800');
    $(this).removeClass('bg-slate-200 text-slate-800').addClass('bg-blue-600 text-white');
    $('.gallery-item').each(function () {
      const visible = filter === 'all' || $(this).data('category') === filter;
      if (visible) $(this).stop(true, true).fadeIn(250);
      else $(this).stop(true, true).fadeOut(200);
    });
    shown = $('.gallery-item').filter(function () {
      return filter === 'all' || $(this).data('category') === filter;
    }).toArray();
    updateCount();
  });
  function showImage(index) {
    if (!shown.length) return;
    current = (index + shown.length) % shown.length;
    const $selected = $(shown[current]);
    const $img = $selected.find('img');
    $('#lightbox-title').text($selected.data('title'));
    $('#lightbox-index').text((current + 1) + ' / ' + shown.length);
    $('#lightbox-image').stop(true, true).hide().attr('src', $img.attr('src')).attr('alt', $img.attr('alt')).fadeIn(250);
  }
  $('.gallery-item').on('click', function () {
    current = shown.indexOf(this);
    if (current < 0) return;
    showImage(current);
    $('#lightbox').removeClass('hidden').addClass('flex').hide().fadeIn(200);
    $('#lightbox-close').trigger('focus');
  });
  function closeImage() {
    $('#lightbox').fadeOut(150, function () {
      $(this).addClass('hidden').removeClass('flex');
    });
  }
  $('#lightbox-close').on('click', closeImage);
  $('#lightbox').on('click', function (event) { if (event.target === this) closeImage(); });
  $('#lightbox-prev').on('click', function () { showImage(current - 1); });
  $('#lightbox-next').on('click', function () { showImage(current + 1); });
  $(document).on('keydown', function (event) {
    if ($('#lightbox').is(':visible')) {
      if (event.key === 'Escape') closeImage();
      if (event.key === 'ArrowLeft') showImage(current - 1);
      if (event.key === 'ArrowRight') showImage(current + 1);
    }
  });
});
