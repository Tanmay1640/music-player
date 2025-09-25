console.log('Lets write java script')
let currentSong = new Audio();
let songs;
let currFolder;
let currentSongIndex = 0;

currentSong.addEventListener("ended", function () {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex += 1;
        playMusic(songs[currentSongIndex]);
    }

    else {
        currentSongIndex = 0;
        playMusic(songs[currentSongIndex]);
    }
});

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let playlists = {
        bollywood: [

            "Kun Faaya Kun.mp3",
            "Raanjhanaa.mp3",
            "Main Rang Sharbaton Ka.mp3",
            "Mitwa.mp3",
            "O Rangrez.mp3",
            "Bulleya.mp3",
            "Aashiq Tera.mp3",
            "Agar Tum Saath Ho.mp3",
        
            "Kabira.mp3",
    
            "Mera Yaar.mp3",
        
            "Rang Jo Lagyo.mp3",
            "Soch Na Sake.mp3",
            "Tujhe Kitna Chahne Lage.mp3",
            "Tum Se Hi.mp3",
            "Ve Kamleya.mp3",
            "Charka.mp3",
        ],
        ncs: [
            "songs\ncs\Royalty.mp3",
            "NEFFEX - Cold.mp3",
        
        ],
        party: [
            "Dance Ka Bhoot.mp3",
        ],
        travel: [
            "Ilahi.mp3",
            "Sooraj Dooba Hain.mp3",
        ],
        phonk: [
            "Odnogo.mp3",
            "Fragment Ultraphonk.mp3",
            "Matushka.mp3",
        ],
        Alanwalker: [
            "songs\Alanwalker\Alone pt-II.mp3",
            "On My Way.mp3",
        ],
        english: [
            "Unstoppable.mp3",
            "Hall of fame.mp3",
        ],
         divine: [
            "Namo Namo.mp3",
            "Ghalin Lotangan Vandin Charan.mp3",
        ]
    };
    songs = playlists[folder] || [];
    songs = songs.map(song => `${folder}/${song}`);



    //show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${song.split('/').pop().replace('.mp3', '')}</div>
                                
                            </div>
                            <div class="Playnow">
                                <span> Play Now</span>
                                 <img class="invert" src="img/play.svg" alt="">
                            </div>  </li>`;
    }

    // Attach an event listener to each song
    Array.from(document.querySelectorAll(".songList li")).forEach((element, idx) => {
        element.addEventListener("click", () => {
            currentSongIndex = idx; // <-- Make sure this line is here!
            playMusic(songs[currentSongIndex]);
        });
    });

    return songs;

}
const playMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track;
    if (!pause) {
        console.log("Playing:", track);
        currentSong.play()
    }
    play.src = "img/pause.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(track.split('/').pop().replace('.mp3', ''));
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}

async function main() {


    //get list of all the songs
    await getSongs("english")
    playMusic(songs[0], true)



    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })


    // Update these two only

    previous.addEventListener("click", () => {
        currentSong.pause();
        if (currentSongIndex > 0) {
            currentSongIndex -= 1;
            playMusic(songs[currentSongIndex]);
        }
    });

    next.addEventListener("click", () => {
        currentSong.pause();
        if (currentSongIndex < songs.length - 1) {
            currentSongIndex += 1;
            playMusic(songs[currentSongIndex]);
        }
    });

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })


    // Load the playlist when card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {

        e.addEventListener("click", async item => {

            songs = await getSongs(`${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])

        })
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })





}
main()


