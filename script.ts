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
interface Metrics {
    duration: number;
    sizeBytes: number;
    speedKBs: number;
}
async function safeFetch(link: string | undefined): Promise<Metrics | null>{
    if (!isValidURL(link)) {
        console.error('Неправильная ссылка');
        return null;
    }else{
        const startTime = performance.now()
        try {
            const response = await fetch(link);
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
            }
            const endTime = performance.now()
            const duration = Math.round(endTime - startTime) / 1000
           
            const buffer = await response.arrayBuffer()
            const sizeBytes = buffer.byteLength;

            const speed = duration > 0 ? Math.round(sizeBytes / duration) : sizeBytes;
            const speedKBs = ((speed / 1024) * 100)/100

            

            
            return {
                duration,
                sizeBytes,
                speedKBs

            }
        } catch (err) {
            console.error('Ошибка при выполнении запроса');
            return null;
    }
    }
}

async function loopFetch() {
    for (let i = 0; i < 10; i++){
        const data = await safeFetch(adress);
    }
}
