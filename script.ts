const adress: string | undefined = process.argv.slice(2)[0]

function isValidURL(link: string | undefined): link is string {
    if (link == undefined){
        return false
    }
    try {
        const url = new URL(link);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (err) {
        return false;
    }
}
