require('dotenv').config();
const msal = require('@azure/msal-node');
const axios = require("axios");


const oneDrive = async (bookName = null, authorName = null, bookId = null) => {
    try {
        const { ONEDRIVE_CLIENT_ID, ONEDRIVE_CLIENT_SECRET, ONEDRIVE_TENANT_ID, ONEDRIVE_DRIVE_ID, ONEDRIVE_URL, ONEDRIVE_URL_LOGIN } = process.env;

        if (!bookName || !authorName || !bookId) {
            return { error: 'Falta nombre del libro o autor' };
        };

        const clientId = ONEDRIVE_CLIENT_ID;
        const clientSecret = ONEDRIVE_CLIENT_SECRET;
        const tenantId = ONEDRIVE_TENANT_ID;
        const driveId = ONEDRIVE_DRIVE_ID;

        const url = ONEDRIVE_URL;
        const urlLogin = ONEDRIVE_URL_LOGIN;
        
        const config = {
            auth: {
                clientId: clientId,
                authority: `${urlLogin}${tenantId}`,
                clientSecret: clientSecret
            }
        };

        const cca = new msal.ConfidentialClientApplication(config);

        const tokenRequest = {
            scopes: [`${url}.default`], // reemplaza con tus propios scopes
            forceRefresh: false // establece en true para saltar la caché
        };

        const response = await cca.acquireTokenByClientCredential(tokenRequest);
        const token = response.accessToken;

        const formatText = (text) => {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("’", "%27").replace(":", "_");
        };

        const api = `${url}v1.0/drives/${driveId}/root:/Biblioteca/`;

        const urlsFiles = authorName.map(author => (`${api}${formatText(author)}/${formatText(bookName)} (${bookId}):/children`));

        const data = await Promise.all(urlsFiles.map(async url => {
            try {
                const result = await axios.get((url), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return result.data.value.map(item => ({ name: item.name, url: item['@microsoft.graph.downloadUrl'] }));
            } catch (error) {
                return;
            };
        }));

        return data.filter(item => item).flat();
    } catch (error) {
        return error;
    };
};

module.exports = { oneDrive };