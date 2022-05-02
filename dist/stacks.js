"use strict";
class stack {
    constructor() {
        this.data = [];
    }
    ;
    push(x) {
        this.data.push(x);
    }
    ;
    pop() {
        return this.data.pop();
    }
    ;
    isempty() {
        return this.data.length === 0;
    }
}
;
//# sourceMappingURL=stacks.js.map