import { html_beautify as beautify } from "js-beautify";
import attrsSorter from "posthtml-attrs-sorter";
import Browser from "zombie";
import path from "path";
import posthtmlIconify from "../src";
import posthtml, { Node } from "posthtml";
import fs from "fs";
import test, { ExecutionContext } from "ava";
import util from "util";

const fixturesPath = path.join(__dirname, "fixtures");

function classesSorter(tree: Node): Node {
    tree.match({ attrs: { "class": /.*/ } }, (node) => {
        node.attrs["class"] = node.attrs["class"].split(" ").sort().join(" ");
        return node;
    });
    return tree;
}

async function getExpectedAndActual(fixture: string, options?: object): Promise<{ expected: string; actual: string; }> {
    const fixtureFile = path.join(fixturesPath, `${fixture}.html`);
    const fixtureBuffer = fs.readFileSync(fixtureFile);
    
    let [ expected, actual ] = await Promise.all([
        async function getExpectedResult() {
            /* const fixtureUri = `data:text/html;base64,${fixtureBuffer.toString("base64")}`; */
            const fixtureUri = `file://${fixtureFile}`;
            
            const browser = new Browser();
            await browser.visit(fixtureUri);
            await util.promisify(browser.on.bind(browser, "done"));
            
            // Sort the resulting attributes so that order isn't compared.
            const result = await posthtml([ classesSorter, attrsSorter()]).process(browser.html(":root"));
            return result.html;
        }(),
        async function getActualResult() {
            const fixtureHtml = fixtureBuffer.toString("utf-8");
            
            const result = await posthtml([ posthtmlIconify(/* options */), classesSorter, attrsSorter() ]).process(fixtureHtml);
            return result.html;
        }()
    ]);
    
    // Beautify for better comparison.
    const beautifyOptions = {
        extra_liners: [ ],
        indent_empty_lines: true,
        indent_inner_html: true,
        indent_size: 4,
        preserve_newlines: false,
        wrap_line_length: 0
    };
    expected = beautify(expected, beautifyOptions);
    actual = beautify(actual, beautifyOptions);
    
    return { expected, actual };
}

const fixtures = {
    basic: { },
    dimensions: { },
    misc: { },
    // provider: {
    //     collections: [
    //         {
    //             prefix: "md",
    //             icons: {
    //                 test: {
    //                     body: '<path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"/>',
    //                 },
    //             },
    //             width: 24,
    //             height: 24,
    //             provider: "custom"
    //         },
    //     ]
    // },
    transformations: { }
};
for (let [ fixture, options ] of Object.entries(fixtures)) {
    test(fixture, async t => {
        let { expected, actual } = await getExpectedAndActual(fixture, options);
        t.deepEqual(actual, expected);
    });
}
