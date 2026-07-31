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

        document.getElementById("orderForm").addEventListener("submit", function (e) {

            e.preventDefault();

            emailjs.send(
                "service_jia3auq",
                "template_xdpf5yb",
                {
                    customer_name: document.getElementById("name").value,
                    customer_email: document.getElementById("email").value,
                    phone: document.getElementById("mobile").value,

                    address1: document.getElementById("address1").value,
                    address2: document.getElementById("address2").value,
                    city: document.getElementById("city").value,
                    zipcode: document.getElementById("zipcode").value,

                    product: document.getElementById("product").value,
                    quantity: document.getElementById("quantity").value
                },
                "5WqPB02ANDNAbQRFJ"
            )
            .then(function () {

                Swal.fire({
                    icon: "success",
                    title: "Order Placed",
                    text: "Thank you for your order!"
                });

                document.getElementById("orderForm").reset();

                document.getElementById("orderModal").style.display = "none";             

            })
            .catch(function (error) {
                console.log("EmailJS Error:", error);

                Swal.fire({
                    icon: "error",
                    title: "Email Failed",
                    text: JSON.stringify(error)
                });
            });

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