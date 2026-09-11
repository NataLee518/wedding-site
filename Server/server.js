const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================
   PATH TO WEBSITE
========================================= */

const WEBSITE_PATH =
    path.join(__dirname, "..");


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

    console.log(
        "💚 Проверка API /api/health"
    );


    res.json({

        success: true,

        message:
            "Server is working",

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


    /* =========================================
       GET DATA
    ========================================= */

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

    if (!name || !String(name).trim()) {

        console.log(
            "❌ Ошибка: отсутствует имя"
        );

        return res.status(400).json({

            success: false,

            message:
                "Пожалуйста, укажите ваше имя."

        });

    }


    if (!phone || !String(phone).trim()) {

        console.log(
            "❌ Ошибка: отсутствует телефон"
        );

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

        console.log(
            "❌ Ошибка: отсутствует Telegram"
        );

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


    /* =========================================
       RESPONSE TO WEBSITE
    ========================================= */

    return res.status(200).json({

        success: true,

        message:
            "Заявка успешно получена.",

        data: {

            name:
                application.name,

            phone:
                application.phone,

            telegram:
                application.telegram,

            message:
                application.message,

            createdAt:
                application.createdAt

        }

    });

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
