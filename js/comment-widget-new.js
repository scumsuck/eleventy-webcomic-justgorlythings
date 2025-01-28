const batchComments = false;
const commentsToStart = 3;
let commentsIndex = commentsToStart;
const loadMoreCommentsButton = document.getElementById("loadMoreComments");

// Function to format the date and time from the data
function formatDate(stringDate) {
    // Split the string into date and time parts
    const dateTimeParts = stringDate.split(' ');
    const datePart = dateTimeParts[0]; // Date part like "7/12/2024"
    let timePart = dateTimeParts[1]; // Time part like "23:32:54"
    // Parse hours, minutes, and seconds from the time part
    const [hours, minutes, seconds] = timePart.split(':');
    // Convert hours to 12-hour format and determine AM/PM
    let ampm = 'AM';
    let formattedHours = parseInt(hours, 10);
    if (formattedHours >= 12) {
        ampm = 'PM';
        if (formattedHours > 12) {
            formattedHours -= 12;
        }
    }
    if (formattedHours === 0) {
        formattedHours = 12; // 12 AM case
    }
    // Format time in HH:mm:ss AM/PM format
    timePart = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    // Return the formatted date and time
    return `${datePart} at ${timePart}`;
}
// Get the current page URL
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
const csvUrl = `${ sheetsUrl }/gviz/tq?tqx=out:csv&sheet=comments&tq=${sqlStatement}&headers=0`;

let mainComments = [];
let replyComments = [];

// Get the container element for the comments
const commentsContainer = document.getElementById('comments');

function loadComments() {
    // Fetch the data from the Google Sheets URL
    fetch(csvUrl)
    .then(response => response.text()) // Get the response text (data)
    .then(csvText => {
        // Split the data into rows and then into individual cells
        const rows = csvText.trim().split('\n').map(row => row.split(','));
        mainComments = [];
        replyComments = [];

        for (let index = rows.length - 1; index >= 0; index--) {
            const row = rows[index];
            (row[3] == '""') ? mainComments.push(row) : replyComments.push(row);
        }

        // main comments
        // if (!batchComments)
        for (let index = 0; index < commentsIndex; index++) {
            const comment = mainComments[index];
            createComment(comment);
        }
        mainComments.splice(0, commentsToStart);

        // reply comments
        for (let index = 0; index < replyComments.length; index++) {
            const replyComment = replyComments[index];
            createComment(replyComment);
        }

        setValue("comment-name", ''); 
        setValue("comment-comment", '');
        setValue("comment-replies", '');
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
		  	"entry.1895795716" : comment?.toString(),
            "entry.1368438253" : thisPageUrl?.toString(),
            "entry.39824116" : replyTo?.toString()
        })
    }).then(response => {
        // CLEAR THE FORM
        setValue("comment-name", ''); 
        setValue("comment-comment", '');
        setValue("comment-replies", '');
        //RELOAD COMMENTS
        loadComments();
        enablePostCommentButton();
        console.log("success!");
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

function createComment(comment) {
    if (!comment) return;
    const commentDiv = document.createElement('div');
    commentDiv.setAttribute('class', 'site-comment');
    const name = comment[1].slice(1, -1);
    const date = formatDate(comment[0].slice(1, -1));
    const text = comment[2].slice(1, -1);
    const commentId = name + '|--|' + comment[0].slice(1,-1);
    commentDiv.id = commentId;
    // Set the inner HTML of the div element
    commentDiv.innerHTML = `
            <strong>${name}</strong> <em>${date}</em><p>${text}</p>
            <span class="comment-reply-button" onclick="replyToComment('${commentId}')">Reply</span>
            <div id="${commentId}-replies"></div>
    `;

    if(!document.getElementById(commentId)){
        if (comment[3] == '""') {
            commentsContainer.appendChild(commentDiv);
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
    document.getElementById('commentsForm').scrollIntoView();
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
    for (let index = 0; index < 2; index++) {
        let comment = mainComments[0];
        createComment(comment);
        //remove it to shorten future loops
        mainComments.splice(0, 1);
    }
    console.log(mainComments);
    
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

    //check if main comments is empty, and disable the load more button if so
    if (!mainComments.length) {
        loadMoreCommentsButton.disabled = true;
        loadMoreCommentsButton.style.display = "none";
    } 
}



// Handle expanding replies (should only be accessible with collapsed replies enabled)
// function expandReplies(button, id, numOfReplies) {
//     const targetDiv = document.getElementById(`${id}-replies`);
//     if (targetDiv.style.display == 'none') {
//         targetDiv.style.display = 'block'
//         button.innerText = `Hide Replies (${numOfReplies})`;
//     } else {
//         targetDiv.style.display = 'none'
//         button.innerText = s_expandRepliesText + ` (${numOfReplies})`;
//     }
// }


loadComments();