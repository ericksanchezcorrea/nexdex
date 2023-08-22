const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

const { APPLICATION_PASSWORD } = dotenv.config().parsed || {};

const authorizedEmails = ['nexdexdevelopers@gmail.com', 'erick.sanchezcorrea@gmail.com']

async function sendMailing(name, email, message) {

    try {
        const transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465, // port: 587,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "nexdexdevelopers@gmail.com", // generated ethereal user
                pass: `${APPLICATION_PASSWORD}` , // generated ethereal password
            },
        });
    
        let sendToNexDex = await transporter.sendMail({
            from: '<nexdexdevelopers@gmail.com>', // sender address
            to: authorizedEmails, // list of receivers
            subject: 'Consulta', // Subject line
            // html body
            html: `
                    <!DOCTYPE html>

                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Consulta de cliente</title>
                    </head>

                    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">

                        <table style="max-width: 600px; margin: 20px auto; background-color: #fff; border-collapse: collapse; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                            <tr>
                                <td style="padding: 20px;">
                                    <h1 style="color: #333;">Consulta de servicio</h1>
                                    <p><b>Nombre</b>: ${name}</p>
                                    <p><b>Email</b>: ${email}</p>
                                    <p><b>Mensaje</b>: </p>
                                    <p>${message}</p>
                                    <p>Equipo de Soporte ponerse en contacto</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #f5f5f5; text-align: center; padding: 10px;">
                                    <p style="color: #777;">© 2023 Nexdex. Todos los derechos reservados.</p>
                                </td>
                            </tr>
                        </table>

                    </body>
                    </html>

            ` 
        });

        let sendToCustomer = await transporter.sendMail({
            from: '<nexdexdevelopers@gmail.com>', // sender address
            to: email , // list of receivers
            subject: 'Consulta de servicio a NexDex', // Subject line
            html: `
                    <!DOCTYPE html>

                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Consulta de servicio a NexDex</title>
                    </head>

                    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">

                        <table style="max-width: 600px; margin: 20px auto; background-color: #fff; border-collapse: collapse; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                            <tr>
                                <td style="padding: 20px;">
                                    <h1 style="color: #333;">Consulta de servicio </h1>
                                    <p>¡Hola ${name}!</p>
                                    <p>Tu mensaje ha sido recibido y está siendo procesado. Apreciamos tu interés y pronto estaremos en contacto.</p>
                                    <p>Gracias por tu tiempo.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #f5f5f5; text-align: center; padding: 10px;">
                                    <p style="color: #777;">© 2023 NexDex. Todos los derechos reservados.</p>
                                </td>
                            </tr>
                        </table>

                    </body>
                    </html>
            ` 
        });
    
        return APPLICATION_PASSWORD

    } catch (error) {
        return {error, APPLICATION_PASSWORD}
    }
}

module.exports = {sendMailing}