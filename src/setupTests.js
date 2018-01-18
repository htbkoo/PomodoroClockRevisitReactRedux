// Ref: https://github.com/blainekasten/enzyme-matchers/tree/master/packages/jest-enzyme#using-with-create-react-app
import 'jest-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });