document.addEventListener('DOMContentLoaded', () => {
    
    const randChar = ("https://www.breakingbadapi.com/api/character/random");
    const randQuote = ("https://www.breakingbadapi.com/api/quote/random")
    const findChar = ("https://breakingbadapi.com/api/characters?")

    const randCharBtn = document.getElementById('randCharBtn');
    const randQuoteBtn = document.getElementById('randQuoteBtn');
    const LikedQuoteBtn = document.getElementById('LikedQuoteBtn');
    const likeBtn = document.getElementById('likeBtn');
    const favoritedQuotes = document.getElementById('favoritedQuotes');
    const form = document.querySelector('form');
    
    /** 
     * Adding the eventListerners to the buttons
    */
    randCharBtn.addEventListener('click', () => (callAPI(randChar, true)));
    randQuoteBtn.addEventListener('click', () => (callAPI(randQuote, false)));
    likeBtn.addEventListener('click', saveQuote);
    LikedQuoteBtn.addEventListener('click', likeButtion);

    /**
     * Function to display all the liked quotes to the page
     */
    function likeButtion(){
        if(likeCounter !== 0){
            LikedQuoteBtn.disabled = false;
        }else{
            LikedQuoteBtn.hidden = true;
        }

        person.hidden = true;
        favoritedQuotes.hidden = false;
        likeBtn.hidden = true;
        rqQuote.hidden = true;

    }

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        const comment = event.target.comment.value;

        if (comment !== ''){
            const personArray = comment.split(" ");
            const findPerson = findChar + "name=" + personArray[0] + "+" + personArray[1];
            callAPI(findPerson, true);
            event.target.comment.value = null;
        }
    }); 

    /** 
     * Used for showing the character's bio
    */
    let person = document.getElementById('card');
    let photo = document.getElementById('photo');
    let name = document.getElementById('name');
    let tvshow = document.getElementById('tv-show');
    let bb_seasons = document.getElementById('bb-seasons');
    let bcs_seasons = document.getElementById('bcs-seasons');
    let job = document.getElementById('job');
    let actor = document.getElementById('actor');
    let status = document.getElementById('status');

    /** 
     * Used for showing the random quote
    */
    let rqQuote = document.getElementById('quote');
    let rPerson = document.getElementById('quoteName');
    let rQuote = document.getElementById('message');
    let show = document.getElementById('show');

    /**
     * Used to store the liked quote and how many liked quotes are saved
     */
    let likeQuote = {};
    let likeCounter = 0;

    /**
     * Creating a new quote and appending it to the exisiting saved like quotes
     */
    function saveQuote(){
        const allQuotes = document.getElementById('table-body');
        const newMessage = document.createElement("tr");
        newMessage.id = "liked-comment";
        const newName = document.createElement("th");
        newName.id = "liked-comment";
        const newQuote = document.createElement("th");
        newMessage.id = "liked-comment";
        const newShow = document.createElement("th");
        newShow.id = "liked-comment";
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = ('Delete');
        deleteBtn.style.color = ('red');
        deleteBtn.addEventListener("click", (e) => removeQuote(e));
     
        newName.textContent = likeQuote.name;
        newQuote.textContent = likeQuote.quote;
        newShow.textContent = likeQuote.show;

        newMessage.appendChild(newName);
        newMessage.appendChild(newQuote);
        newMessage.appendChild(newShow);
        newMessage.appendChild(deleteBtn);
        allQuotes.appendChild(newMessage);

        likeBtn.disabled = true;
        
        likeCounter++;
        
        LikedQuoteBtn.disabled = false;
    }

    /**
     * Removing selected quote from the saved like quotes
     * @param {*} quote - the quote to be removed
     */
    function removeQuote(quote){
        quote.target.parentNode.remove();
        likeCounter--;

        if(likeCounter <= 0){
            LikedQuoteBtn.disabled = true;
        }
    }

    /**
     * 
     * @param {*} display boolean
     */
    function hide(display){

        person.hidden = !display;
        favoritedQuotes.hidden = display;
        rqQuote.hidden = display;
        likeBtn.hidden = display;
        likeBtn.disabled = display; 
    }

    /**
     * 
     * @param {*} string the correct URL for the BreakingBad API call
     * @param {*} person boolean, True = looking for a person, False = looking for a random quote
     */
    function callAPI(string, person){
        fetch(string)
        .then(function(response){
            return response.json();
        })
        .then (function (obj){

            if (person){
                hide(true);
                
                photo.src = obj[0].img;
                name.textContent = "Name: " + obj[0].name;
                tvshow.textContent = "TV Series: " + obj[0].category;

                if(obj[0].appearance !== 0){
                    bb_seasons.textContent = "Breaking Bad Seasons: " + obj[0].appearance;
                }else{
                    bb_seasons.textContent = "Breaking Bad Seasons: None";
                }

                if(obj[0].better_call_saul_appearance !== null){
                    bcs_seasons.textContent = "Better Call Saul Seasons: " + obj[0].better_call_saul_appearance;
                }else{
                    bcs_seasons.textContent = "Better Call Saul Seasons: None";
                }

                job.textContent = "Occupation: " + obj[0].occupation;
                actor.textContent = "Portrayed By: " + obj[0].portrayed;
                status.textContent = "Status: " + obj[0].status;
            }else{
                hide(false);

                favoritedQuotes.hidden = true;

                rPerson.textContent = ("From: " + obj[0].author);
                rQuote.textContent = "Random Quote: " + obj[0].quote;
                show.textContent = "TV Series: " + obj[0].series;

                likeQuote = {
                    name : obj[0].author,
                    quote : obj[0].quote,
                    show : obj[0].series,
                }
            }
        })
        .catch(function (obj){
            hide(true);

            photo.src = "./picture/not_found.jpg";
            name.textContent = "Could Not Find Person";
            tvshow.textContent = "";
            bb_seasons.textContent = "";
            bcs_seasons.textContent = "";
            job.textContent = ""
            actor.textContent = ""
            status.textContent = ""
        })
    }   
})
