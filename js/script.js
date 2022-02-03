const grade = document.querySelector("#grade");
const combinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let marcadas = Array(9);
let vez = true;

function iniciar() {
    for (let i = 0; i < marcadas.length; i++) {
        let quadrado = document.createElement("img");

        quadrado.id = i;
        quadrado.src = "img/branco.jpg";
        quadrado.addEventListener("click", marcar);

        grade.appendChild(quadrado);
    }
}

function reiniciar() {
    window.location.reload();
}

function marcar() {
    let quadrado = this;
    
    quadrado.src = vez ? "img/xis.jpg" : "img/bola.jpg"
    quadrado.removeEventListener("click", marcar);

    marcadas[quadrado.id] = vez ? "xis" : "bola";

    let resultado = conferir("xis") || conferir("bola");

    if (resultado) {
        alert(resultado.mensagem);

        if (resultado.combinacao) {
            let quadrados = grade.getElementsByTagName("img");

            for (img of quadrados) {
                if (!resultado.combinacao.includes(parseInt(img.id))) {
                    img.src = "img/branco.jpg";
                    img.removeEventListener("click", marcar);
                }
            }
        }
    }

    vez = !vez;
}

function conferir (jogador) {
    let ganhou = false;
    let jogadas = marcadas.reduce((arrayJogadas, elemento, indice) => {
        if (elemento == jogador) {
            return arrayJogadas.concat(indice);
        } else {
            return arrayJogadas;
        }
    }, []);

    for (combinacao of combinacoes) {
        ganhou = combinacao.every(elemento => {
            console.log(elemento);
                            
            return jogadas.includes(elemento);
        });
        
        if (ganhou) {
            return {
                combinacao,
                mensagem: `O jogador ${jogador} ganhou!`
            }
        }
    }

    console.log(jogadas);
    console.log(combinacao);
    console.log(ganhou);

    if (ganhou) {
        return {
            combinacao,
            mensagem: `O jogador ${jogador} ganhou!`
        }
    } else if (!marcadas.includes(undefined)) {
        return { mensagem: "Empatou!" }
    }

    console.log(jogadas);
}