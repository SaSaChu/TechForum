$(function () {
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, "") ==
                    this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length
                    ? target
                    : $("[name=" + this.hash.slice(1) + "]");
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    let top = target.offset().top;
                    if ($(window).width() > 450) {
                        top = target.offset().top - 170;
                    }
                    $("html, body").animate(
                        {
                            scrollTop: top,
                        },
                        1000,
                        function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) {
                                // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            }
                        }
                    );
                }
            }
		});

	    var time_in_minutes = 15;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes * 60 * 1000);

    function time_remaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }
    function run_clock(id, endtime) {
        var clock = document.getElementById(id);
        function update_clock() {
            var t = time_remaining(endtime);
            clock.innerHTML =
                '<span class="text-secondary">剩餘連線時間:</span> ' +
                (t.minutes < 10 ? "0" + t.minutes : t.minutes) +
                ": " +
                (t.seconds < 10 ? "0" + t.seconds : t.seconds);
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
        update_clock(); // run function once at first to avoid delay
        var timeinterval = setInterval(update_clock, 1000);
    }
    run_clock("clockdiv", deadline);

    var myModal = document.getElementById("myModal");
    var myInput = document.getElementById("myInput");

    myModal.addEventListener("shown.bs.modal", function () {
        myInput.focus();
    });
});
