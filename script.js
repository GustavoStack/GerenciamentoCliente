document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('clientForm');
    const clientList = document.getElementById('clientList');

    let clients = [];

    clientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value;
        const paymentStatus = document.getElementById('paymentStatus').value;
        const paymentAmount = document.getElementById('paymentAmount').value;

        const client = {
            id: Date.now(),
            name,
            gender,
            paymentStatus,
            paymentAmount
        };

        clients.push(client);
        displayClients();
        clientForm.reset();
    });

    function displayClients() {
        clientList.innerHTML = '';
    
        clients.forEach(client => {
            const row = document.createElement('tr');
    
            // Criação das células
            const nameCell = document.createElement('td');
            const genderCell = document.createElement('td');
            const paymentStatusCell = document.createElement('td');
            const paymentAmountCell = document.createElement('td');
            const actionsCell = document.createElement('td');
    
            // Definir valores
            nameCell.textContent = client.name;
            genderCell.textContent = client.gender;
            paymentStatusCell.textContent = client.paymentStatus;
            paymentAmountCell.textContent = `R$ ${parseFloat(client.paymentAmount).toFixed(2)}`;
    
            // Aplicar a classe CSS com base no status de pagamento
            if (client.paymentStatus === 'Pago') {
                paymentStatusCell.classList.add('bg-success', 'text-white');
            } else if (client.paymentStatus === 'Pendente') {
                paymentStatusCell.classList.add('bg-danger', 'text-white');
            }
    
            // Criar botões de ações
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'btn btn-warning btn-sm mr-2';
            editButton.onclick = () => editClient(client.id);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.onclick = () => deleteClient(client.id);
    
            // Adicionar botões à célula de ações
            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
    
            // Adicionar células à linha
            row.appendChild(nameCell);
            row.appendChild(genderCell);
            row.appendChild(paymentStatusCell);
            row.appendChild(paymentAmountCell);
            row.appendChild(actionsCell);
    
            // Adicionar linha à tabela
            clientList.appendChild(row);
        });
    }

    window.editClient = function(id) {
        const client = clients.find(client => client.id === id);
        if (client) {
            document.getElementById('name').value = client.name;
            document.getElementById('gender').value = client.gender;
            document.getElementById('paymentStatus').value = client.paymentStatus;
            document.getElementById('paymentAmount').value = client.paymentAmount;

            clients = clients.filter(client => client.id !== id);
            displayClients();
        }
    };

    window.deleteClient = function(id) {
        clients = clients.filter(client => client.id !== id);
        displayClients();
    };
});
