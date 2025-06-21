import fs from 'fs';
import path from 'path';

const baseDir = 'src/assets/projects';
const outputFile = 'src/assets/project-index.json';

export function getProjectsStructure(dir) {
  const projects = fs.readdirSync(dir).filter(name =>
    fs.statSync(path.join(dir, name)).isDirectory()
  );

  return projects.map(project => {
    const projectPath = path.join(dir, project);

    const chapters = fs.readdirSync(projectPath)
      .filter(chapter => {
        const chapterPath = path.join(projectPath, chapter);
        return fs.statSync(chapterPath).isDirectory();
      })
      .map(chapter => {
        const chapterPath = path.join(projectPath, chapter);
        const htmlFiles = fs.readdirSync(chapterPath).filter(file => file.endsWith('.html'));
        return {
          chapter,
          page: htmlFiles[0]?.replace('.html', '') || null
        };
      })
      .filter(c => c.page); // only include chapters with an HTML file

    return { project, chapters };
  });
}

const result = getProjectsStructure(baseDir);
fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`✔ JSON written to ${outputFile}`);
