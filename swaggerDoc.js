import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const options = {
    swaggerDefinition:{
        opneapi: "3.0.0",
        info:{
            title: " express mongodb API",
            version: "1.0.0",
            decription: "rest api",
        },
        severs:[
            {
                url: "htttp://localhost:4500"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

export{
    swaggerUi,
    specs,
};