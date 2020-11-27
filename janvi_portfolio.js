$(document).ready(function () {
  var model = {
    skillCounter: 0,
    navToggled: false,
  };

  var app = {
    init: function () {
      this.cacheDOM();
      this.bindEvents();
      this.toggleScroll();
      this.showSkill(model.skillCounter);
    },

    cacheDOM: function () {
      this.$skill = document.getElementsByClassName("skill");
      this.$skillArrow = $(".slider-arrow");
      this.$navOverlay = $(".nav-overlay");
      this.$toggleNav = $(".toggle-nav");
    },

    bindEvents: function () {
      this.$skillArrow.on("click", this.skillSlider.bind(this));
      this.$toggleNav.on("click", this.toggleNav.bind(this));
      $(window).scroll(this.toggleScroll);
      $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(this.smoothScroll);
    },

    toggleScroll: function () {
      if ($(document).scrollTop() > 0) {
        $("nav").addClass("nav-scroll");
      } else {
        $("nav").removeClass("nav-scroll");
      }

      var scrollBarLocation = $(this).scrollTop();
      $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .each(function () {
          var sectionOffset = $(this.hash).offset().top;
          if (Math.floor(sectionOffset) <= scrollBarLocation) {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
          } else {
            $(this).removeClass("active");
          }
        });
    },

    showSkill: function (j) {
      var length = this.$skill.length;
      for (var i = 0; i < length; i++) {
        $(this.$skill[i]).hide();
      }
      $(this.$skill[j]).show();
    },

    skillSlider: function (e) {
      var i = $(e.target).attr("value");
      model.skillCounter += Number(i);
      if (model.skillCounter < 0) {
        model.skillCounter = this.$skill.length - 1;
      }
      this.showSkill(model.skillCounter % this.$skill.length);
    },

    toggleNav: function () {
      if (model.navToggled) {
        this.$navOverlay.css("width", "0%");
        model.navToggled = false;
      } else {
        this.$navOverlay.css("width", "100%");
        model.navToggled = true;
      }
    },

    smoothScroll: function (e) {
      e.preventDefault();
      model.navToggled ? app.toggleNav() : "";
      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top,
        },
        1000
      );
    },
  };

  app.init();
})();
