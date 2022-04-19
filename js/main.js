/* Moile Menu */
/*=================================
   Sticky Header Starts
   =================================*/



(function ($) {

    if ($(window).width() < 769) {
        this.MobileNav = function () {
            this.curItem,
                this.curLevel = 0,
                this.transitionEnd = _getTransitionEndEventName();

            var defaults = {
                initElem: ".main-menu",
                menuTitle: "Menu"
            }

            // Check if MobileNav was initialized with some options and assign them to the "defaults"
            if (arguments[0] && typeof arguments[0] === "object") {
                this.options = extendDefaults(defaults, arguments[0]);
            }

            // Add to the "defaults" ONLY if the key is already in the "defaults"
            function extendDefaults(source, extender) {
                for (option in extender) {
                    if (source.hasOwnProperty(option)) {
                        source[option] = extender[option];
                    }
                }
            }

            MobileNav.prototype.getCurrentItem = function () {
                return this.curItem;
            };

            MobileNav.prototype.setMenuTitle = function (title) {
                defaults.menuTitle = title;
                _updateMenuTitle(this);
                return title;
            };

            // Init is an anonymous IIFE
            (function (MobileNav) {
                var initElem = ($(defaults.initElem).length) ? $(defaults.initElem) : false;

                if (initElem) {
                    defaults.initElem = initElem;
                    _clickHandlers(MobileNav);
                    _updateMenuTitle(MobileNav);
                } else {
                    console.log(defaults.initElem + " element doesn't exist, menu not initialized.");
                }
            }(this));

            function _getTransitionEndEventName() {
                var i,
                    undefined,
                    el = document.createElement('div'),
                    transitions = {
                        'transition': 'transitionend',
                        'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
                        'MozTransition': 'transitionend',
                        'WebkitTransition': 'webkitTransitionEnd'
                    };

                for (i in transitions) {
                    if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                        return transitions[i];
                    }
                }
            };

            function _clickHandlers(menu) {
                defaults.initElem.on('click', '.has-dropdown > a', function (e) {
                    e.preventDefault();
                    menu.curItem = $(this).parent();
                    _updateActiveMenu(menu);
                });

                defaults.initElem.on('click', '.nav-toggle', function () {
                    _updateActiveMenu(menu, 'back');
                });
            };

            // TODO: Make this DRY (deal with waiting for transitionend event)
            function _updateActiveMenu(menu, direction) {
                _slideMenu(menu, direction);
                if (direction === "back") {


                    menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
                    menu.curItem = menu.curItem.parent().closest('li');
                    menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
                    _updateMenuTitle(menu);
                } else {
                    menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
                    _updateMenuTitle(menu);
                }
            };

            // Update main menu title to be the text of the clicked menu item
            function _updateMenuTitle(menu) {
                var title = defaults.menuTitle;
                if (menu.curLevel > 0) {
                    title = menu.curItem.children('a').text();
                    defaults.initElem.find('.nav-toggle').addClass('back-visible');
                } else {
                    defaults.initElem.find('.nav-toggle').removeClass('back-visible');
                }
                $('.nav-title').text(title);
            };

            // Slide the main menu based on current menu depth
            function _slideMenu(menu, direction) {
                if (direction === "back") {
                    menu.curLevel = (menu.curLevel > 0) ? menu.curLevel - 1 : 0;
                } else {
                    menu.curLevel += 1;
                }
                defaults.initElem.children('ul').css({
                    "transform": "translateX(-" + (menu.curLevel * 100) + "%)"
                });
            };
        }
    }


    /* Mobile Menu */
    AOS.init();


    $('#header').load('header.html', function () {
        fixedHeader();
        if ($(window).width() < 769) {
            var MobileMenu = new MobileNav({
                initElem: "nav",
                menuTitle: "Menu",
            });
        }



        /* Add icon on .nav-item if dropdown exists */
        const navItems = document.querySelectorAll(".nav-item");

        navItems.forEach((item) => {
            const hasDropdowns = item.querySelector(".dropdown") !== null;
            if (hasDropdowns) {
                item.classList.add("dr-icon");
            }
        });


    });
    $('#footer').load('footer.html', function () {
        const cookieConsent = localStorage.getItem('cookie');
        if (cookieConsent) {
            $('.cookie-popup').css("display", "none");
        }
        $(".acceptCookie").on('click', () => {
            localStorage.setItem('cookie', true);
            $('.cookie-popup').css("display", "none");
        })



    });

    $('#schedules-demo').load('schedual-demo.html', function () {});

    function fixedHeader() {
        var sticky = $('#header'),
            scroll = $(window).scrollTop();
        if (scroll >= 220) {
            $("header").animate({
                top: '0px'
            });
            sticky.addClass('fixHeader');

        } else {
            sticky.removeClass('fixHeader');

        };

    };

    /* Header */
    $(window).scroll(function (e) {
        fixedHeader();
    });


   /*  var MobileMenu = new MobileNav({
        initElem: "nav",
        menuTitle: "Menu",
    }); */

    $(document).on('click', '.js-nav-toggle', function (e) {
        e.preventDefault();
        $('.nav-wrapper').toggleClass('show-menu');
    });

    /* Heasder Over */



    $(document).on('input', '.form-field', function () {
        if ($(this).val().length > 0) {
            $(this).addClass('field--not-empty');
        } else {
            $(this).removeClass('field--not-empty');
        }
    });

    $('.select-field-2').on("select2:select", function (e) {
        $(this).addClass('field--not-empty');
    });
    $('.select-field-2').on("select2:unselect", function (e) {
        if ($(this).val() == null) {
            $(this).removeClass('field--not-empty');
        }
    });

}(jQuery));



/* function cookie(name) {
    let c = document.cookie.split('; ').find(cookie => cookie && cookie.startsWith(name + '='));
    return c ? c.split('=')[1] : false;
}
 */
/* popup button hanler */
/* $(document).on('.cookie-popup .button-grd-line', 'click', () => {
    el('.cookie-popup').classList.add('cookie-popup--accepted');
    document.cookie = `cookie-accepted=true`;
});
/* popup init hanler 
if (cookie('cookie-accepted') !== "true") {
    setTimeout(() => {
        el('.cookie-popup').classList.add('cookie-popup--not-accepted');
    }, 1000);
} */