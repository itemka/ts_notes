"use strict";
var NamespaceForm;
(function (NamespaceForm) {
    class MyForm {
        constructor(email) {
            this.email = email;
            this.type = 'inline';
            this.state = 'active';
        }
        getInfo() {
            return {
                type: this.type,
                state: this.state
            };
        }
    }
    NamespaceForm.myForm = new MyForm('tesst@tesst.com');
})(NamespaceForm || (NamespaceForm = {}));
console.log(NamespaceForm.myForm);
//# sourceMappingURL=namespaces.js.map