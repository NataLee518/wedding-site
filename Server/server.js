const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================
   PATH TO WEBSITE
========================================= */

const WEBSITE_PATH = path.join(__dirname, "..");


/* =========================================
   RSVP STORAGE
========================================= */

const DATA_DIRECTORY = path.join(
    __dirname,
    "Data"
);

const RSVP_FILE = path.join(
    DATA_DIRECTORY,
    "rsvp.json"
);


/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


/* =========================================
   STATIC WEBSITE
========================================= */

app.use(
    express.static(WEBSITE_PATH)
);


/* =========================================
   MAIN PAGE
========================================= */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            WEBSITE_PATH,
            "index.html"
        )
    );

});


/* =========================================
   HEALTH CHECK
========================================= */

app.get("/api/health", (req, res) => {

    console.log("💚 Проверка API /api/health");

    res.status(200).json({

        success: true,

        message: "Server is working",

        timestamp:
            new Date().toISOString()

    });

});


/* =========================================
   CONTACT FORM
========================================= */

app.post("/api/contact", (req, res) => {

    console.log("");
    console.log("=================================");
    console.log("📩 ПОЛУЧЕНА ЗАЯВКА");
    console.log("=================================");


    const {
        name,
        phone,
        telegram,
        message
    } = req.body;


    console.log(
        "Полученные данные:",
        req.body
    );


    /* =========================================
       VALIDATION
    ========================================= */

    if (
        !name ||
        !String(name).trim()
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Пожалуйста, укажите ваше имя."

        });

    }


    if (
        !phone ||
        !String(phone).trim()
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Пожалуйста, укажите ваш телефон."

        });

    }


    if (
        !telegram ||
        !String(telegram).trim()
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Пожалуйста, укажите ваш Telegram."

        });

    }


    /* =========================================
       CLEAN TELEGRAM
    ========================================= */

    let cleanTelegram =
        String(telegram).trim();


    if (!cleanTelegram.startsWith("@")) {

        cleanTelegram =
            "@" + cleanTelegram;

    }


    /* =========================================
       CREATE APPLICATION
    ========================================= */

    const application = {

        name:
            String(name).trim(),

        phone:
            String(phone).trim(),

        telegram:
            cleanTelegram,

        message:
            message
                ? String(message).trim()
                : "",

        createdAt:
            new Date().toISOString()

    };


    /* =========================================
       SHOW APPLICATION
    ========================================= */

    console.log("");
    console.log("=================================");
    console.log("💍 НОВАЯ ЗАЯВКА");
    console.log("=================================");

    console.log(
        "Имя:",
        application.name
    );

    console.log(
        "Телефон:",
        application.phone
    );

    console.log(
        "Telegram:",
        application.telegram
    );

    console.log(
        "Сообщение:",
        application.message ||
        "не указано"
    );

    console.log(
        "Дата:",
        application.createdAt
    );

    console.log("=================================");
    console.log("✅ ЗАЯВКА ПРИНЯТА");
    console.log("=================================");
    console.log("");


    return res.status(200).json({

        success: true,

        message:
            "Заявка успешно получена.",

        data: application

    });

});


/* =========================================
   RSVP
========================================= */

app.post("/api/rsvp", (req, res) => {

    console.log("");
    console.log("=================================");
    console.log("💌 ПОЛУЧЕН RSVP");
    console.log("=================================");


    /* =========================================
       GET DATA
    ========================================= */

    const {
        guestName,
        attendance,
        guestComment
    } = req.body;


    console.log(
        "Полученные данные:",
        req.body
    );


    /* =========================================
       VALIDATION — NAME
    ========================================= */

    if (
        !guestName ||
        !String(guestName).trim()
    ) {

        console.log(
            "❌ Ошибка: отсутствует имя гостя"
        );

        return res.status(400).json({

            success: false,

            message:
                "Пожалуйста, укажите ваше имя."

        });

    }


    /* =========================================
       VALIDATION — ATTENDANCE
    ========================================= */

    if (
        attendance !== "yes" &&
        attendance !== "no"
    ) {

        console.log(
            "❌ Ошибка: некорректный ответ RSVP"
        );

        return res.status(400).json({

            success: false,

            message:
                "Пожалуйста, укажите, будете ли вы."

        });

    }


    /* =========================================
       CREATE DATA DIRECTORY
    ========================================= */

    try {

        if (
            !fs.existsSync(
                DATA_DIRECTORY
            )
        ) {

            fs.mkdirSync(
                DATA_DIRECTORY,
                {
                    recursive: true
                }
            );

        }

    } catch (error) {

        console.error(
            "❌ Ошибка создания папки Data:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Не удалось создать хранилище RSVP."

        });

    }


    /* =========================================
       CREATE RSVP
    ========================================= */

    const rsvp = {

        id:
            Date.now().toString(),

        guestName:
            String(guestName).trim(),

        attendance:
            attendance,

        guestComment:
            guestComment
                ? String(guestComment).trim()
                : "",

        createdAt:
            new Date().toISOString()

    };


    /* =========================================
       READ EXISTING RSVPs
    ========================================= */

    let rsvps = [];


    if (
        fs.existsSync(
            RSVP_FILE
        )
    ) {

        try {

            const file =
                fs.readFileSync(
                    RSVP_FILE,
                    "utf8"
                );


            if (file.trim()) {

                rsvps =
                    JSON.parse(file);

            }


            if (
                !Array.isArray(rsvps)
            ) {

                rsvps = [];

            }

        } catch (error) {

            console.error(
                "❌ Ошибка чтения RSVP:",
                error
            );

            rsvps = [];

        }

    }


    /* =========================================
       ADD NEW RSVP
    ========================================= */

    rsvps.push(rsvp);


    /* =========================================
       SAVE RSVP
    ========================================= */

    try {

        fs.writeFileSync(

            RSVP_FILE,

            JSON.stringify(
                rsvps,
                null,
                4
            ),

            "utf8"

        );

    } catch (error) {

        console.error(
            "❌ Ошибка сохранения RSVP:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Не удалось сохранить ответ."

        });

    }


    /* =========================================
       SERVER LOG
    ========================================= */

    console.log("");
    console.log("=================================");
    console.log("💌 НОВЫЙ ОТВЕТ ГОСТЯ");
    console.log("=================================");

    console.log(
        "Имя:",
        rsvp.guestName
    );

    console.log(
        "Ответ:",
        rsvp.attendance === "yes"
            ? "БУДУ"
            : "НЕ БУДУ"
    );

    console.log(
        "Пожелание:",
        rsvp.guestComment ||
        "не указано"
    );

    console.log(
        "Дата:",
        rsvp.createdAt
    );

    console.log(
        "ID:",
        rsvp.id
    );

    console.log("=================================");
    console.log("💾 RSVP СОХРАНЁН");
    console.log("=================================");
    console.log("");


    /* =========================================
       RESPONSE TO IVORY
    ========================================= */

    return res.status(200).json({

        success: true,

        message:
            "Ваш ответ успешно сохранён.",

        data: {

            id:
                rsvp.id,

            guestName:
                rsvp.guestName,

            attendance:
                rsvp.attendance,

            guestComment:
                rsvp.guestComment,

            createdAt:
                rsvp.createdAt

        }

    });

});


/* =========================================
   GET RSVP
========================================= */

app.get("/api/rsvp", (req, res) => {

    console.log(
        "📋 Запрос списка RSVP"
    );


    if (
        !fs.existsSync(
            RSVP_FILE
        )
    ) {

        return res.status(200).json({

            success: true,

            data: []

        });

    }


    try {

        const file =
            fs.readFileSync(
                RSVP_FILE,
                "utf8"
            );


        const rsvps =
            file.trim()
                ? JSON.parse(file)
                : [];


        return res.status(200).json({

            success: true,

            data:
                Array.isArray(rsvps)
                    ? rsvps
                    : []

        });

    } catch (error) {

        console.error(
            "❌ Ошибка чтения списка RSVP:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Не удалось получить ответы RSVP."

        });

    }

});


/* =========================================
   404
========================================= */

app.use((req, res) => {

    console.log("");

    console.log(
        `❌ 404: ${req.method} ${req.originalUrl}`
    );


    res.status(404).json({

        success: false,

        message:
            "Маршрут не найден."

    });

});


/* =========================================
   ERROR HANDLER
========================================= */

app.use(
    (error, req, res, next) => {

        console.error("");
        console.error(
            "================================="
        );

        console.error(
            "❌ SERVER ERROR"
        );

        console.error(
            "================================="
        );

        console.error(error);

        console.error(
            "================================="
        );


        res.status(500).json({

            success: false,

            message:
                "Внутренняя ошибка сервера."

        });

    }
);


/* =========================================
   START SERVER
========================================= */

app.listen(
    PORT,
    () => {

        console.log("");
        console.log(
            "================================="
        );

        console.log(
            "💍 WEDDING LOVE"
        );

        console.log(
            "================================="
        );

        console.log(
            `🌐 Сайт: http://localhost:${PORT}`
        );

        console.log(
            `💚 API: http://localhost:${PORT}/api/health`
        );

        console.log(
            `📩 Заявки: http://localhost:${PORT}/api/contact`
        );

        console.log(
            `💌 RSVP: http://localhost:${PORT}/api/rsvp`
        );

        console.log(
            "================================="
        );

        console.log(
            "🚀 Сервер готов принимать заявки"
        );

        console.log(
            "================================="
        );

        console.log("");

    }
);
