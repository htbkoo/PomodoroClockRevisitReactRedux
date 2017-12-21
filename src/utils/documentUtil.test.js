// @flow
import {sinon, sinonTest} from "./sinonWithTest";
import chai from "chai";

import documentUtil from "./documentUtil";

describe("documentUtil", function () {
    it("should get element if the type is correct", sinonTest(function () {
        const id = "anId", mockElement = sinon.createStubInstance(Element);
        const document = createMockDocument.call(this, id, mockElement);

        let element = documentUtil.getElementOrThrow({id, document});

        chai.expect(element).to.equal(mockElement, "The experted element is not returned");
    }));

    function createMockDocument(id, mockElement) {
        const document = sinon.createStubInstance(Document);
        document.getElementById = this.stub().withArgs(id).returns(mockElement);
        return document;
    }
});