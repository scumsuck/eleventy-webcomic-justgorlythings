// wether we want to batch comments, or just load them all at once (false)
// I set it to a default of false because truly if you're getting that many comments,
// you probably want a paid service and not this haha
// we techniclly pull all comments for this page at once so you're not saving time on the fetch request
// but maybe a tiny bit in terms of displaying them
const batchComments = true;
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

// Encode the SQL statement to be used in the URL
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
        // Split the data into rows and then into individual cells
        const rows = csvText.trim().split('\n').map(row => row.split(','));

        // Check for empty comments before displaying to page
        if (rows.length < 2) { 
            commentsInfoContainer.innerText = "No comments";
            loadMoreCommentsButton.disabled = true;
            loadMoreCommentsButton.style.display = "none";
            return;
        }

        mainComments = [];
        replyComments = [];

        console.log(rows);
        for (let index = rows.length - 1; index >= 0; index--) {
            const row = rows[index];
            (row[3] == '""') ? mainComments.push(row) : replyComments.push(row);
        }

        console.log(mainComments, replyComments);

        /**
         * I'm sure there's a more elegant and optimal way of handling this,
         * but I am neither of those things. If you are, feel free to help!
         * TO DO: link to the repo.
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

        replyButtons();

        commentsInfoContainer.innerText = `${rows.length} total comments`;

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
        // CLEAR THE FORM
        clearForm();
        //RELOAD COMMENTS
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
    const commentDiv = document.createElement('div');
    commentDiv.setAttribute('class', 'site-comment');
    const name = comment[1].slice(1, -1);
    const date = formatDate(comment[0].slice(1, -1));
    const text = comment[2].slice(1, -1).replace(/\[comma\]/g, ',');
    const commentId = name + '|--|' + comment[0].slice(1,-1);
    commentDiv.id = commentId;

    commentDiv.innerHTML = `
            <strong>${name}</strong> <em>${date}</em><p>${text}</p>
            <span class="comment-reply-button" onclick="replyToComment('${commentId}')">Reply</span>
            ${(comment[3] == '""') ? `
                <span class="toggle-replies" id="showRepliesButton" style="display: none;" onclick="expandReplies(this, this.parentElement.id)"></span>
            ` : ``}
            <div id="${commentId}-replies" style="display:${(collapsedReplies ? 'none' : 'block')};"></div>
    `;

    if(!document.getElementById(commentId)){
        if (comment[3] == '""') {
            (batchComments && isInitialLoad ) ? commentsContainer.appendChild(commentDiv) : commentsContainer.prepend(commentDiv);
        } else {
            const parentId = `${comment[3].slice(1, -1)}-replies`;
            const parentDiv = document.getElementById(parentId);
            if (parentDiv) parentDiv.appendChild(commentDiv);
        }
    }

}

function replyToComment(commentId) {
    const replyToName = commentId.split('|--|')[0];
    document.getElementById("comment-reply-info").innerHTML = `<small class="comment-reply-clear" onclick="clearCommentReplyItem()">Ⓧ&nbsp;&nbsp;&nbsp;</small><small onClick="jumpToComment('${commentId}')">Replying to ${replyToName}</small>`;
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
    var buttonToDisable = document.getElementById(elementId);
    if (buttonToDisable == null) {
        return;
    }
    buttonToDisable.disabled = true;
    setText(elementId, "..submitting comment");
}

function enablePostCommentButton() {
    var postCommentButton = document.getElementById("comment-submit");
    postCommentButton.disabled = false;
    setText("comment-submit", "Post");
};

function setText(elementId, textContent) {
    document.getElementById(elementId).textContent = textContent;
};

function loadMoreComments() {
    // main comments
    for (let index = 0; index < commentsToLoad; index++) {
        let comment = mainComments[0];
        createComment(comment, true);
        //remove it to shorten future loops
        mainComments.splice(0, 1);
    }

    //replies
    for (let index = replyComments.length - 1; index >= 0; index--) {
        let comment = replyComments[index];
        const parentId = `${comment[3].slice(1, -1)}-replies`;
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

loadComments(true);