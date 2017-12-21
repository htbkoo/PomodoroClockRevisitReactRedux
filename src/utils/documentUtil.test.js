// @flow
import {sinon, sinonTest} from "./sinonWithTest";

import documentUtil from "./documentUtil";

describe("documentUtil", function () {
    it("should get element if the type is correct", sinonTest(function () {
        const id = "anId", mockElement = sinon.createStubInstance(Element);
        const document = createMockDocument({withGetElementById: sinon.stub().withArgs(id).returns(mockElement)});

        let element = documentUtil.getElementOrThrow({id, document});

        expect(element).toBe(mockElement);
    }));

    it("should throw TypeError if the element returned is not an Element", sinonTest(function () {
        const id = "anId", notAnElement = "";
        const document = createMockDocument({withGetElementById: sinon.stub().withArgs(id).returns(notAnElement)});

        let actionThatShouldThrow = documentUtil.getElementOrThrow.bind(documentUtil, {id, document});


        // Possibly a bug in Jest + Flow - this is the suggested syntax in Jest, but Flow is complaining
        // Ref: https://facebook.github.io/jest/docs/en/expect.html#tothrowerror
        //$FlowFixMe
        expect(actionThatShouldThrow).toThrow(TypeError);
    }));

    function createMockDocument({withGetElementById}: { withGetElementById: ?Object }) {
        const document = sinon.createStubInstance(Document);
        if (withGetElementById) {
            document.getElementById = withGetElementById;
        }
        return document;
    }
});