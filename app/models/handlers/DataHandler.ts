import { AvailableDroppable } from "../helpers/get helpers";

export class DataHandler{
    template: string;
    constructor(){

    }

    update(parents: AvailableDroppable){
        const _this = this;
        parents.forEach(parent => {
            if(!parent.element){
                return;
            }
            const referanceID = parent.element.referanceID;
            let result = "";
            parent.element.childs.forEach(child => {
                const value = child.val.toString();
                const name = child.name
                result += name + "_" + value + "|";
            })
            _this.save(referanceID, result)
        })
    }

    save(inputID:string, value:string){
        const input = document.getElementById(inputID) as HTMLInputElement;
        input.value = value;
    }
}