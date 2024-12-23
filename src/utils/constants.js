export const LOGO ="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
export const USER_AVTAR="https://occ-0-3213-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea";
export const BODY_IMG ="https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg";
export const API_OPTIONS={
    
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY,
    }
    
}

export const IMG_CDN_URL ="https://image.tmdb.org/t/p/w500/"

export const SUPPORTED_LANGUAGE =[
    {
        identifier: "english",
        name: "English"
    },
    {
        identifier: "hindi",
        name: "Hindi"
    },
    {
        identifier: "spanish",
        name: "Spanish"
    }
]

export const OPEN_AI_KEY=process.env.REACT_APP_OPEN_AI_KEY;