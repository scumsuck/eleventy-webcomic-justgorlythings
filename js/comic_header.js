//the header of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeHeader"
document.querySelector(".writeHeader").innerHTML = `
    <header align="center">
        
</p>
  <div class="banner"><img src="/img/justgirlythings.png" alt="Just Girly Things "></div>


        <div id="nav">
            <a href="index.html"><img src="img/comicnav/index.png" alt="Home, or index page"></a>

            <a href="archive.html"><img src="img/comicnav/archive.png" alt="Archive"></a>

            <a href="characters.html"><img src="img/comicnav/characters.png" alt="Characters"></a>

            <a href="about.html"><img src="img/comicnav/about.png" alt="About"></a>

            <a href="guestbook.html"><img src="img/comicnav/guestbook.png" alt="Guestbook"></a>
            
        </div>
        <div align="center"><div class="writePageNote">🔞 <strong>18+ SEX WARNING</strong> 🔞 <br>This comic is for immature adults over the age of 18.
  </div>
    </header>
`;
