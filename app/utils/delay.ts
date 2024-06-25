export default async function delay(time: number, data?: any):Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data || true)
        }, time);
    })
}