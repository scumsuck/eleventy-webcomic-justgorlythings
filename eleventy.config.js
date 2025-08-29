/**
 * This is the 11ty config! If you ever need to get underneath the hood of 11ty
 * to add functionality or to sort your collections, this would be the place to
 * do it! In this example however, we just copy over the `img` and `css`
 * folders over to the output.
 * (https://www.11ty.dev/docs/config/)
 */

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */

const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
		// Copy `img` and `css` folders to output
		eleventyConfig.addPassthroughCopy("img");
		eleventyConfig.addPassthroughCopy("css");
		eleventyConfig.addPassthroughCopy("js");
		eleventyConfig.addPassthroughCopy("robots.txt");
		eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
			widths: [200, "auto"], 
			formats: ["auto"],
			defaultAttributes: {
			  loading: 'lazy'
			}
		});
		eleventyConfig.addPlugin(pluginRss);
		eleventyConfig.addLiquidFilter("utcDate", function(value) { 
			const utc= (new Date(value)).toUTCString().split(' ');
			return `${utc[2]} ${utc[1]}, ${utc[3]}`;
		});
		eleventyConfig.addAsyncFilter("chapters", async function(collections) { 
			return Object.keys(collections).filter(function (propertyName) {
				if (propertyName.indexOf("chapter") === 0){
					return propertyName;
				}
			});
		});		
}









