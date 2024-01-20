import url from 'url';

export default function getSourceSiteName(siteUrl) {
    let sourceSiteName = '';

    if (siteUrl) {
        if (!siteUrl.includes('//')) {
            siteUrl = `http://${siteUrl}`;
        }

        sourceSiteName = url.parse(siteUrl).hostname;
    }

    if (sourceSiteName.includes('www.')) {
        sourceSiteName = sourceSiteName.split('www.')[1];
    }

    return sourceSiteName;
};
