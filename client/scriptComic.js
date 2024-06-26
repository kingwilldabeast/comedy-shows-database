/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/

const hostName = localStorage.getItem('storedHostName')
const input = document.querySelector('#input-bar')
const searchButton = document.querySelector('#search-button')
const comicName = document.querySelector('#comic-name')
const comicHeadshot = document.querySelector('#comic-headshot')
const comicClip = document.querySelector('#comic-clip')
const showsHostedElem = document.querySelector('.shows-container')
const comicOptions = document.querySelector('#comic-options')
/*-------------------------------- Functions --------------------------------*/

// Obtain ID from whichever comic was clicked on previous page
// const nameCopy = localStorage.getItem('comicName')
async function refresh(comedianName) {

    showsHostedElem.innerHTML = ''
    try {
        let eventResponse = await axios.get(`http://localhost:3001/events`);
        let comicResponse = await axios.get(`http://localhost:3001/comics`);
        let venueResponse = await axios.get(`http://localhost:3001/venues`);
        
        eventObjectArray = eventResponse.data //assuming it's an array
        comicObjectArray = comicResponse.data //assuming it's an array
        venueObjectArray = venueResponse.data //assuming it's an array
        
        let comicSingleResponse = await axios.get(`http://localhost:3001/comicsname/${comedianName}`);
        comicObject = comicSingleResponse.data //assuming it's an array
        console.log(comicObject)

        comicOptions.innerHTML = ""
        for (const comicObject of comicObjectArray) {
            const newComicOption = document.createElement('option');
            // newVenue.setAttribute('id',venueObject._id)
            newComicOption.value = comicObject.name
            comicOptions.appendChild(newComicOption)
        }

        comicName.innerText = comicObject.name
        // comicHeadshot.innerText = comicObject.headshot
        if (comicObject.headshot) {
            comicHeadshot.setAttribute('src',comicObject.headshot)
        }
        comicClip.innerText = comicObject.clip
        showsHostedArray = comicObject.eventsHosted
        // console.log(`the shows hosted are ${showsHostedArray}`)

        for (const eventObject of eventObjectArray) {
            if (showsHostedArray.includes(eventObject._id)) {
                // console.log(`it has an id of ${eventObject._id}`)
                const newCard = document.createElement('div');
                newCard.classList.add('show-card');
                newCard.setAttribute('id',eventObject._id)
        
                // const newImage = document.createElement('img');
                // newImage.classList.add('show-logo')
                // // console.log(eventObject.logo)
                // newImage.setAttribute('src',eventObject.logo)
                // newCard.appendChild(newImage)
        
                const newName = document.createElement('div');
                newName.classList.add('show-name')
                newName.innerText = eventObject.name
                newCard.appendChild(newName)
    
                const newType = document.createElement('div');
                newType.classList.add('show-type')
                newType.innerText = eventObject.type
                newCard.appendChild(newType)
    
                const newLocation = document.createElement('div');
                newLocation.classList.add('show-location')
                newLocation.innerText = eventObject.location
                newCard.appendChild(newLocation)
    
                const newTime = document.createElement('div');
                newTime.classList.add('show-location')
                newTime.innerText = eventObject.time
                newCard.appendChild(newTime)
    
                const newWeekday = document.createElement('div');
                newWeekday.classList.add('show-location')
                newWeekday.innerText = eventObject.weekday
                newCard.appendChild(newWeekday)
    
                // const newFrequency = document.createElement('div');
                // newFrequency.classList.add('show-frequency')
                // newFrequency.innerText = eventObject.frequency
                // newCard.appendChild(newFrequency)
    
                // const newDetails = document.createElement('div');
                // newDetails.classList.add('show-details')
                // newDetails.innerText = eventObject.details
                // newCard.appendChild(newDetails)
    
                // const newLink = document.createElement('div');
                // newLink.classList.add('show-link')
                // newLink.innerText = eventObject.link
                // newCard.appendChild(newLink)
    
                // for (const hostObjectID of eventObject.hosts) {
                //     const newHost = document.createElement('div');
                //     newHost.classList.add('show-host')
                //     const comicObject = comicObjectArray.find(obj => obj._id.toString() === hostObjectID);
                //     newHost.innerText = `Host: ${comicObject.name}`
                //     newHost.addEventListener('click', function(event) {
                //     // console.log(hostObjectID)
                //     linkToComic(hostObjectID)
                //     })
                //     newCard.appendChild(newHost)
                // }
        
                // const newVenue = document.createElement('div');
                // newVenue.classList.add('show-link')
                // const venueObject = venueObjectArray.find(obj => obj._id.toString() === eventObject.venue);
                // newVenue.innerText = `Venue: ${venueObject.name}`
                // newVenue.addEventListener('click', function(event) {
                //     // console.log(hostObjectID)
                //     linkToVenue(eventObject.venue)
                //     })
                // newCard.appendChild(newVenue)

                showsHostedElem.appendChild(newCard)
            }


        }


    } catch (error) {
        console.error('Error fetching data:', error);  
    }
}


function linkToComic(hostID) {
    // nameCopy = brandNameArray[brandIDArray.indexOf(idCopy)]
    localStorage.setItem('storedHostID', hostID);
    // localStorage.setItem('brandName', nameCopy);
    console.log(hostID)
    // console.log(nameCopy)
    window.open('indexComic.html', '_blank');
}

function linkToVenue(venueID) {
    // nameCopy = brandNameArray[brandIDArray.indexOf(idCopy)]
    localStorage.setItem('storedVenueID', venueID);
    // localStorage.setItem('brandName', nameCopy);
    console.log(venueID)
    // console.log(nameCopy)
    window.open('indexVenue.html', '_blank');
}
/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('DOMContentLoaded', async ()=> {
    refresh(hostName)
})

searchButton.addEventListener('click', () => {
    // findComedian()
    if (input.value) {
        refresh(input.value)
    }
})