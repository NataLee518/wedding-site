/* =========================================
   WEDDING DATA
========================================= */
const wedding = {
    bride: "София",
    groom: "Лео",
    date: "02 августа 2027",
    countdownDate: "august 02, 2027 15:00:00",
    venue: "Ресторан «Verona»",
    city: "Ташкент",
    address: "ул. Пионерская, 27",
    ceremony: "15:00",
    photos: "17:00",
    banquet: "18:00",
    party: "22:00"
};

/* =========================================
   HELPER
========================================= */
function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

/* =========================================
   CALCULATE DATE
========================================= */
const dateObject = new Date(wedding.countdownDate);

const months = [
    "ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ",
    "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"
];

const weekdays = [
    "ВОСКРЕСЕНЬЕ", "ПОНЕДЕЛЬНИК", "ВТОРНИК", "СРЕДА",
    "ЧЕТВЕРГ", "ПЯТНИЦА", "СУББОТА"
];

/* =========================================
   INSERT WEDDING DATA
========================================= */
setText("brideName", wedding.bride);
setText("groomName", wedding.groom);

setText(
    "heroDate",
    `${String(dateObject.getDate()).padStart(2, "0")} · ${String(dateObject.getMonth() + 1).padStart(2, "0")} · ${dateObject.getFullYear()}`
);

setText("weddingMonth", months[dateObject.getMonth()]);
setText("weddingDay", dateObject.getDate());
setText("weddingYear", dateObject.getFullYear());
setText("weddingWeekday", weekdays[dateObject.getDay()]);

setText("venueName", wedding.venue);
setText("venueCity", wedding.city);
setText("venueAddress", wedding.address);

setText("ceremonyTime", wedding.ceremony);
setText("photoTime", wedding.photos);
setText("banquetTime", wedding.banquet);
setText("partyTime", wedding.party);

setText("finalBride", wedding.bride);
setText("finalGroom", wedding.groom);
setText("finalDate", wedding.date);

/* =========================================
   COUNTDOWN
========================================= */
const weddingDate = dateObject.getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        setText("days", "00");
        setText("hours", "00");
        setText("minutes", "00");
        setText("seconds", "00");
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setText("days", String(days).padStart(2, "0"));
    setText("hours", String(hours).padStart(2, "0"));
    setText("minutes", String(minutes).padStart(2, "0"));
    setText("seconds", String(seconds).padStart(2, "0"));
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================================
   RSVP MESSAGE MODAL
========================================= */
const messageModal = document.getElementById("messageModal");
const messageModalTitle = document.getElementById("messageModalTitle");
const messageModalText = document.getElementById("messageModalText");
const messageModalButton = document.getElementById("messageModalButton");

function showMessage(title, text) {
    if (messageModalTitle) messageModalTitle.textContent = title;
    if (messageModalText) messageModalText.textContent = text;
    if (messageModal) messageModal.classList.add("open");
}

function closeMessage() {
    if (messageModal) messageModal.classList.remove("open");
}

if (messageModalButton) {
    messageModalButton.addEventListener("click", closeMessage);
}

const messageModalOverlay = document.querySelector(".message-modal-overlay");
if (messageModalOverlay) {
    messageModalOverlay.addEventListener("click", closeMessage);
}

/* =========================================
   RSVP FORM
========================================= */
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const guestNameElement = document.getElementById("guestName");
        const name = guestNameElement ? guestNameElement.value.trim() : "";
        const attendance = document.querySelector('input[name="attendance"]:checked');

        if (!name) {
            showMessage("Небольшая просьба", "Пожалуйста, укажите ваше имя.");
            return;
        }

        if (!attendance) {
            showMessage("Небольшая просьба", "Пожалуйста, выберите вариант ответа.");
            return;
        }

        const guestCommentElement = document.getElementById("guestComment");
        const guestComment = guestCommentElement ? guestCommentElement.value.trim() : "";

        const rsvpData = {
            guestName: name,
            attendance: attendance.value,
            guestComment: guestComment
        };

        const submitButton = rsvpForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Отправляем...";
        }

        try {
            console.log("📤 Отправляем RSVP:", rsvpData);

            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(rsvpData)
            });

            let result = null;
            try {
                result = await response.json();
            } catch (jsonError) {
                result = null;
            }

            console.log("📥 Ответ сервера:", response.status, result);

            if (!response.ok) {
                const serverMessage = result && result.message
                    ? result.message
                    : `Ошибка сервера (${response.status}).`;
                throw new Error(serverMessage);
            }

            if (!result || result.success !== true) {
                throw new Error("Сервер не подтвердил сохранение RSVP.");
            }

            if (attendance.value === "yes") {
                showMessage(
                    `Спасибо, ${name}!`,
                    "Ваш ответ сохранён. Мы будем очень рады видеть вас на нашей свадьбе! ❤️"
                );
            } else {
                showMessage(
                    `Спасибо, ${name}.`,
                    "Ваш ответ сохранён. Нам будет вас не хватать. 💔"
                );
            }

            rsvpForm.reset();

        } catch (error) {
            console.error("❌ Ошибка отправки RSVP:", error);

            showMessage(
                "Не удалось отправить",
                error.message || "Произошла ошибка. Пожалуйста, попробуйте ещё раз."
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}