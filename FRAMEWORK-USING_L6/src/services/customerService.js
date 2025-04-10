const db = require('../db/db');

function validateClientData(data) {
    if (!data.clientId || !data.name) {
        throw new Error('Недостаточно данных для создания клиента');
    }
}

function notFoundClient(clientIndex) {
    if (clientIndex === -1) {
        throw new Error('Клиент не найден');
    }
}

function createClient(data) {
    validateClientData(data);
    const clientContent = db.readClients();
    const clientExists = clientContent.clients.some(client => client.clientId === data.clientId);
    if (clientExists) {
        throw new Error('Клиент с таким id уже существует');
    }
    clientContent.clients.push(data);
    db.writeClients(clientContent);
    return clientContent;
}

function updateClient(clientId, newData) {
    const clientContent = db.readClients();
    const clientIndex = clientContent.clients.findIndex(c => c.clientId === clientId);
    notFoundClient(clientIndex);
    Object.assign(clientContent.clients[clientIndex], newData);
    db.writeClients(clientContent);
    return clientContent.clients[clientIndex];
}

function deleteClient(clientId) {
    const clientContent = db.readClients();
    const clientIndex = clientContent.clients.findIndex(c => c.clientId === clientId);
    notFoundClient(clientIndex);
    clientContent.clients.splice(clientIndex, 1);
    db.writeClients(clientContent);
}

module.exports = {
    createClient,
    updateClient,
    deleteClient
};
