// Seleciona todos os assentos que não estão ocupados
const seats = document.querySelectorAll('.seat-column .seat:not(.occupied)');
const count = document.getElementById('selected-seats');
const total = document.getElementById('total');
const buyButton = document.getElementById('buy-button');

let ticketPrice = 10;

// Carrega os assentos ocupados ao iniciar a página
loadOccupiedSeats();

// Adiciona o evento de clique a cada assento
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('occupied')) {
            seat.classList.toggle('selected');
            updateSelectedCount();
        }
    });
});

// Função para atualizar a contagem de assentos selecionados e o total
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.seat-column .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = `R$ ${selectedSeatsCount * ticketPrice},00`; // Atualiza o total com a formatação correta

    // Atualiza a exibição dos assentos selecionados
    document.getElementById('selected-seats').innerText = selectedSeatsCount > 0 
        ? [...selectedSeats].map(seat => seat.dataset.seatNumber).join(', ') 
        : 'Nenhum assento selecionado';
}

// Função para armazenar os assentos selecionados no localStorage
function storeSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => seat.dataset.seatNumber);

    // Armazena os assentos selecionados no localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// Função para carregar os assentos ocupados
function loadOccupiedSeats() {
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats')) || [];
    occupiedSeats.forEach(index => {
        const seat = document.querySelector(`.seat[data-seat-number="${index}"]`);
        if (seat) {
            seat.classList.add('occupied');
        }
    });
}

// Adiciona o evento de clique ao botão de compra
buyButton.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.seat-column .seat.selected');
    
    if (selectedSeats.length > 0) {
        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
        });
        
        // Armazena os assentos selecionados
        storeSelectedSeats();

        // Redireciona para a página de pagamento
        window.location.href = 'pagamento.html'; // Ajuste o caminho se necessário
    } else {
        alert('Nenhum assento selecionado para compra.');
    }
});
