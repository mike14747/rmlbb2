export function getFileTypeIcon(filename) {
    const extension = filename.substring(filename.lastIndexOf('.') + 1);

    if (['xlsx', 'xls', 'csv'].includes(extension)) return 'excel_icon.png';
    if (['docx', 'doc', 'rtf'].includes(extension)) return 'word_icon.png';
    if (extension === 'txt') return 'text_icon.png';
    if (extension === 'pdf') return 'pdf_icon.png';
    if (extension === 'zip') return 'zip_icon.png';
    if (extension === 'lzp') return 'lzp_icon.png';

    return 'generic_icon.png';
}
