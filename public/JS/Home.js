const authPath = [
  "cart.html",
  "cart1.html",
  "cart2.html",
  "cart3.html",
  "cart4.html",
  "cart5.html",
  "cart6.html",
  "cart7.html",
  "cart8.html",
];
$(document).ready(function () {
  let user = localStorage.getItem("auth");
  if (user) {
    let parsedUser = JSON.parse(user);
    $("#welcome").html("Xin chào, " + parsedUser.name);
    $("#btn-logout").removeClass("hidden");

    $(".auth .login").hide();
    $(".auth .register").hide();
  } else {
    $(".auth .login").show();
    $(".auth .register").show();

    $("#btn-logout").addClass("hidden");
    $("#user-info").hide();
  }

  $("#btn-logout").on("click", function () {
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("courseBought");
    window.location.reload();
  });
});

$(document).ready(function () {
  let user = localStorage.getItem("auth");
  if (user) {
    let parsedUser = JSON.parse(user);
    $("#mobile-welcome").html("Xin chào, " + parsedUser.name);
    $("#mobile-user-info").removeClass("hidden");
    $(".mobile-login-link").hide();
    $(".mobile-register-link").hide();
  } else {
    $(".mobile-login-link").show();
    $(".mobile-register-link").show();
    $("#mobile-user-info").addClass("hidden");
  }
  $("#mobile-logout").on("click", function () {
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("courseBought");
    window.location.reload();
  });
});

$(document).ready(function () {
  let showGoToTop = 1300;
  $(window).scroll(function () {
    if ($(this).scrollTop() >= showGoToTop) {
      $("#go-to-top").fadeIn();
    } else {
      $("#go-to-top").fadeOut();
    }
  });
});
$(document).ready(function () {
  $("#go-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});

$(document).ready(function () {
  const slides = $(".slide");
  let slideIndex = 0;
  let intervalId = null;

  function Slider() {
    if (slides.length > 0) {
      $(slides[slideIndex]).addClass("displaySlide");
      intervalId = setInterval(nextSlide, 3000);
    }
  }

  function showSlide(index) {
    if (index >= slides.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex = index;
    }

    slides.removeClass("displaySlide");
    $(slides[slideIndex]).addClass("displaySlide");
  }

  function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
    intervalId = setInterval(nextSlide, 3000);
  }

  function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
  }
  Slider();
  $(".prev").click(function () {
    prevSlide();
  });
  $(".next").click(function () {
    nextSlide();
  });
});
//Xử lí sự kiện học ngay
$(document).ready(function () {
  function isLoggedIn() {
    const user = localStorage.getItem("auth");
    return user !== null;
  }

  $(document).on("click", ".btn.btn-primary, .btn-cart", function (event) {
    const courseBought = JSON.parse(localStorage.getItem("courseBought"));
    //Nếu render html bằng jquery thì phải dùng $(document) và các class, id đặt ngay sau phần tử bắt sự kiện
    /**
     * VD:
     * Ban đầu: $(".btn.btn-primary").on("click", function (event) {...}
     * Khi render html bằng jquery: $(document).on("click", ".btn.btn-primary", function (event) {...}
     */
    event.preventDefault();
    if (!isLoggedIn()) {
      alert("Bạn cần đăng nhập để tiếp tục!");
      window.location.href = "./Home/Login.html";
    } else {
      let courseLink = $(this).attr("href");
      if (courseBought) {
        const match = courseLink.match(/\d+/);
        const courseId = match ? match[0] : null; // Lấy id khóa học từ đường dẫn
        for (let i = 0; i < courseBought.length; i++) {
          if (courseBought[i].id == courseId) {
            courseLink = courseLink.replace("cart", "studyNow"); // Thay đổi đường dẫn từ cart thành studyNow
            break;
          }
        }
      }
      window.location.href = courseLink; // Chuyển hướng đến đường dẫn đã lấy được
    }
  });
});
/* $(document).ready(function () {
  function isLoggedIn() {
    const user = localStorage.getItem("auth");
    return user !== null;
  }
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    if (!isLoggedIn()) {
      alert("Bạn cần đăng nhập để tiếp tục!");
      window.location.href = "./Home/Login.html";
    } else {
      const courseLink = $(this).attr("href");
      window.location.href = courseLink;
    }
  });
}); */
$(document).ready(function () {
  $("#mobile-menu-button").on("click", function () {
    $("#mobile-menu-overlay").addClass("active");
    $("body").css("overflow", "hidden");
  });
  $("#mobile-menu-close").on("click", function () {
    $("#mobile-menu-overlay").removeClass("active");
    $("body").css("overflow", "");
  });
  $("#mobile-search-close").on("click", function () {
    $(".mobile-search-container").css("display", "none");
  });
  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      $("#mobile-menu-overlay").removeClass("active");
      $("body").css("overflow", "");
    }
  });
});

// Hiển thị sản phẩm học thử miễn phí và bán chạy nhất
$(document).ready(function () {
  // Kiểm tra đường dẫn hiện tại
  const currentPath = window.location.pathname;
  const jsonPath = currentPath.includes("index.html")
    ? "./data/course.json"
    : "../data/course.json";
  $.getJSON(jsonPath, function (data) {
    const bestsellerCourses = data.bestseller;
    const freeTrialCourses = data.freeTrial;

    // Populate bestseller section
    const bestsellerGrid = $(".bestseller-section .course-grid");
    bestsellerCourses.forEach((course) => {
      const courseCard = `
        <div class="course-card" data-course-name="${course.name}">
          <div class="course-image">
            <img src="${course.image}" alt="${course.name}" />
            <div class="course-badge bestseller">Bán chạy</div>
          </div>
          <div class="course-content">
            <div class="course-instructor">
              <img src="${course.instructorImage}" alt="${course.instructor}" />
              <span>${course.instructor}</span>
            </div>
            <h3>${course.description}</h3>
            <div class="course-rating">
              <span class="stars">${"★".repeat(course.rating)}${"☆".repeat(
        5 - course.rating
      )}</span>
              <span class="rating-count">(${course.ratingCount})</span>
            </div>
            <div class="course-info">
              <span>${course.lessons} bài học</span>
              <span>${course.duration}</span>
            </div>
            <div class="course-price">
              <span class="current-price">${course.price}</span>
              <span class="original-price">${course.originalPrice}</span>
              <span class="discount">${course.discount}</span>
            </div>
            <div class="course-action">
              <a href="${course.studyLink}" class="btn btn-primary">Học ngay</a>
              <a href="${
                course.detailsLink
              }" class="btn-details">Xem chi tiết</a>
            </div>
          </div>
        </div>`;
      bestsellerGrid.append(courseCard);
    });

    // Populate free trial section
    const freeTrialGrid = $(".free-trial-section .course-grid");
    freeTrialCourses.forEach((course) => {
      const courseCard = `
        <div class="course-card" data-course-name="${course.name}">
          <div class="course-image">
            <img src="${course.image}" alt="${course.name}" />
            <div class="course-badge free">Miễn phí</div>
          </div>
          <div class="course-content">
            <div class="course-instructor">
              <img src="${course.instructorImage}" alt="${course.instructor}" />
              <span>${course.instructor}</span>
            </div>
            <h3>${course.description}</h3>
            <div class="course-rating">
              <span class="stars">${"★".repeat(course.rating)}${"☆".repeat(
        5 - course.rating
      )}</span>
              <span class="rating-count">(${course.ratingCount})</span>
            </div>
            <div class="course-info">
              <span>${course.lessons} bài học</span>
              <span>${course.duration}</span>
            </div>
            <div class="course-action">
              <a href="${course.studyLink}" class="btn btn-primary">Học ngay</a>
              <a href="${
                course.detailsLink
              }" class="btn-details">Xem chi tiết</a>
            </div>
          </div>
        </div>`;
      freeTrialGrid.append(courseCard);
    });
  }).fail(function () {
    console.error("Error loading course data.");
  });
});

// Xử lý số lượng sản phẩm trong giỏ hàng và nút thêm vào giỏ hàng
$(document).ready(function () {
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountDesktop = $("#count");
    const cartCountMobile = $("#count-mobile");

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const countText = `(${cart.length})`;
    cartCountDesktop.text(countText);
    cartCountMobile.text(countText);
  }

  // Gọi hàm cập nhật số lượng khi trang được tải
  updateCartCount();

  // Xử lý nút thêm vào giỏ hàng
  $(".btn-add-cart").on("click", function () {
    const courseId = $(this).find("#course-id").val();

    // Lấy dữ liệu từ course.json
    $.getJSON("../data/course.json", function (data) {
      const allCourses = [...data.bestseller, ...data.freeTrial];
      const selectedCourse = allCourses.find((course) => course.id == courseId);

      if (selectedCourse) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id == courseId);

        if (existingItem) {
          alert("Sản phẩm đã có trong giỏ hàng!");
        } else {
          cart.push(selectedCourse);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Đã thêm sản phẩm vào giỏ hàng!");
          updateCartCount();
        }
      } else {
        alert("Không tìm thấy sản phẩm!");
      }
    }).fail(function () {
      alert("Không thể tải dữ liệu sản phẩm!");
    });
  });
});

$(document).ready(function () {
  function isLoggedIn() {
    const user = localStorage.getItem("auth");
    return user !== null; // Kiểm tra xem người dùng đã đăng nhập hay chưa
  }

  // Kiểm tra nếu URL chứa "cart*.html"
  const currentPath = window.location.pathname;
  for (let i = 0; i < authPath.length; i++) {
    if (currentPath.includes(authPath[i])) {
      if (!isLoggedIn()) {
        alert("Bạn cần đăng nhập để truy cập !");
        window.location.href = "../Home/Login.html";
      }
    }
  }
});
