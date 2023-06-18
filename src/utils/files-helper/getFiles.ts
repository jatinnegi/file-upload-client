import { PreviewStructureProps } from "@/components/MainLayout";
import { FileWithPath } from "react-dropzone";

export function getFiles(
  files: FileWithPath[],
  previewStructure: PreviewStructureProps,
  key: string
) {
  const filesToSend: FileWithPath[] = [];
  let keyFind = key;

  if (previewStructure[key].totalItems > 0) keyFind = `/${keyFind}`;

  files.forEach((file: FileWithPath) => {
    if (file.path && file.path.startsWith(key)) filesToSend.push(file);
  });

  return files;
}
