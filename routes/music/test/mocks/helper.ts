import {DebugElement} from 'angular2/src/core/debug/debug_node';
import {Response, ResponseOptions} from 'angular2/http';
import {By} from 'angular2/platform/common_dom';

class MockResponse extends Response {
  _json: any;

  constructor(json: any) {
    super(new ResponseOptions());
    this._json = json;
  }

  json() {
    return this._json;
  }
}

export class TestHelper {
  /** Gets a child DebugElement by tag name. */
  static getChildByTagName(parent: DebugElement, tagName: string): DebugElement {
    return parent.query(debugEl => debugEl.nativeElement.tagName.toLowerCase() == tagName);
  }

  /**
   * Gets a child DebugElement by css selector.
   *
   * The child of DebugElement are other elements that are "known" to
   * Angular.
   */
  static getChildrenBySelector(parent: DebugElement, selector: string): DebugElement[] {
    let results = [];

    parent.queryAll(By.css(selector)).forEach((el) => results.push(el));
    parent.children.forEach((de) => {
      TestHelper.getChildrenBySelector(de, selector).forEach((el) => results.push(el));
    });

    return results;
  }

  static isPhantomJS(): boolean {
    return navigator && navigator.userAgent
        && navigator.userAgent.indexOf('PhantomJS') > -1;
  }

  static mockJSONResponse(payload: any) {
    return new MockResponse(payload);
  }
}

// toHaveText = function(util, customEqualityTesters) {
//   return {
//     compare: function(debugElement: DebugElement, text: string) {
//       result.pass = util.equals(
//         debugElement.nativeElement.innerText, text, customEqualityTesters);
//
//       if (result.pass) {
//         result.message =
//           "Expected " + debugElement.nativeElement +
//           " to not have text " + text;
//       }
//       else {
//         result.message =
//           "Expected " + debugElement.nativeElement + " to have text " + text;
//       }
//
//       return result;
//     }
//   }
// }
