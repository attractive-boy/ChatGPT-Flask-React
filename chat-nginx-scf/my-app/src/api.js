export default async (prompt) => {
    try {
        //post请求
        const response = await fetch('/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ "content": prompt, "role": "user" }]
            })

        });
        // {
        //     "id": "chatcmpl-6uyN1Lj7JQceNQyBLDi0vhNEj1zOG",
        //     "object": "chat.completion",
        //     "created": 1679036451,
        //     "model": "gpt-3.5-turbo-0301",
        //     "usage": {
        //         "prompt_tokens": 9,
        //         "completion_tokens": 17,
        //         "total_tokens": 26
        //     },
        //     "choices": [
        //         {
        //             "message": {
        //                 "role": "assistant",
        //                 "content": "\n\n你好，有什么需要帮忙的吗？"
        //             },
        //             "finish_reason": "stop",
        //             "index": 0
        //         }
        //     ]
        // }
        const data = await response.json();
        // eslint关闭
        // eslint-disable-next-line no-undef
        const result = marked.parse(data.choices[0].message.content);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};