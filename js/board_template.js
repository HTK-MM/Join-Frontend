/**
 * Renders an empty board HTML element with a message indicating the specified status.
 * @param {string} status - The status to display in the message.
 * @return {string} The HTML code for the empty board element.
 */
function renderEmptyBoard(status) {
  return /*html*/ `
      <div class="empty-board">
        <span>No tasks ${status}</span>
      </div>
    `;
}

/**
 * Renders a small card HTML element with the given task information.
 * @param {Object} task - The task object containing information about the task.
 * @return {string} The HTML code for the small card element.
 */
function renderSmallCardHTML(task) {
  return /*html*/ `
      <div draggable="true" ondragstart="startDragging(${task.id})" id="${task.id}" class="smallcard" onclick="showBigCard(${task.id}); openBigCardAnimation()">
        <div class="category">
          <h3 style='background-color:${getBackgroundCategory(task)}'>${task.category}</h3>
          <div class="mobileBoard" id="mobileBoard" onclick="openMobileOptions(${task.id}, '${task.status}', event)">
            <img class="imgMobile" src="../assets/icons/more_vert_icon.svg"/></div>
          <div class="amobile_boardOptions" id="amobile_boardOptions${task.id}" style="display:none">           
              <p class="mobileClose"><b>Move To...</b><button class="btnClose" onclick="closeMobilOptions(event,${task.id})"><b>X</b></button></p>
              <a id="moveTo_${task.id}_toDo" onclick="mobilemoveTo('toDo',${task.id},event)">To&nbsp;Do</a>
              <a id="moveTo_${task.id}_inProgress" onclick="mobilemoveTo('inProgress',${task.id},event)">In&nbsp;Progress</a>
              <a id="moveTo_${task.id}_awaitFeedback" onclick="mobilemoveTo('awaitFeedback',${task.id},event)">Await&nbsp;Feedback</a>
              <a id="moveTo_${task.id}_done" onclick="mobilemoveTo('done',${task.id},event)">Done</a>
          </div>                        
        </div>
        <div class="title">
          <h4>${task.title}</h4>
        </div>
        <div class="description">
          <p>${task.description}</p>
        </div>
        <div class="subtask-progress" role="subtask-progressbar" aria-label="Example with label">
        <progress id="subtaskProgressBar${task.id}" max="100" ></progress>
        <p class="subtask-progress-count" id="subtasksCount${task.id}"></p>
        </div>
        <div class="information">
          <div class="small-usersemblem" id="smallUsersEmblem${task.id}"></div>
          <div class="priority" id="priority${task.id}">
              <img src="../assets/icons/${task.priority}.svg" alt="">
          </div>
        </div>
      </div> 
    `;
}

/**
 * Renders a grey emblem HTML element with the given extra count.
 * @param {number} extraCount - The count to display in the emblem.
 * @return {string} The HTML string representing the grey emblem.
 */
function renderGreyEmblem(extraCount) {
  return `<div class="grey-emblem">+${extraCount}</div>`;
}

/**
 * Renders a grey emblem with the remaining count.
 * @param {number} remainingCount - the count of remaining items
 * @return {string} the HTML for the grey emblem
 */
function renderGreyEmblem(remainingCount) {
  return `<div class="grey-emblem">+${remainingCount}</div>`;
}

/**
 * Renders a small user emblem HTML element with the given user object.
 * @param {Object} user - The user object containing the user's color and emblem.
 * @return {string} The HTML string representing the small user emblem.
 */
function renderSmallUsersEmblem(user) {
  return /*html*/ `
        <div class="small-useremblem" style="background-color: ${user.color}" id="${user.user.id}">
        ${user.emblem}
      </div>  `;
}

/**
 * Renders the HTML for a big card based on the provided card ID.
 * @param {string} cardId - The ID of the card to render.
 * @return {string} The HTML string representing the big card.
 */
function renderBigCardHTML(cardId) {
  let task = tasks.find((t) => t.id == cardId);
  return /*html*/ `
      <div id="bigCard${task.id}" class="bigcard"  onclick="dontClose()">
        <div class="big-header">
          <div><span class="big-task-category" style='background-color:${getBackgroundCategory(task)}'>${task.category}</span></div>
          <div><img class="close" onclick="closeBigCard();" src="../assets/icons/close_icon.svg" alt="schließen"/></div>
        </div>
        <div class="big-title">
          <h1>${task.title}</h1>
        </div>
        <div><p>${task.description}</p></div>
        <div class="big-date">
          <div><span>Due date:</span></div>
          <div><span>${task.date}</span></div>
        </div>
        <div class="big-priority">
          <div><span>Priority:</span></div>
          <div class="big-priority">
            <span>${task.priority}</span>
            <img src="../assets/icons/${task.priority}.svg">
          </div>
        </div>
        <div class="big-users">
          <div>
            <span>Assigned to:</span>
          </div>
          <div id="bigUsersEmblem" class="big-user"></div>
        </div>
        <div  class="big-subtasks" >
          <span>Subtasks:</span>
          <div id="bigSubtasks" class="bigSubtasks">
          </div>
        </div>
        <div class="bigcard-edit">
          <div id="bigDelete" class="big-delete" onclick="deleteTaskOfBoard(${task.id})">
            <img  src="../assets/icons/delete_contact_icon.svg" alt="">
            <span>Delete</span>
          </div>
          <div class="big-seperator"></div>
          <div id="bigEdit" class="big-edit" onclick="editTaskOfBoard(${task.id})">
            <img src="../assets/icons/edit-contacts_icon.svg" alt="">
            <span>Edit</span>
          </div>
        </div>
      </div>
    `;
}

/**
 * Renders the user's emblem with styling and user information.
 * @param {Object} user - The user object containing user information.
 * @return {string} The HTML content displaying the user's emblem and name.
 */
function renderBigEmblemUsers(user) {
  return /*html*/ `
    <div class="big-single-user">
        <div class="big-useremblem" style="background-color: ${user.color}" id="${user.user.id}">
          ${user.emblem}
        </div>  
        <span>${user.user.first_name} ${user.user.last_name}</span>
      </div>`;
}

/**
 * Renders the HTML for a big subtask.
 * @param {string} cardId - The ID of the card.
 * @param {Object} subtask - The subtask object.
 * @param {number} j - The index of the subtask.
 * @return {string} The HTML for the big subtask.
 */
function renderBigSubtasksHTML(cardId, subtask, j) {
  return /*html*/ `
        <label for="checkbox${j}">
            <li class="big-subtasklist">
                <input class="big-card-checkbox" onclick="checkedSubtask(${cardId}, ${j})" type="checkbox"  ${subtask.checked ? 'checked' : ''} id="checkbox${j}" data-userid="${j}">
                <div class="contactname">${subtask.subtaskText}</div>
            </li>
        </label>`;
}
