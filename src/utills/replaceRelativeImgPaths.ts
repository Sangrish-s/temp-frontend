const replaceRelativeImgPaths = (html: string, url: string): string => {
  const baseUrl = getBaseUrl(url);
  const imgRegex = /<img[^>]+src="([^"]+)"/g;

  return html.replace(imgRegex, (match, imagePath) => {
    if (!imagePath.startsWith("http")) {
      const absolutePath = `${baseUrl}${imagePath}`;
      return match.replace(imagePath, absolutePath);
    }
    return match;
  });
};

const getBaseUrl = (url: string): string => {
  const parsedUrl = new URL(url);
  return `${parsedUrl.protocol}//${
    parsedUrl.host
  }${parsedUrl.pathname.substring(0, parsedUrl.pathname.lastIndexOf("/") + 1)}`;
};

export default replaceRelativeImgPaths;
