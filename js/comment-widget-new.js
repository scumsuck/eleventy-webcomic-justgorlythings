// wether we want to batch comments, or just load them all at once (false)
// I set it to a default of false because truly if you're getting that many comments,
// you probably want a paid service and not this haha
// we techniclly pull all comments for this page at once so you're not saving time on the fetch request
// but maybe a tiny bit in terms of displaying them
const batchComments = false;
// how many comments we show to start
let commentsToStart = 5;
// IF batching comments, when you click to load more, how many comments do we pull (not counting replies)
const commentsToLoad = 5;
// I've defaulted this to false because people hate clicking,
// but in case you really detest expanded replies you change it true to have replies collapsed by default
const collapsedReplies = false;




// Get the current page URL
// TO DO : update this to pull from pathname if page url is not set for use outside of my template
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
const sheetsUrl = `https://docs.google.com/spreadsheets/d/12SmuxFlJ7d9KTU7EWgIDlD7TZo1xePTXmCnYNlnlXA4`;
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
          TO DO: link to the repo.
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
    const username = getValue("comment-name");
    const comment = getValue("comment-comment");
    const replyTo = getValue("comment-replies");

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSd5KkEOZVH8v-wsexGvZmvl80DhVU8qUjWkNaUza9KTI38pEg/formResponse", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodeFormData({
            "entry.1995103453" : username?.toString(),
		  	"entry.1895795716" : comment?.toString().replace(/,/g, '[comma]'),
            "entry.1368438253" : thisPageUrl?.toString(),
            "entry.39824116" : replyTo?.toString()
        })
    }).then(response => {
        if (replyTo) smoothScrollTo(replyTo);
        clearForm();
        loadComments();
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
   
    commentDiv.setAttribute('class', 'site-comment');
    const commentId = name + '|--|' + comment['timestamp'];
    commentDiv.id = commentId;


    commentDiv.innerHTML = `
            <strong>${name} ${comment['isauthor'] ? `<span class="author-bage">🍁 (author)</span>` : ``}</strong> <em>${date}</em>
            ${(comment['reply']) ? `<span class="replying-to">replying to ${comment['reply'].split('|--|')[0]}</span>` : ``}
            <p>${text}</p>
            <span class="comment-reply-button" onclick="replyToComment('${commentId}')">Reply</span>
            ${(!comment['reply']) ? `
                <span class="toggle-replies" id="showRepliesButton" style="display: none;" onclick="expandReplies(this, this.parentElement.id)"></span>
            ` : ``}
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
    setText(elementId, "..submitting comment");
}

function enablePostCommentButton() {
    const postCommentButton = document.getElementById("comment-submit");
    postCommentButton.disabled = false;
    //TO DO: extract this out
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
            //remove it to shorten future loops
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
        const parentId = replyButtons[index].parentElement.id;
        
        const parent = document.getElementById(parentId);

        const numReplies = parent.querySelectorAll('.site-comment').length;

        if (numReplies) replyButtons[index].style.display = "inline-block";
        replyButtons[index].innerText = `${collapsedReplies ? 'Show Replies' : 'Hide Replies'} (${numReplies})`;
    }
}

function clearForm () {
    setValue("comment-name", ''); 
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

//TO DO: use this for after posting a comment and it's a reply to another one
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

// basic html escape for the links portion
// not the most robust, so check your comments periodically
const escapeHTML = str =>
    str.replace(
        /[&<>'"]/g,
        tag =>
        ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );

loadComments(true);