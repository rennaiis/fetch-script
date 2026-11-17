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

async function safeFetch(link: string | undefined) {
    if (!isValidURL(link)) {
        console.error('Неправильная ссылка');
        return null;
    }else{
        try {
            const response = await fetch(link);
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Ошибка при выполнении запроса');
            return null;
    }
    }
}
