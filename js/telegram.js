//данные моего телеграм бота

const TOKEN = "6273687344:AAEQLqI3VI87fxNeHrgcALkeq0ekQ-jB6ps"
const CHAT_ID = "-1001711407669"
const url_api = `https://api.telegram.org/bot${TOKEN}/sendMessage`


// обозначил инпут
const input = document.querySelector('input');

// разрешил вводить только цифры, не больше 11
input.addEventListener('input', () => {
    const value = input.value.replace(/\D/g, '');
    input.value = value.slice(0, 11);
})


//импут окрашивается красным без введёных данных
input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
        input.style.border = '2px solid red';
    } else {
        input.style.border = '2px solid green';
    }
});


let zakzText


function myFunc() {
    const cards = document.querySelector('.cart-wrapper');
    const divs = document.querySelectorAll('.cart-item');
    let res = ""
    divs.forEach(div => {
            const roll = div.querySelector('.cart-item__title').innerHTML;
            const howMuch = div.querySelector('.items__current').innerHTML;
            res = res + roll +' - '+ howMuch +'шт, '
    });
    const dostavka = document.querySelector('.delivery-cost').innerHTML;
    
    const totalPrice = document.querySelector('.total-price').innerHTML;
    
    zakzText = (`Заказ: ${res} Доставка: ${dostavka} рублей. Сумма всего заказа: ${totalPrice} рублей`)
}


document.getElementById('tg').addEventListener('submit', function (e) {
    //если инпут не пустой
    if (input.value.trim() !== '') {
        
        e.preventDefault();
        myFunc()
        let message = `<b>Сообщение с сайта: </b> \n Номер клиента: ${this.text.value}  \n ${zakzText}` 
        axios.post(url_api, {
          chat_id: CHAT_ID,
          parse_mode: 'html',
          text: message 
        })
        document.getElementById('inputPhone').value = ''
        e.target.reset()
    }
    //иначе инпут красится в красный, отправка прерывается, без перезагрузки страницы
    else {
        input.style.border = '5px solid red';
        e.preventDefault();
    }
})