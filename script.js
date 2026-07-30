// =======================================
// PEANIX WEBSITE JAVASCRIPT
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    // =======================================
    // LOADER
    // =======================================

    const loader = document.getElementById("loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        });

    }

    // =======================================
    // STICKY NAVBAR
    // =======================================

    const nav = document.querySelector("nav");

    // =======================================
    // BACK TO TOP
    // =======================================

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        // Navbar

        if (nav) {

            if (window.scrollY > 80) {

                nav.classList.add("sticky");

            } else {

                nav.classList.remove("sticky");

            }

        }

        // Back to top

        if (topBtn) {

            topBtn.style.display =
                window.scrollY > 300 ? "flex" : "none";

        }

    });

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    // =======================================
    // PRODUCT PRICE
    // =======================================

    const modal = document.getElementById("orderModal");
    const closeBtn = document.querySelector(".close");

    // Close using X button
    if (closeBtn) {

        closeBtn.addEventListener("click", function () {

            modal.style.display = "none";

        });

    }

    // Close when clicking outside the popup
    window.addEventListener("click", function (e) {

        if (e.target === modal) {

            modal.style.display = "none";

        }

    });

    let selectedPrice = 0;

    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const form = document.getElementById("orderForm");

    document.querySelectorAll(".buy-btn").forEach(btn => {

        btn.addEventListener("click", function (e) {

            e.preventDefault();

            // Set product
            product.value = this.dataset.product;

            // Set price from button
            selectedPrice = parseInt(this.dataset.price);

            // Reset quantity
            quantity.value = 1;

            // Update total
            updateTotal();

            // Open modal
            document.getElementById("orderModal").style.display = "flex";

        });

    });

    if (form && product && quantity) {

        // Total Price Box

        let totalPrice = document.getElementById("totalPrice");

        if (!totalPrice) {

            const totalBox = document.createElement("div");

            totalBox.className = "total-box";

            totalBox.innerHTML = `
                <h3>Total : ₹<span id="totalPrice">0</span></h3>
            `;

            form.insertBefore(
                totalBox,
                form.querySelector("button")
            );

            totalPrice = document.getElementById("totalPrice");

        }

        function updateTotal() {

            const qty = parseInt(quantity.value) || 1;

            totalPrice.innerText = selectedPrice * qty;

        }

        product.addEventListener("change", updateTotal);

        quantity.addEventListener("input", updateTotal);

        updateTotal();

        // =======================================
        // QUANTITY BUTTONS
        // =======================================

        const plus = document.getElementById("plus");
        const minus = document.getElementById("minus");

        if (plus) {

            plus.addEventListener("click", () => {

                quantity.value = parseInt(quantity.value || 1) + 1;

                updateTotal();

            });

        }

        if (minus) {

            minus.addEventListener("click", () => {

                let qty = parseInt(quantity.value || 1);

                if (qty > 1) {

                    quantity.value = qty - 1;

                }

                updateTotal();

            });

        }

        // =======================================
        // MOBILE VALIDATION
        // =======================================

        const mobile = document.getElementById("mobile");

        if (mobile) {

            mobile.addEventListener("input", function () {

                this.value = this.value

                    .replace(/\D/g, "")

                    .slice(0, 10);

            });

        }

        // =======================================
        // FORM SUBMIT
        // =======================================

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.getElementById("name").value.trim();

            const email = document.getElementById("email").value.trim();

            const address = document.getElementById("address").value.trim();

            if (name === "") {

                Swal.fire(

                    "Error",

                    "Please enter your name.",

                    "error"

                );

                return;

            }

            if (!/^[6-9]\d{9}$/.test(mobile.value)) {

                Swal.fire(

                    "Error",

                    "Please enter a valid mobile number.",

                    "error"

                );

                return;

            }

            if (

                email !== "" &&

                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

            ) {

                Swal.fire(

                    "Error",

                    "Please enter a valid email.",

                    "error"

                );

                return;

            }

            const button = form.querySelector("button");

            button.disabled = true;

            button.innerHTML = "Processing...";

            const order = {

                orderId: "PNX" + Date.now(),

                name,

                mobile: mobile.value,

                email,

                product: product.value,

                quantity: quantity.value,

                total: totalPrice.innerText,

                address

            };

            console.log(order);

            localStorage.setItem(

                "PeanixOrder",

                JSON.stringify(order)

            );

            setTimeout(() => {

                Swal.fire({

                    icon: "success",

                    title: "Order Placed!",

                    html: `
                        <b>Order ID</b><br>
                        ${order.orderId}
                    `,

                    confirmButtonColor: "#ff9800"

                });

                form.reset();

                quantity.value = 1;

                updateTotal();

                button.disabled = false;

                button.innerHTML = "Place Order";

            }, 800);

        });

    }
    

    // =======================================
    // FAQ
    // =======================================

    document.querySelectorAll(".faq-question").forEach(btn => {

        btn.addEventListener("click", () => {

            const answer = btn.nextElementSibling;

            const open = answer.style.maxHeight;

            document.querySelectorAll(".faq-answer").forEach(item => {

                item.style.maxHeight = null;

            });

            if (!open) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

    // =======================================
    // COUNTERS
    // =======================================

    const counters = document.querySelectorAll(".counter");

    if (counters.length) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target = +counter.dataset.target;

                let current = 0;

                const increment = Math.max(1, Math.ceil(target / 100));

                const timer = setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    counter.innerText = current;

                }, 20);

                observer.unobserve(counter);

            });

        });

        counters.forEach(counter => observer.observe(counter));

    }
    

});