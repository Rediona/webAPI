//function for closing menu when clicking anywhere on screen
 
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth <= 1800) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. 
  // Solution: force focus on the element that the click event fired on

  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});


