export function headerTemplate(state) {
  return `
    <input class="input" id="input-header" type="text"
     value="${state.headerName}">

    <div>
        <a href="#" class="button" data-button="exit">
            <span class="material-icons" data-button="exit">exit_to_app</span>
        </a>
    
        <div class="button" data-button="remove">
            <span class="material-icons" data-button="remove">delete</span>
        </div>
    </div>
    `;
}
