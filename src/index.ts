import { Collection, SVG } from "@iconify/json-tools";
import { IconifyJSON } from "@iconify/types";
import PostHTML, { Node } from "posthtml";
import parser from "posthtml-parser";

interface Options {
    useIconifyCollections?: boolean,
    collections?: IconifyJSON[]
}

export default (/* options: Options = { } */) => {
    // Set default values.
    // let defaults: Options = {
    //     useIconifyCollections: true,
    //     collections: [ ]
    // }
    // for (let [ option, value ] of Object.entries(defaults)) {
    //     let unsafeOptions = options as Record<string, any>;
    //     if (unsafeOptions[option] === undefined) {
    //         unsafeOptions[option] = value;
    //     }
    // }
    
    return function posthtmlIconify(tree: Node): Node {
        let collections = new Map<string, Collection>();
        // if (options.collections !== undefined) {
        //     for (let data of options.collections) {
        //         let collection = new Collection(data.prefix);
        //         collection.loadJSON(data);
        //         collections.set(data.prefix, collection);
        //     }
        // }
        
        tree.match({
            tag: /i|(span)/,
            attrs: {
                class: /(?:^|\s)iconify(-inline)?(?:\s|$)/,
                "data-icon": /.*/
            }
        }, (node) => {
            let fullIcon = node.attrs["data-icon"];
            let prefixSeparator = fullIcon.includes(":") ? ":" : "-";
            let [ prefix, ...iconWords ] = fullIcon.split(prefixSeparator);
            let icon = iconWords.join("-");
            
            let collection = collections.get(prefix);
            if (collection === undefined) {
                // if (options.useIconifyCollections) {
                let c = new Collection(prefix);
                c.loadIconifyCollection(prefix);
                collections.set(prefix, c);
                collection = c;
                // } else {
                //     console.error(`Collection '${prefix}' not found.`);
                //     return node;
                // }
            }
            
            let iconData = collection.getIconData(icon);
            if (iconData === null) {
                console.error(`Icon '${prefix}:${icon}' not found.`)
                return node;
            }

            let classes = new Set(node.attrs["class"].split(" "));
            
            for (let c of classes) {
                if (c !== "iconify-inline" && c.startsWith("iconify-")) {
                    classes.delete(c);
                }
            }
            
            classes.add("iconify");
            classes.add(`iconify--${prefix}`);
            
            let flip = (node.attrs["data-flip"] || "").split(",");
            
            let svg = new SVG(iconData).getSVG({
                inline: (classes.has("iconify-inline") || node.attrs["data-inline"]) && !(node.attrs["style"] || "").includes("vertical-align:"),
                hFlip: flip.includes("horizontal"),
                vFlip: flip.includes("vertical"),
                rotate: node.attrs["data-rotate"],
                width: node.attrs["data-width"],
                height: node.attrs["data-height"],
                align: (node.attrs["data-align"] || "").replaceAll("slice", "crop")
            });
            let svgNode = parser(svg)[0] as parser.NodeTag;

            let originalAttrs = { ...node.attrs };
            let originalSvgAttrs = { ...svgNode.attrs };
            Object.assign(node, svgNode);
            Object.assign(node.attrs, originalAttrs);

            node.attrs["aria-hidden"] = originalAttrs["aria-hidden"] || "true";
            node.attrs["class"] = [ ...classes ].sort().join(" ");
            node.attrs["data-icon"] = fullIcon;
            node.attrs["role"] = "img";
            let style = `${originalSvgAttrs["style"] || ""} ${originalAttrs["style"] || ""}`.trim();
            if (style !== "") {
                node.attrs["style"] = style;
            }
            
            return node;
        });
        
        return tree;
    };
};
