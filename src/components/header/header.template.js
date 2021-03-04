export function headerTemplate(store) {
  return `
    <input class="input" id="input-header" type="text"
     value="${store.headerName}">

    <div>
        <div class="button">
            <span class="material-icons">exit_to_app</span>
        </div>

        <div class="button">
            <span class="material-icons">delete</span>
        </div>
    </div>
    `;
}
