$(document).ready(()=>{

    const words = ['stranger', 'women', 'success', 'secret','hidden','hollywood','hangman','animal','mountain']
    const randomWord = ()=> words[Math.floor(Math.random()*words.length)].split('') // string to array
    const loadImage = n=> $("#hangstage").attr("src",`./images/hangman-${n}.jpg`);
    let success = new Audio("sounds/success-sound.mp3"); 
    const death = () => new Audio("sounds/death-sound.wav");
    const keySound = () => new Audio("sounds/keypress-sound.wav")

    let word = randomWord();
    dash = []
    dash = word.map( w => '__' )
    correctWord = []; 
    wrongChar = 0; 

    $('.dash').append(`<span id="dashes" class="px-2"><h1>${word.map(w=>'__').join(' ')}</h1></span>`)
    const reload= ()=>{
        loadImage(0)
        dash = word.map(w => '__')
        $('.key').removeClass('highlight')
        $("#dashes").replaceWith(`<span id="dashes" class="px-2"><h1>${word.map(w=>'__').join(' ')}</h1></span>`);
    }

    function checkWord(){
        for (let i = 0; i < word.length; i++){
            for (let j = 0; j < correctWord.length; j++){
                if (word[i] == correctWord[j])
                     dash[i] = word[i];
            }
        }
        $("#dashes").replaceWith(`<span id="dashes" class="px-2"><h1>${dash.join(' ').toUpperCase()}</h1></span>`);
    }

    function main(char){
        keySound().play();
        if(!word.includes(char.toLowerCase()) && wrongChar < 6) 
            wrongChar+=1
        if(word.includes(char.toLowerCase())) 
            correctWord.push(char.toLowerCase())
        checkWord();

        if(word.join('') == dash.join('') && wrongChar < 6) { 
            success.play(); 
            setTimeout(()=>{
                if(confirm("Congratulations! You win!") ){
                    reload(); 
                    wrongChar = 0; 
                    word = randomWord(); 
                    correctWord = [];
                    dash = word.map(i=>'__')
                } 
            }, 3000);
        }
        $(`#${char.toUpperCase()}`).addClass('highlight')
        // console.log(char)
        loadImage(wrongChar);
        if(wrongChar > 5){ 
            death().play(); 
            setTimeout(()=>{
            if(confirm("Better luck next time...")){
                reload(); 
                wrongChar = 0;
                word = randomWord(); 
                correctWord = []; 
                dash = word.map(i=>'__') 
                } 
            }, 3000);
        }
    }

    $(".key").on("click", function(target){
        main(this.innerText) // main(A)
    })

    $(this).keypress(k =>{
        // console.log(k)
        main(k.key) // main(h)
        // console.log(k.key)
    })
})

            