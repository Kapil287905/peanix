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
    const menu = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".nav-links");

    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

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
    // PRODUCT ORDER SYSTEM
    // =======================================

    const modal = document.getElementById("orderModal");
    const form = document.getElementById("orderForm");
    const closeBtn = document.querySelector(".close");

    // =======================================
    // ORDER BOTH BUTTON
    // =======================================

    document.querySelectorAll(".buy-btnb").forEach(btn => {

        btn.addEventListener("click", function(e){

            e.preventDefault();


            // Reset all products

            document.querySelectorAll(".product").forEach(product=>{

                product.checked = false;
                product.disabled = false;

            });


            document.querySelectorAll(".product-qty").forEach(qty=>{

                qty.disabled = true;
                qty.value = 1;

            });



            // Select White Chocolate

            let white = document.querySelector(
                '.product[value="White Chocolate"]'
            );


            if(white){

                white.checked = true;

                let qty = document.getElementById("whiteQty");

                qty.disabled = false;
                qty.value = 1;

            }



            // Select Dark Chocolate

            let dark = document.querySelector(
                '.product[value="Dark Chocolate"]'
            );


            if(dark){

                dark.checked = true;

                let qty = document.getElementById("darkQty");

                qty.disabled = false;
                qty.value = 1;

            }



            // Calculate total

            calculateTotal();



            // Open popup

            document.getElementById("orderModal")
            .style.display = "flex";


        });


    });


    // ================================
    // OPEN ORDER POPUP
    // ================================

     document.querySelectorAll(".buy-btnb").forEach(btn => {

        btn.addEventListener("click", function(e){

            e.preventDefault();


            // Reset all products first

            document.querySelectorAll(".product").forEach(item => {

                item.checked = false;
                item.disabled = false;

            });


            document.querySelectorAll(".product-qty").forEach(qty => {

                qty.value = 0;
                qty.disabled = true;

            });


            // Disable all plus minus buttons

            document.querySelectorAll(".plus, .minus").forEach(button => {

                button.disabled = true;

            });

            document.getElementById("white").style.display = "block";
            document.getElementById("dark").style.display = "block";



            // Select White Chocolate

            let whiteProduct = document.querySelector(
                '.product[value="White Chocolate"]'
            );


            if(whiteProduct){

                whiteProduct.checked = true;


                let whiteQty = document.getElementById("whiteQty");

                whiteQty.value = 1;
                whiteQty.disabled = false;



                document.querySelectorAll(
                    '.plus[data-target="whiteQty"], .minus[data-target="whiteQty"]'
                ).forEach(button => {

                    button.disabled = false;

                });

            }



            // Select Dark Chocolate

            let darkProduct = document.querySelector(
                '.product[value="Dark Chocolate"]'
            );


            if(darkProduct){

                darkProduct.checked = true;


                let darkQty = document.getElementById("darkQty");

                darkQty.value = 1;
                darkQty.disabled = false;



                document.querySelectorAll(
                    '.plus[data-target="darkQty"], .minus[data-target="darkQty"]'
                ).forEach(button => {

                    button.disabled = false;

                });

            }     

            calculateTotal();

            modal.style.display = "flex";

        });

    });

    document.querySelectorAll(".buy-btn").forEach(btn => {

        btn.addEventListener("click", function(e){

            e.preventDefault();


            // Reset all products

            document.querySelectorAll(".product").forEach(item => {

                item.checked = false;
                item.disabled = true;

            });


            document.querySelectorAll(".product-qty").forEach(qty => {

                qty.value = 0;
                qty.disabled = true;

            });


            // Disable all plus/minus buttons

            document.querySelectorAll(".plus, .minus").forEach(button => {

                button.disabled = true;

            });


            document.querySelectorAll("#white, #dark").forEach(div => {

                div.style.display = "none";

            });


            // Select clicked product

            let selectedProduct = document.querySelector(
                `.product[value="${this.dataset.product}"]`
            );



            if(selectedProduct){


                selectedProduct.checked = true;

                selectedProduct.disabled = false;



                let qtyBox = document.getElementById(
                    selectedProduct.dataset.qty
                );


                // Set selected quantity = 1

                qtyBox.value = 1;

                qtyBox.disabled = false;



                // Enable selected product plus/minus

                document.querySelectorAll(
                    `.plus[data-target="${selectedProduct.dataset.qty}"],
                    .minus[data-target="${selectedProduct.dataset.qty}"]`
                ).forEach(button => {

                    button.disabled = false;

                });


            }


            if (selectedProduct.value === "White Chocolate") {

                document.getElementById("white").style.display = "block";

            }


            if (selectedProduct.value === "Dark Chocolate") {

                document.getElementById("dark").style.display = "block";

            }



            calculateTotal();


            modal.style.display = "flex";


        });

    });



    // ================================
    // CLOSE POPUP
    // ================================


    if(closeBtn){

        closeBtn.addEventListener("click",function(){

            form.reset();

            document.querySelectorAll(".product-qty").forEach(qty=>{

                qty.disabled=true;

            });

            document.getElementById("white").style.display = "none";
            document.getElementById("dark").style.display = "none";


            modal.style.display="none";


        });

    }



    window.addEventListener("click",function(e){

        if(e.target === modal){

            form.reset();

            document.querySelectorAll(".product-qty").forEach(qty=>{

                qty.disabled=true;

            });

            document.getElementById("white").style.display = "none";
            document.getElementById("dark").style.display = "none";

            modal.style.display="none";

        }

    });



    // ================================
    // PRODUCT CHECKBOX
    // ================================


    document.querySelectorAll(".product").forEach(product => {

        product.addEventListener("change", function () {


            let selectedProducts = document.querySelectorAll(".product:checked");


            document.querySelectorAll(".product").forEach(item => {


                let qtyInput = document.getElementById(item.dataset.qty);


                let buttons = document.querySelectorAll(
                    `.plus[data-target="${item.dataset.qty}"],
                    .minus[data-target="${item.dataset.qty}"]`
                );


                if(item.checked){


                    // Selected product
                    qtyInput.disabled = false;

                    qtyInput.value = 1;


                    buttons.forEach(btn => {

                        btn.disabled = false;

                    });


                }
                else {


                    // Unselected product
                    qtyInput.value = 0;

                    qtyInput.disabled = true;


                    buttons.forEach(btn => {

                        btn.disabled = true;

                    });


                    // Disable checkbox if another product selected
                    if(selectedProducts.length > 0){

                        item.disabled = true;

                    }
                    else{

                        item.disabled = false;

                    }


                }


            });


            calculateTotal();


        });

    });




    // ================================
    // PLUS BUTTON
    // ================================


    document.querySelectorAll(".plus").forEach(btn=>{


        btn.addEventListener("click",function(){

            let input=document.getElementById(
                this.dataset.target
            );


            input.value =
            parseInt(input.value || 1) + 1;


            calculateTotal();


        });


    });




    // ================================
    // MINUS BUTTON
    // ================================


    document.querySelectorAll(".minus").forEach(btn=>{


        btn.addEventListener("click",function(){


            let input=document.getElementById(
                this.dataset.target
            );


            let value=parseInt(input.value || 1);


            if(value > 1){

                input.value=value-1;

            }


            calculateTotal();


        });


    });




    // ================================
    // QUANTITY CHANGE
    // ================================


    document.querySelectorAll(".product-qty").forEach(input=>{


        input.addEventListener("input",calculateTotal);


    });




    // ================================
    // TOTAL CALCULATION
    // ================================


    function calculateTotal(){


        let total=0;


        document.querySelectorAll(".product:checked")
        .forEach(product=>{


            let qty=document.getElementById(
                product.dataset.qty
            ).value;


            total +=
            Number(product.dataset.price) *
            Number(qty);



        });



        document.getElementById("totalPrice")
        .innerText = total;


    }







    // ================================
    // FORM SUBMIT EMAIL
    // ================================


    form.addEventListener("submit",function(e){


        e.preventDefault();



        let orderItems=[];



        document.querySelectorAll(".product:checked")
        .forEach(product=>{


            let qty=document.getElementById(
                product.dataset.qty
            ).value;



            orderItems.push(
                `${product.value} - Qty ${qty}`
            );


        });



        if(orderItems.length===0){


            Swal.fire({

                icon:"warning",

                title:"Select Product",

                text:"Please select at least one product"

            });


            return;

        }





        emailjs.send(

            "service_jia3auq",

            "template_xdpf5yb",

            {


                customer_name:
                document.getElementById("name").value,


                customer_email:
                document.getElementById("email").value,


                phone:
                document.getElementById("mobile").value,



                address1:
                document.getElementById("address1").value,


                address2:
                document.getElementById("address2").value,


                city:
                document.getElementById("city").value,


                zipcode:
                document.getElementById("zipcode").value,



                product:
                orderItems.join("\n"),



                quantity:
                "Multiple",



                message:
                document.getElementById("remark").value


            },


            "5WqPB02ANDNAbQRFJ"


        )

        .then(function(){


            Swal.fire({

                icon:"success",

                title:"Order Placed",

                text:"Thank you for your order!"

            });



            form.reset();


            document.querySelectorAll(".product-qty")
            .forEach(qty=>{

                qty.disabled=true;

            });



            modal.style.display="none";


        })

        .catch(function(error){


            console.log(
                "EmailJS Error:",
                error
            );


            Swal.fire({

                icon:"error",

                title:"Email Failed",

                text:"Please try again"

            });


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