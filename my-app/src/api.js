export default async (prompt) => {
    try {
        //post请求
        const response = await fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            //form-data
            //跨域
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            },
            //body
            body: `prompt=${prompt}`,
        });
        const data = await response.text();
        // eslint关闭
        // eslint-disable-next-line no-undef
        const result = marked.parse(data);
        return result;
    } catch (error) {
        console.error(error);
    }
};