type Method = "topstories" | `item/${string}`;

/**
 * @param method Available methods: topstories, item/{id}
 * @returns 
 */
const getMethodUrl = (method: Method) => `https://hacker-news.firebaseio.com/v0/${method}.json}`;

export const getMethod = async (method: Method) => await fetch(getMethodUrl(method)).then((res) => res.json());