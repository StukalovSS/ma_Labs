ENCODE = 'encode'
DECODE = 'decode'
ENG = 'eng'
RU = 'ru'
RU_ALPH = 'А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я'.split(' ');
ENG_ALPTH = 'A B C D E F G H I G K L M N O P Q R S T U V W X Y Z'.split(' ');

var alph = RU_ALPH;

var gammas = [];
var input = document.getElementById("input-text");
var output = document.getElementById("output-text");
var inputLabel = document.getElementById("input-label");
var outputLabel = document.getElementById("output-label");
var n = alph.length;
var mode = ENCODE;
var lang = RU;


function submit() {
    gammas = document.getElementById("gamma").value.replace(/ /g,'').split(',');
    if (valdateGammas() && validateText()) {
        if (mode === ENCODE) {
            encrypt(input.value);
        } else {
            decrypt(input.value)
        }
    }
} 

function encrypt(text) {
    outputText = '';
    gammaIndex = 0;
    console.log('ENCRYPT')
    for (var i = 0; i < text.length; i++) {
        outputText += alph[modp(alph.indexOf(text[i]) + (+gammas[gammaIndex]), n)]
        console.log('let ' + alph.indexOf(text[i]))
        console.log('gamma ' + gammas[gammaIndex])
        console.log('index ' + modp(alph.indexOf(text[i]) + (+gammas[gammaIndex]), n))
        console.log('out ' + alph[modp(alph.indexOf(text[i]) + (+gammas[gammaIndex]), n)])
        console.log('-');
        gammaIndex = gammaIndex < gammas.length - 1 ? gammaIndex + 1 : 0;
    }
    output.value = outputText;
}

function decrypt(text) {
    outputText = '';
    gammaIndex = 0;
    console.log('DECRYPT')
    for (var i = 0; i < text.length; i++) {
        outputText += alph[modp(alph.indexOf(text[i]) - (+gammas[gammaIndex]), n)]
        console.log('let ' + alph.indexOf(text[i]))
        console.log('gamma ' + gammas[gammaIndex])
        console.log('index ' + modp(alph.indexOf(text[i]) - (+gammas[gammaIndex]), n))
        console.log('out ' + alph[modp(alph.indexOf(text[i]) - (+gammas[gammaIndex]), n)])
        console.log('-');
        gammaIndex = gammaIndex < gammas.length - 1 ? gammaIndex + 1 : 0;
    }
    output.value = outputText;
}

function valdateGammas() {
    var ok = true;
    if (!gammas) {
        alert('Введи гамму');
        ok = false;
    }
    gammas.forEach(item => {
        if (+item !== 0 && !+item) {
            alert('Через запятую, блять, цифры!');
           ok = false;
        }
    });
    return ok;
}

function validateText() {
    input.value = input.value.toUpperCase();
    var i = 0;
    while (i<input.value.length && alph.indexOf(input.value[i]) != -1) {
        i++;
    }
    if (input.value.length !== i) {
        if (lang === RU) {
            alert('Только русские буквы');
        } else {
            alert('Только буквы английского алфавита');
        }
    }
    return input.value.length === i;
}

function check(value) {
    mode = value;
    if (mode === ENCODE) {
        inputLabel.innerText = 'Исходный текст';
        outputLabel.innerText = 'Зашифрованный текст';
    } else {
        inputLabel.innerText = 'Зашифрованный текст';
        outputLabel.innerText = 'Исходный текст';
    }
}

function switchLang(value) {
    lang = value;
    if (lang === RU) {
        alph = RU_ALPH
    } else {
        alph = ENG_ALPTH
    }
    n = alph.length
}





