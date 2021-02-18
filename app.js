// load song
const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    toggleSpinner()
    try {
        const res = await fetch(url)
        const data = await res.json()
        displaySongs(data.data)
    }
    catch (err) {
        displayError('Something went wrong there!! Please try again')
    }
}

// display song
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = ''
    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${song.title}</h3>
                            <p class="author lead">Album by <span>${song.artist.name}</span></p>
                            <audio controls>
                                <source src="${song.preview}" type="audio/mpeg">
                            </audio>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="getLyrics('${song.artist.name}', '${song.title}' )" class="btn btn-success">Get Lyrics</button>
                        </div>`
        songContainer.appendChild(songDiv)
        toggleSpinner()
    })

}

// display lyrics
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics;
    toggleSpinner()
}
// load lyrics
const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    toggleSpinner()
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics)
    }
    catch (err) {
        displayError('Lyrics not founded!! Please try again later')
    }
}


// error function
const displayError = error => {
    const errorMsg = document.getElementById('error-msg')
    errorMsg.innerText = error

}


// loading spinner
const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner')
    const song = document.getElementById('song-container')
    spinner.classList.toggle('d-none')
    song.classList.toggle('d-none')


}

document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        document.getElementById('search-btn').click()
    }
})