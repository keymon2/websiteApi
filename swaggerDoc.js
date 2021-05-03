import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info: {
            title: " express mongodb API",
            version: "1.0.0",
            description: "rest api",
        },
        servers: [
            {
                url:"http://loachost:4502/api-docs",
            },
        ],
    },
    apis: ["./routes/*.js"],
};


export{
    swaggerUi,
    options,
    swaggerJsdoc
};