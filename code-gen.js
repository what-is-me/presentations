import { readdirSync, statSync, openSync, writeSync, closeSync } from 'fs';
import { join } from 'path';
const presentationDirs = readdirSync(".").filter(item => {
    if (statSync(item).isDirectory() && item !== "node_modules" && !item.startsWith(".")) {
        return readdirSync(item).some(subitem => {
            return statSync(join(item, subitem)).isFile() && subitem === "index.md";
        })
    }
});

const slides = openSync("slides.md", 'w');
writeSync(slides, "---\ntheme: academic\n---\n")
writeSync(slides, `# Database Presentation\n`)
for (const item of presentationDirs) {
    const content = `---\nsrc: ${item}/index.md\nhide: false\n---\n`
    writeSync(slides, content);
}
closeSync(slides);