// @flow
import {sinon, sinonTest} from "./sinonWithTest";
import chai from "chai";

import documentUtil from "./documentUtil";

describe("documentUtil", function () {
    it("should get element if the type is correct", sinonTest(function () {
        const id = "anId", mockElement = sinon.createStubInstance(Element);
        const document = createMockDocument(id, mockElement);

        let element = documentUtil.getElementOrThrow({id, document});

        chai.expect(element).to.equal(mockElement, "The experted element is not returned");
    }));

    it("should throw TypeError if the element returned is not an Element", sinonTest(function () {
        const id = "anId", notAnElement = "";
        const document = sinon.createStubInstance(Document);
        document.getElementById = sinon.stub().withArgs(id).returns(notAnElement);

        let actionThatShouldThrow = documentUtil.getElementOrThrow.bind(documentUtil, {id, document});

        chai.expect(actionThatShouldThrow).to.throw(TypeError);
    }));

    function createMockDocument(id, mockElement) {
        const document = sinon.createStubInstance(Document);
        document.getElementById = sinon.stub().withArgs(id).returns(mockElement);
        return document;
    }
});