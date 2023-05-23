const faucetUrls = ['https://node.zenon.fun:35999/faucet']
const addressLength = 40;
let isValidAddress = false;

window.addEventListener('load', (_) => {
    document.getElementById('addressInput').addEventListener('input', function () {
        isValidAddress = document.getElementById('addressInput').value.length == addressLength
        document.getElementById('button').style.opacity = isValidAddress ? 1.0 : 0.4;
        document.getElementById('sentInfo').style.display = '';
    });

    document.getElementById('button').addEventListener('mouseenter', function (_) {
        if (isValidAddress) {
            document.getElementById('button').style.cursor = 'pointer';
            document.getElementById('button').style.backgroundColor = '#c2c2c2';
        }
    });

    document.getElementById('button').addEventListener('mouseleave', function (_) {
        document.getElementById('button').style.cursor = '';
        document.getElementById('button').style.backgroundColor = '';
    });
});

function onRequestFundsSelected() {
    if (!isValidAddress) {
        return
    }

    resetInput()

    sendFaucetRequest(document.getElementById('addressInput').value)


}

function resetInput() {
    const input = document.getElementById('addressInput');
    input.value = ''
    input.dispatchEvent(new Event('input'));
}

function sendFaucetRequest(address) {
    fetch(getRandomFaucetUrl(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "address": address
        })
    })
        .then(function (response) {
            document.getElementById('sentInfo').style.display = 'flex';
            if (response.ok) {
                document.getElementById('sentInfo').innerHTML = 'Request sent. Please wait a few moments for the funds to arrive.';
            } else {
                console.log(JSON.stringify(response.json()));
                document.getElementById('sentInfo').innerHTML = 'Request failed. Please try again.';
            }
        }).catch(function (error) {
            document.getElementById('sentInfo').style.display = 'flex';
            document.getElementById('sentInfo').innerHTML = 'Request failed. Please try again.';
            console.error(error);
        });
}

function getRandomFaucetUrl() {
    return faucetUrls[Math.floor(Math.random() * faucetUrls.length)]
}
