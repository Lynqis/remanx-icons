import { buildCss } from "./build-css";
import { buildJson } from "./build-json";
import { getSvgFiles } from "./get-svgs";

const files = getSvgFiles();

buildCss(files);
buildJson(files);
