// var swiper = new Swiper(".mylogo", {
//   slidesPerView: 3,
//   spaceBetween: 10,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   breakpoints: {
//     480: {
//       slidesPerView: 3,
//       spaceBetween: 10,
//     },
//     768: {
//       slidesPerView: 4,
//       spaceBetween: 10,
//     },

//     1200: {
//       slidesPerView: 5,
//       spaceBetween: 10,
//     },
//   },
// });


/* ===========================Benefits============================================================== */

gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollToPlugin);


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function onLoad() {
  $('.home-body').css("overflow", "visible")
}

function counter() {

  var flag = 0;


  /* ===========================Counter============================================================== */
  var counted = 0;
  $(window).scroll(function () {

    var oTop = $('#counter').offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
            countNum: countTo
          },

          {

            duration: 2000,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            }

          });
      });
      counted = 1;
    }
  });

}

function logoAnim() {

  function LottieScrollTrigger(vars) {
    let playhead = {
        frame: 0
      },
      target = gsap.utils.toArray(vars.target)[0],
      st = {
        trigger: ".animation-set-logo",
        start: "10% 50%",
        end: "50% 50%",
      },
      animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        loop: false,
        autoplay: false,
        path: vars.path
      });
    for (let p in vars) { // let users override the ScrollTrigger defaults
      st[p] = vars[p];
    }
    animation.addEventListener("DOMLoaded", function () {
      gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        ease: "none",
        onUpdate: () => animation.goToAndStop(playhead.frame, true),
        scrollTrigger: st
      });
      // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return animation;
  }

  LottieScrollTrigger({
    target: "#skitLogo",
    // path: "./lottie/skit-logo-2.json",
    // path: "./lottie/skit-2.lottie",
    // path: "https://assets6.lottiefiles.com/packages/lf20_ktjru7cb.json",
    path: "https://assets8.lottiefiles.com/packages/lf20_ukgwwf8g.json",
    scrub: 0,
    // markers: true
  });



  if ($(window).outerWidth() > 990) {
    gsap.timeline({
        scrollTrigger: {
          trigger: "#skitLogo-trigger",
          start: "top 60%",
          end: "top 0%",
          scrub: 0,
          onEnter: () => removeWave(),
          onLeaveBack: () => showWave(),
          // markers: true,
        }
      })
      .from("#skitLogo", {
        y: "-60%",
        scale: 0.45
      }, 0)
  } else {
    gsap.timeline({
        scrollTrigger: {
          trigger: "#skitLogo-trigger",
          start: "top 60%",
          end: "top 0%",
          scrub: 0,
          onEnter: () => removeWave(),
          onLeaveBack: () => showWave(),
          // markers: true,
        }
      })
      .from("#skitLogo", {
        y: "-80%",
        scale: 0.8
      }, 0)
  }

  function removeWave() {
    $(".wave-loop").hide();
    $("#skitLogo").show()
  }

  function showWave() {
    $(".wave-loop").show();
    $("#skitLogo").hide()
  }


  ////////////////////// logo-changeto-image
  gsap.timeline({
      scrollTrigger: {
        trigger: ".note",
        start: "top 70%",
        end: "top 20%",
        scrub: 0,
        // markers: true,
        id: "logo-to-image"
      }
    })
    .from(".note", {
      opacity: 0.0001
    }, 0)

  if ($(window).outerWidth() > 990) {
    gsap.timeline({
        scrollTrigger: {
          trigger: ".note",
          start: "top 70%",
          end: "top 20%",
          scrub: 0,
          // markers: true,
          id: "logo-to-image"
        }
      })
      .to("#skitLogo ,.skit-logo-image", {
        x: '36%',
        scale: 1.4,
      }, 0)
      .to(".skit-logo-wrap", {
        y: '60%',
      }, 0)

    gsap.timeline({
        scrollTrigger: {
          trigger: ".note",
          start: "top 60%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          // markers: true
        }
      })
      .to("#skitLogo", {
        opacity: 0,
        duration: 0.01
      })
      .to(".skit-logo-image", {
        opacity: 1,
        duration: 0
      })

  } else {
    gsap.timeline({
        scrollTrigger: {
          trigger: ".note",
          start: "top 70%",
          end: "top 20%",
          scrub: 0,
          // markers: true,
          id: "logo-to-image"
        }
      })
      .to("#skitLogo", {
        scale: 1.5,
      }, 0)
  }



}

function stickySection() {

  var swiperSticky = new Swiper(".swiper-sticky", {
    slidesPerView: 1,
    speed: 800,
    effect: "fade",
    allowTouchMove: false,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      formatFractionCurrent: function (number) {
        return ('0' + number).slice(-2);
      },
      formatFractionTotal: function (number) {
        return ('0' + number).slice(-2);
      },
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          '<span class="dash">/</span>' +
          '<span class="' + totalClass + '"></span>';
      }
    },
  });


  let sections = gsap.utils.toArray(".card-detail-dis");
  sections.forEach((eachPanel, i) => {
    ScrollTrigger.create({
      trigger: eachPanel,
      start: "top 40%",
      end: "top 40%",
      onEnter: () => increaseNum(i),
      // onEnterBack: () => playAgain(i),
      onLeaveBack: () => decreaseNum(i),
      toggleActions: "play none reset reset",
      // markers: true
    });
  });

  var totalBoxes = $(".card-detail-dis").find('.content-sec').length;
  var boxTotalHeight = $(".swiper-sticky-num-wrap").height();
  var boxHeight = boxTotalHeight / totalBoxes;

  function increaseNum(i) {
    swiperSticky.slideTo(i)
    $(".swiper-st-line").css("height", boxHeight * (i + 1))
    // document.getElementById("illus-" + (i + 1)).load()
    document.getElementById("illus-" + (i + 1)).play()
  }

  function decreaseNum(i) {
    swiperSticky.slideTo(i - 1)
    $(".swiper-st-line").css("height", boxHeight * (i + 1) - boxHeight)
    // document.getElementById("illus-" + (i + 1)).load()
    // document.getElementById("illus-" + (i + 1)).play()
  }


  gsap.timeline({
    scrollTrigger: {
      trigger: ".card-detail-dis:last-child",
      // markers: true,
      start: "100% 70%",
      end: "100% 30%",
      toggleActions: "play none none reverse",
      scrub: 0.4,
      // markers: true,
    }
  }).to(".swiper-sticky-num-wrap", {
    y: -500,
  })

}

function homevideo() {

  let homeVideo = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-video",
      start: "10% 70%",
      end: "10% 25%",
      scrub: 0.5,
      // markers: true,
    },
  });

  homeVideo
    .to(".home-video,.wistia-wrap-home", {
      css: {
        "clip-path": " inset(0% 0% round 0px)",
      },
    }, 0)

  let homeVideoRev = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-video",
      start: "100% 70%",
      end: "160% 25%",
      scrub: 0.5,
      // markers: true,
    },
  });

  homeVideoRev
    .to(".home-video,.wistia-wrap-home", {
      css: {
        "clip-path": " inset(27% 23% round 24px)",
      },
    }, 0)


}


$(window).on('load', function () {
  window.scrollTo(0, 0);
  logoAnim();
  AOS.init();
  onLoad()
  counter();
  if ($(window).outerWidth() > 990) {
    homevideo();
  }
  if ($(window).outerWidth() > 1024) {
    stickySection();
  }
});