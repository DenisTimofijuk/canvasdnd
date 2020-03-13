import { QID } from "../setup/layout";

const cols = 7;
const rows = 4;

export function createInputs() {
    const table = document.createElement('table');

    for (let r = 1; r <= rows; r++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let c = 1; c <= cols; c++) {
            const col = document.createElement('td');
            const input = document.createElement('input');
            input.id = QID + "v" + c + "_" + r;
            input.type = "text";
            input.style.width = "100px";
            col.appendChild(input);
            row.appendChild(col);
        }
    }

    document.body.appendChild(table);
}