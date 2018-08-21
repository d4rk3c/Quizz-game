
var UIcontroller = (function () {
    var domStrings = {
        startButton: ".startGame",
        lQDiv: ".lquestion",
        lQInput: ".lq-response",
        lQButton: ".lq-button",
        lQShow: ".show-question",
        fQinput: ".inputFinal",
        fQButton: ".confirmButton",
        infoButton: "#information",
        p1Score: ".score-0",
        p2Score: ".score-1",
        p0img: ".p0img",
        p1img: ".p1img",
        mainQuestions: "#main-questions",
        p1container: "#player-0",
        p2container: "#player-1",
        labelScore1: "#label-score0",
        labelScore2: "#label-score1",
        startGameDiv: "#startGame",
        div1: "#question-1",
        div2: "#question-2",
        div3: "#question-3",
        div4: "#question-4",
        div5: "#question-5",
        div6: "#question-6",
        div7: "#question-7",
        div8: "#question-8",
        div9: "#question-9",
        div10: "#question-10",
        div11: "#question-11",
        div12: "#question-12",
        div13: "#question-13",
        div14: "#question-14",
        div15: "#question-15",
        div16: "#question-16"
        
        
    }

    return {
        getDomStrings: function () {
            return domStrings;
        },

        getValues: function () {  // uzimanje vrednosti iz inputa za lokalno i konacno pitanje

            return {
                localResponse: document.querySelector(domStrings.lQInput).value,
                finalResponse: document.querySelector(domStrings.fQinput).value

            }
        },

        clearFields: function () { //funkcija koja nakon pokretanja kviza resetuje vizuleno sva vidljiva polja
            var localQuestionDesktop, scorep1, scorep2;
            localQuestionDesktop = document.querySelector(domStrings.lQShow);
            localQuestionDesktop.textContent = " ";
            scorep1 = document.querySelector(domStrings.p1Score);
            scorep1.textContent = 0;
            scorep2 = document.querySelector(domStrings.p2Score);
            scorep2.textContent = 0;

        },
        clearLQField: function(){
            document.querySelector(domStrings.lQShow).value = " "
            

        },
        ///uklanjanje start dugmeta nakon pocetka igre
        startDisabled: function () {
            var button = document.getElementById('start-game')
            var container = document.querySelector(domStrings.startButton)
            container.removeChild(button)

        },

        LQDisabled: function () { // dugme za lokalna pitanja je disable//nakon pritiska na dugme pokreni kviz
            var lq = document.querySelector(domStrings.lQButton);
            lq.disabled = true;
        },

        LQEnable: function () { //dugme za lokalna pitanja je enable// nakon pritiska na neko 1-16 pitanja
            var lq = document.querySelector(domStrings.lQButton);
            lq.disabled = false;
        },

        FQDisabled: function () { // dugme za konacan odgovor je disable
            var fq = document.querySelector(domStrings.fQButton);
            fq.disabled = true;
        },

        activePlayerStart: function () { //nakon pritiska na start button aktivan player postaje p0 //prvo sam mu skinuo klase pa dodao img element i klasu p0img
            var setImg = document.querySelector(domStrings.p0img);
            setImg.textContent = " ";
            var img = document.createElement("img");
            img.src = "./images/p0active.jpg";
            img.classList.add("p0img");
            setImg.appendChild(img);
        },

        setWinner1: function () { //vizuelno setovanje pobednika1 nakon zavrsetka kviza
            document.querySelector(domStrings.p1container).classList.add('winner');//dodavanje klase winner koja je pripremljena u css
            document.querySelector(domStrings.labelScore1).textContent = 'POBEDNIK!';
        },

        setWinner2: function () {// vizuelno setovanje pobednika 2 nakon zavrsetka kviza
            document.querySelector(domStrings.p2container).classList.add('winner');
            document.querySelector(domStrings.labelScore2).textContent = 'POBEDNIK!';
        },

        setEqual: function () {// ukoliko je rezultat neresen
            document.querySelector(domStrings.labelScore1).textContent = 'NERESENO!';
            document.querySelector(domStrings.labelScore2).textContent = 'NERESENO!';
        },

        showGameRules: function(){
            alert("PRAVILA IGRE:\n Igra se sastoji od 16 polja i slike poznate licnosti u pozadini.\nSvaki tacan odgovor na pitanje donosi 10 poena dok je tacan odgovor na konacno pitanje 100 poena.\n Prilikom davanja netacnog odgovora na konacno resenje igracu se oduzimaju 3 poena!\n Pobednik je igrac koji nakon pogadjanja konacnog odgovora bude imao vise ostvarenih poena!\nOdgovore pisati iskljucivo malim slovima\nUzivajte!")

        },
        setClearLQFieldsTrue: function(){//nakon TACNOG! odgovora LQ da se obrise pitanje i odgovor
            document.querySelector(domStrings.lQInput).value = " "
            document.querySelector(domStrings.lQShow).textContent = "Tacan odgovor! Izaberite drugo pitanje"
        },
        setClearLQFieldsFalse: function(){//nakon NETACNOG!  odgovora LQ da se obrise pitanje i odgovor
            document.querySelector(domStrings.lQInput).value = " "
            document.querySelector(domStrings.lQShow).textContent = "Netacan odgovor! Izaberite drugo pitanje"
        },

        showGameOver: function () { //u trenutnku zavrsetka igre startuje se game over
            UIcontroller.LQDisabled();
            UIcontroller.FQDisabled();
            var startBut = document.querySelector(domStrings.startButton);
            var newGameButton = document.createElement('input'); // kreira se novo dugme za oznacavanje nove igre
            newGameButton.setAttribute('type', 'button');
            newGameButton.setAttribute('value', 'Nova Igra');
            newGameButton.classList.add('reload');
            document.querySelector(domStrings.startGameDiv).appendChild(newGameButton);
            newGameButton.addEventListener('click', function () {
                location.reload();
            });
        },
    }

})();

var modelQuizz = (function (UIctrl) {
    var DOMS = UIctrl.getDomStrings();
    var scores = [0, 0]; //niz u koji se beleze skorovi igraca
    var activeScore = 0; // varijabla koja oznacava poene koji se dodaju na postojeci skor
    var activePlayer = 0;// varijabla koja oznacava koji igrac je na potezu

    var localQuestions = []; // prazan niz u koji se smesta 16 pitanja  izvucenih iz baze lokalnih pitanja

    return {

        //dobijanje lokalnog niza objekata sa 16 pitanja i odgovora
        getLocalQuestions: function () {

            for (i = 1; i < 17; i++) {
                var random = Math.floor(Math.random() * (questions.length - 1)) + 1;
                localQuestions[i] = questions[random];
                questions.splice(random, 1);//brisanje clana koji je vec izvucen kako se ne bi ponavljali.
            }
            localQuestions.splice(0, 1);//brisanje prvog empty clana
            console.log(localQuestions)

        },

        //publikovanje niza lokalnih pitanja kako bi ga koristili u drugim modulima
        local: localQuestions,


        //nasumican odabir finalne fotografije u backgroundu
        getBackgroundPhoto: function (random) {

            for (i = 0; i < finalPhotos.length; i++) {

                var fObjectPhoto = finalPhotos[random].loc;
                console.log("'" + fObjectPhoto + "'");
            }

            var finalBacks = document.querySelector(DOMS.mainQuestions); //postavljanje background slike u final answer
            finalBacks.style.backgroundImage = "url(" + "'" + fObjectPhoto + "'" + ")";
        },

        // setovanje sledeceg igraca

        setNextPlayer: function () {
            activeScore = 0;
            //vracanje neaktivne slike igracu koji je do sada bio aktivan a vise nije
            var active = document.querySelector(".p" + activePlayer + "img");
            active.textContent = " ";
            var imginactive = document.createElement("img");
            imginactive.src = "./images/p" + activePlayer + ".jpg";
            imginactive.classList.add("p" + activePlayer + "img");
            active.appendChild(imginactive);

            activePlayer == 0 ? activePlayer = 1 : activePlayer = 0; //promena aktivnog igraca
            //postavljanje aktivne slike igracu koji je upravo postao aktivan
            var setImg = document.querySelector(".p" + activePlayer + "img");
            setImg.textContent = " ";
            var img = document.createElement("img");
            img.src = "./images/p" + activePlayer + "active.jpg";
            img.classList.add("p" + activePlayer + "img");
            setImg.appendChild(img);

            //console.log("next player");
            //console.log(activePlayer);
        },

        setScoreTrueLQ: function () {  // ukoliko je odgovor na lokalno pitanje bio tacan aktivni igrac dobija 10 poena
            scores[activePlayer] = scores[activePlayer] + 10;
            document.querySelector(".score-" + activePlayer).textContent = scores[activePlayer];
            
        },
        setScoreFalseFQ: function () { //ukoliko je odgovor za konacno resenje bio netacan igracu se oduzima 3 poena
            scores[activePlayer] = scores[activePlayer] - 3;
            document.querySelector(".score-" + activePlayer).textContent = scores[activePlayer];
            //console.log("pogresan konacan odgovor")
        },

        setScoreTrueFQ: function () { // ukoliko je odgovor za konacno resenje bio tacan igracu se dodaje 100 poena i proverava se dalje:
            scores[activePlayer] = scores[activePlayer] + 100;
            document.querySelector(".score-" + activePlayer).textContent = scores[activePlayer];

            if (scores[0] > scores[1]) { //da li je skor prvog veci od drugog? Ako jeste prvom se setuje klasa pobednik 
                console.log("Igrac broj jedan je pobedio!")
                UIctrl.setWinner1();
            }
            else if (scores[0] === scores[1]) { // ako je nereseno setuje se klasa nereseno
                console.log(" Rezultat je neresen");
                UIctrl.setEqual();
            }
            else {
                console.log("Igrac broj dva je pobedio!");
                UIctrl.setWinner2();
            }
            for (i = 1; i < 17; i++) { // brisanje svih lokalnih pitanja koja jos nisu pogodjena i prikaz fotografije iz backgrounda
                document.querySelector("#question-" + i).classList.add("rightAnswer")
            }
            //console.log(" tacan konacan odgovor!")
        },

        showScores: function () { // public rezultata kako bi se koristili u drugim modulima
            return scores;
        }
    }

})(UIcontroller);


var controller = (function (model, UIctrl) {
    var DOM = UIctrl.getDomStrings();
    var randomNumber = Math.floor(Math.random() * (finalPhotos.length - 1)) + 1 //izracunava random number na osnovu kojeg ce se dodavati konacna slika i odgovor
    //console.log(randomNumber)
    var gamePlay = false;
    var lokalnoResenje; //setovanje varijable koja ce predstavljati resenje diva 1-16 i na osnovu koje ce se upravljati tacni odgovori
    var divIndex; // index koji odredjuje zadati id od 1-16 divova

    var setupEventListeners = function () { 
        // setovanje event listenera na info button
        document.querySelector(DOM.infoButton).addEventListener('click',gameRules);
        
        // setovanje event listenera dugme pokreni
        document.querySelector(DOM.startButton).addEventListener('click', startQuizz);

        // dugme local question
        document.querySelector(DOM.lQButton).addEventListener('click', controlLQ);

        //dugme final question
        document.querySelector(DOM.fQButton).addEventListener('click', controlFQ);

        //setovanje event listenera za 1-16 polja

        model.getLocalQuestions(); //pozivanje niza od 16 odgovora

        function startEventListeners() {

            document.querySelector(DOM.div1).addEventListener("click", function () {
                if (gamePlay) { //samo ukoliko je prethodno kliknuto start dugme
                    document.querySelector(DOM.lQShow).textContent = model.local[0].question;
                }
                UIctrl.LQEnable(); //tek sada LQ button postaje funkcionalno
                lokalnoResenje = model.local[0].answer; // povlaci resenje lokalnog pitanja
                divIndex = document.querySelector(DOM.div1); //dohvatamo kliknuti div kako bismo znali koji nestaje usled tacnog odgovora
                document.querySelector(DOM.mainQuestions).classList.add("disable") // sprecava mogucnost promene pitanja ukoliko ne znamo odgovor
            });

            document.querySelector(DOM.div2).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[1].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[1].answer;
                divIndex = document.querySelector(DOM.div2);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div3).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[2].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[2].answer;
                divIndex = document.querySelector(DOM.div3);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div4).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[3].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[3].answer;
                divIndex = document.querySelector(DOM.div4);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div5).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[4].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[4].answer;
                divIndex = document.querySelector(DOM.div5);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div6).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[5].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[5].answer;
                divIndex = document.querySelector(DOM.div6);
                document.querySelector(DOM.mainQuestions).classList.add("disable");
            });

            document.querySelector(DOM.div7).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[6].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[6].answer;
                divIndex = document.querySelector(DOM.div7);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div8).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[7].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[7].answer;
                divIndex = document.querySelector(DOM.div8);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div9).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[8].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[8].answer;
                divIndex = document.querySelector(DOM.div9);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div10).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[9].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[9].answer;
                divIndex = document.querySelector(DOM.div10);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div11).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[10].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[10].answer;
                divIndex = document.querySelector(DOM.div11);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div12).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[11].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[11].answer;
                divIndex = document.querySelector(DOM.div12);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div13).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[12].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[12].answer;
                divIndex = document.querySelector(DOM.div13);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div14).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[13].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[13].answer;
                divIndex = document.querySelector(DOM.div14);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div15).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[14].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[14].answer;
                divIndex = document.querySelector(DOM.div15);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });

            document.querySelector(DOM.div16).addEventListener("click", function () {
                if (gamePlay) {
                    document.querySelector(DOM.lQShow).textContent = model.local[15].question;
                }
                UIctrl.LQEnable();
                lokalnoResenje = model.local[15].answer;
                divIndex = document.querySelector(DOM.div16);
                document.querySelector(DOM.mainQuestions).classList.add("disable")
            });
        }
        startEventListeners()
    }
    var gameRules = function(){// funkcija info dugmeta

        UIctrl.showGameRules()

    }

    var startQuizz = function () { // funkcija dugmeta POKRENI

        gamePlay = true;

        UIctrl.clearFields();
        UIctrl.LQDisabled();
        UIctrl.startDisabled();
        UIctrl.activePlayerStart();

        model.getBackgroundPhoto(randomNumber); //dodati random number funkciji i na taj nacin postaviti backgroun final question
        document.querySelector(DOM.mainQuestions).classList.remove("disable") // omoguciti funkcionalnost div-u sa lokalnim pitanjima
        //console.log("poceli smo");
    };

    var controlLQ = function () { //funkcija dugmeta za lokana pitanja
        if (gamePlay) {

            if (UIctrl.getValues().localResponse === lokalnoResenje) { // ukoliko je vrednost inputa jednaka lokalnom resenju iz niza objekata
                divIndex.classList.add("rightAnswer"); //div postaje proziran
                model.setScoreTrueLQ();// dodaju se poeni igracu
                //console.log("tacno")
                var zamenaPitanja = {
                    question: "Sada mozete odgovoriti samo na konacno pitanje!",
                    answer: "Probajte"
                }
                var divIndexNum = divIndex.textContent-1 //dobijanje indexa pitanja iz local niza
                model.local.splice(divIndexNum,1,zamenaPitanja); //zamena tog pitanja kako se ne bi ponavljalo ponovo kada je odgovor tacan
                UIctrl.setClearLQFieldsTrue();
                

                
                
            }
            else { //u suprotnom:
                
                model.setNextPlayer(); 
                UIctrl.setClearLQFieldsFalse();

                //console.log("netacno")
            }
            document.querySelector(DOM.mainQuestions).classList.remove("disable")// onemogucava se klik aktivnom igracu na drugi div
            //console.log("provera LQ");
            
        }
    };

    var controlFQ = function () { //funkcija final Question dugmeta
        if (gamePlay) {

            for (i = 0; i < finalPhotos.length; i++) {
                var fObjectResponse = finalPhotos[randomNumber].answer; // definisanje odgovora za konacnu fotografiju
                //console.log(fObjectResponse);
            }

            if (UIctrl.getValues().finalResponse === fObjectResponse) {
                model.setScoreTrueFQ();
                UIctrl.showGameOver();
                //console.log('tacan odgovor')
            }
            else {
                model.setScoreFalseFQ();
                model.setNextPlayer();
                //console.log('netacan odgovor')
            }
            document.querySelector(DOM.mainQuestions).classList.remove("disable")
            //console.log("provera FQ");
        }
    };

    return {
        init: function () {

            console.log('Quizz has started!');
            setupEventListeners();
        }
    }

})(modelQuizz, UIcontroller);

controller.init();






