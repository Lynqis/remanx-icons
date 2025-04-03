const OUTPUT_JSON = "./assets/icons.json";

export function buildJson(files) {
  if (files.length === 0) {
    console.error("⚠️ No SVG files found in the directory.");
    process.exit(1);
  }

  const iconsJson = {
    icons: {}
  };

  files.forEach(file => {
    const iconName = path.basename(file, ".svg");
    iconsJson.icons[iconName] = `${ICONS_FOLDER}/${file}`;
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(iconsJson, null, 2));
  console.log("✅ icons.json generated successfully!");
}
