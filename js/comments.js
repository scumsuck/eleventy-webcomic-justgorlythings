/**
 * Please refer to my guide for setup help if you're confused:
 * https://webcomics.fyi/templates/adding-comments.html
 * 
 * Bug reports are encouraged if you happen to run into any issues.
 * https://github.com/katedee/eleventy-webcomic/issues
 * click "new issue", you will need a github account to do so, but they are free, and you likely created one setting up this template ;)
 * 
 * Many thanks to JD Porterfield's Jekyll Comments Guide for being the base of most of this (https://jdvp.me/articles/Google-Forms-Jekyll-Comments)
 */

/**
 * REQUIRED VALUES
 * sheetsUrl and googleFields are mandatory to get this code working
 */
const sheetsUrl = `https://docs.google.com/spreadsheets/d/12SmuxFlJ7d9KTU7EWgIDlD7TZo1xePTXmCnYNlnlXA4`;

/**
 * Field IDs
 * you can easily extract the IDs using this tool here:
 * https://stefano.brilli.me/google-forms-html-exporter/
 */
const googleFields = {
    username: "entry.1995103453", // entry.USERNAME_ID
    comment: "entry.1895795716", // entry.COMMENT_ID
    postUrl: "entry.1368438253", // entry.POST_URL_ID
    reply: "entry.39824116" // entry.REPLY_ID
};

/**
 * OPTIONAL VALUES / SETTINGS
 * I've set defaults for these settings, so you don't need to modify them but can if you want.
 */
// the author badge that shows if it's one of your verified comments
const authorBadgeText = "• ✅ (author)";

// If replies to comments are open/visible by default (false) or collapsed (true).
// I've defaulted this to false because people hate clicking, so we're showing comments by default.
const collapsedReplies = false;

/**  BATCH COMMENTS OPTIONS
 * These are settings for wether or not we want to "batch" comments (true), or just load them all at once (false). I've defaulted it to false, because I find people don't like clicking a lot of buttons, and chances are we're not dealing with hundreds of comments.
*/
// set to true if you want to batch comments, false if not.
const batchComments = false;
// how many comments we show to start
let commentsToStart = 5;
// IF batching comments, when you click to load more, how many more comments do we show (not counting replies)
const commentsToLoad = 5;

/**
 * Lasciate ogne speranza, voi ch'intrate
 * Abandon all hope, ye who enter here
 * 
 * Just kidding! Mostly, just don't tamper with things past this point unless you're familiar with javascript/know what you're doing.
 */

const svgReplyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 98.86" style="enable-background:new 0 0 122.88 98.86" xml:space="preserve">
    <path d="m0 49.43 48.93 49.43V74.23c30.94-6.41 55.39.66 73.95 24.19-3.22-48.4-36.29-71.76-73.95-73.31V0L0 49.43z" style="fill-rule:evenodd;clip-rule:evenodd"/>
</svg>`;

// Get the current page URL
const thisPageUrl = document.currentScript.getAttribute('page-url');

/** Use SQL in the gviz URL to load the correct csv.
	In this implementation, columns are mapped to the following:
		A - timestamp, the time the comment was left
		B - name, the text left in the comment name field
		C - comment, the text left in the comment field
		D - page url, the page the comment was left on
        E - reply, the ID of the comment this is a reply to
		F - isAuthor, boolean indicating if the comment was left by the actual author
*/

const sqlStatement = encodeURIComponent(`SELECT A, B, C, E, F WHERE D = '${thisPageUrl}'`);

// Construct the URL for fetching the data
const csvUrl = `${ sheetsUrl }/gviz/tq?tqx=out:csv&sheet=comments&tq=${sqlStatement}&headers=1`;

let mainComments = [];
let replyComments = [];

const loadMoreCommentsButton = document.getElementById("loadMoreComments");
// Get the container element for the comments
const commentsContainer = document.getElementById('comments');
// Extra spot for "loading more..." text, and then total comments
const commentsInfoContainer = document.getElementById('commentsInfo');

function loadComments(isInitialLoad) {
    // Fetch the data from the Google Sheets URL
    fetch(csvUrl)
    .then(response => response.text()) // Get the response text (data)
    .then(csvText => {
        const rows = csvToJson(csvText);

        // Check for empty comments before displaying to page
        if (rows.length < 1) { 
            commentsInfoContainer.innerText = "No comments";
            loadMoreCommentsButton.disabled = true;
            loadMoreCommentsButton.style.display = "none";
            return;
        }

        mainComments = [];
        replyComments = [];

        for (let index = rows.length - 1; index >= 0; index--) {
            const row = rows[index];
            (!row['reply']) ? mainComments.push(row) : replyComments.push(row);
        }

        /**
          I'm sure there's a more elegant and optimal way of handling this,
          but I am neither of those things. If you are, feel free to help!
          https://github.com/katedee/eleventy-webcomic
         */
        if (!batchComments || commentsToStart > mainComments.length) {
            commentsToStart = mainComments.length;
            mainComments.reverse();
            replyComments.reverse();
        } 
       
        // main comments
        for (let index = 0; index < commentsToStart; index++) {
            const comment = mainComments[index];
            createComment(comment, isInitialLoad);
        }
        mainComments.splice(0, commentsToStart);

        //check if main comments is empty, and disable the load more button if so
        if (!mainComments.length) {
            loadMoreCommentsButton.disabled = true;
            loadMoreCommentsButton.style.display = "none";
        } 

        // reply comments
        for (let index = 0; index < replyComments.length; index++) {
            const replyComment = replyComments[index];
            createComment(replyComment);
        }

        commentsInfoContainer.innerText = `${rows.length} comments`;
        replyButtons();
        clearForm();
    })
    .catch(error => console.error('Error fetching data:', error)); // Handle any errors
}

function postComment() {
    disableButtonWithLoader("comment-submit");
    const username = getValue("commentName");
    const comment = getValue("comment-comment");
    const replyTo = getValue("comment-replies");

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSd5KkEOZVH8v-wsexGvZmvl80DhVU8qUjWkNaUza9KTI38pEg/formResponse", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodeFormData({
            [googleFields.username] : username?.toString(),
		  	[googleFields.comment] : comment?.toString().replace(/,/g, '[comma]'),
            [googleFields.postUrl] : thisPageUrl?.toString(),
            [googleFields.reply] : replyTo?.toString()
        })
    }).then(response => {
        clearForm();
        loadComments();
        if (replyTo) smoothScrollTo(replyTo);
        enablePostCommentButton();
    })
    .catch(error => {console.log(error);});
    return false;
};


function getValue(elementId) {
    return document.getElementById(elementId).value;
};

const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
};

function createComment(comment, isInitialLoad) {
    if (!comment) return;

    const name = comment['name'];
    const date = formatDate(comment['timestamp']);
    const text = comment['comment'].replace(/\[comma\]/g, ',');
    const commentDiv = document.createElement('div');
   
    commentDiv.setAttribute('class', 'comment-div');
    const commentId = name + '|--|' + comment['timestamp'];
    commentDiv.id = commentId;


    commentDiv.innerHTML = `
        <div class="comment-content-wrap">
            <div class="comment-header">
                <span class="comment-name">${name} ${comment['isauthor'] ? `<span class="author-badge">${authorBadgeText}</span>` : ``}</span>
                ${(comment['reply']) ? `<span class="replying-to" onclick="highlightComment('${comment['reply']}')"> @ ${comment['reply'].split('|--|')[0]}</span>` : ``}
                <span class="comment-date">${date}</span>
            </div>
            <p>${text}</p>
            <div class="comment-footer">
                <span class="comment-reply-button" onclick="replyToComment('${commentId}')">${svgReplyIcon} Reply</span>
                ${(!comment['reply']) ? `
                    <span class="toggle-replies" style="display: none;" onclick="expandReplies(this, this.parentElement.parentElement.parentElement.id)"></span>
                ` : ``}
            </div>
        </div>
        <div id="${commentId}-replies" style="display:${(collapsedReplies ? 'none' : 'block')};"></div>
    `;

    if(!document.getElementById(commentId)){
        if (!comment['reply']) {
            (batchComments && isInitialLoad ) ? commentsContainer.appendChild(commentDiv) : commentsContainer.prepend(commentDiv);
        } else {
            const parentId = `${comment['reply']}-replies`;
            const parentDiv = document.getElementById(parentId);
            if (parentDiv) parentDiv.appendChild(commentDiv);
        }
    }

}

function replyToComment(commentId) {
    const replyToName = commentId.split('|--|')[0];
    document.getElementById("comment-reply-info").innerHTML = `<small class="comment-reply-clear" onclick="clearCommentReplyItem()">❌&nbsp;&nbsp;&nbsp;</small><small>Replying to ${replyToName}</small>`;
    setValue('comment-replies', commentId);
    smoothScrollTo('commentsForm');
};

function clearCommentReplyItem() {
    document.getElementById("comment-reply-info").innerHTML = ``;
    setValue('comment-replies', '');
};

function setValue(elementId, value) {
    return document.getElementById(elementId).value = value;
};

function disableButtonWithLoader(elementId) {
    const buttonToDisable = document.getElementById(elementId);
    if (buttonToDisable == null) {
        return;
    }
    buttonToDisable.disabled = true;
    setText(elementId, "...submitting comment");
}

function enablePostCommentButton() {
    const postCommentButton = document.getElementById("comment-submit");
    postCommentButton.disabled = false;
    setText("comment-submit", "Post Comment");
};

function setText(elementId, textContent) {
    document.getElementById(elementId).textContent = textContent;
};

function loadMoreComments() {
    // main comments
    for (let index = 0; index < commentsToLoad; index++) {
        let comment = mainComments[0];
        createComment(comment, true);
        //remove it to shorten future loops and to check if we need to disable load more for batching comments.
        mainComments.splice(0, 1);
    }

    //replies
    for (let index = replyComments.length - 1; index >= 0; index--) {
        let comment = replyComments[index];
        const parentId = `${comment['reply']}-replies`;
        const parentDiv = document.getElementById(parentId);
        if (parentDiv) {
            createComment(comment);
            //remove it to shorten future checks
            replyComments.splice(index, 1);
        }
    }

    replyButtons();
    //check if main comments is empty, and disable the load more button if so
    if (!mainComments.length) {
        loadMoreCommentsButton.disabled = true;
        loadMoreCommentsButton.style.display = "none";
    } 
}

// Handle expanding replies 
function expandReplies(button, id) {
    const targetDiv = document.getElementById(`${id}-replies`);
    const numOfReplies = button.innerText.split('(')[1].slice(0,1);

    if (targetDiv.style.display == 'none') {
        targetDiv.style.display = 'block'
        button.innerText = `Hide Replies (${numOfReplies})`;
    } else {
        targetDiv.style.display = 'none'
        button.innerText = `Show Replies (${numOfReplies})`;
    }
}

function smoothScrollTo(elementId) {
    document.getElementById(elementId).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
};

function formatDate(stringDate) {
    const date = new Date(stringDate);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric'};
    return `${date.toLocaleDateString("en-us", dateOptions)}`;
};

function replyButtons () {
    const replyButtons = document.getElementsByClassName("toggle-replies");
 
    for (let index = 0; index < replyButtons.length; index++) {
        const parentId = replyButtons[index].parentElement.parentElement.parentElement.id;
        
        const parent = document.getElementById(parentId);

        const numReplies = parent.querySelectorAll('.comment-div').length;

        if (numReplies) replyButtons[index].style.display = "inline-block";
        replyButtons[index].innerText = `${collapsedReplies ? 'Show Replies' : 'Hide Replies'} (${numReplies})`;
    }
}

function clearForm () {
    setValue("commentName", ''); 
    setValue("comment-comment", '');
    setValue("comment-replies", '');
}

// eternal thanks to matthew-e-brown for this one https://stackoverflow.com/a/59219146
function csvToJson(text, headers, quoteChar = '"', delimiter = ',') {
    const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');
     const match = line => [...line.matchAll(regex)]
      .map(m => m[2])  // we only want the second capture group
      .slice(0, -1);   // cut off blank match at the end
     const lines = text.split('\n');
    const heads = headers ?? match(lines.shift());
     return lines.map(line => {
      return match(line).reduce((acc, cur, i) => {
        // Attempt to parse as a number; replace blank matches with `null`
        const val = cur.length <= 0 ? null : Number(cur) || cur;
        const key = heads[i].replace(/\s/g, '').toLowerCase() ?? `extra_${i}`;
        return { ...acc, [key]: val };
      }, {});
    });
  }

function highlightComment (elementId) {
    const comment = document.getElementById(elementId).children[0];
    smoothScrollTo(elementId);
    fadeColor(comment);
}

let currentFadeItem = null;

function fadeColor(element) {
    if (currentFadeItem != null) {
        clearInterval(currentFadeItem);
        currentFadeItem = null;
    }

    const duration = 1000;
    const step = 25;
    let opacity = 1;
    const timer = setInterval(function() {
      opacity -= (1 / (duration / step));
      if (opacity <= 0) {
        clearInterval(timer);
        currentFadeItem = null;
        opacity = 0;
      }
      element.style.background = "rgba(3, 155, 229, "+ opacity +")";
    }, step);
    currentFadeItem = timer;
};

loadComments(true);