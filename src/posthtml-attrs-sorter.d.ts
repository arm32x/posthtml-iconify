declare module "posthtml-attrs-sorter" {
    export = attrsSorter;
    
    function attrsSorter(options?: { order?: string[] }): any
}
