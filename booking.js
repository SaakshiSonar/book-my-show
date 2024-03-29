const headerImg = document.querySelector('.booking-header__img');
const headerTitle = document.querySelector('.booking-header__title');
const seatsContainer = document.querySelector('.seating');
const seats = document.querySelectorAll('.row .seat');
const ticketTotal = document.querySelector('.booking-header__total');
const paymentTotalBtn = document.querySelector('.payment-btn');

const apiKey = '820d6db8746f3de6a93c6c922bf8074e';
fetch(`https://api.themoviedb.org/3/movie/${sessionStorage.getItem('movieID')}?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => {
        headerImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
        headerTitle.innerHTML = data.title;
    });

const loadSeats = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('seat-selected');
            };
        });
    };
};

const updateTotal = () => {
    
    const selectedSeats = document.querySelectorAll('.row .seat-selected');

    
    ticketTotal.innerHTML = `${selectedSeats.length} Tickets`;

//update price

    paymentTotalBtn.innerHTML = `Pay Rs${(100 * selectedSeats.length).toFixed(2)}`;

   
    const selectedSeatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
};


seatsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('seat-booked')) {
        e.target.classList.toggle('seat-selected');
        updateTotal();
    };
});

paymentTotalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedSeats = document.querySelectorAll('.row .seat-selected');
    if (selectedSeats.length > 0) {
        window.location = 'confirmation.html';
    } else {
        alert('Please make a seat selection.');
    };
});

loadSeats();

updateTotal();
