/* =========================================
   WEDDING DATA
========================================= */

const wedding = {

    bride: "Анна",

    groom: "Алекс",

    date: "20 июня 2027",

    countdownDate: "June 20, 2027 15:00:00",

    venue: "Ресторан «Белый сад»",

    city: "Ташкент",

    address: "ул. Примерная, 25",

    ceremony: "15:00",

    photos: "17:00",

    banquet: "18:00",

    party: "22:00"

};


/* =========================================
   HELPER
========================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}


/* =========================================
   CALCULATE DATE
========================================= */

const dateObject =
    new Date(wedding.countdownDate);


const months = [

    "ЯНВАРЬ",
    "ФЕВРАЛЬ",
    "МАРТ",
    "АПРЕЛЬ",
    "МАЙ",
    "ИЮНЬ",
    "ИЮЛЬ",
    "АВГУСТ",
    "СЕНТЯБРЬ",
    "ОКТЯБРЬ",
    "НОЯБРЬ",
    "ДЕКАБРЬ"

];


const weekdays = [

    "ВОСКРЕСЕНЬЕ",
    "ПОНЕДЕЛЬНИК",
    "ВТОРНИК",
    "СРЕДА",
    "ЧЕТВЕРГ",
    "ПЯТНИЦА",
    "СУББОТА"

];


/* =========================================
   INSERT WEDDING DATA
========================================= */

setText(
    "brideName",
    wedding.bride
);


setText(
    "groomName",
    wedding.groom
);


setText(
    "heroDate",
    `${String(dateObject.getDate()).padStart(2, "0")} · ${String(dateObject.getMonth() + 1).padStart(2, "0")} · ${dateObject.getFullYear()}`
);


setText(
    "weddingMonth",
    months[dateObject.getMonth()]
);


setText(
    "weddingDay",
    dateObject.getDate()
);


setText(
    "weddingYear",
    dateObject.getFullYear()
);


setText(
    "weddingWeekday",
    weekdays[dateObject.getDay()]
);


setText(
    "venueName",
    wedding.venue
);


setText(
    "venueCity",
    wedding.city
);


setText(
    "venueAddress",
    wedding.address
);


setText(
    "ceremonyTime",
    wedding.ceremony
);


setText(
    "photoTime",
    wedding.photos
);


setText(
    "banquetTime",
    wedding.banquet
);


setText(
    "partyTime",
    wedding.party
);


setText(
    "finalBride",
    wedding.bride
);


setText(
    "finalGroom",
    wedding.groom
);


setText(
    "finalDate",
    wedding.date
);


/* =========================================
   COUNTDOWN
========================================= */

const weddingDate =
    dateObject.getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        setText("days", "00");

        setText("hours", "00");

        setText("minutes", "00");

        setText("seconds", "00");

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    setText(
        "days",
        String(days).padStart(2, "0")
    );


    setText(
        "hours",
        String(hours).padStart(2, "0")
    );


    setText(
        "minutes",
        String(minutes).padStart(2, "0")
    );


    setText(
        "seconds",
        String(seconds).padStart(2, "0")
    );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================
   RSVP
========================================= */
/* =========================================
   RSVP
========================================= */

/* =========================================
   RSVP MESSAGE MODAL
========================================= */

const messageModal =
    document.getElementById(
        "messageModal"
    );


const messageModalTitle =
    document.getElementById(
        "messageModalTitle"
    );


const messageModalText =
    document.getElementById(
        "messageModalText"
    );


const messageModalButton =
    document.getElementById(
        "messageModalButton"
    );


function showMessage(title, text) {

    messageModalTitle.textContent =
        title;

    messageModalText.textContent =
        text;

    messageModal.classList.add(
        "open"
    );

}


function closeMessage() {

    messageModal.classList.remove(
        "open"
    );

}


messageModalButton.addEventListener(
    "click",
    closeMessage
);


document
    .querySelector(
        ".message-modal-overlay"
    )
    .addEventListener(
        "click",
        closeMessage
    );


/* =========================================
   RSVP
========================================= */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "guestName"
                ).value.trim();


            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            if (!attendance) {

                showMessage(
                    "Небольшая просьба",
                    "Пожалуйста, выберите вариант ответа."
                );

                return;

            }


            if (
                attendance.value === "yes"
            ) {

                showMessage(
                    `Спасибо, ${name}!`,
                    "Ваше присутствие подтверждено. Мы будем очень рады видеть вас на нашей свадьбе! ❤️"
                );

            } else {

                showMessage(
                    `Спасибо, ${name}.`,
                    "Мы получили ваш ответ. Нам будет вас не хватать. ❤️"
                );

            }


            rsvpForm.reset();

        }
    );

}


