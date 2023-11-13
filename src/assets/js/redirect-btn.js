import $ from 'jquery';

$(document).ready(function () {
  const btnRef = $('.redirect-link-js');

  btnRef.click(function (e) {
    e.preventDefault();

    let newUrl = $(this).data('link');

    let searchParams = new URLSearchParams(window.location.search);


    searchParams.append('fromLink', window.location.href);

    newUrl = newUrl + '?' + searchParams.toString();

    window.open(newUrl, '_blank');
  });
});
