const cols = 7;
const rows = 4;

export function createInputs(QID:string) {
    const table = document.createElement('table');

    for (let r = 1; r <= rows; r++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let c = 1; c <= cols; c++) {
            const col = document.createElement('td');
            const input = document.createElement('input');
            input.id = QID + "v" + c + "_" + r;
            input.type = "text";
            
            //TESTING only:
            if(/v1/.test(input.id)){
                input.value = "hand_1200|hand_300|pen_125|pen_95|"
            }
            //TESTING only:
            if(/v3/.test(input.id)){
                input.value = "hand_1200|pen_125|pen_95|"
            }
            //TESTING only:
            if(/v5/.test(input.id)){
                input.value = "pen_125|pen_125|pen_95|hand_1200|hand_1200|hand_600|hand_300|pen_95|hand_300|pen_75|"
            }
            
            input.style.width = "100px";
            col.appendChild(input);
            row.appendChild(col);
        }
    }

    document.body.appendChild(table);
}