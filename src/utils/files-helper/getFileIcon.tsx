// File Icons
import AudioIcon from "@/components/Icons/Files/Audio";
import ExcelIcon from "@/components/Icons/Files/Excel";
import FileIcon from "@/components/Icons/Files/File";
import FolderIcon from "@/components/Icons/Files/Folder";
import ImageIcon from "@/components/Icons/Files/Image";
import PdfIcon from "@/components/Icons/Files/Pdf";
import TextIcon from "@/components/Icons/Files/Text";
import VideoIcon from "@/components/Icons/Files/Video";
import WordIcon from "@/components/Icons/Files/Word";
import ZipIcon from "@/components/Icons/Files/Zip";

const getFileIcon = (fileType: string) => {
  if (fileType === "mp3") return <AudioIcon />;
  if (fileType === "csv" || fileType === "xlsx" || fileType === "xls")
    return <ExcelIcon />;
  if (fileType === "folder") return <FolderIcon />;
  if (
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg" ||
    fileType === "svg"
  )
    return <ImageIcon />;
  if (fileType === "pdf") return <PdfIcon />;
  if (fileType === "txt") return <TextIcon />;
  if (fileType === "mp4") return <VideoIcon />;
  if (fileType === "docx") return <WordIcon />;
  if (fileType === "zip") return <ZipIcon />;

  return <FileIcon />;
};

export default getFileIcon;
