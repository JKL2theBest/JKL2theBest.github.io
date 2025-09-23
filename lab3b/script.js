document.addEventListener('DOMContentLoaded', () => {
    
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    async function setFileSize(elementId, fileUrl) {
        try {
            // Получить только заголовки, а не весь файл
            const response = await fetch(fileUrl, { method: 'HEAD' });
            
            if (response.ok) {
                const contentLength = response.headers.get('Content-Length');
                if (contentLength) {
                    const fileSize = parseInt(contentLength, 10);
                    const formattedSize = formatBytes(fileSize);
                    
                    // Находим нужный span и вставляем в него размер
                    const element = document.getElementById(elementId);
                    const sizeSpan = element.querySelector('.file-size');
                    if (sizeSpan) {
                        sizeSpan.textContent = `(${formattedSize})`;
                    }
                }
            }
        } catch (error) {
            console.error(`Could not fetch file size for ${fileUrl}:`, error);
        }
    }

    setFileSize('downloadLocal', 'SecurityScanner_Local.exe');
    setFileSize('downloadWeb', 'SecurityScanner_Web.exe');
});