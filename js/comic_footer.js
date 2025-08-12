//the footer of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeFooter"
document.querySelector(".writeFooter").innerHTML = `
    <footer>
    <div class="footercontent">
   <div class="footerlinks">
   <ul><strong style="text-decoration:underline;">Links</strong>
<li> 📡 <a href="https://gorly.scumsuck.com/rss.xml" target="_blank" rel="noopener noreferrer" class="rss">RSS</a>

<li>📄 <a href="https://store.scumsuck.com/products/Just-Gorly-Thingz-Digtal-PDF-zine-p551750089">Digital PDF</a> 
<li>📚 <a href="https://store.scumsuck.com/products/Just-Gorly-Thingz-a-lesbian-fujoshi-comic-zine-p551752573">Printed Zine</a>
</ul>

        </div>

<div class="social-media">

    <a href="http://twitter.com/skumsuck" target="_blank" rel="noopener noreferrer"><img src="https://scumsuck.com/images/twit.png" width="25" alt="twitter link"></a>
    <a href="http://instagram.com/skumsuck" target="_blank" rel="noopener noreferrer"><img src="https://scumsuck.com/images/insta.png" width="25" alt="instagram link"></a>
    <a href="http://tempural.tumblr.com" target="_blank" rel="noopener noreferrer" ><img src="https://scumsuck.com/images/tumblrlogo.png" width="25" alt="tumblr link"></a>
    <a href="https://blorbo.social/@scumsuck" target="_blank" rel="noopener noreferrer" ><img src="https://scumsuck.com/images/mastodon.svg" width="25" alt="tumblr link"></a>

    <div class="rarebit">
    
        <small>Powered by...</small><br>
        <a href="https://rarebit.neocities.org"><img src="img/rarebitlogo_small.png" height = "31" alt="rarebit link"/></a>
</div>
</div>





        </div>
<div class="blurb">
    <p>Just Gorly Thingz, a lesbian fujoshi web comic, is written and drawn by <a href="http://scumsuck.com" target="_blank" rel="noopener noreferrer">SCUMSUCK</a> &copy; 2022-2025 <br> <i>contact@scumsuck.com</i>

</div>

    </footer>
`;
