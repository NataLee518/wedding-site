/* =========================================
   WEDDING LOVE
   MAIN SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

    }


    /* =========================================
       CATALOG FILTER
    ========================================= */

    const filters =
        document.querySelectorAll(".filter");

    const cards =
        document.querySelectorAll(".card");


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {

                item.classList.remove("active");

            });


            filter.classList.add("active");


            const category =
                filter.dataset.filter;


            cards.forEach(card => {

                if (
                    category === "all" ||
                    card.dataset.category === category
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* =========================================
       FAQ
    ========================================= */

    const faqQuestions =
        document.querySelectorAll(".faq-question");


    faqQuestions.forEach(question => {

        question.addEventListener("click", () => {

            const item =
                question.closest(".faq-item");


            if (!item) {

                return;

            }


            item.classList.toggle("active");

        });

    });


    /* =========================================
       MAIN MODAL
    ========================================= */

    const modal =
        document.getElementById("modal");

    const modalContent =
        document.getElementById("modalContent");

    const modalClose =
        document.getElementById("modalClose");

    const modalOverlay =
        modal
            ? modal.querySelector(".modal-overlay")
            : null;


    function closeModal() {

        if (!modal) {

            return;

        }


        modal.classList.remove("open");

        document.body.style.overflow = "";

    }


    function openModal(content) {

        if (!modal || !modalContent) {

            return;

        }


        modalContent.innerHTML = content;

        modal.classList.add("open");

        document.body.style.overflow = "hidden";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    /* =========================================
       DEMO BUTTONS
    ========================================= */

    const demoButtons =
        document.querySelectorAll(".demo-button");


    demoButtons.forEach(button => {

        button.addEventListener("click", () => {

            const template =
                button.dataset.template ||
                "Шаблон";


           
            /* =========================================
               ОСТАЛЬНЫЕ ШАБЛОНЫ
               ПОКА ОСТАВЛЯЕМ СТАРЫЙ PREVIEW
            ========================================= */

            openModal(`

                <div class="checkout">

                    <div class="checkout-label">
                        ПРЕДПРОСМОТР
                    </div>

                    <h2>
                        ${template}
                    </h2>

                    <p>
                        Здесь будет открываться полноценный
                        предварительный просмотр выбранного
                        свадебного приглашения.
                    </p>

                    <button
                        type="button"
                        class="button button-dark button-full"
                        id="demoOrderButton"
                    >
                        Заказать этот дизайн
                    </button>

                </div>

            `);


            const demoOrderButton =
                document.getElementById(
                    "demoOrderButton"
                );


            if (demoOrderButton) {

                demoOrderButton.addEventListener(
                    "click",
                    () => {

                        closeModal();


                        const contactSection =
                            document.getElementById(
                                "contact"
                            );


                        if (contactSection) {

                            contactSection.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    }
                );

            }

        });

    });


    /* =========================================
       ORDER BUTTONS
    ========================================= */

    const orderButtons =
        document.querySelectorAll(".order-button");


    orderButtons.forEach(button => {

        button.addEventListener("click", () => {

            const template =
                button.dataset.template ||
                "Выбранный тариф";


            const contactSection =
                document.getElementById("contact");


            if (contactSection) {

                contactSection.scrollIntoView({
                    behavior: "smooth"
                });

            }


            const templateInput =
                document.querySelector(
                    'input[name="template"]'
                );


            if (templateInput) {

                templateInput.value =
                    template;

            }

        });

    });


    /* =========================================
       CONTACT SUCCESS MODAL
    ========================================= */

    const contactModal =
        document.getElementById(
            "contactModal"
        );


    const contactModalOverlay =
        document.getElementById(
            "contactModalOverlay"
        );


    const contactModalButton =
        document.getElementById(
            "contactModalButton"
        );


    function openContactSuccessModal() {

        if (!contactModal) {

            console.error(
                "❌ Элемент #contactModal не найден."
            );

            return;

        }


        contactModal.classList.add("open");

        document.body.style.overflow =
            "hidden";

    }


    function closeContactSuccessModal() {

        if (!contactModal) {

            return;

        }


        contactModal.classList.remove("open");

        document.body.style.overflow =
            "";

    }


    if (contactModalButton) {

        contactModalButton.addEventListener(
            "click",
            closeContactSuccessModal
        );

    }


    if (contactModalOverlay) {

        contactModalOverlay.addEventListener(
            "click",
            closeContactSuccessModal
        );

    }


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            contactModal &&
            contactModal.classList.contains("open")
        ) {

            closeContactSuccessModal();

        }

    });


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (!contactForm) {

        console.error(
            "❌ Форма #contactForm не найдена."
        );

        return;

    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            /* =========================================
               GET INPUTS
            ========================================= */

            const nameInput =
                contactForm.querySelector(
                    '[name="name"]'
                );


            const phoneInput =
                contactForm.querySelector(
                    '[name="phone"]'
                );


            const telegramInput =
                contactForm.querySelector(
                    '[name="telegram"]'
                );


            const messageInput =
                contactForm.querySelector(
                    '[name="message"]'
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            const telegram =
                telegramInput
                    ? telegramInput.value.trim()
                    : "";


            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";


            /* =========================================
               VALIDATION
            ========================================= */

            if (!name) {

                alert(
                    "Пожалуйста, укажите ваше имя."
                );

                if (nameInput) {

                    nameInput.focus();

                }

                return;

            }


            if (!phone) {

                alert(
                    "Пожалуйста, укажите ваш телефон."
                );

                if (phoneInput) {

                    phoneInput.focus();

                }

                return;

            }


            if (!telegram) {

                alert(
                    "Пожалуйста, укажите ваш Telegram."
                );

                if (telegramInput) {

                    telegramInput.focus();

                }

                return;

            }


            /* =========================================
               SUBMIT BUTTON
            ========================================= */

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "Отправить заявку";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Отправляем...";

            }


            /* =========================================
               DATA
            ========================================= */

            const formData = {

                name:
                    name,

                phone:
                    phone,

                telegram:
                    telegram,

                message:
                    message

            };


            console.log(
                "📤 Отправляем заявку:",
                formData
            );


            /* =========================================
               API URL
            ========================================= */

            const apiUrl =
                `${window.location.origin}/api/contact`;


            console.log(
                "🌐 API:",
                apiUrl
            );


            /* =========================================
               SEND
            ========================================= */

            try {

                const response =
                    await fetch(
                        apiUrl,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )
                        }
                    );


                console.log(
                    "📡 HTTP статус:",
                    response.status
                );


                /* =========================================
                   RESPONSE
                ========================================= */

                let result = null;


                const responseText =
                    await response.text();


                console.log(
                    "📥 Ответ сервера:",
                    responseText
                );


                try {

                    result =
                        JSON.parse(
                            responseText
                        );

                } catch (jsonError) {

                    console.error(
                        "❌ Сервер вернул не JSON:",
                        jsonError
                    );

                }


                /* =========================================
                   HTTP ERROR
                ========================================= */

                if (!response.ok) {

                    const errorMessage =
                        result &&
                        result.message
                            ? result.message
                            : `Ошибка сервера: HTTP ${response.status}`;


                    throw new Error(
                        errorMessage
                    );

                }


                /* =========================================
                   SUCCESS CHECK
                ========================================= */

                if (
                    !result ||
                    result.success !== true
                ) {

                    throw new Error(
                        result &&
                        result.message
                            ? result.message
                            : "Сервер не подтвердил получение заявки."
                    );

                }


                /* =========================================
                   SUCCESS
                ========================================= */

                console.log(
                    "================================="
                );

                console.log(
                    "✅ ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА"
                );

                console.log(
                    "================================="
                );


                /* =========================================
                   CLEAR FORM
                ========================================= */

                contactForm.reset();


                /* =========================================
                   RESTORE BUTTON
                ========================================= */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        originalButtonText;

                }


                /* =========================================
                   SHOW SUCCESS
                ========================================= */

                openContactSuccessModal();


            } catch (error) {

                console.error(
                    "================================="
                );

                console.error(
                    "❌ ОШИБКА ОТПРАВКИ ЗАЯВКИ"
                );

                console.error(
                    "================================="
                );

                console.error(
                    error
                );


                alert(
                    error.message ||
                    "Не удалось отправить заявку. " +
                    "Проверьте подключение к серверу."
                );


                /* =========================================
                   RESTORE BUTTON
                ========================================= */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        originalButtonText;

                }

            }

        }
    );


    /* =========================================
       START
    ========================================= */

    console.log(
        "================================="
    );

    console.log(
        "💍 Wedding Love"
    );

    console.log(
        "✅ script.js успешно загружен"
    );

    console.log(
        "🌐 Текущий адрес:",
        window.location.origin
    );

    console.log(
        "================================="
    );

});
