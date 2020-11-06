'use strict';

import { Node } from 'posthtml';

export default (): Function => {
  function PLUGIN_NAME_CAMEL(tree: Node): Node {
    // Your plugin
    return tree;
  }

  return PLUGIN_NAME_CAMEL;
};
